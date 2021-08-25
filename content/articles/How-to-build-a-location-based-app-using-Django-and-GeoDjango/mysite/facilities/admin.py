from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Facility

# Register your models here.
@admin.register(Facility)
class FacilityAdmin(OSMGeoAdmin):
    list_display = ('name', 'location')
