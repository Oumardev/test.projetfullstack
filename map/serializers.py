from pyexpat import model
from attr import field
from rest_framework import serializers
from map.models import Map

class MapSerializer(serializers.ModelSerializer):

    class Meta:
        model = Map
        fields = '__all__'