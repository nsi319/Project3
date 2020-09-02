from django.db import models

class PointPosition(models.Model):
    point = models.IntegerField(default=0)
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)

    def __str__(self):
        return  str(self.point)

class MapRoute(models.Model):
    point_1 = models.IntegerField(default=0)
    point_2 = models.IntegerField(default=0)
    MODE_CHOICES = (
        ('taxi', 'taxi'),
        ('bus', 'bus'),
        ('underground', 'underground'),
        ('boat', 'boat'),
    )
    mode = models.CharField(max_length=11, choices=MODE_CHOICES,default='taxi')

    def __str__(self):
        return  self.mode
