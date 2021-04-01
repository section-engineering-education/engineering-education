---
layout: engineering-education
status: publish
published: true
url: /engineering-education/cost-optimization-and-use-cases-of-amazon-s3-intelligent-tiering/
title: Cost Optimization with Amazon S3 Intelligent Tiering
description: This article will go over what Amazon S3 intelligent tiering is, how it works, and how it can benefit organizations.
author: eric-kahuha
date: 2020-11-23T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cost-optimization-and-use-cases-of-amazon-s3-intelligent-tiering/hero.jpg
    alt:  s3 intelligent tiering example image
---
[Amazon](https://aws.amazon.com/) Web Services (AWS) launched [Amazon S3](https://aws.amazon.com/s3/) in 2006, and since then, the service has undergone continuous improvement. These improvement include additional storage classes to help enable secure object storage at a low cost for organizations of all sizes.
<!--more-->
With Amazon S3, organizations develop lifecycle policies for their objects and encrypt [data at rest](https://securityfirstcorp.com/what-is-data-encryption-at-rest/). They can also manage access controls by employing built-in security features that include bucket policies and control lists.

### What is S3 intelligent tiering?
Amazon S3 is a storage infrastructure by the Amazon Company offered to users to store their objects. Users also rely on Amazon S3 for data archival, data backup, and for analytical data storage. S3 is also used to distribute [static content](https://blog.stackpath.com/static-content/#).

Amazon introduced an additional storage class, the S3 Intelligent Tiering, in 2018. It monitors objects in this S3 Intelligent Tiering class for access patterns. These patterns act as a guide for the automatic placement of objects in the most economical storage class.

 Other Amazon S3 [Storage Classes](https://aws.amazon.com/s3/storage-classes/) are:
- S3 Standard- acts as a general-purpose storage of frequently accessed (FA) data.
- S3 One Zone-Infrequent Access (S3 One Zone-IA) and S3 Standard-Infrequent Access (S3 Standard-IA) designed for long-lived and frequently accessed data.
- Amazon S3 Glacier Deep Archive (S3 Glacier Deep Archive) and Amazon S3 Glacier (S3 Glacier) designed for digital preservation, long-term archive.
- S3 Outposts storage class used to store S3 data on-premises.

With Amazon S3, users can manage their data throughout its lifecycle. The S3 Lifecycle Policy ensures automatic data transfer to different storage classes with no changes to the application.

The combination of the S3 Lifecycle Policies, S3 Storage Class Analysis, and S3 Storage Classes enables users to save on storage costs without affecting performance or data availability.

Users of Amazon S3 Intelligent Tiering make their data easily accessible across multiple availability zones.

Thus, S3 Intelligent Tiering is a perfect object storage option for organizations with changing data access patterns, unpredictable workloads, and those lacking experience optimizing and managing storage patterns.

### Why S3 intelligent tiering?
Amazon's S3 Intelligent Tiering is a cost-effective cloud storage option. It charges a fee to monitor and automate data movement between S3 tiers developed for infrequent access (IA) and frequent access (FA).

S3 Intelligent Tiering moves objects not accessed for a specified time into the IA tier to save storage space. The objects are then moved back into the FA tier if accessed at a later point in time.

Companies that experience uncertainty in their data access frequency can leverage S3 Intelligent Tiering for cost-saving. However, those with high confidence in their data access frequency may not find it the best storage class option.

### Use cases of S3 intelligent tiering
#### Unpredictable workloads
Let’s take the example of a company engaged in collecting and storing images. People access these images frequently when newly uploaded. However, after some time, access to these images decreases.

It’s not unusual for months to go by with no one accessing these images, and this is where intelligent tiering comes in. After 30 days of no access, intelligent tiering moves the images to the IA tier. This would help the company save money on costs.

If the unpredictable happens in a particular geographical area, such as a hurricane, people’s interest in those images could rise again. Intelligent tiering will then monitor hurricane images since it’s what users are interested in at the time.

It will then automatically move those images related to hurricanes back to the frequent access tier from the infrequent access tier to meet users demands.

#### Changing data access patterns
Organizations use Amazon S3 to build their [data lake](https://aws.amazon.com/big-data/datalakes-and-analytics/what-is-a-data-lake/) architectures. These organizations employ hundreds of data scientists who use diverse applications. These scientists store objects in their companies data lakes daily.

A scientist may store information and forget about it. In such a situation, S3 intelligent tiering would help move objects, that are not accessed for 30 days, to the IA tier.

#### Managing storage patterns
Organizations that use Amazon Web Services to host their data can also benefit from understanding their storage patterns better. They can take insights from their Lifecycle Policies and S3 Storage Class Analysis to decide when to transfer information between different S3 storage classes.

Yet companies inexperienced in cloud storage may incur (unintended) expenses if they are not addressing changes in data access needs frequently. Thus, it's imperative for companies to understand data storage patterns to ensure low storage costs if they plan to do it manually.

With intelligent tiering, a company can enjoy automated storage optimization. Moving data correctly between the FA and IA tiers based on needs, will help evade charges for dormant data. Data stored in the FA tier has the same fees as data hosted in Standard S3 Storage.

Data stored in the IA tier, is charged a lower storage charge. With the S3 Standard, data can transferred between tiers at no extra cost, thus cutting on costs. Companies unable to understand their data access and usage patterns can greatly benefit from using this S3 Standard.

### Cost optimization
The popularity of S3 Intelligent-Tiering is greatly due to its ability to help organizations cut on their cloud storage costs. They will not pay any charges to retrieve data from S3 Intelligent-Tiering storage.

Objects accessed in the IA tier move back to the FA tier automatically. Objects can move or be retrieved between tiers with no additional data retrieval fees or tiering fees.

S3 Intelligent-Tiering has a simple pricing model, and can help predict the applicable fees easily, unlike the previous offerings from Amazon Web Services.

S3 Intelligent-Tiering has six different storage cost options that allow users to address diverse storage requirements with multiple data sets. Yet to lower storage costs, they will need to plan effectively and continually review data access patterns.

They will have to select the right storage class on Amazon S3 to optimize costs. But the choice is subject to retrieval and access urgency requirements. They can implement further optimization using S3 Lifecycle policies.

### Conclusion
Amazon S3 Intelligent Tiering optimizes storage costs, and it allows companies to focus attention and resources on designing databases and their applications.

This storage class ensures organizations reduce their storage costs by ensuring data availability as they pay little for frequently accessed data.

S3 Intelligent Tiering is great because both companies new to cloud computing and those with more of an understanding of access pattern optimization can leverage this technology for their data storage needs.
