---
layout: engineering-education
status: publish
published: true
url: /choosing-between-modern-data-warehouses-bigquery-vs-redshift-vs-snowflake/
title: Choosing between Modern Data Warehouses - BigQuery vs Redshift vs Snowflake 
description: This article will discuss moderan data warehouses. This article will compare Snowflake, BigQuery, and Redshift to help you settle on the best data warehouse solution that fully accommodates your data warehouse needs.
author: eric-kahuha
date: 2021-01-14T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/choosing-between-modern-data-warehouses-bigquery-vs-redshift-vs-snowflake/hero.jpg
    alt: Modern Data Warehouses example image
---
In todays world, data is essential as it allows organizations to find the cause of problems and formulate solutions. Organizations are constantly looking for real-time data at a low cost and without maintaining data warehouse infrastructure.
<!--more-->
Modern data-warehouses such as Snowflake, BigQuery, and Redshift meet the needs of these organizations perfectly. These data warehouse solutions allow businesses to work with raw data and re-transform it on the fly without the need to re-ingest the data stored in a warehouse.

Choosing between Snowflake, BigQuery, and Redshift can be challenging. This article compares Snowflake, BigQuery, and Redshift to help you settle on the best data warehouse solution that fully accommodates your data warehouse needs.

### What is BigQuery?
[BigQuery](https://cloud.google.com/bigquery) is a [Google Cloud Platform](https://cloud.google.com/) developed to meet data warehouse needs for enterprises. Companies use this cloud data warehouse service to store and query data. Companies upload massive datasets in exabytes and petabytes and let the BigQuery in-built machine learning system process the data and produce inferences. BigQuery relies on Google's highly developed infrastructure to process data.

### What is Redshift?
[Redshift](https://aws.amazon.com/redshift/) is a fully-managed cloud data warehouse solution that stores petabytes of data. Amazon offers it. Redshift is integrable with many business intelligence and reporting tools such as [Holistics](https://www.holistics.io/), [PowerBI](https://powerbi.microsoft.com/en-us/), [Tableau](https://www.tableau.com/), [Looker](https://looker.com/), and [Sisense](https://www.sisense.com/).

Redshift connects to SQL-based clients and makes data available in real-time. It is built on PostgreSQL to deliver a fast performance and efficient querying.

Amazon Redshift warehouses are made up of computing resources known as nodes. These nodes are organized in clusters, each containing at least one database and running its Redshift engine.

### What is Snowflake?
Besides providing scalable and flexible storage, [Snowflake](https://www.snowflake.com/) hosts solutions for business intelligence. It is built entirely on the cloud, and its subscription-based model operates compute and storage resources independently. Snowflake users store both semi-structured and structured data and convert it into usable SQL-compatible format.

Being a cloud-agnostic platform, Snowflake customers can be multi-cloud users. The cloud-agnostic environments operate with multiple public cloud providers to guarantee the least possible disruptions to a business. Snowflake is available on [Google Cloud](https://www.snowflake.com/technology-partners/google-cloud-platform/#), [Amazon Web Services](https://www.snowflake.com/technology-partners/amazon-web-services/), and [Microsoft Azure](https://www.snowflake.com/technology-partners/microsoft/).

### A comparison of BigQuery, Redshift, and Snowflake
#### Security
BigQuery supports many authentication models, including service account and OAuth based models. These authentication models allow access to BigQuery resources at different levels. Access control for groups, users, and service accounts is limited to the data set level. Any views and tables under the dataset inherit permissions from the dataset automatically. Data in BigQuery is encrypted in transit and at rest, by default.

In Snowflake, site access is controlled through IP that allows or blocks lists depending on network policies. Data is automatically encrypted in Snowflake. Snowflake supports private communication with other Amazon Virtual Private Clouds ([VPCs](https://aws.amazon.com/vpc/)) and Azure Virtual Network ([VNet](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview)) through the [Azure Private Link](https://azure.microsoft.com/en-us/services/private-link/).

Key Pair Rotation and Key Pair Authentication promotes security in Amazon Redshift. OAuth allows access to authorized Redshift accounts without storing or sharing user login details. Role-based access control (RBAC) and discretionary access control (DAC) allow access to users, tables, databases, warehouses, and other objects in the cloud.

Amazon Web Services ([AWS](https://www.section.io/engineering-education/aws-vs-google-cloud/)) ensures cloud security, where data in Redshift is stored. AWS protects the infrastructure running Redshift. Redshift provides end-to-end encryption that ensures the security of data in transit and data at rest. Companies control network access of their data warehouse cluster by configuring firewall rules. They additionally enable column-level and row-level security controls to ensure users access the data they are permitted to.

#### Scalability
BigQuery is a highly scalable storage engine that offers parallel computing. This means that BigQuery can scale independently. It allows data storage in one place and provisioning of multiple data warehouses separately from the same data. This way, organizations can create more than one cluster on the same data for multiple teams based on their respective service-level agreements (SLAs).

Redshift is easily scalable. It allows users to increase or decrease the number of nodes and configure them depending on their needs. Redshift can scale up to 100TB of data and process it at once in a query. Unlike other data warehouses, the Redshift cluster's computing capacity relies on the count of nodes in the cluster.

Snowflake operates on [Amazon S3](https://aws.amazon.com/s3/) cloud storage infrastructure. It has a storage layer that holds multiple tables, data, and query results. This storage layer is engineered to scale independently of computing resources to ensure maximum scalability for big data analytics and warehousing. With Snowflake, users have access to multiple virtual warehouses offered concurrently at nearly any scale.

#### Support and maintenance
In both Snowflake and Google BigQuery, no sizing is required because the compute and storage resources are separated. With Amazon Redshift, you need to size appropriate clusters because compute and storage resources are not separated.

BigQuery requires low maintenance, but a few limitations include a lack of performance tuning capabilities, indexes, and column constraints. Snowflake also requires low maintenance and allows rapid, automatic provisioning of greater compute resources. Snowflake does most of the database backups, operational procedures, and maintenance for you. Redshift data warehouse requires periodic vacuuming and analysis of tables.

Redshift is a fully managed service; Snowflake requires no management from end users, while Redshift is challenging to manage without the input of a skilled Amazon web service architect.

#### Architecture
BigQuery is powered by Dremel technology. Dremel is a query execution engine that analyzes read-only nested data. Dremel is based on a combination of tree architecture and columnar data layouts. That combination empowers Dremel to process massive amounts of data in seconds. Dremel differs from many other database architectures in its ability to scale compute nodes independently to respond to the needs of even the most demanding queries.

Snowflake architecture is a hybrid of shared-nothing and shared-disk architectures. The [shared-disk architecture](https://en.wikipedia.org/wiki/Shared-nothing_architecture) was mainly used in traditional databases. It has one storage layer for access by all cluster nodes. This architecture has multiple cluster nodes along with memory and CPU but no disk storage. The cluster nodes communicate with the central storage layer to access and process data.

In contrast, [shared-nothing architecture](https://en.wikipedia.org/wiki/Shared_disk_architecture#) has distributed cluster nodes with their own CPU, memory, and disk storage. The availability of disk space for each cluster node allows data partitioning and storage across cluster nodes.

Amazon Redshift has a shared-nothing, Massively Parallel Processing (MPP) architecture. In an MPP architecture, multiple processors process a single task, with each processor using its memory and operating system. The processors use a form of messaging interface to communicate with each other. You can setup MPP with either a shared-disk or shared-nothing architecture. Redshift's MPP architecture is similar to other data warehouse systems, including Greenplum, MS PDW, and Netezza.

#### Data volume
Amazon S3 automatically scales storage resources based on data volume. Snowflake users do not need to mind reaching an arbitrary storage limit because Snowflake is built on Amazon S3. Snowflake scales storage seamlessly with data volume. Besides, Snowflake does not place an architectural limit on the amount of data users can process or store.

If your data volume can reach petabytes, then choose Redshift. Redshift favors highly analytical workloads and those that require a lot of column processing.

Google scales storage resources automatically with growth in data volume and increase in data queries' complexity.

### Conclusion
Each of these cloud data warehouses has their strengths and weaknesses. If you require a standard cloud data warehouse and have the capacity for a dedicated database administrator, then go for Redshift. Snowflake and BigQuery architectures make these data warehouse solutions highly scalable. However, Snowflake is best suited for organizations looking for data warehouses that offer concurrency at scale.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)


