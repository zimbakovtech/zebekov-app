from django.db import models
from django.contrib.auth.models import User

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='doctors/', null=True, blank=True)

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name_plural = 'Doctors'

class Service(models.Model):
    name = models.CharField(max_length=255)
    duration = models.IntegerField(help_text='Duration in minutes')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Services'

class Shift(models.Model):
    SHIFT_TYPES = (
        ('first', 'First'),
        ('second', 'Second'),
    )
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    week_number = models.IntegerField()
    shift_type = models.CharField(max_length=10, choices=SHIFT_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.doctor.full_name} - Week {self.week_number} - {self.shift_type}"

    class Meta:
        verbose_name_plural = 'Shifts'

class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient_first_name = models.CharField(max_length=255)
    patient_last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    services = models.ManyToManyField(Service)
    custom_service = models.CharField(max_length=255, null=True, blank=True)
    custom_duration = models.IntegerField(null=True, blank=True, help_text='Duration in minutes')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.patient_first_name} {self.patient_last_name} - {self.date}"

    class Meta:
        verbose_name_plural = 'Appointments'

class ScheduleSlot(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.doctor.full_name} - {self.date} {self.start_time} to {self.end_time}"

    class Meta:
        verbose_name_plural = 'Schedule Slots'


def create_default_superuser(sender, **kwargs):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')