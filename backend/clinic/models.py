from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime, timedelta
from decimal import Decimal
import calendar

class Doctor(models.Model):
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    profile_picture_url = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name_plural = 'Doctors'

class Service(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_minutes = models.IntegerField(validators=[MinValueValidator(1)])
    
    def __str__(self):
        return f"{self.name} - ${self.price}"

    class Meta:
        verbose_name_plural = 'Services'

class Shift(models.Model):
    SHIFT_TYPES = (
        ('first', 'First'),
        ('second', 'Second'),
    )
    
    DAYS_OF_WEEK = (
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    )
    
    week_of_year = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(52)])
    day_of_week = models.IntegerField(choices=DAYS_OF_WEEK)
    shift_type = models.CharField(max_length=10, choices=SHIFT_TYPES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    doctors = models.ManyToManyField(Doctor, related_name='shifts')
    
    def __str__(self):
        day_name = dict(self.DAYS_OF_WEEK)[self.day_of_week]
        return f"Week {self.week_of_year}, {day_name} - {self.shift_type} shift"
    
    def get_doctor_names(self):
        return ", ".join([doctor.full_name for doctor in self.doctors.all()])

    class Meta:
        verbose_name_plural = 'Shifts'
        unique_together = ['week_of_year', 'day_of_week', 'shift_type']

class Appointment(models.Model):
    patient_first_name = models.CharField(max_length=255)
    patient_last_name = models.CharField(max_length=255)
    patient_phone_number = models.CharField(max_length=20)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True, related_name='appointments')
    custom_service_name = models.CharField(max_length=255, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_minutes = models.IntegerField(validators=[MinValueValidator(1)])
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    
    def save(self, *args, **kwargs):
        # Auto-calculate end_datetime if not set
        if not self.end_datetime:
            self.end_datetime = self.start_datetime + timedelta(minutes=self.duration_minutes)
        
        # Auto-fill price and duration from service if not set
        if self.service and not self.price:
            self.price = self.service.price
        if self.service and not self.duration_minutes:
            self.duration_minutes = self.service.duration_minutes
            
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.patient_first_name} {self.patient_last_name} - {self.start_datetime.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        verbose_name_plural = 'Appointments'
        ordering = ['start_datetime']

def create_default_superuser(sender, **kwargs):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')