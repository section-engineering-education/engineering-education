---
layout: engineering-education
status: publish
published: true
url: /engineering-education/deciding-between-cloud-spanner-and-microsoft-cosmos-db/
title: Deciding between Cloud Spanner and Microsoft Cosmos DB
description: This article will discuss and compare the features of both Cloud Spanner and Microsoft Cosmos DB and highlight their advantages and disadvantages.
author: eric-kahuha
date: 2020-11-26T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/deciding-between-cloud-spanner-and-microsoft-cosmos-db/hero.jpg
    alt: Cloud Spanner and Microsoft Cosmos DB example image
---
Creating a globally distributed database would traditionally require a lot of time and effort. You would have to host the database in a personal data center bearing the entire cost. The advancement in cloud computing and platforms as a service (PaaS) has made it easier to create globally distributed and scalable databases. 
<!--more-->
Particularly, the use of SQL-based databases has become more popular in the recent past. These databases provide you with a customized experience of sorting and processing large amounts of raw data. Many database providers exist, and they work on different nodes of the SQL database engines, including [Microsoft Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction) and [Google Cloud Spanner](https://cloud.google.com/spanner).

This article will discuss the features of both Cloud Spanner and Microsoft Cosmos DB and highlight their advantages and disadvantages. It will also compare the two to help you better choose the cloud database to use in the future.

### Features of Google Cloud Spanner
Google Spanner is a fully managed, scalable, relational database management service.

The platform can scale millions of nodes across multiple regions. Cloud Spanner nodes are dedicated resources that frequently perform background work to protect and optimize user's data, even when the user is not running a workload. Besides being integrated with access and identity management, it provides features such as [logging and auditing](https://cloud.google.com/spanner/docs/audit-logging).

Google Cloud Spanner's instance is comparable to a relational database management system ([RDBMS](https://www.codecademy.com/articles/what-is-rdbms-sql)) server. This instance is composed of one or multiple databases, which use the same [compute](https://www.zdnet.com/article/what-is-cloud-computing-everything-you-need-to-know-about-the-cloud/) and [storage](https://searchstorage.techtarget.com/definition/cloud-storage) resources. These resources are allocated during [instance](https://cloud.google.com/spanner/docs/instances) creation. 

Two main configurations, [Regional and Multi-Regional](https://cloud.google.com/spanner/docs/instances), control the compute and storage resources. These configurations decouple resources from data storage. This way, a user can decrease, increase, or relocate processing resources without executing changes to the underlying storage. 

Cloud Spanner supports automatic data replication. Instance configuration (the first configuration) determines the number of copies ([replicas](https://cloud.google.com/spanner/docs/replication)) to be created and their placement. Regional configuration allows data replication across three zones. 

These zones must come from within a single selected region. Multi-Regional configuration, on the other hand, supports data replication across four zones. These zones can come from different regions depending on what continent the user specifies.

![GCP zones and regions](/engineering-education/deciding-between-cloud-spanner-and-microsoft-cosmos-db/gcp-regions-and-zones.jpg)

[Image source](https://cloud.google.com/about/locations#regions)

Essentially, these two configurations (Regional and Multi-Regional) provide safety against failure of zones and regions. Mainly, regional configuration ensures the safety of an entire zone. Multi-regional configuration, on the other hand, ensures the safety of an entire region.

Cloud Spanner supports atomicity, consistency, isolation, durability ([ACID](https://www.bmc.com/blogs/acid-atomic-consistent-isolated-durable/#)) transactions. 

Spanner offers 99.999 percent availability. It enables users to perform both the [read-only and read/write](http://docwiki.embarcadero.com/InterBase/2020/en/Read-write_and_Read-only_Databases) modes of transactions. 

In this case, a user can perform modifications such as deletes, updates, and inserts, to the data with the read/write mode. The read-only mode incorporates just read operations that don't require an update.

### Features of Cosmos DB
Microsoft Cosmos DB is a Platform as a Service ([PaaS](https://searchcloudcomputing.techtarget.com/definition/Platform-as-a-Service-PaaS)) service in [Microsoft Azure](https://azure.microsoft.com/en-us/). 

PaaS is a deployment environment in the cloud that provides a platform for individuals and organizations to develop, manage, and run cloud-enabled enterprise applications. Azure is Microsofts public cloud offering. 

With Azure Cosmos DB, users can build and distribute their applications across an Azure data center. Manual work and configuration is eliminated, in this case.

The globally distributed, multi-model database is available in all regions where [Azure is available](https://azure.microsoft.com/en-us/global-infrastructure/services/?products=cosmos-db&regions=all). This is possible considering its turnkey global distribution that automatically scales and replicates data across various data centers in the Azure network.

![Cosmos DB regions](/engineering-education/deciding-between-cloud-spanner-and-microsoft-cosmos-db/cosmos-db-regions.jpg)

[Image source](https://azure.microsoft.com/en-us/global-infrastructure/global-network/)

Cosmos DBs multi-model feature supports multiple models, including table storage, graphs, key-values, and document storage in a single database. It offers high availability and consistency across all these data models, irrespective of their nature, for data storage.

Cosmo DB offers comprehensive [service level agreements](https://azure.microsoft.com/en-us/support/legal/sla/cosmos-db/v1_3/#) (SLA) of 99.99% for latency, availability, consistency, and throughput. Latency is below 15ms for document write and 10ms for document read operations. When latency is at a minimum, users experience a faster, seamless experience.

### Pros and cons of Microsoft Cosmos DB
CosmosDBs use of data containers projectable as different types of datasets is unique. It provides an SQL interface for documenting projections, including stored procedures and triggers. It is a simple to use service.

Microsoft joined the cloud market and repurposed its on-premises software for the cloud. These software include [Windows Server](https://www.microsoft.com/en-us/windows-server), [SQL Server](https://www.microsoft.com/en-gb/sql-server/sql-server-downloads), [Office](https://www.office.com/), [.Net](https://dotnet.microsoft.com/), [Microsoft Dynamics 365](https://dynamics.microsoft.com/en-us/), and [SharePoint](https://support.microsoft.com/en-us/office/what-is-sharepoint-97b915e6-651b-43b2-827d-fb25777f446f). 

Many organizations use Windows and other Microsoft associated software, that is essential for Cosmos DBs success. Cosmos DB tightly integrates with other Microsoft applications. Thus, organizations using a lot of Microsoft software find it sensible to also use Cosmos DB. This builds on customer loyalty.

On the flip side, users associate the Cosmos DB platform with some imperfections. Cosmos DB fails to provide a seamless way to switch between [database-provisioned throughput]((https://docs.microsoft.com/en-us/azure/cosmos-db/set-throughput)) and [container-provisioned throughput](https://docs.microsoft.com/en-us/azure/cosmos-db/set-throughput#). 

You have to recreate the database for you to switch successfully. Besides, Cosmos DB does not allow documents from different logical partition to participate in the same transaction. And writes from different containers cannot be part of the same transaction.

### Pros and Cons of Google Cloud Spanner
One of the strengths of Google Cloud Spanner is its strong offering in containers. The [Kubernetes standard](https://cloud.google.com/kubernetes-engine) developed by Google is now also offered by Azure. Google Cloud Platform ([GCP](https://console.cloud.google.com/)) deals with high compute offerings, such as big data, machine learning, and analytics. GCP provides significant scale and load balancing.

Spanner is capable of handling large volumes of data. Its use is not limited to applications of large sizes. Further, it allows the standardization of a single database engine for all workloads requiring an RDBMS. This is very beneficial to organizations.

On the downside, it may be challenging to create an instance in a local environment for Cloud Spanner. A development environment needs to be as close to production as possible. But this is not the case with Spanner because you must rely on a full spanner instance to accomplish this need. You may choose a single region instance to save on costs.

### Major differences between Cloud Spanner and Microsoft Cosmos DB
Google Spanner supports concurrent ACID (atomicity, consistency, isolation, and durability) guarantees across more than one operation. Cosmos DB supports ACID only within the limit of a single operation. ACID are properties that ensure reliable processing of [database transactions](https://en.wikipedia.org/wiki/Database_transaction). ACID databases guarantee data correctness and maintainability in extensive production systems.
 
Scalability is an essential feature of cloud databases. Google Spanner is automatically scalable, while Azure Cosmos DB is not. 

A manual database requires you to explicitly direct it to the keys being used for [sharding](https://www.digitalocean.com/community/tutorials/understanding-database-sharding). In sharding, we break large tables down into smaller chunks (shards) spread across several servers. As a subset of the whole dataset, a shard serves a portion of the overall workload.
 
Cosmos DB offers distributed access aimed at providing redundancy and disaster recovery. Cloud Spanner also offers some similar features. However, its offering is limited across datacenters in a single region, meaning that you can only work with, say, EU- or US- only audience. 

This is a setback because cloud services are needed globally. Spanner beats Cosmos DB with its low latency and strong consistency, but this is less valuable where cross-regional data replication is required.
 
### Conclusion
This article compared two cloud databases: Cosmos DB and Cloud Spanner.  We went over how these cloud databases can provide you with a customized experience of sorting and processing large amounts of raw data. We hope you are now better informed to make the best choice that best suits your needs.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
