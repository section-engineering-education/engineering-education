In today's global economy, companies heavily rely on data to make informed decisions. The availability of data in real-time is essential in fast-moving markets. Teams relying on delayed data processing methods such as [batch processing](/engineering-education/batch-processing-vs-stream-processing/) to synchronize databases may be left out of the competition.

Organizations are shifting to change data capture (CDC) to ensure real-time streaming of data changes into their databases. In this article, you will understand what is change data capture (CDC), why you need to use CDC, the different methods of CDC, and use cases.

### Table of Contents

[What is change data capture (CDC)? 1](#_Toc71021773)

[Why use CDC 1](#_Toc71021774)

[Different methods of CDC 2](#_Toc71021775)

[Triggers-based CDC 2](#_Toc71021776)

[Differences 2](#_Toc71021777)

[Timestamps 2](#_Toc71021778)

[Use cases of CDC 2](#_Toc71021779)

[Data replication/propagation 2](#_Toc71021780)

[ETL for Data Warehousing 3](#_Toc71021781)

[Data Lake Ingestion 3](#_Toc71021782)

[Building Operational Data Stores (ODS) 3](#_Toc71021783)

[Data sharing with customers, vendors, and partners 3](#_Toc71021784)

[Conclusion 3](#_Toc71021785)

### What is change data capture (CDC)?

Databases contain software design patterns known as change data capture (CDC) that track and determine data changes. Companies take action based on these data changes. The CDC data integration technology identifies, captures, and delivers changes (DELETE, UPDATE, and INSET) made to company data sources.

CDC enables real-time streaming or loading of data in bulk into data warehouses. This eliminates the need for inconvenient batch windows and bulk load updating. With the CDC, organizations populate business intelligence dashboards in real-time, synch data across geographically distributed systems, and are assured of zero downtime during [data migrations](https://www.netapp.com/knowledge-center/what-is-data-migration/).

### Why use CDC

There are several reasons to use change data capture. Some of them are discussed below.

- CDC makes the most current data available, and this promotes faster and more accurate decision making.
- CDC ensures minimal disruptions to production workloads. It does this by sending continuous source updates to analytics targets. This keeps targets regularly updated without batch loads that may disrupt production operations.
- CDC sends only incremental changes, thus cutting down data transfer costs over a wide area network (WAN).

### Different methods of change data capture CDC

#### Log-Based Change Data Capture

Every data change that users make to a transactional database is recorded in a transaction log. This transaction log is used for system recovery in case the database crashes. What happens is that log-based change data capture reads the changes in transaction logs and then pushes them to the destination data warehouse in real-time to ensure system restoration.

#### Triggers-based CDC

Triggers capture data changes based on events. These software functions run when a user makes changes to a table&#39;s data using SQL syntax, including &quot;AFTER INSERT&quot; and &quot;BEFORE UPDATE.&quot; Triggers record changes once they are activated, and the triggered events help populate a changelog. While it is straightforward to identify changes with this trigger method, you may need a fair amount of resources to record changes on a changelog.

## Differences

In this method, you compare the current data to the older data to note the differences. With this CDC method, you can know what has changed. This method works well for enterprises with low data volume.

#### Timestamps

This CDC method involves the use of modified dates and timestamps. When rows are modified, many database columns indicate that. Timestamp CDC relies on this information to pull data from the recently modified columns. Your database needs to have correctly working date-modified columns for this CDC method to work. Timestamp CDC is not helpful for databases that do not have this column.

### Use cases of CDC

#### Data replication/propagation

An organization may need to have several copies of data from a data source for different use cases. CDC ensures more efficient propagation of data. This replication solution records changes in real-time and sends them to target databases.

#### ETL for Data Warehousing

CDC is beneficial in loading data warehouses. Processing changes reduce the data load time, associated costs such as software licenses, and resources such as memory and CPU. Daily data changes only represent a fraction of the total data volume. CDC accommodates these changes and any future growth that may occur in data volumes.

#### Data Lake Ingestion

[Data lakes](/engineering-education/data-lake-vs-data-warehouse-vs-database/) have become popular as a data storage and processing platform for many data types. Enterprises rely on data lakes to support analytical use cases such as real-time client offers, social media motoring, fraud detection, and price and market trend analysis. Such use cases depend on real-time analysis of the latest data, and that is where CDC fits in.

#### Building Operational Data Stores (ODS)

Operational data stores([ODS](https://en.wikipedia.org/wiki/Operational_data_store)) refer to integrated data repositories that collect data from more than one source addressing a particular business area, say, marketing or finance, and providing valuable information to business intelligence (BI) applications and business users. The implementation of CDC ensures ODSs are kept up-to-date through a continuous identification and delivery of changes into the database. Otherwise, one would require to query the entire database for changes periodically.

#### Data sharing with customers, vendors, and partners

Often, partners and vendors require access to an organization&#39;s data platform to provide more insights or make critical investment decisions. That means they need a data integration tool to enjoy the same types of data movement, transformation, and access components found in the organization&#39;s data platform, and this is where CDC fits in.

### Conclusion

Change data capture enables an instant and incremental replication of data. Unlike other processes that record data changes on a massive, all-at-once transfer, CDC does this piece-by-piece. This ensures that data is always up-to-date. Both the target and base databases are continuously synced to implement new data updates.