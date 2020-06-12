# How does API works?

## What is an API?
API stand for **"Application Programming Interface."**
An API is essentially a set of rules that dictate how two machines talk to each other.

*For Example*
Whenever you use an app on your phone or computer or log to to Twitter or Facebook, you're interacting with several different **APIs** behind the scene. 
An API is a message that delivers your (the client) request to the provider (the server) that you're requesting it from and then delivers the response back to you

## How do APIs work?
let us consider an example of how a restaurent operates. 

**Customer (User) -> Waiter (API) -> Kitchen (Webserver)

You, the customer, are sitting at the table witha menu of choice to order from, and the kitchen is the provider who will fulfill your order. You need someone who takes your order to the kitchen and then to deliver your food back to your table.
That's where the waiter as in the API comes in the picture.

## Types of API

### **Java APIs** 
Interfaces within the classes let object to talk to each other.

### **Web APIs** 
Simple Objects Access Protocol (SOAP), Remote Procedure Call (RPC), and the most popular Representational State Transfer (REST)

## REST APIs
It is a  type of Software Design that gives access to data (aka "Backend server") by using a uniform and predefined set of operations.

**The Payload** - the date to be delivered in a format such as HTML, JSON, or XML over the methods available in HTTP.

Over 70% of all public APIs use REST, because of it's fast performance, reliability, and ability to scale up.

## Methods For REST

* **GET** - The HTTP GET method is used to read or retreive a representation of a resource
* **POST** - The POST web is most often utilized to create new resources
* **DELETE** - DELETE is preety easy to understand. It is used to delete a resource identified by a URL
* **PUT** - PUT is most often utilized for updates capabilities
* **PATCH** - PATCH is used for modify capabilities. The PATCH request only needs to contain the changes to the resource, not the complete resource

## Working Example
We will be using Open WeatherMap API to get the current weather data.

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
      
      

This shows the result in coordinates, which also includes things such as Temperature and Humidity.

**This would help us get the weathe of a location using REST API**
