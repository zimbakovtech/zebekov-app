from django.core.management.base import BaseCommand
from django.utils import timezone
from clinic.models import Doctor, Service, Shift
from clinic.utils.shift_rotation import ShiftRotationManager
from datetime import datetime, timedelta
from decimal import Decimal

class Command(BaseCommand):
    help = 'Initialize the dental clinic with sample data and shift rotation'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before initializing',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write('Clearing existing data...')
            Doctor.objects.all().delete()
            Service.objects.all().delete()
            Shift.objects.all().delete()

        self.stdout.write('Creating sample doctors...')
        doctors = self.create_sample_doctors()
        
        self.stdout.write('Creating sample services...')
        services = self.create_sample_services()
        
        self.stdout.write('Setting up shift rotation...')
        self.setup_shift_rotation()
        
        self.stdout.write(
            self.style.SUCCESS('Successfully initialized dental clinic!')
        )

    def create_sample_doctors(self):
        """Create sample doctors"""
        doctors_data = [
            {
                'full_name': 'Dr. John Smith',
                'phone_number': '+1-555-0101',
                'email': 'john.smith@dentalclinic.com',
                'profile_picture_url': 'https://example.com/doctors/john-smith.jpg'
            },
            {
                'full_name': 'Dr. Sarah Johnson',
                'phone_number': '+1-555-0102',
                'email': 'sarah.johnson@dentalclinic.com',
                'profile_picture_url': 'https://example.com/doctors/sarah-johnson.jpg'
            },
            {
                'full_name': 'Dr. Michael Brown',
                'phone_number': '+1-555-0103',
                'email': 'michael.brown@dentalclinic.com',
                'profile_picture_url': 'https://example.com/doctors/michael-brown.jpg'
            },
            {
                'full_name': 'Dr. Emily Davis',
                'phone_number': '+1-555-0104',
                'email': 'emily.davis@dentalclinic.com',
                'profile_picture_url': 'https://example.com/doctors/emily-davis.jpg'
            }
        ]
        
        doctors = []
        for data in doctors_data:
            doctor, created = Doctor.objects.get_or_create(
                email=data['email'],
                defaults=data
            )
            if created:
                self.stdout.write(f'  Created doctor: {doctor.full_name}')
            else:
                self.stdout.write(f'  Doctor already exists: {doctor.full_name}')
            doctors.append(doctor)
        
        return doctors

    def create_sample_services(self):
        """Create sample services"""
        services_data = [
            {
                'name': 'Regular Checkup',
                'price': Decimal('75.00'),
                'duration_minutes': 30
            },
            {
                'name': 'Deep Cleaning',
                'price': Decimal('150.00'),
                'duration_minutes': 60
            },
            {
                'name': 'Cavity Filling',
                'price': Decimal('200.00'),
                'duration_minutes': 45
            },
            {
                'name': 'Root Canal',
                'price': Decimal('800.00'),
                'duration_minutes': 120
            },
            {
                'name': 'Teeth Whitening',
                'price': Decimal('300.00'),
                'duration_minutes': 90
            },
            {
                'name': 'Dental Crown',
                'price': Decimal('1200.00'),
                'duration_minutes': 90
            }
        ]
        
        services = []
        for data in services_data:
            service, created = Service.objects.get_or_create(
                name=data['name'],
                defaults=data
            )
            if created:
                self.stdout.write(f'  Created service: {service.name} - ${service.price}')
            else:
                self.stdout.write(f'  Service already exists: {service.name}')
            services.append(service)
        
        return services

    def setup_shift_rotation(self):
        """Set up shift rotation for the current and next few weeks"""
        current_week = timezone.now().isocalendar()[1]
        current_year = timezone.now().year
        
        # Generate shifts for current week and next 4 weeks
        for week_offset in range(5):
            week = current_week + week_offset
            if week > 52:
                week = week - 52
                year = current_year + 1
            else:
                year = current_year
            
            shifts = ShiftRotationManager.create_or_update_shifts_for_week(week, year)
            self.stdout.write(f'  Generated {len(shifts)} shifts for week {week}, year {year}') 