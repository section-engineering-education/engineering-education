---
layout: engineering-education
status: publish
published: true
url: /runtime-updation-using-f-function-in-django/
title: Runtime Updation of Multiple Fields using F Function in Django
description: In this article, we will look at what F function is and how we can use it to update multiple fields on runtime. We will also build a simple project to demonstrate it.
author: ayemobola-tolulope
date: 2021-12-30T00:00:00-02:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/runtime-updation-using-f-function-in-django/hero.jpg
    alt: Runtime Updation of Multiple Fields using F Function in Django Example Image
---
In this tutorial, we will learn how we can continuously update multiple fields using the `F` function in Django.
<!--more-->
Let us imagine a scenario - a patriot in Nigeria normally has an electricity meter installed in his house. Every second he uses the power, the usage data is sent from the electricity meter to the power office.

Consequently, two values detailing his amount of total power consumed and amount of power remaining are sent to this user via the smart phone.

In this tutorial, we will mimic an electricity meter that reads a user's power usage on one end, and stream the electricity meter generated data (consumption rate, power remaining, and total power used) on the other end.

This runtime streaming of data can be done easily and efficiently using the Django `F()` function.

### Table of contents
- [Table of contents](#table-of-contents)
- [Pre-requisites](#pre-requisites)
- [How is F() efficient?](#how-is-f-efficient)
- [Implementation](#implementation)
  - [Model](#model)
  - [Serializer](#serializer)
  - [View](#view)
  - [URL](#url)
- [How the F() works?](#how-the-f-works)
- [Points to note](#points-to-note)
- [Conclusion](#conclusion)

### Pre-requisites
To make the most of this tutorial, it is required to have the following:
- Basic understanding of Python.
- Familiarity with the Django framework and Django REST framework.
- Familiarity with the Django browseable API interface.
- PyCharm professional code editor installed.

### How is F() efficient?
The traditional approach would have been to constantly fetch and iterate over the stream of data – readings, get the sum of power used and subtract it from the threshold, to get the values of power used and power remaining. This is a less efficient approach.

With the F(), a single reading object (meant for the user) can be updated on the fly without reference to the previous data, can be saved to the database and be ready for the user to view it. You can do this for multiple fields at a go.

### Implementation
In this demonstration of how F function works, we will simulate a meter reading process as described earlier in this text.

#### Model
We will require three models: `RegisterMeter`, `MeterReading` and `CurrentUsage`. The snippets below show the code for creating these models:

```python
from django.db import models

class RegisterMeter(models.Model):
    meter_id = models.CharField(max_length=10)
    date_added = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.pk)

class MeterReading(models.Model):
    meter = models.CharField(max_length=10)
    meter_reading = models.IntegerField()
    date_sent = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.meter

class CurrentUsage(models.Model):
    meter = models.CharField(max_length=10)
    total_power_used = models.CharField(max_length=10)
    power_remaining = models.CharField(max_length=10)

    def __str__(self):
        return self.meter
```

#### Serializer
We will also need to have serializers for the models shown in the code snippet above.

The serializers converts objects to JSON format. Serializers for each of the models is shown below:

```python
from rest_framework import serializers
from .models import MeterReading, CurrentUsage, RegisterMeter

class MeterReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeterReading
        fields = '__all__'

class CurrentUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentUsage
        fields = '__all__'

class RegisterMeterSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterMeter
        fields = '__all__'
```

The `RegisterMeter` in the `models.py` file is used to on-board an electricity meter.

`MeterReading` represents a single data body generated from the electricity meter and sent to the power office.

The `CurrentUsage` is the reading of power used and power remaining.

The idea is that, while onboarding a new electricity meter, a default `CurrentUsage` is created, where the `total_power_used` and `power_remaining` are set to `0` by default.

On every creation of the `MeterReading` object, the `CurrentUsage` object is updated.

#### View
Inside the `views.py` file, we create a view to onboard an electricity meter as shown:

```python
class RegisterMeterCreateView(generics.CreateAPIView):
    queryset = RegisterMeter.objects.all()
    serializer_class = RegisterMeterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

        meter = request.data.get('meter_id')

        payload = {
            "meter": meter,
            "total_power_used": "0",
            "power_remaining": "0",
        }

        CurrentUsage.objects.create(**payload)

        if serializer.is_valid():
            serializer.save()

        return Response({"message": "Meter has been on-boarded and a default current reading created"},
                        status=status.HTTP_200_OK)
```

#### URL
Inside the `urls.py` file, we display the endpoint to access the meter created as shown below:

```python
from django.urls import path

from meter.views import RegisterMeterCreateView, check_meter_usage, CreateMeterReading, \
    AllMetersListView

urlpatterns = [
    path('add-meter', RegisterMeterCreateView.as_view()),
    path('all-meters', AllMetersListView.as_view()),
]
```

To view all meters that have been registered, use the code snippet below:

```python
class AllMetersListView(generics.ListAPIView):
    queryset = RegisterMeter.objects.all()
    serializer_class = RegisterMeterSerializer
```

As a result, we also need to create a view to check for a `CurrentUsage` object using the `meter_id` as shown below:

```python
@api_view(['GET'])
def check_meter_usage(self, meter_id):
    meter_reading = CurrentUsageSerializer(CurrentUsage.objects.get(meter=meter_id))
    return Response(meter_reading.data)
```

Similarly, we need an URL with the endpoint to fetch response from the view above:

```python
from django.urls import path

from meter.views import RegisterMeterCreateView, check_meter_usage, CreateMeterReading, \
    AllMetersListView

urlpatterns = [
    path('add-meter', RegisterMeterCreateView.as_view()),
    path('all-meters', AllMetersListView.as_view()),
    path('meter-usage/<str:meter_id>', check_meter_usage), #  New
```

To create a single meter reading object, we create a new view as shown below:

```python
class CreateMeterReading(generics.CreateAPIView):   # New
    queryset = MeterReading.objects.all()
    serializer_class = MeterReadingSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

        meter = request.data.get('meter')
        meter_reading = int(request.data.get('meter_reading'))

        meter_usage_object = CurrentUsage.objects.get(meter=meter)
        CurrentUsage.objects.filter(meter=meter_usage_object.meter).update(
            total_power_used=F("total_power_used") + meter_reading,
            power_remaining=25 - (F("total_power_used") + meter_reading)
        )

        meter_usage_object.refresh_from_db()

        if serializer.is_valid():
            serializer.save()
        return Response({"message": "Reading created, current usage updated"}, status=status.HTTP_200_OK)
```

The URL for the view above is:

```python
from django.urls import path

from meter.views import RegisterMeterCreateView, check_meter_usage, CreateMeterReading, \
    AllMetersListView

urlpatterns = [
    path('add-meter', RegisterMeterCreateView.as_view()),
    path('all-meters', AllMetersListView.as_view()),
    path('meter-usage/<str:meter_id>', check_meter_usage),
    path('create-reading', CreateMeterReading.as_view()),  # new
]
```

### How the F() works?
Now that we have our models, serializers, views, and URLs ready, let us begin the actual demonstration of the mini-project.

We create a new meter using the endpoint `localhost:8000/add-meter` and fill in the page accordingly:

![wecreatemeter](/engineering-education/runtime-updation-using-f-function-in-django/wecreatemeter.jpg)
_Creating a new meter_

![wecreatedmeter](/engineering-education/runtime-updation-using-f-function-in-django/wecreatedmeter.jpg)
_A new meter object created_

To check that the meter was successfully registered, visit `localhost:8000/all-meters` to view them:

![allmeterlist](/engineering-education/runtime-updation-using-f-function-in-django/allmeterslist.jpg)
_View all meters_

To view details of a particular meter, visit `localhost:8000/meter-usage/PM01` as shown:

![defmeterusage](/engineering-education/runtime-updation-using-f-function-in-django/defmeterusage.jpg)
_View details about a particular meter_

Let us create a new `MeterReading` object with value `1` for our meter `PM01` (this reading is sent to the power office) and update the meter's `CurrentUsage` in the process as shown:

![create-reading-act](/engineering-education/runtime-updation-using-f-function-in-django/create-reading-act.jpg)
_Add a new meter reading_

![create-reading-act1](/engineering-education/runtime-updation-using-f-function-in-django/create-reading-act1.jpg)
_Adding a new meter reading to PM01_

![create-reading-act2](/engineering-education/runtime-updation-using-f-function-in-django/create-reading-act2.jpg)
_Meter reading created for PM01_

From above, we see that a reading of `1` unit is sent from the meter and consequently, the current usage updated to reflect an expense from the `MeterReading`.

Check the current usage by visiting the endpoint `localhost:8000/meter-usage/PM01` to confirm if the POST operation was successful.

> We are assuming a usage threshold of 25 units. So, when the meter read that the user has spent 1 unit, he has 24 left.

![create-reading-act3](/engineering-education/runtime-updation-using-f-function-in-django/create-reading-act3.jpg)
_MeterReading object for PM01 updated with new reading_

Let's try with a higher meter reading, say `3`:

![create-reading-act4](/engineering-education/runtime-updation-using-f-function-in-django/create-reading-act4.jpg)
_Add new meter reading with value '3'_

We see that the `CurrentUsage` is updated again with `total_power_used` as `4` and `power_remaining` as `21`.

![create-reading-act5](/engineering-education/runtime-updation-using-f-function-in-django/create-reading-act5.jpg)
_MeterReading object updated for meter PM01_

After following this tutorial, you may have another insight where one can manipulate the fields of a Django model without having to make too many calls and passing objects about.

The F() does a lot of this heavy-lifting and you can manipulate as many fields as you might want to.

### Points to note
- By using F(), one can keep track of all the changes made. For instance, when `MeterReading` is saved, the power usage history of any user can be fetched, for transparency or audit sakes.
- Validation and conditions can be set before updating any value. For instance, while updating the `CurrentUsage` for every creation of a reading, validations and conditions can be set before.
- The current usage can be reset by sending in a negative number for the `power_used` field, say `-1`.

### Conclusion
In this article, we have learned how to use the F function and why using it is better than the traditional approach

In programming, efficiency matters. It is best that we always seek out ways to improve the efficiency of our programs. In Python, using F function makes our program more efficient.

You can find the full code on [Github](https://github.com/teevyne/f-function).

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
