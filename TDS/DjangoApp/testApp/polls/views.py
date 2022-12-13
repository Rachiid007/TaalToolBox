from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json

# Create your views here.
# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")

# def data(request, data):
#     if(request.method == "POST"):
#         body = {"data": data, "method": request.method, "body": request.body}
#         return HttpResponse(json.dumps(body))

@api_view(['GET', 'POST'])
def posts(request):
    print(request.POST)
    response = {
        "formData": request.POST
    }

    # "request.body": request.body
    print(response)
    return Response(json.dumps(request.POST))


