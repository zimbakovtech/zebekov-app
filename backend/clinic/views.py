from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django.utils import timezone
from datetime import datetime, timedelta
from calendar import monthcalendar
from .models import Doctor, Service, Shift, Appointment
from .serializers import (
    DoctorSerializer, ServiceSerializer, ShiftSerializer, 
    AppointmentSerializer, CalendarAppointmentSerializer
)
from .utils.shift_rotation import ShiftRotationManager
from .permissions import IsAdminOrDoctor

# Create your views here.

class DoctorViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing doctors
    """
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter doctors based on user permissions"""
        user = self.request.user
        if user.is_staff:
            return Doctor.objects.all()
        # For non-staff users, return only their own doctor profile
        # This will be updated when doctor user accounts are implemented
        return Doctor.objects.none()

class ServiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing services
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter services based on user permissions"""
        user = self.request.user
        if user.is_staff:
            return Service.objects.all()
        # For non-staff users, return all services (read-only)
        return Service.objects.all()

    def create(self, request, *args, **kwargs):
        """Only staff can create services"""
        if not request.user.is_staff:
            return Response(
                {"error": "Only administrators can create services"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """Only staff can update services"""
        if not request.user.is_staff:
            return Response(
                {"error": "Only administrators can update services"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """Only staff can delete services"""
        if not request.user.is_staff:
            return Response(
                {"error": "Only administrators can delete services"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)

class ShiftViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing shifts
    """
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter shifts based on week parameter and user permissions"""
        queryset = Shift.objects.all()
        
        # Filter by week if provided
        week = self.request.query_params.get('week')
        if week:
            try:
                week = int(week)
                queryset = queryset.filter(week_of_year=week)
            except ValueError:
                return Response(
                    {"error": "Invalid week parameter"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Filter by user permissions
        user = self.request.user
        if not user.is_staff:
            # For non-staff users, return only shifts they're assigned to
            # This will be updated when doctor user accounts are implemented
            queryset = queryset.none()
        
        return queryset.prefetch_related('doctors')

    @action(detail=True, methods=['post'])
    def doctors(self, request, pk=None):
        """Add doctors to a shift"""
        if not request.user.is_staff:
            return Response(
                {"error": "Only administrators can modify shifts"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        shift = self.get_object()
        doctor_ids = request.data.get('doctor_ids', [])
        
        if not doctor_ids:
            return Response(
                {"error": "doctor_ids is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            doctors = Doctor.objects.filter(id__in=doctor_ids)
            shift.doctors.add(*doctors)
            return Response({"message": "Doctors added to shift successfully"})
        except Exception as e:
            return Response(
                {"error": f"Error adding doctors to shift: {str(e)}"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=['delete'], url_path='doctors/(?P<doctor_id>[^/.]+)')
    def remove_doctor(self, request, pk=None, doctor_id=None):
        """Remove a doctor from a shift"""
        if not request.user.is_staff:
            return Response(
                {"error": "Only administrators can modify shifts"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        shift = self.get_object()
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            shift.doctors.remove(doctor)
            return Response({"message": "Doctor removed from shift successfully"})
        except Doctor.DoesNotExist:
            return Response(
                {"error": "Doctor not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": f"Error removing doctor from shift: {str(e)}"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['post'])
    def generate_week(self, request):
        """Generate shifts for a specific week"""
        if not request.user.is_staff:
            return Response(
                {"error": "Only administrators can generate shifts"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        week = request.data.get('week')
        year = request.data.get('year')
        
        if not week:
            return Response(
                {"error": "week parameter is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            week = int(week)
            if year:
                year = int(year)
            
            shifts = ShiftRotationManager.create_or_update_shifts_for_week(week, year)
            return Response({
                "message": f"Generated {len(shifts)} shifts for week {week}",
                "shifts": ShiftSerializer(shifts, many=True).data
            })
        except Exception as e:
            return Response(
                {"error": f"Error generating shifts: {str(e)}"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class AppointmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing appointments
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter appointments based on query parameters and user permissions"""
        queryset = Appointment.objects.select_related('doctor', 'service')
        
        # Filter by patient name (partial search)
        patient_name = self.request.query_params.get('patient_name')
        if patient_name:
            queryset = queryset.filter(
                Q(patient_first_name__icontains=patient_name) |
                Q(patient_last_name__icontains=patient_name)
            )
        
        # Filter by user permissions
        user = self.request.user
        if not user.is_staff:
            # For non-staff users, return only appointments for their doctor profile
            # This will be updated when doctor user accounts are implemented
            queryset = queryset.none()
        
        return queryset

    @action(detail=False, methods=['get'])
    def future(self, request):
        """Get future appointments in a calendar-friendly structure"""
        week = request.query_params.get('week')
        
        if not week:
            return Response(
                {"error": "week parameter is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            week = int(week)
            year = timezone.now().year
            
            # Get the start date of the week
            week_start = ShiftRotationManager.get_week_start_date(week, year)
            week_end = week_start + timedelta(days=6)
            
            # Get appointments for the week
            appointments = Appointment.objects.filter(
                start_datetime__date__range=[week_start, week_end]
            ).select_related('doctor', 'service')
            
            # Group by day
            calendar_data = {}
            for day in range(7):
                current_date = week_start + timedelta(days=day)
                day_appointments = appointments.filter(
                    start_datetime__date=current_date
                )
                calendar_data[current_date.strftime('%Y-%m-%d')] = {
                    'date': current_date.strftime('%Y-%m-%d'),
                    'day_name': current_date.strftime('%A'),
                    'appointments': AppointmentSerializer(day_appointments, many=True).data
                }
            
            return Response(calendar_data)
        except ValueError:
            return Response(
                {"error": "Invalid week parameter"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Error fetching appointments: {str(e)}"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    def create(self, request, *args, **kwargs):
        """Create a new appointment with validation"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Additional validation for appointment conflicts
            start_datetime = serializer.validated_data.get('start_datetime')
            doctor = serializer.validated_data.get('doctor')
            duration_minutes = serializer.validated_data.get('duration_minutes', 0)
            
            if start_datetime and doctor and duration_minutes:
                end_datetime = start_datetime + timedelta(minutes=duration_minutes)
                
                # Check for conflicts
                conflicting_appointments = Appointment.objects.filter(
                    doctor=doctor,
                    start_datetime__lt=end_datetime,
                    end_datetime__gt=start_datetime
                )
                
                if conflicting_appointments.exists():
                    return Response(
                        {"error": "This appointment conflicts with an existing appointment"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            appointment = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """Update an appointment with validation"""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        if serializer.is_valid():
            # Additional validation for appointment conflicts
            start_datetime = serializer.validated_data.get('start_datetime', instance.start_datetime)
            doctor = serializer.validated_data.get('doctor', instance.doctor)
            duration_minutes = serializer.validated_data.get('duration_minutes', instance.duration_minutes)
            
            if start_datetime and doctor and duration_minutes:
                end_datetime = start_datetime + timedelta(minutes=duration_minutes)
                
                # Check for conflicts (excluding current appointment)
                conflicting_appointments = Appointment.objects.filter(
                    doctor=doctor,
                    start_datetime__lt=end_datetime,
                    end_datetime__gt=start_datetime
                ).exclude(id=instance.id)
                
                if conflicting_appointments.exists():
                    return Response(
                        {"error": "This appointment conflicts with an existing appointment"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            appointment = serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CalendarViewSet(viewsets.ViewSet):
    """
    API endpoint for calendar view
    """
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        """Get calendar data for a specific week"""
        week = request.query_params.get('week')
        
        if not week:
            return Response(
                {"error": "week parameter is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            week = int(week)
            year = timezone.now().year
            
            # Get the start date of the week
            week_start = ShiftRotationManager.get_week_start_date(week, year)
            week_end = week_start + timedelta(days=6)
            
            # Get appointments for the week
            appointments = Appointment.objects.filter(
                start_datetime__date__range=[week_start, week_end]
            ).select_related('doctor', 'service')
            
            # Get shift schedule for the week
            shift_schedule = ShiftRotationManager.get_shift_schedule_for_week(week, year)
            
            # Group appointments by day
            calendar_data = {}
            for day in range(7):
                current_date = week_start + timedelta(days=day)
                day_name = current_date.strftime('%A')
                
                day_appointments = appointments.filter(
                    start_datetime__date=current_date
                )
                
                calendar_data[day_name] = {
                    'date': current_date.strftime('%Y-%m-%d'),
                    'day_name': day_name,
                    'shifts': shift_schedule.get(day_name, {}),
                    'appointments': CalendarAppointmentSerializer(day_appointments, many=True).data
                }
            
            return Response(calendar_data)
        except ValueError:
            return Response(
                {"error": "Invalid week parameter"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Error fetching calendar data: {str(e)}"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
