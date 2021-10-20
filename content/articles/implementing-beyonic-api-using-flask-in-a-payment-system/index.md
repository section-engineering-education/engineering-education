Purchases of commodities and items have been reduced to a small world where one can order at the comfort of any place and await delivery. This is all possible by the software developers who work to integrate the APIs to work in hand with the systems. When the customer tries to purchase something the site directs him to a platform where he or she is requested to provide payment information. This is the role of Payment Request API (PR API). This article will be showing how to integrate the Beyonic API in a system using flask, a python framework. APIs are application programming interfaces that help to fetch data for the users and developers. 

### What is a beyonic API?

Beyonic API is a REST-based API that grants the user capability to extend the features available at the dashboard into any application and system hence building amazing payment experiences in the systems. The foundation began back in 2006 by Luke a Software engineer located in Kampala who saw an idea to help support the growth of enterprises at a time when other companies like Safaricom's were emerging with the product MPESA. As of late, the API has seen the integration of more than 15 million mobile money transactions all through the beyonic system. The API has been built in several library languages all available for use to help businesses to modernize their businesses. The languages include; Php Java Python Ruby Nodejs

### Capabilities of the API: Beyonic Payment API

Using the API one can send and receive money and also purchase prepaid airtime as it's a norm to the current businesses. The API also provides the capability to help customers identify the currencies and networks which are operational within the API. It provides good integration and support with many banks. Using the API can check the account balances. It provides the capability to synchronize contacts in the Beyonic API. You can use webhooks to push notifications to the URLs and then to the server in order when events occur they take place in your Beyonic account.

### Getting Started with Beyonic API

To get used to the Beyonic API you need to install the client library and set the secret key. To install for python or ruby, you will have to install the client library and get started. This tutorial will show how to install python beyonic API. Using the terminal run the following keys:

```bash
 pip install beyonic
```
 #### To set the secret key install
 
```bash
Python-dotenv module
```

This is a python module that allows one to specify the environment variable within a project directory. This is an encapsulation method that allows us to work with keys and secrets without having to leak them to the outside world. To install, run the following commands at the terminal. pip install python-dotenv The next part is to set up the .env file which will help to specify the Beyonic API token. To create a .env file that will aid to keep the secret keys run the following commands
```bash

touch .env
```

In the .env file there is this part which is meant to specify the beyonic API token;

`BEYONIC_ACCESS_KEY = "enter your API key here"`

### How to get the Beyonic API token?

In the Beyonic web portal Click on the username part on the bottom left of the sidebar menu. Select Manage my account which is among the choices on the dropdown menu. Scroll to the very bottom of the page and an API token will be shown.

```python

import os 

import beyonic

from dotenv import load_dotenv 

load_dotenv()

myapi = os.environ['BEYONIC_ACCESS_KEY']

beyonic.api_key = myapi 

# Listing account: Working. 

accounts = beyonic.Account.list() 

print(accounts)

# Listing currencies: Not working yet.

supported_currencies = beyonic.Currency.list()

print(supported_currencies)

# Supported currencies are: USD, UGX, KES, BXC, GHS, TZS, RWF, ZMW, MWK, BIF, EUR, XAF, GNF, XOF, XOF

# Listing networks: Not working yet.

networks = beyonic.Network.list()

print(networks)

# Listing transactions: Working. 

transactions = beyonic.Transaction.list()

print(transactions) 

# Listing contact: Working. 

mycontacts = beyonic.Contact.list() 

print(mycontacts) 

# Listing events: Not working yet.

events = beyonic.Event.list()

print(events)

Error: AttributeError: module 'beyonic' has no attribute 'Event'

'''

### Setting Beyonic API using Docker

A docker file refers to a text document that contains all the commands which a user might need to call via the command line in order to assemble an image. The creation of several automated command-line instructions which can be run simultaneously and executed at once is possible with Docker. 

```bash

FROM python:3.8-slim-buster
```

COPY . .

The requirement.txt is a file which is meant to keep the data about the library,package and modules generated. THis information is then used in the project development.
```bash

COPY ./requirements.txt ./requirements.txt
```

WORKDIR .RUN 
```bash 
pip install -r requirements.txt
```

```output
CMD [ "python3", "getExamples.py" ]
```
To build a simple docker image called payments follow the following procedures.

```bash
docker build -t bey.
```

The next step is to run a docker image called payments.
```bash
docker run -t -i bey
```
After this step build a docker-compose file which will aid to create and run a docker container using the Docker image which we just created initially,

```
version: "3.6"

services:

 app:

   build: .

   command: python getExamples.py

   volumes:

     - .:/pythonBeyonicExamples
 ```

The next step is to run the docker-compose.yml file with respect to the directory it is located in. Once command will run the entire app and it is the docker compose-up. In your terminal run the following command:
```bash
docker-compose up
```
Upon running the following commands a couple of activities will begin running including payment processing. The activity will only differ depending on the account details and the transactions too.

In case you want to stop the container from running on the daemon mode you can run the following code.
```bash
docker-compose stop
```
### Conclusion

In the above article, we discussed what beyonic API is, the libraries available to use, and what it entails. We also went ahead and created a simple project on how to configure the API and use it in our apps. We created a python flask project and a docker one. I hope this will be your next move to integrate your payment method in your app and future current systems. Users are more convenient when a good payment method is configured which won’t be tedious and will be fast, scalable, and efficient.
