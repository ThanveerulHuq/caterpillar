from rest_framework import serializers
from  .models import Postings

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postings
        fields = ('id', 'name', 'description')