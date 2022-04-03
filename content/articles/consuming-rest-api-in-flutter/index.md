---
layout: engineering-education
status: publish
published: true
url: /consuming-rest-api-in-flutter/
title: Building a Weather App Using Flutter and REST API   
description: This tutorial will show you how to consume APIs in Flutter by building a weather application that makes network calls to a backend server.
author: eme-lekwa
date: 2021-12-01T00:00:00-11:06
topics: [Languages, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/consuming-rest-api-in-flutter/hero.jpeg
    alt: Weather app with APIs in Flutter image
---

This article will walk the reader through how to consume a REST API in a flutter application using the `Dio` package. We will be building a weather app that provides real-time weather information by making a network call to a weather API. 
<!--more-->
The app requests the user's location and returns weather information about the user's current location. Flutter GetX package will be used for state management; however, emphasis is on Dio and network calls.

### Key takeaways
- How to use the Dio package for network calls.
- How to build a real-time weather app.
- How to access the geolocation of a user.
- Understand how to throw an exception during network calls.

### Prerequisites
To follow along, you should have:
- Basic knowledge of Dart and Flutter.
- Flutter installed on your computer.
- [Android Studio](https://developer.android.com/studio/install) or [VS Code](https://code.visualstudio.com/download) installed.

### Creating a Flutter application in Android Studio
This project uses Android Studio as its Integrated Development Environment(IDE). You need to launch Android Studio and create a new Flutter project. Ensure that you set the type as Flutter application, and select the path where your Flutter SDK is located, then click next. Next, fill in the project details in the image below and click finish.

![creating a new Flutter project](/engineering-education/consuming-rest-api-in-flutter/create_project.png)

### Integrating the Dio package
To add the Dio package as a dependency into the application, go to the [Dio Documentation](https://pub.dev/packages/dio), copy `dio: ^4.0.0`, and add it to the project's `pubspec.yaml` file. Then, run the command `pub get` to sync the dependency in the project.

![adding dio to the project](/engineering-education/consuming-rest-api-in-flutter/dio.png) 

Also add [Getx](https://pub.dev/packages/get) and [Get Storage](https://pub.dev/packages/get_storage) for state management and local storage respectively. If you don't know how to use the GetX package for state management in flutter read my article on [Getx](/engineering-education/flutter-getx-ecosystem-for-state-management/). In addition, add the [geolocator](https://pub.dev/packages/geolocator) dependency `geolocator: ^7.7.0` and [flutter spinkit](https://pub.dev/packages/flutter_spinkit) dependency `flutter_spinkit: ^5.1.0`.

The geolocator allows us to easily access platform-specific locations, while the flutter Spinkit gives us a collection of loading indicators. The dependencies section of your `pubspec.yaml` file should look like this.

![pubspec](/engineering-education/consuming-rest-api-in-flutter/pubspec.png)

### Project structure
The project is being structured in this order:
- Model (Object Representation of the data)
- Controller (Logic)
- Service (classes that allow us to make network calls)
- Views (the UI)
- Utilities (components we want to reuse)

### Models
In the model folder, we will create a class representing the object we will receive from the server. First, create a dart file called `weather_model.dart` as shown below.

#### The weather model

```Dart

// To parse this JSON data, do
//
//     final weather = weatherFromJson(jsonString);

import 'dart:convert';

Weather weatherFromJson(String str) => Weather.fromJson(json.decode(str));

String weatherToJson(Weather data) => json.encode(data.toJson());

class Weather {
  Weather({
    required this.coord,
    required this.weather,
    required this.base,
    required this.main,
    required this.visibility,
    required this.wind,
    required this.clouds,
    required this.dt,
    required this.sys,
    required this.timezone,
    required this.id,
    required this.name,
    required this.cod,
  });

  Coord coord;
  List<WeatherElement> weather;
  String base;
  Main main;
  int visibility;
  Wind wind;
  Clouds clouds;
  int dt;
  Sys sys;
  int timezone;
  int id;
  String name;
  int cod;

  factory Weather.fromJson(Map<String, dynamic> json) => Weather(
        coord: Coord.fromJson(json["coord"]),
        weather: List<WeatherElement>.from(
            json["weather"].map((x) => WeatherElement.fromJson(x))),
        base: json["base"],
        main: Main.fromJson(json["main"]),
        visibility: json["visibility"],
        wind: Wind.fromJson(json["wind"]),
        clouds: Clouds.fromJson(json["clouds"]),
        dt: json["dt"],
        sys: Sys.fromJson(json["sys"]),
        timezone: json["timezone"],
        id: json["id"],
        name: json["name"],
        cod: json["cod"],
      );

  Map<String, dynamic> toJson() => {
        "coord": coord.toJson(),
        "weather": List<dynamic>.from(weather.map((x) => x.toJson())),
        "base": base,
        "main": main.toJson(),
        "visibility": visibility,
        "wind": wind.toJson(),
        "clouds": clouds.toJson(),
        "dt": dt,
        "sys": sys.toJson(),
        "timezone": timezone,
        "id": id,
        "name": name,
        "cod": cod,
      };
}

class Clouds {
  Clouds({
    required this.all,
  });

  int all;

  factory Clouds.fromJson(Map<String, dynamic> json) => Clouds(
        all: json["all"],
      );

  Map<String, dynamic> toJson() => {
        "all": all,
      };
}

class Coord {
  Coord({
    required this.lon,
    required this.lat,
  });

  double lon;
  double lat;

  factory Coord.fromJson(Map<String, dynamic> json) => Coord(
        lon: json["lon"].toDouble(),
        lat: json["lat"].toDouble(),
      );

  Map<String, dynamic> toJson() => {
        "lon": lon,
        "lat": lat,
      };
}

class Main {
  Main({
    required this.temp,
    required this.feelsLike,
    required this.tempMin,
    required this.tempMax,
    required this.pressure,
    required this.humidity,
  });

  double temp;
  double feelsLike;
  double tempMin;
  double tempMax;
  int pressure;
  int humidity;

  factory Main.fromJson(Map<String, dynamic> json) => Main(
        temp: json["temp"].toDouble(),
        feelsLike: json["feels_like"].toDouble(),
        tempMin: json["temp_min"].toDouble(),
        tempMax: json["temp_max"].toDouble(),
        pressure: json["pressure"],
        humidity: json["humidity"],
      );

  Map<String, dynamic> toJson() => {
        "temp": temp,
        "feels_like": feelsLike,
        "temp_min": tempMin,
        "temp_max": tempMax,
        "pressure": pressure,
        "humidity": humidity,
      };
}

class Sys {
  Sys({
    required this.type,
    required this.id,
    required this.country,
    required this.sunrise,
    required this.sunset,
  });

  int type;
  int id;
  String country;
  int sunrise;
  int sunset;

  factory Sys.fromJson(Map<String, dynamic> json) => Sys(
        type: json["type"],
        id: json["id"],
        country: json["country"],
        sunrise: json["sunrise"],
        sunset: json["sunset"],
      );

  Map<String, dynamic> toJson() => {
        "type": type,
        "id": id,
        "country": country,
        "sunrise": sunrise,
        "sunset": sunset,
      };
}

class WeatherElement {
  WeatherElement({
    required this.id,
    required this.main,
    required this.description,
    required this.icon,
  });

  int id;
  String main;
  String description;
  String icon;

  factory WeatherElement.fromJson(Map<String, dynamic> json) => WeatherElement(
        id: json["id"],
        main: json["main"],
        description: json["description"],
        icon: json["icon"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "main": main,
        "description": description,
        "icon": icon,
      };
}

class Wind {
  Wind({
    required this.speed,
    required this.deg,
  });

  double speed;
  int deg;

  factory Wind.fromJson(Map<String, dynamic> json) => Wind(
        speed: json["speed"].toDouble(),
        deg: json["deg"],
      );

  Map<String, dynamic> toJson() => {
        "speed": speed,
        "deg": deg,
      };
}


```

The class contains instance variables, the constructor for initializing the fields on object creation, and methods that will convert the JSON that we receive from the API into Dart Classes.


### Service
This folder will contain classes that enable the application to make network calls over the HTTP to access resources from a backend server.


#### The BaseService class
Create a dart file named `logger.dart` and create a class called `LogginInterceptor` that will extend the `Interceptor` class from the `Dio` package.

```Dart

import 'package:dio/dio.dart';

class LoggingInterceptor extends Interceptor {
  int _maxCharactersPerLine = 200;

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    String responseAsString = response.data.toString();
    if (responseAsString.length > _maxCharactersPerLine) {
      int iterations =
          (responseAsString.length / _maxCharactersPerLine).floor();
      for (int i = 0; i <= iterations; i++) {
        int endingIndex = i * _maxCharactersPerLine + _maxCharactersPerLine;
        if (endingIndex > responseAsString.length) {
          endingIndex = responseAsString.length;
        }
        print(
            responseAsString.substring(i * _maxCharactersPerLine, endingIndex));
      }
    } else {
      print(response.data);
    }
    print("<-- END HTTP");

    super.onResponse(response, handler);
  }

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    print("HEADER--> ${options.method} ${options.headers}");
    print("PATH --> ${options.method} ${options.path}");
    print("DATA --> ${options.data} ${options.data}");
    print(
        "qweryPara --> ${options.queryParameters} ${options.queryParameters}");
    print("Content type: ${options.contentType}");
    print("<-- END HTTP");
    super.onRequest(options, handler);
  }

  @override
  void onError(DioError err, ErrorInterceptorHandler handler) {
    print("<-- Error -->");
    print(err.error);
    print(err.message);
    super.onError(err, handler);
  }
}

```

By extending the `Interceptor` class, we access its methods and override them as already seen. The `onRequest` method in the `Interceptor` class, which we have overridden, will be executed before any request is initiated. On the other hand, the `onResponse` method will be executed on the success of our network call. By overriding the `onError` method, we have access to the error message that may occur in the process of the network call. It is executed when there is an error.

Let us configure the `Dio` package so we can connect to the server. Create `base_service.dart` class.

```Dart
import 'package:dio/dio.dart';

import 'local_storage.dart';
import 'logger.dart';

class BaseService {
  
  final Dio _dio = Dio(BaseOptions(
      baseUrl: "https://samples.openweathermap.org",
      validateStatus: (status) {
        return status! < 500;
      },
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Connection": "keep-alive",
      },
      connectTimeout: 60 * 1000,
      receiveTimeout: 60 * 1000))
    ..interceptors.add(LoggingInterceptor());

  Future<Response> request(String url, {dynamic body, String? method}) async {
    var token = LocalStorage.getToken();

    var res = _dio.request(url,
        data: body,
        options: Options(
            method: method,
            headers:
                token != null ? {'authorization': 'Bearer $token'} : null));
    return res;
  }
}

handleError(DioError error) {
  print(error.response.toString());
  if (error.message.contains('SocketException')) {
    return 'Cannot connect. Check that you have internet connection';
  }

  if (error.type == DioErrorType.connectTimeout) {
    return 'Connection timed out. Please retry.';
  }

  if (error.response == null || error.response!.data is String) {
    return 'Something went wrong. Please try again later';
  }
  return 'Something went wrong. Please try again later;
}
```

First, we created an instance of `Dio` named  `_dio`. The underscore makes it private. We have passed in the headers, where we have defined the content type we want to receive. In this case, a [JSON](https://en.wikipedia.org/wiki/JSON). Set the connection Time out, receive Time out and an `Interceptor` (which is the `LoggingInterceptor` class we created above)

Next, we create a method called `request`, which uses the instance of the Dio(`_dio`) to call the `Dio` request method that allows us to make HTTP calls with options. It takes a URL which is the URL path (endpoint), data which is the request data, and options that contain the HTTP method and the headers.

And lastly, we created a method to handle errors. It takes a `DioError` and returns an appropriate message when there is a `SocketException`, `connection Timeout`, and nothing was returned.


#### The LocalStorage
This class will enable us to save a token to the Local Storage, get a token, etc. We are using `GetStorage` for this.

```Dart
import 'package:get_storage/get_storage.dart';

class LocalStorage {
  /// use this to [saveToken] to local storage
  static saveToken(String tokenValue) {
    return GetStorage().write("token", tokenValue);
  }

  /// use this to [getToken] from local storage
  static getToken() {
    return GetStorage().read("token");
  }

  /// use this to [deleteToken] from local storage
  deleteToken() {
    return GetStorage().remove("token");
  }

  /// use this to [saveUsername] to local storage
  static saveUsername(String userName) {
    return GetStorage().write('name', userName);
  }

  /// use this to [getUsername] from local storage
  static getUsername() {
    return GetStorage().read('name');
  }
}


```

#### The weather service
Create a dart file, call it `weather_service.dart` and write the following code.

```Dart

import 'package:dio/dio.dart';
import 'package:geolocator/geolocator.dart';

import 'base_service.dart';

class WeatherService {
  BaseService service = BaseService();
  static const String apiKey = "b30de56fcbd933743d24fc9004670526";

  Future<Response> getWeather() async {
    try {
      Position position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.low);
      double longitude = position.longitude;
      double latitude = position.latitude;
      Response response = await service.request(
          "https://api.openweathermap.org/data/2.5/weather?lat=$latitude&lon=$longitude&appid=$apiKey&units=metric",
          method: "Get");
      print("_++++++++++++++++++${response.statusCode}");
      return response;
    } on DioError catch (e) {
      throw handleError(e);
    }
  }
}

```
First, we created an instance of the `BaseService` class above to access the `request` method. Next, we created a variable `apiKey` that holds our project's API key in the next step. To get an API key, go to [Open Weather](https://openweathermap.org/api) and create an account, then generate an API key for yourself.

Next, we have created a `getWeather` method, which returns a [Future](https://api.flutter.dev/flutter/dart-async/Future-class.html) of Response. A Future in Flutter represents a potential value or error that will be available at some time in the future. Because we do not know when our method will return the weather information from the API, the return type is a future. Since we are returning a Future, we need to add the `async` keyword to the method and `await` the tasks we think will take time to complete. Thus, the [async -await](https://dart.dev/codelabs/async-await) makes our method asynchronous.

We use the `GeoLocator` package to the user's current location, then access the longitude and latitude, which we have added as request parameters to the endpoint. To get the location, we grant permission to the app to access the device's location. For Andriod got into the `AndroidManifest.xml` file and added these two lines inside the `manifest tag` The `AndroidManifest.xml` file can be found on this directory `android -> app-> src -> main.`

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

```

The request method was called and passed in the endpoint, returning the Response. Note that we have wrapped what may go wrong in a [try and catch](https://www.tutorialkart.com/dart/dart-try-catch/). We called the `handleError` method we created in the `BaseService` class and threw the error. If an error occurs, we catch it.


### Working on the controller
Under the controller folder, create a `weather_controller.dart` file as shown below.

```Dart

import 'package:get/get.dart';
import 'package:weather_app/model/weather_model.dart';
import 'package:weather_app/service/weather_service.dart';
import 'package:weather_app/utilities/snack_bar.dart';

class WeatherController extends GetxController {
  final weatherService = Get.put(WeatherService());

  Future<Weather> getWeatherData() async {
    var res;
    try {
      res = await weatherService.getWeather();
      if (res.statusCode != 200 || res.statusCode != 201) {
      
        return WeatherSnackBars.errorSnackBar(message: res.data['message']);
      } else {}
    } catch (e) {
      WeatherSnackBars.errorSnackBar(message: e.toString());
    }
    return Weather.fromJson(res.data);
  }
}



```

We created a `WeatherController` class that extends the `GetxController` class in the above snippet. Learn how to use GetX for state management [here](/engineering-education/flutter-getx-ecosystem-for-state-management/). We then defined a `getWeatherData` method which returns a `Future` of `Weather`. The `Weather` is the class we created in the model, representing our data.

We injected the `WeatherService` class we created in the service folder using GetX and used the instance created to call the `getWeather` method and save the Response in a variable `res` and return the Response.


### Building the project utilities

This folder houses our helper classes. Create a `constants.dart` file as shown below:

```Dart
import 'package:flutter/material.dart';

const kTempTextStyle =
    TextStyle(fontFamily: 'Spartan MB', fontSize: 100.0, color: Colors.white);

const kMessageTextStyle =
    TextStyle(fontFamily: 'Spartan MB', fontSize: 50.0, color: Colors.white);

const kButtonTextStyle = TextStyle(
  fontSize: 30.0,
  fontFamily: 'Spartan MB',
);

const kConditionTextStyle = TextStyle(
  fontSize: 100.0,
);


```

This file contains the text style and sizes we want to use in the application.

#### Coding the WeatherSnackbar class

```Dart

import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:get/get_navigation/src/snackbar/snack.dart';

class WeatherSnackBars {
  static errorSnackBar({required String message}) {
    Get.rawSnackbar(
      snackStyle: SnackStyle.FLOATING,
      message: message,
      messageText: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        mainAxisSize: MainAxisSize.max,
        children: [
          SizedBox(
            width: Get.width / 1.6,
            child: Text(
              message,
              style: const TextStyle(color: Colors.white),
            ),
          ),
          const Icon(
            Icons.clear,
            color: Colors.white,
          )
        ],
      ),
      margin: const EdgeInsets.all(24),
      snackPosition: SnackPosition.TOP,
      borderRadius: 8,
      icon: const Icon(
        Icons.cancel,
        color: Colors.white,
      ),
      isDismissible: false,
      backgroundColor: Colors.red,
    );
  }

  static successSnackBar({required String message}) {
    return Get.rawSnackbar(
      snackStyle: SnackStyle.FLOATING,
      message: message,
      messageText: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            message,
            style: const TextStyle(color: Colors.white),
          ),
          const Icon(
            Icons.clear,
            color: Colors.white,
          )
        ],
      ),
      margin: const EdgeInsets.all(24),
      snackPosition: SnackPosition.TOP,
      borderRadius: 8,
      icon: const Icon(
        Icons.check_circle_rounded,
        color: Colors.white,
      ),
      isDismissible: false,
      backgroundColor: Colors.green,
    );
  }
}
```

We have created two snack bars using `GetX` for a successful response and an error.

#### Working on the WeatherStatus Class
Next, create a `WeatherStatus` class that will return the appropriate message and Icon based on the weather data returned.

```Dart

class WeatherStatus {
  String getWeatherIcon(int condition) {
    if (condition < 300) {
      return '🌩';
    } else if (condition < 400) {
      return '🌧';
    } else if (condition < 600) {
      return '☔️';
    } else if (condition < 700) {
      return '☃️';
    } else if (condition < 800) {
      return '🌫';
    } else if (condition == 800) {
      return '☀️';
    } else if (condition <= 804) {
      return '☁️';
    } else {
      return '🤷‍';
    }
  }

  String getMessage(int temp) {
    if (temp > 25) {
      return 'It\'s 🍦 time';
    } else if (temp > 20) {
      return 'Time for shorts and 👕';
    } else if (temp < 10) {
      return 'You\'ll need 🧣 and 🧤';
    } else {
      return 'Bring a 🧥 just in case';
    }
  }
}

```

### Coding the View

```Dart
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';
import 'package:weather_app/controller/weather_controller.dart';
import 'package:weather_app/model/weather_model.dart';
import 'package:weather_app/utilities/constants.dart';
import 'package:weather_app/utilities/weather_status.dart';

class LocationScreen extends StatelessWidget {
  final controller = Get.put(WeatherController());
  final weatherStatus = Get.put(WeatherStatus());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<Weather>(
          future: controller.getWeatherData(),
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return Center(
                child: Text("${snapshot.error.toString()}"),
              );
            } else if (snapshot.hasData) {
              var data = snapshot.data;
              var weatherIcon = weatherStatus.getWeatherIcon(data!.cod);

              return Container(
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: const AssetImage('images/location_background.jpg'),
                    fit: BoxFit.cover,
                    colorFilter: ColorFilter.mode(
                        Colors.white.withOpacity(0.8), BlendMode.dstATop),
                  ),
                ),
                constraints: BoxConstraints.expand(),
                child: SafeArea(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          TextButton(
                            onPressed: () {
                              controller.getWeatherData();
                            },
                            child: const Icon(
                              Icons.near_me,
                              size: 50.0,
                            ),
                          ),
                          TextButton(
                            onPressed: () {},
                            child: const Icon(
                              Icons.location_city,
                              size: 50.0,
                            ),
                          ),
                        ],
                      ),
                      Padding(
                        padding: EdgeInsets.only(left: 15.0),
                        child: Row(
                          children: <Widget>[
                            Text(
                              "${data.main.temp.toInt().toString()}°",
                              style: kTempTextStyle,
                            ),
                            Text(
                              weatherStatus.getWeatherIcon(data.cod),
                              style: kConditionTextStyle,
                            ),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(right: 15.0),
                        child: Text(
                          "${weatherStatus.getMessage(data.main.temp.toInt())} in ${data.name}!",
                          textAlign: TextAlign.right,
                          style: kMessageTextStyle,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }
            return const Center(
              child: SpinKitDoubleBounce(
                color: Colors.blue,
                size: 50.0,
              ),
            );
          }),
    );
  }
}
```

We have injected an instance of our controller and called the `getWeatherData` method inside a `FutureBuilder` of type `Weather`. If the future has data, it will return the data; otherwise, if it has an error, it renders the error. However, if the above is not the case, we show the `SpinKitDoubleBounce` showing that our data is loading.

### Conclusion
In this tutorial, you have learned how to make network calls over the HTTP and consume a rest API using the Dio package. We have demonstrated this by building a weather app that fetches weather data from Weather API.

The source code can be found in this [repository](https://github.com/Lekwacious/WeatherApp).

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
