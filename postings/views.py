from django.shortcuts import render
from  rest_framework import viewsets
from .models import Postings
from .serializers import  PostSerializer
# Create your views here.


class PostView(viewsets.ModelViewSet):
    queryset = Postings.objects.all()
    serializer_class = PostSerializer
