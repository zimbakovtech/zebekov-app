from rest_framework import serializers
from .models import Appointment, AppointmentService

class AppointmentServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentService
        fields = ['service']

class AppointmentSerializer(serializers.ModelSerializer):
    services = serializers.PrimaryKeyRelatedField(queryset=AppointmentService.objects.all(), many=True)

    class Meta:
        model = Appointment
        fields = ['id','doctor','patient_first','patient_last','patient_phone',
                  'services','custom_service','custom_duration','start','end','created_by']

    def validate(self, data):
        # compute end from start + durations
        total_duration = None
        if data.get('custom_duration'):
            total_duration = data['custom_duration']
        else:
            total_duration = sum((s.duration for s in Service.objects.filter(id__in=data['services'])), start=timedelta())
        data['end'] = data['start'] + total_duration
        # TODO: overlap validation
        return data

    def create(self, validated_data):
        services = validated_data.pop('services')
        appt = Appointment.objects.create(**validated_data)
        for svc in services:
            AppointmentService.objects.create(appointment=appt, service=svc)
        return appt