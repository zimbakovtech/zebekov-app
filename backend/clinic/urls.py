from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from .views import DoctorViewSet, ShiftViewSet, AppointmentViewSet, ScheduleSlotViewSet, ServiceViewSet

router = DefaultRouter()
router.register(r'doctors', DoctorViewSet)
router.register(r'shifts', ShiftViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'schedule-slots', ScheduleSlotViewSet)
router.register(r'services', ServiceViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="Dental Clinic API",
        default_version='v1',
        description="API for dental clinic admin dashboard",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
] 