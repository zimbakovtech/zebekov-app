from rest_framework import serializers
from .models import Doctor, Service, Shift, Appointment, ScheduleSlot

class DoctorSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Doctor
        fields = ['id', 'full_name', 'phone', 'photo', 'email', 'username']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'duration']

class ShiftSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), source='doctor', write_only=True)
    class Meta:
        model = Shift
        fields = ['id', 'doctor', 'doctor_id', 'week_number', 'shift_type', 'start_date', 'end_date']
    def create(self, validated_data):
        return Shift.objects.create(**validated_data)
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all(), source='doctor', write_only=True)
    services = ServiceSerializer(many=True, read_only=True)
    service_ids = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all(), source='services', many=True, write_only=True)
    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'doctor_id', 'patient_first_name', 'patient_last_name', 'phone_number', 'services', 'service_ids', 'custom_service', 'custom_duration', 'date', 'start_time', 'end_time']
    def create(self, validated_data):
        service_ids = validated_data.pop('service_ids', None)
        if service_ids is None:
            service_ids = validated_data.pop('services', [])
        appointment = Appointment.objects.create(**validated_data)
        if service_ids:
            appointment.services.set(service_ids)
        return appointment
    def update(self, instance, validated_data):
        service_ids = validated_data.pop('service_ids', None)
        if service_ids is None:
            service_ids = validated_data.pop('services', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if service_ids is not None:
            instance.services.set(service_ids)
        instance.save()
        return instance

class ScheduleSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleSlot
        fields = ['id', 'doctor', 'date', 'start_time', 'end_time', 'is_available'] 