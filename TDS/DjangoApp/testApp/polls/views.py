from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from module.speech_recognition.rec_audio import speech_recognition
import json

@api_view(['POST'])
def posts(request):
    if (request.FILES):
        # Here is a list of all attributes of the InMemoryUploadedFile type
        # file,
        # field_name,
        # name,
        # content_type,
        # size,
        # charset,

        # on va chercher le fichier .wav dans la requête et on récupère le mot à prononcer
        record = request.FILES["data"]
        word_to_guess = request.POST["word"]

        # on lit les données et on les stockent dans une variable 
        record_data = record.read() 

        # On crée le path vers le nouveau fichier à stocker 
        new_file_path = f"./records/{record.name}.wav"

        # On stocke le fichier wav en local 
        default_storage.save(new_file_path, ContentFile(record_data))

        # On check la prononciation grace au module 
        prononciation_response = speech_recognition(new_file_path, word_to_guess).getPrononciation()
        print(prononciation_response)

        # Une fois la vérification faite, on supprime le fichier wav du backend
        default_storage.delete(new_file_path)

        # On récupère les données pour les renvoyer au client 
        if(prononciation_response == -1):
            response = {'prononciation': "error", 'word': word_to_guess}
        else:
            response = {'prononciation': prononciation_response, 'word': word_to_guess}

    return Response(response)


