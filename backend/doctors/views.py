from rest_framework import viewsets
from .models import Doctor, Shift
from .serializers import DoctorSerializer, ShiftSerializer

class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Doctor.objects.select_related('user').prefetch_related('shifts')
    serializer_class = DoctorSerializer

class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer