from django.db import models
from django.conf import settings

class Doctor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='doctors/')
    phone = models.CharField(max_length=20)

class Shift(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='shifts')
    week_number = models.PositiveSmallIntegerField()  # 1–4
    shift_type = models.CharField(max_length=10, choices=[('morning','Morning'),('evening','Evening')])

    class Meta:
        unique_together = ('doctor','week_number')