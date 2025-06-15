from django.apps import AppConfig


class ClinicConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend.clinic'

    def ready(self):
        from .models import create_default_superuser
        from django.db.models.signals import post_migrate
        post_migrate.connect(create_default_superuser, sender=self)
