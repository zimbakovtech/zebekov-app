from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from clinic.models import Doctor, Service

class Command(BaseCommand):
    help = 'Seed sample doctors and services'

    def handle(self, *args, **kwargs):
        # Create sample services
        services = [
            ('Cleaning', 30),
            ('Filling', 45),
            ('Root Canal', 90),
            ('Whitening', 60),
        ]
        for name, duration in services:
            Service.objects.get_or_create(name=name, duration=duration)

        # Create sample doctors
        if not User.objects.filter(username='doctor1').exists():
            user = User.objects.create_user('doctor1', 'doctor1@example.com', 'doctor123')
            Doctor.objects.create(user=user, full_name='Dr. John Doe', phone='1234567890')
        if not User.objects.filter(username='doctor2').exists():
            user = User.objects.create_user('doctor2', 'doctor2@example.com', 'doctor123')
            Doctor.objects.create(user=user, full_name='Dr. Jane Smith', phone='0987654321')

        self.stdout.write(self.style.SUCCESS('Sample doctors and services created.')) 