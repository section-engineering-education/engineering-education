from django.shortcuts import render
from django.views import generic
from django.contrib.gis.geos import fromstr, Point
from django.contrib.gis.db.models.functions import Distance
from .models import Facility

# Create your views here.

longitude = -80.191788
latitude = 25.761681

user_location = Point(longitude, latitude, srid=4326)

class FacilityListView(generic.ListView):
    model = Facility
    context_object_name = 'facilities'
    queryset = Facility.objects.annotate(distance=Distance('location', user_location) ).order_by('distance')[0:6]
    template_name = 'facilities/index.html'
