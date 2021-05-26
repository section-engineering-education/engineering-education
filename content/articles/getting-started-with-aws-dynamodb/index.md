---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-aws-dynamodb/
title: Getting Started With AWS DynamoDB
description: This article will be an introduction to AWS DynamoDB. Amazon web services DynamoDB is a managed NoSQL database service that offers top-notch performance.
author: benson-kariuki
date: 2021-01-08T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-aws-dynamodb/hero.jpg
    alt: DynamoDB Label Image
---
DynamoDB is a platform as a service (PaaS) AWS product. The product is a managed NoSQL database service that offers top-notch performance. DynamoDB is seamless and scalable. It comes without the administrative burdens of setting up, replication, and scaling, among others.
<!--more-->
### Prerequisites
This article is suitable for any reader interested in digging into DynamoDB. Most of the time, we are introduced to relational databases. Relational databases are SQL based. 

Non-relational databases are also referred to as NoSQL databases, DynamoDB being one of them. It is recommended you get to know the differences between an SQL and a NoSQL database. The article [SQL or NoSQL - Which Database is Ideal](/sql-or-nosql-when-to-choose-what/) will come in handy.

#### Core components of DynamoDB
- **Tables:** Data is stored in tables. This is similar to other database systems. For instance, you can have a table that stores student details.
- **Items:** A table is made up of zero or more items. Items can be compared to rows in a relational database. Each item is uniquely identifiable.
- **Attributes:** Attributes are equivalent to columns or fields in a relational database. Each item has one or more attributes. For example, FirstName, LastName, etc. Items are allowed to have nested attributes.
- **Primary key:** The primary key is unique for each item. DynamoDB has two types of primary keys:
  - [Partition Key](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey): This forms a simple primary key with only the partition key. In this, the partition key is sufficient to identify each item uniquely. A partition key is named based on the internal working of DynamoDB. "**DynamoDB uses the partition key's value as input to an internal hash function. The output from the hash function determines the partition (physical storage internal to DynamoDB) in which the item will be stored**", [Amazon DynamoDB Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey).

  - [Partition key and sort key](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey): The two constitute a composite key. In instances where two items have a similar partition key, a sort key is used to identify them uniquely. A sort key is a field that is used to determine the order of the data. Any two or more items that have a matching partition key should have a distinct sort key. Items with the same partition key will be stored in the same partition, but ordered by the sort key's value.

- **Secondary indexes:** Secondary indexes are used for additional access patterns that cannot be satisfied only by the primary key. 
DynamoDB supports two kinds of secondary indexes:
1. Local secondary indexes (LSI)
2. Global secondary indexes (GSI)

##### Local Secondary Indexes (LSI)
LSI enables us to extend the sort key's functionalities to other attributes without changing the partition key. This allows us to perform more optimal queries in terms of cost and performance. The limitation of LSI is that it can only be defined during table creation. DynamoDB provides a limit of five LSIs per table.

##### Global Secondary Indexes (GSI)
GSI is an index that can have both a partition key and sort key different from the one on the table. GSI can be created after the table is created, and it comes at an extra cost.

### Setting up DynamoDB

