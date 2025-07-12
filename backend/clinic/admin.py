from django.contrib import admin
from .models import Doctor, Service, Shift, Appointment

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'phone_number', 'email']
    search_fields = ['full_name', 'email']
    list_filter = ['full_name']

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'duration_minutes']
    search_fields = ['name']
    list_filter = ['price']

@admin.register(Shift)
class ShiftAdmin(admin.ModelAdmin):
    list_display = ['week_of_year', 'get_day_name', 'shift_type', 'start_time', 'end_time', 'get_doctor_names']
    list_filter = ['week_of_year', 'day_of_week', 'shift_type']
    search_fields = ['week_of_year']
    filter_horizontal = ['doctors']
    
    def get_day_name(self, obj):
        return dict(Shift.DAYS_OF_WEEK)[obj.day_of_week]
    get_day_name.short_description = 'Day'
    
    def get_doctor_names(self, obj):
        return ", ".join([doctor.full_name for doctor in obj.doctors.all()])
    get_doctor_names.short_description = 'Doctors'

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['patient_first_name', 'patient_last_name', 'doctor', 'service', 'start_datetime', 'end_datetime', 'price']
    list_filter = ['start_datetime', 'doctor', 'service']
    search_fields = ['patient_first_name', 'patient_last_name', 'patient_phone_number']
    date_hierarchy = 'start_datetime'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('doctor', 'service')
