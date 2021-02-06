DynamoDB is a NoSQL database service offered by AWS which is known for its speed and flexibility. DynamoDB is perfect for mobile apps, web apps, IoT devices, and gaming. One of the programming languages used to interact with DynamoDB is Python. In this tutorial, we will perform DynamoDB CRUD operations using AWS Python SDK (Boto3). In this tutorial, we will create, update, read and delete data in DynamoDB using Boto3.

### Prerequisites
Prior knowledge in DynamoDB is recommended before going through this tutorial. To quickstart on DynamoDB, I recommend the article [Getting Started With AWS DynamoDB](https://www.section.io/engineering-education/getting-started-with-aws-dynamodb/). To get started with this tutorial, you need the following:

- **DynamoDB local:** Download and configure DynamoDB. Check [AWS documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) for guidelines. This version of DYnamoDB is used for development purposes only. For production purposes, you should use [Amazon DynamoDB web service](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SettingUp.DynamoWebService.html).
- **Python:** Download and install Python version 2.7 or later. The latest version of Python is available for download on the [official website](https://www.python.org/downloads/).
- **IDE:** Use an IDE or a code editor of your choice. [VS Code](https://code.visualstudio.com/) is a good option.

### Introduction to DynamoDB SDKs
AWS provides SDK for interacting with DynamoDB. The SDK tools are available for different programming languages. A complete list of supported programming languages is available on [AWS documentation](https://aws.amazon.com/tools/). In this tutorial, we will learn how to use the AWS SDK for Python ([Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)) to interact with DynamoDB. Boto3 allows Python developers to create, configure, and manage different AWS products.

### Connecting AWS Python SDK (Boto3) with DynamoDB
Make sure you meet the [prerequisites](#prerequisites) before starting this process. Install Boto3 latest version by running the command below. This will install the Boto3 Python dependency, which is required for our code to run.

```bash
python -m pip install boto3
```

Now we can connect our local version of DynamoDB with Python. We will use the code below to connect to DynamoDB locally. Note the `endpoint_url`.

```python
dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
```

**Note:** For the Python code to work, we must import Boto3 dependency in our scripts using the code below.

```python
import boto3
```

There are numerous ways to connect Boto3 with the online version (production version) of AWS DynamoDB. Refer to [Boto3 developer guide](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html).

### DynamoDB Operations with Python SDK
At this stage, we have installed Python, which is essential for writing Python scripts. We have also added Boto3 dependency. We also have the local version of DynamoDB running. Therefore we can write Python scripts to do operations on DynamoDB. The first step will be creating a table on our DynamoDB. Before running any script, make sure that local DynamoDB is started on your computer.

#### Create table
We are going to create a table called `Devices` using the method `create_table`. The table has attributes `device_id` as the partition key and `datacount` as the sort key. Create a script and name it `create_table.py`. Paste the code below in the script.

```python
import boto3

def create_devices_table(dynamodb=None):
    dynamodb = boto3.resource(
        'dynamodb', endpoint_url="http://localhost:8000")
    table = dynamodb.create_table(
        TableName='Devices',
        KeySchema=[
            {
                'AttributeName': 'device_id',
                'KeyType': 'HASH'  # Partition key
            },
            {
                'AttributeName': 'datacount',
                'KeyType': 'RANGE'  # Sort key
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'device_id',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'datacount',
                'AttributeType': 'N'
            },
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    return table

if __name__ == '__main__':
    device_table = create_devices_table()
    print("Status:", device_table.table_status)
```

In the script above, the first thing is to import boto3 dependency. Import the dependency in every script connecting to DynamoDB. We are also connecting to DynamoDB local server. In the script, we are defining the structure of the table. Only the partition key and the sort key are required. To run the script, enter the command below.

```bash
python create_table.py
```

### Load sample data
Let's populate some data in the table we have created. We will do this by loading data from a data file using the function `put_item`. The data should be in JSON format, as shown below. Validate that the data is in a valid JSON format on [JSONLint](https://jsonlint.com/). Save the data below in a file and name it `data.json`.

```json
[
  {
    "device_id": "10001",
    "datacount": 1,
    "info": {
      "info_timestamp": "1612519200",
      "temperature1": 37.2,
      "temperature2": 21.31,
      "temperature3": 25.6,
      "temperature4": 22.96,
      "temperature5": 24.69
    }
  },
  {
    "device_id": "10001",
    "datacount": 2,
    "info": {
      "info_timestamp": "1612521000",
      "temperature1": 24.34,
      "temperature2": 24.59,
      "temperature3": 19.2,
      "temperature4": 29.11,
      "temperature5": 23.18
    }
  },
  {
    "device_id": "10002",
    "datacount": 1,
    "info": {
      "info_timestamp": "1612519200",
      "temperature1": 14.34,
      "temperature2": 17.59,
      "temperature3": 11.2,
      "temperature4": 15.95,
      "temperature5": 16.17
    }
  },
  {
    "device_id": "10002",
    "datacount": 2,
    "info": {
      "info_timestamp": "1612521000",
      "temperature1": 13.04,
      "temperature2": 15.01,
      "temperature3": 18.91,
      "temperature4": 16.45,
      "temperature5": 16.21
    }
  },
  {
    "device_id": "10003",
    "datacount": 1,
    "info": {
      "info_timestamp": "1612519200",
      "temperature1": 34.23,
      "temperature2": 36.21,
      "temperature3": 31.24,
      "temperature4": 32.02,
      "temperature5": 29.54
    }
  },
  {
    "device_id": "10003",
    "datacount": 2,
    "info": {
      "info_timestamp": "1612521000",
      "temperature1": 34.55,
      "temperature2": 33.13,
      "temperature3": 32.62,
      "temperature4": 39.32,
      "temperature5": 38.87
    }
  }
]
```

Create a script named `load_data.py` and add the code below. The code loads data from the JSON file `data.json` and populate it into the `Devices` table.

```python
import json
from decimal import Decimal
import boto3

def load_data(devices, dynamodb=None):
    dynamodb = boto3.resource(
        'dynamodb', endpoint_url="http://localhost:8000")

    devices_table = dynamodb.Table('Devices')
    for device in devices:
        device_id = (device['device_id'])
        datacount = device['datacount']
        print("Loading Devices Data:", device_id, datacount)
        devices_table.put_item(Item=device)

if __name__ == '__main__':
    with open("data.json") as json_file:
        device_list = json.load(json_file, parse_float=Decimal)
    load_data(device_list)
```

To execute the script, run the command below.

```bash
python load_data.py
```

Below is the expected response upon a successful data loading process.

```
Adding Device Data: 10001 1
Adding Device Data: 10001 2
Adding Device Data: 10002 1
Adding Device Data: 10002 2
Adding Device Data: 10003 1
Adding Device Data: 10003 2
```

### Create item
We use the method `put_item` to insert items in DynamoDB. We will create a script that inserts/creates a new item in the table `Devices`. Create a script named `create_item.py` and paste the code below.

```python
from pprint import pprint
import boto3

def put_device(device_id, datacount, timestamp, temperature1, temperature2, temperature3, temperature4, temperature5, dynamodb=None):
    dynamodb = boto3.resource(
        'dynamodb', endpoint_url="http://localhost:8000")

    devices_table = dynamodb.Table('Devices')
    response = devices_table.put_item(

        Item={
            'device_id': device_id,
            'datacount': datacount,
            'info': {
                'info_timestamp': timestamp,
                'temperature1': temperature1,
                'temperature2': temperature2,
                'temperature3': temperature3,
                'temperature4': temperature4,
                'temperature5': temperature5
            }
        }
    )
    return response

if __name__ == '__main__':
    device_resp = put_device("10001", 3, "1612522800",
                             "23.74", "32.56", "12.43", "44.74", "12.74")
    print("Create item successful.")
    pprint(device_resp)
```

Run the command below to execute the script `create_item.py`.

```bash
python create_item.py
```

We just added the item below.

```json
{
  "device_id": "10001",
  "datacount": 3,
  "info": {
    "info_timestamp": "1612522800",
    "temperature1": 23.74,
    "temperature2": 23.74,
    "temperature3": 12.43,
    "temperature4": 44.74,
    "temperature5": 12.74
  }
}
```

### Read item
We will read the item we just created. Using the method `get_item`, we will specify the primary key of the item we want to read. In this case, the primary key to the table `Devices` is made of a partition key and a sort key. The primary key is `device_id`, and the sort key is `datacount`.

```python
from botocore.exceptions import ClientError
import boto3

def get_device(device_id, datacount, dynamodb=None):
    dynamodb = boto3.resource(
        'dynamodb', endpoint_url="http://localhost:8000")

    devices_table = dynamodb.Table('Devices')

    try:
        response = devices_table.get_item(
            Key={'device_id': device_id, 'datacount': datacount})
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return response['Item']

if __name__ == '__main__':
    device = get_device("10001", 3,)
    if device:
        print("Get Device Data Done:")
        print(device)

```

Run the command below to execute the script `read_item.py`.

```bash
python read_item.py
```

Below is the expected output. The response item is similar to the item we created previously. Using the specific primary key, we can retrieve a particular item.

```bash
Get Device Data Done:
{'datacount': Decimal('3'),
 'device_id': '10001',
 'info': {'info_timestamp': '1612522800',
          'temperature1': '23.74',
          'temperature2': '32.56',
          'temperature3': '12.43',
          'temperature4': '44.74',
          'temperature5': '12.74'}}
```

### Conditions
DynamoDB has a provision of using conditions. Conditions can be applied when updating or deleting items. We can provide a `ConditionExpression`. If the `ConditionExpression` evaluates to true, then the action is performed. Refer [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html) for more information on condition expressions. Familiarize yourself with different [DynamoDB conditions](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/customizations/dynamodb.html#dynamodb-conditions).

### Update
The update modifies an existing item by updating the values of current attributes, removing attributes, or adding new attributes. In this tutorial, we will update the values of existing attributes. Below is the original item and the updated item.

**Original Item**
```json
{
  "device_id": "10001",
  "datacount": 3,
  "info": {
    "info_timestamp": "1612522800",
    "temperature1": 23.74,
    "temperature2": 23.74,
    "temperature3": 12.43,
    "temperature4": 44.74,
    "temperature5": 12.74
  }
}
```

**Updated item**
```json
{
  "device_id": "10001",
  "datacount": 3,
  "info": {
    "info_timestamp": "1612522800",
    "temperature1": 33.74,
    "temperature2": 23.74,
    "temperature3": 25.2,
    "temperature4": 22.0,
    "temperature5": 25.0
  }
}
```
We will use the method `update_item`, as shown in the code below. Create a script named update_item.py `update_item.py` and add the code below.

```python
from pprint import pprint
import boto3

def update_device(device_id, datacount, info_timestamp, temperature1, temperature2, temperature3, temperature4, temperature5, dynamodb=None):
    dynamodb = boto3.resource(
        'dynamodb', endpoint_url="http://localhost:8000")

    devices_table = dynamodb.Table('Devices')

    response = devices_table.update_item(
        Key={
            'device_id': device_id,
            'datacount': datacount
        },
        UpdateExpression="set info.info_timestamp=:time, info.temperature1=:t1, info.temperature2=:t2, info.temperature3=:t3, info.temperature4=:t4, info.temperature5=:t5",
        ExpressionAttributeValues={
            ':time': info_timestamp,
            ':t1': temperature1,
            ':t2': temperature2,
            ':t3': temperature3,
            ':t4': temperature4,
            ':t5': temperature5
        },
        ReturnValues="UPDATED_NEW"
    )
    return response

if __name__ == '__main__':
    update_response = update_device(
        "10001", 3, "1612522800", "33.74", "23.74", "25.20", "22.00", "25.00")
    print("Device Updated")
    pprint(update_response)
```

Run the command below to execute the script`update_item.py`.

```bash
python update_item.py
```

Below is the expected output.

```bash
{'Attributes': {'info': {'info_timestamp': '1612522800',
                         'temperature1': '33.74',
                         'temperature2': '23.74',
                         'temperature3': '25.20',
                         'temperature4': '22.00',
                         'temperature5': '25.00'}},
 'ResponseMetadata': {'HTTPHeaders': {'content-length': '212',
                                      'content-type': 'application/x-amz-json-1.0',
                                      'date': 'Fri, 05 Feb 2021 11:27:43 GMT',
                                      'server': 'Jetty(9.4.18.v20190429)',
                                      'x-amz-crc32': '1118861638',
                                      'x-amzn-requestid': 'a6a8201d-dc10-4837-be6a-7de03ee9b24f'},
                      'HTTPStatusCode': 200,
                      'RequestId': 'a6a8201d-dc10-4837-be6a-7de03ee9b24f',
                      'RetryAttempts': 0}}
```

### Delete Item
To delete an item, we use the method `delete_item`. We can specify the primary key for the item to delete or provide a `ConditionExpression`. If we use a `ConditionExpression`, the item will not be deleted unless the condition is fulfilled. In this example, we will provide a primary key for the item to be deleted and provide a `ConditionExpression`. The item will be deleted if the `ConditionExpression` is met. In this example, the condition is:

```python
ConditionExpression="info.info_timestamp >= :val"
```
We will delete the item below:

```json
{
  "device_id": "10001",
  "datacount": 3,
  "info": {
    "info_timestamp": "1612522800",
    "temperature1": 33.74,
    "temperature2": 23.74,
    "temperature3": 25.2,
    "temperature4": 22.0,
    "temperature5": 25.0
  }
}
```

The item will be deleted if the value of `info_timestamp` is greater than or equal to the value provided. Create a script named `info_timestamp` and paste the code below.

```python
from botocore.exceptions import ClientError
from pprint import pprint
import boto3

def delete_device(device_id, datacount, info_timestamp, dynamodb=None):
    dynamodb = boto3.resource(
        'dynamodb', endpoint_url="http://localhost:8000")

    devices_table = dynamodb.Table('Devices')

    try:
        response1 = devices_table.delete_item(
            Key={
                'device_id': device_id,
                'datacount': datacount
            },
            # Conditional request
            ConditionExpression="info.info_timestamp <= :value",
            ExpressionAttributeValues={
                ":value": info_timestamp
            }
        )
    except ClientError as er:
        if er.response1['Error']['Code'] == "ConditionalCheckFailedException":
            print(er.response['Error']['Message'])
        else:
            raise
    else:
        return response1

if __name__ == '__main__':
    print("DynamoBD Conditional delete")
    # Provide device_id, datacount, info_timestamp
    delete_response = delete_device("10001", 1, 1714910791415)
    if delete_response:
        print("Item Deleted:")
        pprint(delete_response)
```

Run the command below to execute the script `delete_item.py`.

```bash
python delete_item.py
```

If the `ConditionExpression` is not met, the expected response is as shown below.

```bash
Conditional delete
The conditional request failed
```
If the condition is removed or met, then the item will be deleted successfully.

#### Query
Querry returns all items that match the partition key value. In this example, we will query all the data for a specific partition key. We need to specify the partition key value. In this case, the partition key is `device_id`. We will query all the items where `device_id` is equal to 10001. To learn more about DynamoDB queries, refer to the [developer guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html).

```python
import boto3
from boto3.dynamodb.conditions import Key

def query_devices(device_id, dynamodb=None):
    dynamodb = boto3.resource(
        'dynamodb', endpoint_url="http://localhost:8000")

    devices_table = dynamodb.Table('Devices')
    response = devices_table.query(
        KeyConditionExpression=Key('device_id').eq(device_id)
    )
    return response['Items']

if __name__ == '__main__':
    query_id = "10001"
    print(f"Device Data from Device ID: {query_id}")
    devices_data = query_devices(query_id)
    for device_data in devices_data:
        print(device_data['device_id'], ":", device_data['datacount'])
```

Run the command below to execute the script `query.py`.

```bash
python query.py
```

#### Scan
Scan operation reads and returns all the items in the table. The method `DynamoDB.Table.scan()` is used to scan. Using a `filter_expression`, we can filter the items to be returned. However, the whole table will be scanned, and items not matching the `filter_expression` will be thrown away. Create a script named `scan.py` and paste the code below. To learn more about DynamoDB scans, refer to the [developer guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html).

```python
import boto3

def scan_devices(display_devices_data, dynamodb=None):
    dynamodb = boto3.resource(
        'dynamodb', endpoint_url="http://localhost:8000")
    devices_table = dynamodb.Table('Devices')
    done = False
    start_key = None
    while not done:
        if start_key:
            scan_kwargs['ExclusiveStartKey'] = start_key
        response = devices_table.scan()
        display_devices_data(response.get('Items', []))
        start_key = response.get('LastEvaluatedKey', None)
        done = start_key is None


if __name__ == '__main__':
    def print_devices(devices):
        for device in devices:
            print(f"\n{device['device_id']} : {device['datacount']}")
            print(device['info'])

    print(
        f"Scanning all devices data")
    scan_devices(print_devices)
```

The script above scans through the table `Devices` with no `filter_expression`. Run the command below to execute the script scan.py. The output will be all the items in the `Devices` table.

```bash
python scan.py
```

### Delete Table
To delete a table, we use the method `DynamoDB.Table.delete()`. All we need is to specify the table name. This action is rarely performed. Create a script named `delete_table.py` and add the code below.

```python
import boto3

def delete_devices_table(dynamodb=None):
    dynamodb = boto3.resource(
        'dynamodb', endpoint_url="http://localhost:8000")
    devices_table = dynamodb.Table('Devices')
    devices_table.delete()

if __name__ == '__main__':
    delete_devices_table()
    print("Table deleted.")
```

Run the command below to execute the script `delete_table.py`.

```bash
python delete_table.py
```

### Conclusion
We have learned how to write python scripts for interacting with AWS DynamoDB using AWS SDK for Python, Boto3. For more on Boto3 usage with DynamoDB, check [AWS Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html). Find the source code created in this tutorial on [Github](https://github.com/Tsanguu/Python-Boto3-DynamoDB-Tutorial).
