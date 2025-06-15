from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Doctor, Shift, Appointment, ScheduleSlot, Service
from .serializers import DoctorSerializer, ShiftSerializer, AppointmentSerializer, ScheduleSlotSerializer, ServiceSerializer
from .utils.time_slots import generate_available_slots
from datetime import datetime, timedelta
from calendar import monthcalendar
from .permissions import IsAdminOrDoctor

# Create your views here.

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAdminOrDoctor]

class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [IsAdminOrDoctor]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Shift.objects.all()
        return Shift.objects.filter(doctor__user=user)

    @action(detail=True, methods=['patch'])
    def update_shift(self, request, pk=None):
        shift = self.get_object()
        serializer = self.get_serializer(shift, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAdminOrDoctor]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Appointment.objects.all()
        return Appointment.objects.filter(doctor__user=user)

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get'])
    def available_slots(self, request):
        doctor_id = request.query_params.get('doctor_id')
        date_str = request.query_params.get('date')
        if not doctor_id or not date_str:
            return Response({'error': 'doctor_id and date are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
            slots = generate_available_slots(doctor, date)
            return Response(slots)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({'error': 'Invalid date format'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def calendar(self, request):
        doctor_id = request.query_params.get('doctor_id')
        month_str = request.query_params.get('month')
        if not doctor_id or not month_str:
            return Response({'error': 'doctor_id and month are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            month = datetime.strptime(month_str, '%Y-%m').date()
            calendar_data = monthcalendar(month.year, month.month)
            appointments = Appointment.objects.filter(doctor=doctor, date__year=month.year, date__month=month.month)
            result = {}
            for week in calendar_data:
                for day in week:
                    if day != 0:
                        date = datetime(month.year, month.month, day).date()
                        day_appointments = appointments.filter(date=date)
                        result[day] = AppointmentSerializer(day_appointments, many=True).data
            return Response(result)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({'error': 'Invalid month format'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def week(self, request):
        doctor_id = request.query_params.get('doctor_id')
        week_str = request.query_params.get('week')
        if not doctor_id or not week_str:
            return Response({'error': 'doctor_id and week are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            week_start = datetime.strptime(week_str, '%Y-%m-%d').date()
            week_end = week_start + timedelta(days=6)
            appointments = Appointment.objects.filter(doctor=doctor, date__range=[week_start, week_end])
            result = {}
            for day in range(7):
                date = week_start + timedelta(days=day)
                day_appointments = appointments.filter(date=date)
                result[date.strftime('%Y-%m-%d')] = AppointmentSerializer(day_appointments, many=True).data
            return Response(result)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({'error': 'Invalid week format'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def day(self, request):
        doctor_id = request.query_params.get('doctor_id')
        date_str = request.query_params.get('date')
        if not doctor_id or not date_str:
            return Response({'error': 'doctor_id and date are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
            appointments = Appointment.objects.filter(doctor=doctor, date=date)
            return Response(AppointmentSerializer(appointments, many=True).data)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({'error': 'Invalid date format'}, status=status.HTTP_400_BAD_REQUEST)

class ScheduleSlotViewSet(viewsets.ModelViewSet):
    queryset = ScheduleSlot.objects.all()
    serializer_class = ScheduleSlotSerializer
    permission_classes = [IsAdminOrDoctor]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ScheduleSlot.objects.all()
        return ScheduleSlot.objects.filter(doctor__user=user)

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrDoctor]
