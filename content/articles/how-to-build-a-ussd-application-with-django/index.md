# How To Create A USSD Application Using Python And Django.

In this article, I will be showing you how to create a USSD application using Python and Django. I will be doing so by building a USSD application that retrieves the price of a couple of cryptocurrencies in popular fiat currencies, in addition to this, the application will also be able to tell us the current exchange rate of US dollars to a few other currencies.

## Prerequisite

- Python
- Basic knowledge of Django

## Overview

- [Creating function to get price of cryptocurrencies](#function-to-get-price-of-cryptocurrencies)
- [Creating function to get exchange rate](#function-to-get-exchange-rates)
- [Creating the USSD menus](#view-function-to-create-ussd-menus)
- [Testing the USSD application](#testing-out-the-ussd-application)

## Introduction

According to [wikipedia](https://en.wikipedia.org/wiki/Unstructured_Supplementary_Service_Data), USSD stands for Unstructured Supplementary Service Data. It is a communications protocol used by GSM cellular telephones to communicate with the mobile network operator's computers. The computer's response is sent back to the phone, generally in a basic format that can easily be seen on the phone display.

I will be using a [CoinGecko's](https://www.coingecko.com/en) official Python [SDK](https://github.com/man-c/pycoingecko) to fetch the price of the cryptocurrencies, for the exchange rate functionality, I will be using [Openexchangerate's](https://openexchangerates.org/api/latest.json) API, and to build out the USSD menus, I will be using [africastalking](https://developers.africastalking.com/)


Before I start writing code, I am going to install some libraries like requests (for making HTTP requests), python-dotenv(for handling .env files), and pycoingecko (The SDK I talked about above). So I will run `pip install requests python-dotenv pycoingecko` to install these libraries.

### Function to get price of cryptocurrencies
In the app folder of my Django project, I will create a file called `crypto_function.py` (You can name yours anything). If you do not know how to set up a Django project, check out Django's [documentation](https://docs.djangoproject.com/en/4.0/intro/tutorial01/). Inside this file is where I will write the functions to handle the functionalities of the USSD application. In the file, enter the code below

```
import requests
import os
import dotenv
from pycoingecko import CoinGeckoAPI

dotenv.load_dotenv()

def get_cryptocurrency_price(ids, currencies):
    coin_gecko = CoinGeckoAPI()
    price = coin_gecko.get_price(ids=ids, vs_currencies=currencies)
    return price
```

### Explanation:

I imported the libraries I installed earlier on. `dotenv.load_dotenv()` is to get environment variables from .env file which I will create shortly. After that, I created a function that retrieves cryptocurrency prices using the pycoingecko SDK and named it `get_cryptocurrency_price`. This function takes in two arguments; the id of the cryptocurrency and the currency we want to check the current price in. The next thing I did was instantiate the `CoinGeckoAPI` class that I imported above. The class has various cryptocurrency methods I can access including `get_price` method which is used to get the current price of cryptocurrencies in various fiat currencies. `The get_price` method returns a json response of the current price of the cryptocurrency specified in the fiat currency specified. Below is a screenshot of the price of bitcoin in Nigerian Naira

![Bitcoin price](/how-to-build-a-ussd-application-with-django/bitcoin-response.jpg)

I will be using this function in the views file later.

### Function to get exchange rates

To handle the exchange rate functionality, I am going to create another function just under the `get_cryptocurrency_price` function. The code for that function is below:

```
def currency_exchange_rate(base_currency, to_currency):
    url = "https://openexchangerates.org/api/latest.json"
    app_id = os.getenv('app_id')
    response = requests.get(f"{url}/?app_id={app_id}&base={base_currency}&symbols={to_currency}")
    return response.json()['rates'][to_currency]

```

### Explanation:

The function takes in base_currency and to_currency as arguments, i.e If you want to know the exchange rate of US dollars to Nigerian naira, US dollars is the base_currency and Nigerian Naira is the to_currency. Because I am using the free version of the API, only USD is allowed to be the base_currency.
As I said, I will be using openexchangerates API for this functionality. The endpoint to get the exchange rate is assigned to the `URL` variable. The API requires an application ID (You can get yours by creating an account with openexchangerates) when making a request, since my app ID is sensitive information and I do not want anybody else to know about it, I have saved it in a .env file and retrieved it with `os.getenv('app_id)`. This .env file will be created shortly.
To make an HTTP request to openexchangerate's API, I used the requests library that I installed earlier on, since the HTTP request to get exchange rate for a currency is a GET request, I am using `requests.get()` and passing the base URL along with my app ID, base_currency and to_currency as query parameters. The response of the HTTP request to the API is a JSON response, so I extracted the value of the exchange rate with `response.json()['rates'][to_currency]`. This will also be used in the views file.

Before I proceed, I will create my .env file by simply going into my project root directory and creating a file named ".env", the file must be named ".env", else it won't work. After creating, copy your app ID on openexchangerate and paste it into the .env file. Your file should look like in the picture below:

![env screenshot](/how-to-build-a-ussd-application-with-django/env-screenshot.png)

The redacted part is the value of your app ID.

Now, I am going to write the code for the USSD feature, to do this, I will be using a platform called [africastalking](https://africastalking.com/). Go to africastalking and create an account, after creating an account click on the sandbox button on your dashboard and then click on the USSD option in the side menu bar, subsequently click on "Create Channel" in the drop-down. In the channel field in the form that will be displayed, I am going to enter any number to be my USSD code (In your case, your preferred code might not be available, africastalking will suggest some for you.), after that I am going to fill in the Callback URL field with a random URL (I will change this later, and I am going to tell you why) as it is a required field, click "Create Channel" button and we can start writing the code to make use of africastalking USSD feature.

Let me briefly explain how the USSD feature on africastalking works. When I dial my code say * 384*09#, and africastalking server receives the request, an HTTP POST request is sent to the callback URL I specified, this callback URL will respond with a response or "menu" which is options that the users can choose from, of course, I am going to show you how to build out these menus. The menus in my case are just questions I ask the user to know what they want to do on the USSD application. When africastalking makes a POST request to the callback specified, they send some parameters along with it, these parameters are: 
- sessionID (string): A unique value generated when the session starts and sent every time a mobile subscriber response has been received. This means USSD is session-based, i.e whatever you are doing ends when you exit or press "cancel".
- phoneNumber (string): The number of the mobile subscriber interacting with your USSD application.
- networkCode (string): The telecomunications company of the phoneNumber interacting with the ussd application.
- serviceCode (string): This is the USSD code assigned to your application
- text (string): This shows the user input. It is an empty string in the first notification of a session. After that, it concatenates all the user input within the session with a * until the session ends.

### View function to create USSD menus

Now I am going to start building out the menus/response. I will do so in bits so I can explain the code:

```
from django.shortcuts import HttpResponse
from .crypto_function import  currency_exchange_rate, get_cryptocurrency_price
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def crypto_ussd_callback(request):
    if request.method == 'POST':
        session_id = request.POST.get("sessionId", None)
        service_code = request.POST.get("serviceCode", None)
        phone_number = request.POST.get("phoneNumber", None)
        text = request.POST.get("text", "default")

        input = text.split('*')

        response = ""
        if text == '':
            response = "CON Welcome, kindly choose what you want to do\n"
            response += "1. To check price of cryptocurrency in your preferred currency\n"
            response += "2. To check the exchange rate of your currency with other currencies\n"
            return HttpResponse(response)
```

## Explanation:

The first three import lines are to import the things I need. The functions I created in `crypto_function.py` file, `csrf_exempt` decorator to bypass CSRF security mechanism Django provides, and HttpResponse.

Since africastalking sends a POST request to the callback URL I supplied, and the view associated with the callback URL is the one I am working on, I have to check if the request coming in is a POST request so I will be able to get the POST parameters sent along with the request. I used `request.POST.get('<parameter_name>')` to get the parameters. As explained above, the text parameter is a string of user inputs concatenated using the "*" symbol, so I split those inputs into elements in a list using `text.split("*")` so I can know which input was entered at which level. 

If the code was dialed for the first time and no input has been supplied then the text parameter will be empty, so I am checking if the text parameter is empty, if it is, a menu should be displayed to the user welcoming them and asking them to choose either 1 or 2 to indicate which action they want to perform. It is important to start the response (read menu) with the "CON" keyword if input will be collected from the user, else if you just want to display the result say the bitcoin price, start the response with the "END" keyword to end the session.

If a user enters 1 or 2, the value of the text parameter will be what the user entered, therefore, the text will become "1" if the user entered 1 or "2" if the user entered two and the input variable will become ["1"] or ["2"] depending on the user input. 

Step A: Since the value of input is a list, I can grab the element(s) inside it and run an if check to know what the user entered. So just under the first if block, I am going to enter the code below:

```
if len(input) == 1:
    if input[0] == "1":
        response = "CON Choose the cryptocurrency whose price you want to know\n"
        response += "1. bitcoin\n"
        response += "2. ethereum\n"
        response += "3. litecoin\n"
        response += "4. shiba-INU\n"
        response += "5. BNB"
        return HttpResponse(response)
    elif input[0] == "2":
        response += "CON Choose the currency whose exchange rate you want to know.\n"
        response += "1. US Dollars USD\n"
        return HttpResponse(response)
    else:
        response = "END Invalid input. Must either be 1 or 2."
        return HttpResponse(response)
```

## Explanation:

This if block is just confirming if this is the user's first input on dialing the code. If it is, input which is a list will have just one element, hence having its length to be 1. I then check what the user input (the first and only element in the list) is, if it is 1, it means they want to check the current price of cryptocurrency and I subsequently ask them to choose a number corresponding to the cryptocurrency whose current price they want to know. If the user input is 2, it means they want to know the exchange rate and I subsequently ask them to choose the number corresponding to the currency they want to use as the base currency. Notice how I started the response (read menu) with the "CON" keyword because I am asking them for input. Whatever the user picks will be appended to the text parameter, so the text parameter will become "1* 1" if they want to know the current price of bitcoin and "2*1" if they want to know the exchange rate of the dollar. As you can probably guess, input will become ["1", "1"] if it was the first case and ["2", "1"] if it was the second case.

Step B: Just like I did in Step A, I will also check the first two elements in the list so I can know what the user inputs are. So under the second if block, I will enter the code below:

```
elif len(input) == 2:
    if input[0] == "1":
        possible_input = ['1', '2', '3', '4', '5']
        if input[1] in possible_input:
            response = "CON Choose the currency in which you want to know how much your chosen cryptocurrency costs\n"
            response += "1. Nigerian Naira (NGN)\n"
            response += "2. US Dollars (USD)\n"
            response += "3. Euro (EUR)\n"
        else:
            response = "END. Invalid input. Please try again"
            return HttpResponse(response)
    elif input[0] == "2":
        possible_input = ['1', '2', '3', '4']
        
        if input[1] in possible_input:
            response = "CON Choose the currency\n" # gotta find better word for this
            response += "1. Nigerian Naira (NGN)\n"
            response += "2. US Dollars (USD)\n"
            response += "3. Euro (EUR)\n"
            return HttpResponse(response)
        else:
            response = "END. Invalid input. Please try again"
            return HttpResponse(response)
```

## Explanation
`len(input) == 2` simply means the user has gone through two levels of menus i.e, they have supplied input twice, and I have split those inputs into elements of a list.
I then checked if the first element (first user input) in the list is "1" if it is it means the user wants to check the price of a cryptocurrency, I then went further to check if the second input is any of the possible input to be entered, i.e 1 to 4, if it is, it means they have chosen a cryptocurrency whose price they want to check, I then proceed to ask them to choose the fiat currency in which they want to know how much their chosen cryptocurrency costs.
Same thing if the first element in the list is "2", it means the user wants to know the exchange rate between two currencies. I then proceed to check if the second element in the list which is the number corresponding to the base currency is valid, if it is, it means they have chosen their base currency and I can now ask them to choose a number corresponding to the currency they want to use as the "to currency".

As explained above, the user input will be appended to the text parameter. For example, if a user wants to know the price of bitcoin in US Dollars, the value of text at this level will be "1 *1 *2", and input will be ["1", "1", "2"].

Similar to what I did in steps A and B, I will also check the elements in the list to know what the user inputs are. So under `elif len(input) == 2`, on the same indentation level, enter the code below
```
elif len(input) == 3:
    if input[0] == "1":
        # BITCOIN
        if input[1] == "1":
            if input[2] == "1":
                result = get_cryptocurrency_price('bitcoin', 'ngn')
                Notice how I started the response with the "END" keyword to indicate that I want that session to end after users have been shown the price of the cryptocurrency they choose.
                return HttpResponse(response)
            elif input[2] == "2":
                result = get_cryptocurrency_price('bitcoin', 'usd')
                response = f"END Current price of Bitcoin in US Dollars is {result['bitcoin']['usd']}"
                return HttpResponse(response)
            elif input[2] == "3":
                result = get_cryptocurrency_price('bitcoin', 'eur')
                response = f"END Current price of Bitcoin in Euro is {result['bitcoin']['eur']}"
                return HttpResponse(response)
        # ETHEREUM
        elif input[1] == "2":
            if input[2] == "1":
                result = get_cryptocurrency_price('ethereum', 'ngn')
                response = f"END Current price of Ethereum in Nigerian Naira is {result['ethereum']['ngn']}"
                return HttpResponse(response)
            elif input[2] == "2":
                result = get_cryptocurrency_price('ethereum', 'usd')
                response = f"END Current price of Ethereum in US Dollars is {result['ethereum']['usd']}"
                return HttpResponse(response)
            elif input[2] == "3":
                result = get_cryptocurrency_price('ethereum', 'eur')
                response = f"END Current price of Ethereum in Euro is {result['ethereum']['eur']}"
                return HttpResponse(response)
        # LITECOIN
        elif input[1] == "3":
            if input[2] == "1":
                result = get_cryptocurrency_price('litecoin', 'ngn')
                response = f"END Current price of LiteCoin in Nigerian Naira is {result['litecoin']['ngn']}"
                return HttpResponse(response)
            elif input[2] == "2":
                result = get_cryptocurrency_price('litecoin', 'usd')
                response = f"END Current price of litecoin in US Dollars is {result['litecoin']['usd']}"
                return HttpResponse(response)
            elif input[2] == "3":
                result = get_cryptocurrency_price('litecoin', 'eur')
                response = f"END Current price of litecoin in Euro is {result['litecoin']['eur']}"
                return HttpResponse(response)
        # SHIBA-INU
        elif input[1] == "4":
            if input[2] == "1":
                result = get_cryptocurrency_price('shiba-INU', 'ngn')
                response = f"END Current price of Shiba-INU in Nigerian Naira is {result['shiba-inu']['ngn']}"
                return HttpResponse(response)
            elif input[2] == "2":
                result = get_cryptocurrency_price('shiba-INU', 'usd')
                response = f"END Current price of Shiba-INU in US Dollars is {result['shiba-inu']['usd']}"
                return HttpResponse(response)
            elif input[2] == "3":
                result = get_cryptocurrency_price('shiba-INU', 'eur')
                response = f"END Current price of Shiba-INU in Euro is {result['shiba-inu']['eur']}"
                return HttpResponse(response)
        # BNB
        elif input[1] == "5":
            if input[2] == "1":
                result = get_cryptocurrency_price('binancecoin', 'ngn')
                response = f"END Current price of BNB in Nigerian Naira is {result['binancecoin']['ngn']}"
                return HttpResponse(response)
            elif input[2] == "2":
                result = get_cryptocurrency_price('binancecoin', 'usd')
                response = f"END Current price of BNB in US Dollars is {result['binancecoin']['usd']}"
                return HttpResponse(response)
            elif input[2] == "3":
                result = get_cryptocurrency_price('binancecoin', 'eur')
                response = f"END Current price of BNB in Euro is {result['binancecoin']['eur']}"
                return HttpResponse(response)
            else:
                response = "END Invalid input. Please try again"
                return HttpResponse(response)
        else:
            response = "END Invalid input. Please try again"
            return HttpResponse(response)
    elif input[0] == "2":
        if input[1] == "1":
            if input[2] == "1":
                result = currency_exchange_rate("USD", "NGN")
                response = f"END The current exchange rate of 1 US Dollars to Nigerian Naira is {result}"
                return HttpResponse(response)
            elif input[2] == "2":
                response = f"END You are checking exchange rate of USD to USD"
                return HttpResponse(response)
            elif input[2] == "3":
                result = currency_exchange_rate("USD", "EUR")
                response = f"END The current exchange rate of 1 US Dollars to Euro is {result} "
                return HttpResponse(response)
            else:
                response = "END Invalid input"
                return HttpResponse(response)
        else:
            response = "END Invalid input"
            return HttpResponse(response)
    else:
        response = "END Invalid input. Please try again."
        return HttpResponse(response)
return HttpResponse(response)
```

## Explanation:
This code snippet might look long, but do not be intimidated it is just a bunch of nested if-else blocks.

`len(input) == 3` simply means the user has gone through three levels of menus i.e, they have supplied input three times, and I have split those inputs into elements of a list. 
I then checked the first element in the list to know whether the user wants to check the price of a cryptocurrency or if they want to know the exchange rate between two fiat currencies. If the first element is "1", then it means they want to check the price of a cryptocurrency, I also then check the second element in the list to check which of the cryptocurrency's prices do they want to know. After that, I check the third element in the list to know in which fiat currency they want the price. After performing all these checks, I then pass the appropriate cryptocurrency ID and fiat currency into `get_cryptocurrency_price` as arguments depending on the user input. If a user chose "1" in the first level menu and "1" in the second level menu and "1" in the third menu level, then it means they want to check the current price of bitcoin in Nigerian Naira. ```
response = f"END Current price of Bitcoin in Nigerian Naira is {result['bitcoin']['ngn']}"
``` will return a response containing the current price of bitcoin in Nigerian Naira to the user. Notice how I started the response with the "END" keyword to indicate that I want that session to end after users have been shown the price of the cryptocurrency they choose.

If the value of the first element is "2", it means the user wants to know the exchange rate between two currencies, I then proceed to check the second element in the list to know what the user wants the "base currency to be", it will always be US Dollars in my case since that is the only option I provided after I proceed to check the third element to know what the user wants to use as the "to currency". After doing all these checks, what I did was call the `currency_exchange_rate` function and pass in the appropriate three-letter currency symbol as the "to_currency" depending on what the user chooses. If a user chooses "1" in the third level menu after they must have entered "2" and "1" in the first and second level menus respectively then the "to_currency" value will be NGN which is Nigerian Naira and ```
response = f"END The current exchange rate of 1 US Dollars to Nigerian Naira is {result}"
return HttpResponse(response)
``` will return a response containing the exchange rate between US Dollars and Naira. The same thing was done for the other currencies. Also, notice how I started the response with the "END" keyword to indicate that I want that session to end after users have been shown the exchange rate between the two fiat currencies they have chosen.

Below is the full code snippet:

```
from django.shortcuts import HttpResponse
from .crypto_function import  currency_exchange_rate, get_cryptocurrency_price
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def crypto_ussd_callback(request):
    # if
    if request.method == 'POST':
        session_id = request.POST.get("sessionId", None)
        service_code = request.POST.get("serviceCode", None)
        phone_number = request.POST.get("phoneNumber", None)
        text = request.POST.get("text", "default")

        input = text.split('*')

        response = ""
        if text == '':
            response = "CON Welcome, kindly choose what you want to do\n"
            response += "1. To check price of cryptocurrency in your preferred currency\n"
            response += "2. To check the exchange rate of your currency with other currencies\n"
            return HttpResponse(response)
        if len(input) == 1:
            if input[0] == "1":
                response = "CON Choose the cryptocurrency whose price you want to know\n"
                response += "1. bitcoin\n"
                response += "2. ethereum\n"
                response += "3. litecoin\n"
                response += "4. shiba-INU\n" # confirm the id to be shiba-INU
                response += "5. BNB" # id = binancecoin
                return HttpResponse(response)
            elif input[0] == "2":
                response += "CON Choose the currency whose exchange rate you want to know.\n"
                response += "1. US Dollars USD\n"
                return HttpResponse(response)
            else:
                response = "END Invalid input. Must either be 1 or 2."
                return HttpResponse(response)
        elif len(input) == 2:
            if input[0] == "1":
                possible_input = ['1', '2', '3', '4', '5']
                if input[1] in possible_input:
                    response = "CON Choose the currency in which you want to know how much your chosen cryptocurrency costs\n"
                    response += "1. Nigerian Naira (NGN)\n"
                    response += "2. US Dollars (USD)\n"
                    response += "3. Euro (EUR)\n"
                else:
                    response = "END. Invalid input. Please try again"
                    return HttpResponse(response)
            elif input[0] == "2":
                possible_input = ['1', '2', '3', '4']
                
                if input[1] in possible_input:
                    response = "CON Choose the currency\n" # gotta find better word for this
                    response += "1. Nigerian Naira (NGN)\n"
                    response += "2. US Dollars (USD)\n"
                    response += "3. Euro (EUR)\n"
                    return HttpResponse(response)
                else:
                    response = "END. Invalid input. Please try again"
                    return HttpResponse(response)
        elif len(input) == 3:
            if input[0] == "1":
                # BITCOIN
                if input[1] == "1":
                    if input[2] == "1":
                        result = get_cryptocurrency_price('bitcoin', 'ngn')
                        response = f"END Current price of Bitcoin in Nigerian Naira is {result['bitcoin']['ngn']}"
                        return HttpResponse(response)
                    elif input[2] == "2":
                        result = get_cryptocurrency_price('bitcoin', 'usd')
                        response = f"END Current price of Bitcoin in US Dollars is {result['bitcoin']['usd']}"
                        return HttpResponse(response)
                    elif input[2] == "3":
                        result = get_cryptocurrency_price('bitcoin', 'eur')
                        response = f"END Current price of Bitcoin in Euro is {result['bitcoin']['eur']}"
                        return HttpResponse(response)
                # ETHEREUM
                elif input[1] == "2":
                    if input[2] == "1":
                        result = get_cryptocurrency_price('ethereum', 'ngn')
                        response = f"END Current price of Ethereum in Nigerian Naira is {result['ethereum']['ngn']}"
                        return HttpResponse(response)
                    elif input[2] == "2":
                        result = get_cryptocurrency_price('ethereum', 'usd')
                        response = f"END Current price of Ethereum in US Dollars is {result['ethereum']['usd']}"
                        return HttpResponse(response)
                    elif input[2] == "3":
                        result = get_cryptocurrency_price('ethereum', 'eur')
                        response = f"END Current price of Ethereum in Euro is {result['ethereum']['eur']}"
                        return HttpResponse(response)
                # LITECOIN
                elif input[1] == "3":
                    if input[2] == "1":
                        result = get_cryptocurrency_price('litecoin', 'ngn')
                        response = f"END Current price of LiteCoin in Nigerian Naira is {result['litecoin']['ngn']}"
                        return HttpResponse(response)
                    elif input[2] == "2":
                        result = get_cryptocurrency_price('litecoin', 'usd')
                        response = f"END Current price of litecoin in US Dollars is {result['litecoin']['usd']}"
                        return HttpResponse(response)
                    elif input[2] == "3":
                        result = get_cryptocurrency_price('litecoin', 'eur')
                        response = f"END Current price of litecoin in Euro is {result['litecoin']['eur']}"
                        return HttpResponse(response)
                # SHIBA-INU
                elif input[1] == "4":
                    if input[2] == "1":
                        result = get_cryptocurrency_price('shiba-INU', 'ngn')
                        response = f"END Current price of Shiba-INU in Nigerian Naira is {result['shiba-inu']['ngn']}"
                        return HttpResponse(response)
                    elif input[2] == "2":
                        result = get_cryptocurrency_price('shiba-INU', 'usd')
                        response = f"END Current price of Shiba-INU in US Dollars is {result['shiba-inu']['usd']}"
                        return HttpResponse(response)
                    elif input[2] == "3":
                        result = get_cryptocurrency_price('shiba-INU', 'eur')
                        response = f"END Current price of Shiba-INU in Euro is {result['shiba-inu']['eur']}"
                        return HttpResponse(response)
                # BNB
                elif input[1] == "5":
                    if input[2] == "1":
                        result = get_cryptocurrency_price('binancecoin', 'ngn')
                        response = f"END Current price of BNB in Nigerian Naira is {result['binancecoin']['ngn']}"
                        return HttpResponse(response)
                    elif input[2] == "2":
                        result = get_cryptocurrency_price('binancecoin', 'usd')
                        response = f"END Current price of BNB in US Dollars is {result['binancecoin']['usd']}"
                        return HttpResponse(response)
                    elif input[2] == "3":
                        result = get_cryptocurrency_price('binancecoin', 'eur')
                        response = f"END Current price of BNB in Euro is {result['binancecoin']['eur']}"
                        return HttpResponse(response)
                    else:
                        response = "END Invalid input. Please try again"
                        return HttpResponse(response)
                else:
                    response = "END Invalid input. Please try again"
                    return HttpResponse(response)
            elif input[0] == "2":
                if input[1] == "1":
                    if input[2] == "1":
                        result = currency_exchange_rate("USD", "NGN")
                        response = f"END The current exchange rate of 1 US Dollars to Nigerian Naira is {result}"
                        return HttpResponse(response)
                    elif input[2] == "2":
                        response = f"END You are checking exchange rate of USD to USD"
                        return HttpResponse(response)
                    elif input[2] == "3":
                        result = currency_exchange_rate("USD", "EUR")
                        response = f"END The current exchange rate of 1 US Dollars to Euro is {result} "
                        return HttpResponse(response)
                    else:
                        response = "END Invalid input"
                        return HttpResponse(response)
                else:
                    response = "END Invalid input"
                    return HttpResponse(response)
            else:
                response = "END Invalid input. Please try again."
                return HttpResponse(response)
        return HttpResponse(response)

I am going to add my view function to my urls.py file and then deploy it on Heroku, after which I will test it to ensure everything is working fine.

### Testing out the USSD application
To test, I am going to update the callback URL I initially set on africastalking to the hosted URL of my USSD application. If you don't know how to deploy a Django application to Heroku, check out this [article](https://www.analyticsvidhya.com/blog/2020/10/step-by-step-guide-for-deploying-a-django-application-using-heroku-for-free/) to deploy your application to Heroku.

After deployment, copy the URL that is associated with the view function created for the USSD menus. My URL is [https://ussd-currency-exchange-rate.herokuapp.com/callback](https://ussd-currency-exchange-rate.herokuapp.com/callback) and I will paste it into the callback URL field that was initially filled with a random URL. This is the callback that will be hit once a user dials your code.

Now on the side menubar on africastalking dashboard, I will click on launch simulator to test the USSD application. Clicking on it which bring me to this page:

![Simulator Page](/how-to-build-a-ussd-application-with-django/africastalking.jpg)

I will choose Nigeria and enter my Nigerian phone number after which I will press the launch button and I will be redirected to this page:

![USSD Homepage](/how-to-build-a-ussd-application-with-django/ussd-homepage.jpg)

I am going to click on the USSD tab and enter my USSD code after which I will be shown the first USSD menu I have built:

![first menu](/how-to-build-a-ussd-application-with-django/first-menu.jpg)
So I am going to test the cryptocurrency price functionality by checking the price of a cryptocurrency in Nigerian Naira. If I enter 1, I will be shown the second menu that asks me to choose cryptocurrency:

![Second menu](/how-to-build-a-ussd-application-with-django/second-menu.jpg)

Since I want to check bitcoin's price, I will press 1 and then press enter and the third menu which asks for the fiat currency will be displayed:

![Third menu](/how-to-build-a-ussd-application-with-django/third-menu.jpg)

I will press one to indicate I want to know the price in Naira and then press enter and the price of bitcoin in Nigerian Naira will be displayed:

![Bitcoin price in naira](/how-to-build-a-ussd-application-with-django/bitcoin-price-in-nigerian-naira.jpg)

To test the second functionality (exchange rate), I will be checking the exchange rate of dollar to naira.

From the first menu, I am going to press 2 and this displays the menu to choose the base currency:

![Exchange rate menu](/how-to-build-a-ussd-application-with-django/exchange-rate-menu1.jpg)

I will also press 1 and the menu to choose the "to currency" will be displayed:

![Exchange rate menu 2](engineering-education/how-to-build-a-ussd-application-with-django/exchange-rate-menu2.jpg)

I will subsequently press 1 to choose Nigerian Naira as my "to currency" and then the exchange rate will be displayed:

![Exchange rate menu 3](/how-to-build-a-ussd-application-with-django/exchange-rate-menu3.jpg)


## Conclusion

Building a USSD application is easy. I split user inputs into a list and then used a bunch of "if-else" statements to check the elements in the list so I could traverse the menus accordingly.