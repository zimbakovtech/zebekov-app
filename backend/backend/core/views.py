from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class PublicApiRoot(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            'doctors':      request.build_absolute_uri('/api/doctors/'),
            'services':     request.build_absolute_uri('/api/services/'),
            'appointments': request.build_absolute_uri('/api/appointments/'),
        })