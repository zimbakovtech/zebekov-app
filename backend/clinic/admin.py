from django.contrib import admin
from .models import Doctor, Service, Shift, Appointment, ScheduleSlot

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'user')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration')

@admin.register(Shift)
class ShiftAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'week_number', 'shift_type', 'start_date', 'end_date')

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'patient_first_name', 'patient_last_name', 'date', 'start_time', 'end_time')

@admin.register(ScheduleSlot)
class ScheduleSlotAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'date', 'start_time', 'end_time', 'is_available')
