from datetime import datetime, timedelta
from django.utils import timezone
from ..models import Doctor, Shift
from decimal import Decimal

class ShiftRotationManager:
    """Manages automatic rotation of doctors between shifts"""
    
    DEFAULT_SHIFT_TIMES = {
        'first': {'start': '08:00', 'end': '13:00'},
        'second': {'start': '13:00', 'end': '20:00'},
    }
    
    @classmethod
    def get_week_start_date(cls, week_of_year, year=None):
        """Get the start date (Monday) of a given week"""
        if year is None:
            year = timezone.now().year
        
        # January 1st of the year
        jan1 = datetime(year, 1, 1)
        
        # Find the first Monday of the year
        days_ahead = 7 - jan1.weekday()  # weekday() returns 0 for Monday
        if days_ahead == 7:
            days_ahead = 0
        first_monday = jan1 + timedelta(days=days_ahead)
        
        # Calculate the start of the target week
        week_start = first_monday + timedelta(weeks=week_of_year - 1)
        return week_start.date()
    
    @classmethod
    def get_week_of_year(cls, date):
        """Get the week number for a given date"""
        return date.isocalendar()[1]
    
    @classmethod
    def create_or_update_shifts_for_week(cls, week_of_year, year=None):
        """Create or update shifts for a specific week"""
        if year is None:
            year = timezone.now().year
            
        week_start = cls.get_week_start_date(week_of_year, year)
        doctors = Doctor.objects.all()
        
        if not doctors.exists():
            return []
        
        shifts_created = []
        
        # Create shifts for each day of the week (Monday to Saturday)
        for day_of_week in range(6):  # 0=Monday to 5=Saturday
            current_date = week_start + timedelta(days=day_of_week)
            
            # For Saturday, only create one shift (first)
            shift_types = ['first', 'second'] if day_of_week < 5 else ['first']
            
            for shift_type in shift_types:
                shift, created = Shift.objects.get_or_create(
                    week_of_year=week_of_year,
                    day_of_week=day_of_week,
                    shift_type=shift_type,
                    defaults={
                        'start_time': cls.DEFAULT_SHIFT_TIMES[shift_type]['start'],
                        'end_time': cls.DEFAULT_SHIFT_TIMES[shift_type]['end'],
                    }
                )
                
                # Assign doctors based on rotation logic
                cls._assign_doctors_to_shift(shift, week_of_year, day_of_week, shift_type)
                shifts_created.append(shift)
        
        return shifts_created
    
    @classmethod
    def _assign_doctors_to_shift(cls, shift, week_of_year, day_of_week, shift_type):
        """Assign doctors to a shift based on rotation logic"""
        doctors = list(Doctor.objects.all())
        if not doctors:
            return
        
        # Clear existing assignments
        shift.doctors.clear()
        
        # Simple rotation logic: alternate between first and second shifts
        # A doctor who was on first shift in week N should be on second shift in week N + 1
        for i, doctor in enumerate(doctors):
            # Determine if this doctor should be on this shift based on rotation
            should_assign = cls._should_assign_doctor_to_shift(
                doctor, week_of_year, day_of_week, shift_type
            )
            
            if should_assign:
                shift.doctors.add(doctor)
    
    @classmethod
    def _should_assign_doctor_to_shift(cls, doctor, week_of_year, day_of_week, shift_type):
        """Determine if a doctor should be assigned to a specific shift based on rotation"""
        # Simple rotation: alternate between first and second shifts
        # For now, assign all doctors to all shifts (can be refined later)
        return True
    
    @classmethod
    def rotate_shifts_for_next_week(cls, current_week=None, year=None):
        """Rotate doctors for the next week based on current assignments"""
        if current_week is None:
            current_week = cls.get_week_of_year(timezone.now().date())
        
        next_week = current_week + 1
        if next_week > 52:
            next_week = 1
            if year:
                year += 1
        
        return cls.create_or_update_shifts_for_week(next_week, year)
    
    @classmethod
    def get_shift_schedule_for_week(cls, week_of_year, year=None):
        """Get the complete shift schedule for a week"""
        if year is None:
            year = timezone.now().year
            
        shifts = Shift.objects.filter(week_of_year=week_of_year)
        
        schedule = {}
        for shift in shifts:
            day_name = dict(Shift.DAYS_OF_WEEK)[shift.day_of_week]
            if day_name not in schedule:
                schedule[day_name] = {}
            
            schedule[day_name][shift.shift_type] = {
                'id': shift.id,
                'start_time': shift.start_time.strftime('%H:%M'),
                'end_time': shift.end_time.strftime('%H:%M'),
                'doctors': [
                    {
                        'id': doctor.id,
                        'full_name': doctor.full_name,
                        'profile_picture_url': doctor.profile_picture_url
                    }
                    for doctor in shift.doctors.all()
                ]
            }
        
        return schedule 