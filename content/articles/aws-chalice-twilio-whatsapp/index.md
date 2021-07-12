---
layout: engineering-education
status: publish
published: true
url: /aws-chalice-twilio-whatsapp/
title: Sending WhatsApp Messages with Serverless Python Applications using AWS Chalice
description: In this article, we set up a Chalice application with the DynamoDB database. We will also integrate Twilio WhatsApp messaging and send messages from our application.
author: jekayinoluwa-olabemiwo
date: 2021-07-12T00:00:00-12:06
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/aws-chalice-twilio-whatsapp/hero.jpg
   alt: AWS Chalice example image
---
[Serverless computing](https://en.wikipedia.org/wiki/Serverless_computing) enables developers to build software and applications without dealing with servers. It abstracts server management from the responsibilities of a developer. [AWS Chalice](https://github.com/aws/chalice) is a light and fast serverless framework built by AWS. It is a Python-based framework. It leverages the [Amazon API Gateway](https://aws.amazon.com/api-gateway/) and [AWS Lambda](https://aws.amazon.com/lambda/).
<!--more-->
[WhatsApp](https://www.whatsapp.com/) is a free messaging platform used by over 2 billion people across the world. [WhatsApp API](https://www.whatsapp.com/business/api/?lang=en) allows developers to build applications for WhatsApp users.

In this article, we set up a Chalice application with the DynamoDB database. We will also integrate [Twilio WhatsApp messaging](https://www.twilio.com/whatsapp) and send messages from our application.

### Prerequisites
To follow along with this article you should have:
- [Python](https://www.python.org/) 3.6 or a later version
- venv or virtualenv
- AWS account
- Twilio account
- Configured AWS credentials
- Basic Python experience

> Venv is usually shipped with Python 3. But you may install virtualenv with the following command:

```bash
pip install virtualenv
```

You can learn how to activate and use both Venv and Virtualenv [here](https://www.section.io/engineering-education/introduction-to-virtual-environments-and-dependency-managers/).

Furthermore, [sign up](https://portal.aws.amazon.com/billing/signup) for a free AWS account if you don't have one yet. You may follow the [instructions for configuring AWS credentials](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html). You can also create a Twilio account [here](https://www.twilio.com/try-twilio).

### Setting up dependencies

#### Configure the Twilio Sandbox for WhatsApp:

WhatsApp will approve your account before the application can send messages in production. But, Twilio provides the WhatsApp sandbox for building and testing applications. The sandbox is available in the [WhatsApp section of the Twilio console](https://www.twilio.com/console/sms/whatsapp/learn).

Go to the sandbox [activation page](https://www.twilio.com/console/sms/whatsapp/learn). Twilio will provide a two-word join code and a WhatsApp number. Use WhatsApp on your smartphone to send the join code to the Twilio number on your dashboard. That way, you will activate the Twilio WhatsApp sandbox.

You should get a message like this in WhatsApp on your smartphone:

![WhatsApp sandbox activation](/engineering-education/aws-chalice-twilio-whatsapp/sandbox-activate-message.jpg)

You will also see a `Message Received` response on your dashboard like this:

![Message received notification on the dashboard](/engineering-education/aws-chalice-twilio-whatsapp/message-received.png)

Let's create a virtual environment for your project in a new folder:

```bash
mkdir chalice-twilio-project
python -m venv env
```

Then, activate the new virtual environment:

```bash
source env/bin/activate
```

Let's install the Chalice package, the AWS CLI client, Boto3—the AWS Python SDK, and the Twilio SDK:

```bash
pip install chalice awscli boto3 twilio
```

Now, we can use the `new-project` keyword with the `chalice` command to create a new project called `welcome-app`:

```bash
chalice new-project welcome-app
```

Chalice will generate the following files for us:

```bash
welcome-app
├── app.py
├── .chalice
│   └── config.json
├── .gitignore
└── requirements.txt
```

The files generated above are:

- `app.py`: holds the logic of the application.
- `.chalice`: contains the settings and database configuration.
- `.gitignore`: a list of files that Git will ignore.
- `requirements.txt`: contains the application dependencies.

Now, we're good to go and can put in place the database settings for the application.

### Setting up the database

#### Database configuration

We will start with the configuration by modifying the `config.json` file inside the `.chalice` folder. We will create a deployment stage called `dev`. By default, Chalice calls it `dev,` but you can change it to any name as you wish:

```json
{
  "version": "2.0",
  "app_name": "welcome-app",
  "stages": {
    "dev": {
      "api_gateway_stage": "api",
      "autogen_policy": false
    }
  }
}
```

In the above code, `api_gateway_stage` is the URL prefix for our application. `autogen_policy` tells Chalice to create an IAM policy for us with the application code. You can read more about `api_gateway_stage` and `autogen_policy` [here](https://aws.github.io/chalice/topics/configfile.html).

We will use the [DynamoDB](https://aws.amazon.com/dynamodb/) database for our application. It is a NoSQL database system that couples with AWS Chalice applications, and it is very easy to set up.

Now, we will set up the policy for writing and reading from the database. Let's go to the `.chalice` folder and create a `policy-dev.json` file there. Add the following code inside the `policy-dev.json` file:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:UpdateItem",
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:Query"
      ],
      "Resource": ["arn:aws:dynamodb:*:*:table/demo-table"],
      "Effect": "Allow"
    }
  ]
}
```

In the JSON file above, we allowed our user to make log groups and log events. We also defined actions for reading, adding, updating, scanning, deleting, and query operations in the DynamoDB database. Furthermore, we specified the name of the table in the database as `demo-table`.

#### Database Deployment

AWS provides us with [CloudFormation](https://aws.amazon.com/cloudformation/). It is a tool for defining the resources needed in a project hosted on AWS infrastructure. We will define the resources in a JSON/YAML template. So, CloudFormation will utilize the template to set up a stack with the dependencies and the resources. 

First, we will create a template with our database prescription. Then, CloudFormation can set up a DynamoDB database with the template.

So, let's create a file inside the `.chalice` folder called `dynamodb_cf_template.yaml`. Add the following lines to the new file:

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Resources:
  chaliceTwilioDemo:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: demo-table
      AttributeDefinitions:
        - AttributeName: "id"
          AttributeType: "S"
        - AttributeName: "name"
          AttributeType: "S"
      KeySchema:
        - AttributeName: "id"
          KeyType: "HASH"
        - AttributeName: "name"
          KeyType: "RANGE"

      ProvisionedThroughput:
        ReadCapacityUnits: "5"
        WriteCapacityUnits: "5"

Outputs:
  TableName:
    Value: !Ref "chaliceDemo"
    Description: Name of the newly created DynamoDB table
```

In the above file, we indicated the key attributes of our DynamoDB table, i.e., the `id` and the `name` of the message recipients. The `KeySchema` consists of the primary key. The [AWS documentation](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html) contains more information on attribute definition in DynamoDB tables.

Next, let's navigate to the `.chalice` folder and create the database with the command below.

```bash
aws cloudformation deploy --template-file dynamodb_cf_template.yaml --stack-name "my-stack"
```

We have created our stack called `my-stack` using the CloudFormation template that we defined earlier on.

Let's check out the setup. Navigate back to the application folder `welcome-app` to use the `chalice local` command:

```bash
chalice local
```

We should get an output like this:

```bash
Serving on http://127.0.0.1:8000
```

A response like the following will be returned on port 8000:

```bash
{hello:world}
```

### Sending WhatsApp Messages

We will take personal details from our users and store the details in our database. Then, we will send welcome greetings to each of the users based on the details they supplied.

#### Accept User Details

We need to accept some details from our users. They are the names and dates of birth. Change the `app.py` file thus:

```python
from chalice import Chalice, Response
import boto3
from boto3.dynamodb.conditions import Key

app = Chalice(app_name='welcome-app')


def get_app_db():
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table('demo-table')
    return table


@app.route('/recipient', methods=['POST'])
def add_recipient():
    data = app.current_request.json_body
    try:
        get_app_db().put_item(Item={
            'id': data['id'],
            "name": data['name'],
            "phone_number": data['phone_number']
        })
        return {'message': 'ok', 'status': 201, 'id': data['id'], 'name': data['name'], 'phone_number': data['phone_number']}
    except Exception as e:
        return {'message': str(e)}
```

In the above code, we made necessary imports, and we defined our database in the `get_app_db()` method. We then created a method called `add_recipient()` with a `POST` route named `/recipient`. 

This method accepts user data: the user's name, year, month, and date of birth. These details are then saved into the database. The application will return a `201` response after saving the details. Otherwise, it will return an error.

#### Send WhatsApp Message with Twilio

Now, we will use the Twilio client to send messages. First, obtain your account SID and auth token from your Twilio dashboard. Set them as environment variables for your project. You can learn how to secure your credentials with environment variables [here](https://www.twilio.com/docs/usage/secure-credentials).

Now, we will change the `app.py` file like the following:

```python
import os
from twilio.rest import Client

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

@app.route('/recipient', methods=['POST'])
def add_recipient():
    data = app.current_request.json_body
    try:
        get_app_db().put_item(Item={
            'id': data['id'],
            "name": data['name'],
            "phone_number": data['phone_number']
        })
        message = client.messages \
            .create(
                from_='whatsapp:+YOUR_TWILIO_NUMBER',
                body='Welcome to the crew, {}! Keep enjoying the vibe'.format(
                    data['name']),
                to='whatsapp:+{}'.format(
                    data['phone_number'])
            )
        return {'message': 'ok', 'status': 201, 'id': data['id'], 'name': data['name'], 'phone_number': data['phone_number']}
    except Exception as e:
        return {'message': str(e)}
```

In the above code, we made necessary imports and defined the Twilio credentials in the `app.py` file. Then, we used the Twilio client to create a message and send it to the recipient's number.
Replace the `YOUR_TWILIO_NUMBER` with your Twilio WhatsApp number.

The full code in the `app.py` file is:

```python
from chalice import Chalice, Response
import boto3
from boto3.dynamodb.conditions import Key
import os
from twilio.rest import Client


app = Chalice(app_name='welcome-app')


account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)


def get_app_db():
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table('demo-table')
    return table


@app.route('/recipient', methods=['POST'])
def add_recipient():
    data = app.current_request.json_body
    try:
        get_app_db().put_item(Item={
            'id': data['id'],
            "name": data['name'],
            "phone_number": data['phone_number']
        })
        message = client.messages \
            .create(
                from_='whatsapp:+YOUR_TWILIO_NUMBER',
                body='Welcome to the crew, {}! Keep enjoying the vibe'.format(
                    data['name']),
                to='whatsapp:+{}'.format(
                    data['phone_number'])
            )
        return {'message': 'ok', 'status': 201, 'id': data['id'], 'name': data['name'], 'phone_number': data['phone_number']}
    except Exception as e:
        return {'message': str(e)}
```

### Deploy to AWS

We will use the `chalice deploy` command to deploy to AWS:

```bash
chalice deploy
```

We should get the following response on the terminal:

```bash
Creating deployment package.
Creating IAM role: welcome-app-dev-api_handler
Creating lambda function: welcome-app-dev
Creating Rest API
Resources deployed:
  - Lambda ARN: arn:aws:lambda:us-west-2:xxxxxxxxxxxx:function:welcome-app-dev
  - Rest API URL: https://vvyngxvyag.execute-api.us-west-2.amazonaws.com/api/
```

We've gotten the RESTful API URL that we will use to interact with the Chalice API.

Let's try the `/recipient` API endpoint on Postman. The endpoint URL will be like this:

```bash
https://vvyngxvyag.execute-api.us-west-2.amazonaws.com/api/recipient
```

We can specify the `body` of the request in JSON format as the following:

```Json
{
    "id": "1",
    "name": "Oyewole Hajarah",
    "phone_number": "2348141684988"
}
```

We should get a response as shown in the image below.

![Postman response](/engineering-education/aws-chalice-twilio-whatsapp/postman-example.JPG)

Then, your recipient will receive the WhatsApp message sent:

![Screenshot of the WhatsApp message sent](/engineering-education/aws-chalice-twilio-whatsapp/sent-message.jpg)

### Conclusion

In this tutorial, we have been able to create a Chalice application with an API. We used Twilio WhatsApp API to send messages. We also tested the API with Postman.

Now, you can build more on serverless technology and AWS infrastructure.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)