There are two ways of setting up DynamoDB:
1. [DynamoDB local](#dynamodb-local)
2. [Amazon DynamoDB web service](#amazon-web-service)

#### DynamoDB local
DynamoDB Local is an installable software that simulates DynamoDB on your computer. It's suitable for the development stages of an application. This provides a development environment that does not require connecting to the DynamoDB web service. Once development is done, you can deploy to the DynamoDB web service. The downloadable version runs on all platforms that support Java. 

Java Runtime Environment not older than version 8 is required to run this version of DynamoDB. The download links and deploying guidelines can be found on [Amazon DynamoDB documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html).

#### Amazon Web Service
To set up DynamoDB on AWS, you need to register for an [AWS account](https://portal.aws.amazon.com/billing/signup#/start). A credit card for billing may be required. To access DynamoDB programmatically, you need access keys. 

To get access keys:
- In your logged in [AWS console](https://aws.amazon.com/console/), navigate to the [IAM dashboard](https://console.aws.amazon.com/iam/home?region=us-east-1).

- Navigate to users and select `add user` as shown in the screenshot.

![AWS adding IAM user](/engineering-education/getting-started-with-aws-dynamodb/aws-adding-iam-user.jpg)

- Create an access key.
- In the next steps, follow the instructions on screen.
- Make sure you download the CSV file that contains the key pair in the last step before exiting. Store the file in a secure place as it cannot be downloaded again. We will use the access key while [connecting to AWS using CLI](#AWS-CLI).

We can now access DynamoDB.

#### Accessing DynamoDB
DynamoDB can be accessed using [Console](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ConsoleDynamoDB.html), [AWS CLI](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.CLI.html), [API](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html) and [NoSQL Workbench for DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html).

##### AWS CLI
Using [AWS CLI](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.CLI.html), we can control several AWS services, including DynamoDB.

- Download AWS CLI [here](https://aws.amazon.com/cli/), and install.
- For Mac and Linux users, run this command in the terminal `aws --version`
- If the installation was successful, you will get the version of AWS CLI you just installed.
- For Windows users, launch the command prompt and navigate to the directory where you installed AWS CLI. Run the command in the command prompt `aws --version`.
- You should get the same result.

For more configuration details, refer to [AWS CLI user guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html). 

In this tutorial, we will use AWS CLI to interact with DynamoDB.

After installing AWS CLI, run the command below on the terminal.

```bash
aws configure
```

You will be prompted to enter the values as shown in the screenshot below.

![AWS CLI configure](/engineering-education/getting-started-with-aws-dynamodb/aws-cli-configure.jpg)

Make sure you replace the values with your correct values. The user used in this exercise should have the role of `AmazonDynamoDBFullAccess`. Now you can run some commands such as create a table, delete table, among others. Follow [AWS DynamoDB CLI user guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-dynamodb.html) for the commands syntax.

### DynamoDB data modeling
Data modeling is how an application stores data in a given database in relation to real-world entities. With NoSQL databases like DynamoDB, the modeling process is different from the one used in SQL or relational databases. Relational modeling focuses on reducing redundancy to make better use of storage. 

This is the reason why normalization is done. On the other hand, DynamoDB is optimized for computing power rather than storage. Designed for highly scalable applications and makes an excellent transactional database for online analytical processing (OLAP). There are no SQL queries. Queries are made only to indexed data making it very fast with a latency range of 1 to 9ms. Therefore, do not model DynamoDB with a relational data modeling perspective.

#### Key points to note in DynamoDB data modeling
- DynamoDB is schema-less. Items with a different number of attributes can be on the same table.
- Most applications require only one table. Too many tables increase the read and write capacity, consequently increasing the DynamoDB bill.
- Data access patterns define the table design.
- DynamoDB data modeling matters because of two main reasons:
  1. Access patterns: We need to design the tables in such a way that all the access patterns can be met.
  2. Cost: A poorly modeled table may lead to very high bills. As you meet the access patterns, it is essential to note that DynamoDB is charged based on the database read capacity and write capacity.

#### Scenario
In a company, some devices need to be monitored. Monitoring needs to be automated. Five temperature sensors are attached to each device to record temperatures at 10 minutes intervals. The recorded data is then sent to the cloud for analysis. Each device has a unique serial number. 

Let's model a DynamoDB database that will be used to store the data.

**Step 1: Identify entities**
In this case, we only have one entity: Device

Attributes for the entity:

```bash
device_id
datacount
timestamp
temperature1
temperature2
temperature3
temperature4
temperature5
```

**Step 2: Identify relationships**
There are no relationships between entities, as we only have one entity.

**Step 3: Identify the access patterns**
The only data access requirement we have is to fetch data for every device.

**Step 4: Identify the primary key**
We will use a partition key and a sort key.

The partition key is the `deviceid`, and `datacount` is the sort key.

**Step 5: Identify secondary indexes**
In this case, we do not need a secondary index.

### DynamoDB operations
In this section, we will do some database operations based on the scenario above. We will use [AWS CLI](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.CLI.html) in this exercise. You must be logged in to the AWS console and connected to AWS using CLI.

#### Create a table
We will create a table called `device_data` with two attributes, `device_id` and `datacount`. We are also going to define the partition and hash key. We do not need to define the other attributes. Only the primary key and local indexes need to be defined during table creation. 

To create the table, run the command below.
```bash
aws dynamodb create-table \
    --table-name device_data \
    --attribute-definitions \
        AttributeName=device_id,AttributeType=S \
        AttributeName=datacount,AttributeType=N \
    --key-schema \
        AttributeName=device_id,KeyType=HASH \
        AttributeName=datacount,KeyType=RANGE \
--provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5
```

The command below will give you the status of the table you just created.

```bash
  aws dynamodb describe-table --table-name device_data | grep TableStatus
```

#### Write
Now we can write some data in the table `device_data`. 

Run the command below.

```bash
aws dynamodb put-item \
--table-name device_data \
--item \
'{"device_id": {"S": "12345678"}, "datacount": {"N": "1"} , "timestamp": {"N": "1514876999940"}, "temperature1": {"N": "32.78"}, "temperature2": {"N": "21.76"}, "temperature3": {"N": "15.12"}, "temperature4": {"N": "20.22"}, "temperature5": {"N": "14.43"} }'
```

#### Query
To fetch the data from the table, run the command below.

```bash
aws dynamodb query \
    --table-name device_data \
    --key-condition-expression "device_id = :id" \
    --expression-attribute-values  '{":id":{"S":"12345678"}}'
```

The response is in a JSON format.

```bash
    "Items": [
        {
            "temperature1": {
                "N": "32.78"
            },
            "temperature2": {
                "N": "21.76"
            },
            "datacount": {
                "N": "1"
            },
            "timestamp": {
                "N": "1514876999940"
            },
            "device_id": {
                "S": "12345678"
            },
            "temperature5": {
                "N": "14.43"
            },
            "temperature3": {
                "N": "15.12"
            },
            "temperature4": {
                "N": "20.22"
            }
        }
    ],
    "Count": 1,
    "ScannedCount": 1,
    "ConsumedCapacity": null
}
```

You can have a better view of the data we inserted on the AWS console. In your logged in AWS console, navigate to the DynamoDB table we created as shown in the screenshot below.

![AWS console DynamoDB query](/engineering-education/getting-started-with-aws-dynamodb/aws-console-dynamodb-query.jpg)

#### Update
In this scenario, our table does not require an update operation.

#### Delete a table
To delete a table in AWS CLI, use the command below.

```bash
aws dynamodb delete-table --table-name device_data
```

### DynamoDB API and SDK
Like with any other database system, we need to integrate DynamoDB with our applications. AWS SDKs do support a broad number of languages for DynamoDB. 

The supported programming languages include PHP, Python, .Net, and Node.js. The complete list of supported programming languages can be found [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CodeSamples.html).

### Conclusion
This article is an introduction to Amazon DynamoDB. There is more to explore on Amazon DynamoDB. Further research, reading and hands-on areas on DynamoDB include:

- Security issues.
- Monitoring.
- Best practices.
- DynamoDB transactions.
- Programming with DynamoDB using different programming languages.

You can also get a certification for DynamoDB under [AWS certified solutions architect associate](https://digitalcloud.training/certification-training/aws-solutions-architect-associate/database/).

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
