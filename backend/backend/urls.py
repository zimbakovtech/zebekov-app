from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from core.views import PublicApiRoot
from doctors.urls import router as doctors_router
from services.urls import router as services_router
from appointments.urls import router as appointments_router

router = DefaultRouter()
router.registry.extend(doctors_router.registry)
router.registry.extend(services_router.registry)
router.registry.extend(appointments_router.registry)

urlpatterns = [
    # path('',   PublicApiRoot.as_view(), name='api-root'),
    path('admin/', admin.site.urls),
    path('api/',   include(router.urls)),
    path('api/auth/', include('users.urls')),
]