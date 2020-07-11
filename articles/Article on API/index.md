# How does API works?

## What is an API?
We always hear about APIs. What are they? And how does that work? 
API stands for **"Application Programming Interface."**
An API is a set of rules that dictate how two machines talk to each other.

*For Example*
Whenever you use an app on your phone or computer or log to Twitter or Facebook, you're interacting with several different **APIs** behind the scene. 
An API is a messenger that delivers your (the client) request to the provider (the server) that you're requesting it from and then get the response back to you.

## How do APIs work?
Let's consider an example of how a restaurant operates. 

**Customer (User) -> Waiter (API) -> Kitchen (Webserver)

You are a customer, sitting at the table with a menu of choice to order from, and the kitchen is the provider who will fulfill your order. You need someone who takes your order to the kitchen and then to deliver your food back to your table.
That's where the waiter as in the API comes in the picture. The waiter is an API that takes your order to the kitchen, telling them what do you want and then delivers your request back to you.

## Types of API

### **Java APIs** 
Interfaces within the classes let objects to talk to each other.

### **Web APIs** 
Simple Objects Access Protocol (SOAP), Remote Procedure Call (RPC). And the most popular Representational State Transfer (REST)

## REST APIs
It is a  type of Software Design that gives access to data (aka "Backend server") by using a uniform and predefined set of operations.

**The Payload** - the date to be delivered in a format such as HTML, JSON, or XML over the methods available in HTTP.

Over 70% of all public APIs use REST, because of it's fast performance, reliability, and ability to scale up.

## Methods For REST

* **GET** - The HTTP GET method is to read or retrieve a representation of a resource
* **POST** - The POST web is, most often utilized to create new resources
* **DELETE** - DELETE is pretty easy to understand. It is to delete a resource identified by a URL
* **PUT** - PUT is, most often utilized for updates capabilities
* **PATCH** - PATCH is for modifying capabilities. The PATCH request only needs to contain the changes to the resource. Not the complete resource

## Working Example
We will be using Open WeatherMap API to get the current weather data. Suppose you want to know the weather of a particular location, but you don't have any of your services to do that. In that case, you'll need to make some calls out to the weather service to get the information. And then you can know about the weather of a specific location. Below is an example that shows you how to get the weather information using Open WeatherMap API (It's free to use)

* ### Open WeatherMap API


      import configparser
      import requests
        import sys

      def get_api_key():
      config = configparser.ConfigParser()
      config.read('config.ini')
      return config['openweathermap']['api']

      def get_weather(api_key, location):
      url = "https://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid={}".format(location, api_key)
      r = requests.get(url)
      return r.json()

      def main():
      if len(sys.argv) != 2:
        exit("Usage: {} LOCATION".format(sys.argv[0]))
      location = sys.argv[1]

      api_key = get_api_key()
      weather = get_weather(api_key, location)

      print(weather['main']['temp'])
      print(weather)


      if __name__ == '__main__':
      main()

* ### OUTPUT


       {"coord": { "lon": 139,"lat": 35},
       "weather": [
      {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01n"
      }
      ],
      "base": "stations",
      "main": {
      "temp": 281.52,
      "feels_like": 278.99,
      "temp_min": 280.15,
      "temp_max": 283.71,
      "pressure": 1016,
      "humidity": 93
      },
      "wind": {
      "speed": 0.47,
      "deg": 107.538
      },
      "clouds": {
      "all": 2
      },
      "dt": 1560350192,
      "sys": {
      "type": 3,
      "id": 2019346,
      "message": 0.0065,
      "country": "JP",
      "sunrise": 1560281377,
      "sunset": 1560333478
      },
      "timezone": 32400,
      "id": 1851632,
      "name": "Shuzenji",
      "cod": 200
      }



The above code shows the result in coordinates. Which also includes things such as temperature and humidity. **This would help us get the weather of a location using REST API**

## Takeaways
That was a quick introduction to the API that many people don't know off. In this article, we get to discuss what they are and how does that works. APIs are integral to running a data-driven business nowadays. It's a game-changer for the modern software industry. It's used in the industry for a long time now, due to its quick implementation.
