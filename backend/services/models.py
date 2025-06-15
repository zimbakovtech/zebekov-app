from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=100)
    duration = models.DurationField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name