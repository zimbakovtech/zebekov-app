from django.db import models
from django.conf import settings
from doctors.models import Doctor
from services.models import Service

class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    patient_first = models.CharField(max_length=50)
    patient_last = models.CharField(max_length=50)
    patient_phone = models.CharField(max_length=20)
    services = models.ManyToManyField(Service, through='AppointmentService')
    custom_service = models.CharField(max_length=100, blank=True)
    custom_duration = models.DurationField(null=True, blank=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['start']

class AppointmentService(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)