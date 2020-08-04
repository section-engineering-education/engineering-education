---
layout: engineering-education
status: publish
published: true
slug: how-does-api-work
title: What is an API and how do APIs work?
description: 
author: Parampreet Singh
date: 2020-07-14T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-does-api-work/hero.jpg
    alt:
---
We always hear about APIs. What are they, and how does that work?
API stands for **"Application Programming Interface."**
An [API](https://en.wikipedia.org/wiki/Application_programming_interface) is a set of rules that dictate how two machines talk to each other.
<!--more-->
### What is an API?
*For Example*
Whenever you use an app on your phone or computer or log to Twitter or Facebook, you're interacting with several different **APIs** behind the scene.
An API is a messenger that delivers your (the client) request to the provider (the server) that you're requesting it from and then get the response back to you.

### How do APIs work?
Let's consider an example of how a restaurant operates.

**Customer (User) -> Waiter (API) -> Kitchen (Webserver)

You are a customer, sitting at the table with a menu of choice to order from, and the kitchen is the provider who will fulfill your order. You need someone who takes your order to the kitchen and then to deliver your food back to your table.
That's where the waiter as in the API comes in the picture. The waiter is an API that takes your order to the kitchen, telling them what do you want and then delivers your request back to you.

## Types of API

### **Java APIs**
Interfaces within the classes let objects to talk to each other.

### **Web APIs**
Simple Objects Access Protocol (SOAP), Remote Procedure Call (RPC). And the most popular Representational State Transfer (REST)

In this article, we will study in-depth about the REST API.

## REST APIs
It is a  type of Software Design that gives access to data (aka "Backend server") by using a uniform and predefined set of operations.

**The Payload** - the date to be delivered in a format such as HTML, JSON, or XML over the methods available in HTTP.

Over 70% of all public APIs use REST, because of it's fast performance, reliability, and ability to scale up.

### Methods For REST

* **GET** - The HTTP GET method is to read or retrieve a representation of a resource
* **POST** - The POST web is, most often utilized to create new resources
* **DELETE** - DELETE is pretty easy to understand. It is to delete a resource identified by a URL
* **PUT** - PUT is, most often utilized for updates capabilities
* **PATCH** - PATCH is for modifying capabilities. The PATCH request only needs to contain the changes to the resource. Not the complete resource

### Working Example
To understand more about the REST API, we will be using Open WeatherMap API to get the current weather data. Suppose you want to know the weather of a particular location, but you don't have any of your services to do that. In that case, you'll need to make some calls out to the weather service to get the information. And then you can know about the weather of a specific location. Below is an example that shows you how to get the weather information using Open WeatherMap API (It's free to use).

You can choose any programming language for implementing API calls and get the data about the weather.

Some of the languages that one can use to implement the API calls are:
* NodeJS
* PHP
* Objective-C
* Java
* Ruby
* C#
* Python

#### Open WeatherMap API

Let's work on an example using Python to extract the weather report of the three cities: New York City, London, Paris. The result will consist of the city names along with country code. Let's jump to the code:
```
     import requests
import credentials
import re

cities = ["New York City,us", "London,uk" , "Paris,fr"]

def city_forecast(city):
 response = requests.get(
 "https://community-open-weather-map.p.rapidapi.com/forecast?q="+city,
 headers={
 "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
 "X-RapidAPI-Key": credentials.rapidapi_key
 },
 )

 return response.json()

for city in cities:
 weather_dict[city] = city_forecast(city)
```
The above code imports some important libraries to generate the result desired result. The function city_forecast receive the name of the city that input and returns the weather forecast.

#### OUTPUT

```
Porto,pt
Clear sky forecasts: 7
Average temperature: 16.74 C


London,uk
Clear sky forecasts: 4
Average temperature: 18.36 C


Paris,fr
Clear sky forecasts: 3
Average temperature: 19.07 C

```

The output shows the temperature for the requested cities in coordinates. **This would help us get the weather of a location using REST API**

### Takeaways
That was a quick introduction to the API that many people don't know off. In this article, we get to discuss what they are and how does that works. APIs are integral to running a data-driven business nowadays. It's a game-changer for the modern software industry. It's used in the industry for a long time now, due to its quick implementation.
