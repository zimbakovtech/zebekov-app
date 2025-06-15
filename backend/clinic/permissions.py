from rest_framework import permissions

class IsAdminOrDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and (request.user.is_staff or hasattr(request.user, 'doctor'))

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and hasattr(request.user, 'doctor') 