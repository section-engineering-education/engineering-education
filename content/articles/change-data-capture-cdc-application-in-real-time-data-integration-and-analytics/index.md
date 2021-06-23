---
layout: engineering-education
status: publish
published: true
url: /change-data-capture-cdc-application-in-real-time-data-integration-and-analytics/
title: Change Data Capture (CDC) Application in Real-Time Data Integration and Analytics
description: This article will introduce the reader to Change Data Capture. It discusses the definition of CDC, methods, as well as the use cases of CDC.
author: eric-kahuha
date: 2021-05-31T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/change-data-capture-cdc-application-in-real-time-data-integration-and-analytics/hero.jpg
    alt: Change Data Capture (CDC) Application in Real-Time Data Integration and Analytics
---
In the global economy, companies heavily rely on data to make informed decisions. The availability of real-time data is essential in these fast-moving markets. Teams using delayed data processing methods such as [batch processing](/engineering-education/batch-processing-vs-stream-processing/) to synchronize databases may lose their competitive advantage.
<!--more-->
Organizations are shifting to Change Data Capture (CDC) to ensure real-time streaming of data changes into their databases. 

### Goal
In this article, we will understand: 
- What Change Data Capture (CDC) is.
- Why you need to use CDC.
- The different methods of CDC, and use cases.

### What is Change Data Capture (CDC)?
Databases contain software design patterns known as Change Data Capture (CDC) that track and manage data changes. Companies take actions based on these data changes. The CDC data integration technology identifies, captures, and delivers changes `(DELETE, UPDATE, and INSET)` made to company data sources.

CDC enables real-time data streaming into data warehouses. This eliminates the need for inconvenient batch windows and bulk load updates. With the CDC, organizations use real-time data to populate business intelligence dashboards. 

They also sync data across geographically distributed systems, and are assured of zero downtime during [data migrations](https://www.netapp.com/knowledge-center/what-is-data-migration/).

### Why use CDC
There are several reasons to use Change Data Capture. Some of them are discussed below:
- CDC makes the most current data available, and this promotes faster and more accurate decision making.
- CDC ensures minimal disruptions to production workloads. It does this by sending continuous source updates to analytical targets. This keeps targets regularly updated without batch loads that may disrupt production operations.
- CDC sends only incremental changes, thus cutting down data transfer costs over a Wide Area Network (WAN).

### Different methods of Change Data Capture CDC
#### Log-based change data capture
Every data change that users make to a `transactional database` is recorded in a `transaction log`. This transaction log is used for system recovery in case the database crashes. 

What happens is that log-based Change Data Capture reads the changes in transaction logs and then pushes them to the destination data warehouse in real-time to ensure system restoration.

#### Triggers-based CDC  
Triggers capture data changes based on events. These software functions run when a user makes changes to a table's data using SQL syntax, including `AFTER INSERT` and `BEFORE UPDATE`. Triggers record changes once they are activated, and the triggered events help populate a changelog. 

While it is straightforward to identify changes with this trigger method, you may need a fair amount of resources to record changes on a changelog.

#### Diff
In this method, you compare the current data to the older data to note the differences. The `diff` method enables you to know what has changed. This method works well for enterprises with low data volume.

#### Timestamps
This CDC method involves the use of modified dates and timestamps. When rows are modified, many database columns indicate that. Timestamp CDC relies on this information to pull data from the recently modified columns. 

Your database needs to have accurate date-modified columns for this CDC method to work. 

> Note that Timestamp CDC is not helpful for databases that do not have this column.

### Use cases of CDC
#### Data replication/propagation
An organization may need to have several copies of data from a data source for different use cases. CDC ensures more efficient propagation of data. This replication solution records changes in real-time and sends them to target databases.

#### Extract, transform, load (ETL) for data warehousing
CDC is beneficial in loading data warehouses. Processing changes reduces the data load time, associated costs such as software licenses, and resources such as memory and CPU. Daily data changes only represent a fraction of the total data volume. CDC accommodates these changes and any future growth that may occur in data volumes.

#### Data lake ingestion
[Data lakes](/engineering-education/data-lake-vs-data-warehouse-vs-database/) have become popular as a data storage and processing platform for many data types. Enterprises rely on data lakes to support analytical use cases such as real-time client offers, social media monitoring, fraud detection, as well as price and market trend analysis. Such use cases depend on real-time analysis of the latest data, and that is where CDC fits in.

#### Building Operational Data Stores (ODS)
Operational Data Stores [ODS](https://en.wikipedia.org/wiki/Operational_data_store) refer to integrated data repositories that collect data from more than one source addressing a particular business area, say, marketing or finance, and providing valuable information to business intelligence (BI) applications and business users. 

The implementation of CDC ensures ODS are kept up-to-date through a continuous identification and delivery of changes into the database. Otherwise, one would require to query the entire database for changes periodically.

#### Data sharing with customers, vendors, and partners
Often, partners and vendors require access to an organization's data platform to provide more insights or make critical investment decisions. That means they need a data integration tool to enjoy the same types of data movement, transformation, and access components found in the organization's data platform, and this is where CDC also fits in.

### Conclusion
Change Data Capture enables an instant and incremental replication of data. Unlike other processes that record data changes all at once, CDC does this piece-by-piece. This ensures that data is always up-to-date. Furthermore, both the target and base databases are continuously synced to implement new data updates.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)