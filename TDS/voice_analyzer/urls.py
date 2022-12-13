from django.urls import path, include
from .views import VoiceAnaluserAPIView
urlpatterns = [
    path('voice_analyser', VoiceAnaluserAPIView.as_view()),
]
