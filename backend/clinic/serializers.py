from rest_framework import serializers
from .models import Doctor, Service, Shift, Appointment
from datetime import datetime, timedelta

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'full_name', 'phone_number', 'email', 'profile_picture_url']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'price', 'duration_minutes']

class ShiftSerializer(serializers.ModelSerializer):
    doctors = DoctorSerializer(many=True, read_only=True)
    doctor_ids = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(), 
        source='doctors', 
        many=True, 
        write_only=True,
        required=False
    )
    day_name = serializers.CharField(source='get_day_name', read_only=True)
    
    class Meta:
        model = Shift
        fields = [
            'id', 'week_of_year', 'day_of_week', 'day_name', 'shift_type', 
            'start_time', 'end_time', 'doctors', 'doctor_ids'
        ]
    
    def get_day_name(self, obj):
        return dict(Shift.DAYS_OF_WEEK)[obj.day_of_week]

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(), 
        source='doctor', 
        write_only=True
    )
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), 
        source='service', 
        write_only=True,
        required=False,
        allow_null=True
    )
    patient_full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'patient_first_name', 'patient_last_name', 'patient_full_name',
            'patient_phone_number', 'doctor', 'doctor_id', 'service', 'service_id',
            'custom_service_name', 'price', 'duration_minutes', 'start_datetime', 'end_datetime'
        ]
        read_only_fields = ['end_datetime']
    
    def get_patient_full_name(self, obj):
        return f"{obj.patient_first_name} {obj.patient_last_name}"
    
    def validate(self, data):
        """Validate appointment data"""
        # Check if either service_id or custom_service_name is provided
        if not data.get('service') and not data.get('custom_service_name'):
            raise serializers.ValidationError(
                "Either service_id or custom_service_name must be provided"
            )
        
        # If service is provided, auto-fill price and duration
        if data.get('service'):
            data['price'] = data['service'].price
            data['duration_minutes'] = data['service'].duration_minutes
        
        # Validate that custom service has price and duration
        if data.get('custom_service_name') and not data.get('service'):
            if not data.get('price'):
                raise serializers.ValidationError("Price is required for custom services")
            if not data.get('duration_minutes'):
                raise serializers.ValidationError("Duration is required for custom services")
        
        # Validate appointment time doesn't conflict with existing appointments
        start_datetime = data.get('start_datetime')
        doctor = data.get('doctor')
        duration_minutes = data.get('duration_minutes', 0)
        
        if start_datetime and doctor and duration_minutes:
            end_datetime = start_datetime + timedelta(minutes=duration_minutes)
            
            # Check for conflicts with existing appointments
            conflicting_appointments = Appointment.objects.filter(
                doctor=doctor,
                start_datetime__lt=end_datetime,
                end_datetime__gt=start_datetime
            )
            
            # Exclude current appointment if updating
            if self.instance:
                conflicting_appointments = conflicting_appointments.exclude(id=self.instance.id)
            
            if conflicting_appointments.exists():
                raise serializers.ValidationError(
                    "This appointment conflicts with an existing appointment"
                )
        
        return data
    
    def create(self, validated_data):
        # Auto-calculate end_datetime
        start_datetime = validated_data.get('start_datetime')
        duration_minutes = validated_data.get('duration_minutes', 0)
        
        if start_datetime and duration_minutes:
            validated_data['end_datetime'] = start_datetime + timedelta(minutes=duration_minutes)
        
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        # Auto-calculate end_datetime if start_datetime or duration changes
        start_datetime = validated_data.get('start_datetime', instance.start_datetime)
        duration_minutes = validated_data.get('duration_minutes', instance.duration_minutes)
        
        if 'start_datetime' in validated_data or 'duration_minutes' in validated_data:
            validated_data['end_datetime'] = start_datetime + timedelta(minutes=duration_minutes)
        
        return super().update(instance, validated_data)

class CalendarAppointmentSerializer(serializers.ModelSerializer):
    """Serializer for calendar view with additional context"""
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)
    doctor_profile_picture = serializers.CharField(source='doctor.profile_picture_url', read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)
    patient_full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'patient_full_name', 'doctor_name', 'doctor_profile_picture',
            'service_name', 'price', 'start_datetime', 'end_datetime'
        ]
    
    def get_patient_full_name(self, obj):
        return f"{obj.patient_first_name} {obj.patient_last_name}" 