from django.db import models


# Create your models here.
class MetaLog(models.Model):
    query = models.CharField(max_length=50)


class Artist(models.Model):
    artist_log = models.ForeignKey(MetaLog, on_delete=models.CASCADE)
