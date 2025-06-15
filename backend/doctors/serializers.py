from rest_framework import serializers
from .models import Doctor, Shift

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ['id','week_number','shift_type']

class DoctorSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    shifts = ShiftSerializer(many=True, read_only=True)

    class Meta:
        model = Doctor
        fields = ['id','user','photo','phone','shifts']