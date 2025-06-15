from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, ShiftViewSet

router = DefaultRouter()
router.register('doctors', DoctorViewSet)
router.register('shifts', ShiftViewSet)