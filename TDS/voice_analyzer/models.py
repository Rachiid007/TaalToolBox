from django.db import models

# # Create your models here. to pass it to the serializer and view
class VoiceAnalyzer(models.Model):
    title = models.CharField(max_length=255)
    # voice = models.
