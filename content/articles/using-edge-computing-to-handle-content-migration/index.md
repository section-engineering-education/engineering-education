---
layout: engineering-education
status: publish
published: true
url: /using-edge-computing-to-handle-content-migration/
title: Using Edge Computing to handle Content Migration
description: This article will cover content migration, the challenges that arise from this process, and how using Edge Computing solves them.
author: ephraim-njoroge
date: 2022-05-11T00:00:00-03:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-edge-computing-to-handle-content-migration/hero.png
    alt: Using Edge Computing to handle Content Migration example Image
---
Content migration involves moving information from one Content Management System to another. 
 <!--more-->
The process sometimes sounds simple, but it usually reveals areas of improvement in the site architecture, the design, and the content itself. 

If a redesign is needed, the migration process shifts from [lift and shift](https://cloud.netapp.com/blog/what-is-a-lift-and-shift-cloud-migration) to reorganizing and redesigning the architecture or content.

A typical migration involves redesigning information architecture, pages, content audit, new taxonomy, or even rewriting content. Sometimes migration may involve switching from one URL to another, which poses many challenges. 

Most of these issues can be solved using Edge Computing, which will be covered in this article.

### The concept of Edge Computing
[Edge computing](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/) gradually changes how data is handled, processed, and delivered to millions of devices worldwide.

This technology is growing rapidly due to the increased number of [IoT](https://www.zdnet.com/article/what-is-the-internet-of-things-everything-you-need-to-know-about-the-iot-right-now/) devices alongside applications that require real-time data processing. 

Fast networking technologies such as 5G networks promote edge computing by facilitating real-time applications. These applications include video conferencing and processing, self-driving cars, AI, and robotics.

Edge Computing was developed to address the issue of bandwidth costs for data traveling long distances. However, the rise of IoT-generated data and real-time applications that require edge processing has made the technology grow faster.

Edge Computing can be defined as distributed computing topology that processes information close to the edge. 

Edge, in this case, means where devices or people producing or consuming the information are located. The technology brings data processing and storage closer to the consumer devices rather than relying on a central location that is far away. 

Edge Computing aims to ensure that applications using real-time data do not suffer from latency issues that significantly affect performance. This would save the organization's cost as the processing happens locally, hence no need for centralized or cloud-based locations.

Edge computing is crucial when it comes to content or data migration. For example, let's assume that we manage a website that hosts huge content, such as thousands of articles. Then, a need arises that requires us to change the website's domain name.

Redirecting more than a million links from our old domain to the new domain will be a huge challenge. 

Typically to avoid link breaks, we can set a [redirect server](https://www.sciencedirect.com/topics/computer-science/redirect-server) that handles the traffic from the old domain and redirects them to the new domain. 

We can use edge computing to make these tasks even easy and the whole experience better. We will cover later the issues that arise when migrating content and how edge computing solves them and optimizes the system.

### Successful Content Migration Strategies
This section will cover some of the best practices to follow when performing a successful content migration. 

We usually follow an approach and checklist when migrating information in the system. The details may not be the same depending on the system and nature of information being migrated. However, the migration process always follows a general approach.

The typical content migration process involves strategy, planning, preparation, and migration phases, as explained further in the following paragraphs:

#### Phase 1: Strategy
This phase covers the following:

1. **Reason for migration** 

One reason may be that the vendors may no longer support the current system, hence the need to migrate to the new system. 

Also, an organization may be planning to unify its systems for a better user experience. Whatever may be the reason, the change should impact the overall system.

2. **Scope of migration** 

It determines which information needs to be migrated. For example, suppose the organization plans to do away with the old system. In that case, all information may need to be migrated. 

The organization should consider performing migrations in phases or targeting particular departments or processes for a file share cleanup. This stage impacts the timeline required to perform migrations.

3. **The team involved** 

A complex migration process requires commitment and resources from the organization. First, the top-level management in the organization needs to identify the need and allocate resources. 

Afterward, the migration team can then be determined. The team should at least consist of business users, technical specialists, and information management specialists.

#### Phase 2: Planning
The next phase is to plan for the migration. This involves the following steps:

1. **Source system inventory** 

This step affects the information in the system, its metadata, and how it is categorized or classified. Also, any relevant business rules or workflows and security settings are noted at this stage.

2. **Involve key users** 

In this step, content users and owners who will approve the migration are noted.

3. **Source system information value** 

This step determines the value of the information the source system holds. It checks whether information can be recreated, or is redundant or obsolete. 

These checks are done because the organization would not migrate the information that adds no value to the business. In addition, a business decision has to be made on which content to migrate and what to leave out.

#### Phase 3: Preparation
Until this point, the plan is already laid out. The migration team can prepare for the actual migration of the content. The following tasks are to be performed:

1. **Gather migration tools** 

These are the tools that will be used in the migration process. They assist in identifying the proper folders and content to be migrated. 

They are also integrated with analytics to help classify information. However, the team involved in migration should be trained on how to use the tools. Additionally, the tools also need to have been gathered before the actual migration.

2. **Analyze old and new system metadata** 

Both old and new systems' metadata should be standardized. For example, folder structures should be analyzed and optimized correctly after migration.

3. **Prepare target system** 

The system's key tasks need to be set up, such as security roles and settings, classification schemes, metadata, and workflow setup. 

In addition, users should be prepared to use the system once the migration is over.

#### Phase 4: Migration
After completing all the phases, the final phase involves the actual migration of the system. The steps may vary depending on the system that the organization is using. However, below are the basic guidelines:

1. **Piloting and testing the migration process** 

The process is first tried with relatively small data sets to ensure the correct approach. However, larger data sets should later be used to identify issues involved with such data.

2. **Monitor migration** 

During the migration process, close monitoring should be made to identify any potential errors or issues associated with the process.

3. **Perform quality control** 

A quality technical check should be made to ensure correctness for every significant amount of content migrated. 

At this step, users who are conversant with the information should contribute to ascertaining whether the system is working correctly.

4. **Disabling access to the old system** 

Access to the old system should be disabled instead of being deleted immediately. This is because some data might not have been successfully migrated due to legal or regulatory issues. 

However, it is helpful for end-users not to access the old system once the migration process is over.

Content migration can be complex to undertake. It comes with some issues attached to it; some are technical. However, most technical issues involved can be handled through edge computing.

### Using Edge Computing to handle Content Migration issues
#### Latency issues
We will take a scenario whereby servers are located in North America. Suppose a site visitor in Asia accesses the old URL. 

In that case, the request will travel to North America only to miss out on the requested resource.

Then the redirect instructions will force the visitor back to where the resource is currently located. 

The browser will then send another request to North America to fetch the actual content on arrival. Finally, the visitor will access the original target. 

Below is the diagram that demonstrates this scenario:

![Latency](/engineering-education/using-edge-computing-to-handle-content-migration/latency.png)

The visitor requests content from the old URL, and the old server responds with the redirect instructions to the new domain. 

The browser will send redirect instructions to the new domain. The response is then sent back to the site visitor.

The issue with the redirect chain is that the visitor has to wait for two round trips halfway across the world. However, using edge computing functions can significantly reduce the waiting time.

Edge functions allow developers to deploy serverless functions in any location around the globe nearest to the users. 

For example, with the help of edge functions in handling the redirect requests, the initial user request would have instead interacted with the nearest edge server to fetch the redirect information.

We can use Edge Computing in the scenario we highlighted above. A site visitor in Asia would try to access the old URL. The request will only travel to the nearest edge server location, probably in the same city. 

However, the redirect instructions would still be in a different location. Once the browser receives the redirect instructions, everything will play as previously, only that the visitor does not have to wait longer to access the content.

Below is a clear illustration of what happens when Edge Computing is implemented:

![Edge Computing](/engineering-education/using-edge-computing-to-handle-content-migration/edge-compute.png)

The site visitor requests the old URL. Then, the edge server, closest to the visitor, responds with redirect instructions. The browser proceeds to the new URL, and the response is sent back to the visitor.

#### Restructuring issues
Another issue familiar with content migration is that the organization may need to change the URL structure for their blog posts. 

The organization might be comfortable changing their blog site from IDs to using the blog post title in the URL. For example, a blog post can appear as shown below:

`old-url.com/post/1`

The link to the same blog post can be changed to appear as follows:

`new-url.com/blog/why-wordpress-is-important-as-cms`

The following is happening in the above links:
- The domain name and structure have changed.
- The blog post route `/post` has been changed to `/blog`.
- The blog slug for each post has been changed to use blog titles in place of the post ID.

Handling the above two changes is possible through [NGINX rewrite rules](https://www.nginx.com/blog/creating-nginx-rewrite-rules/) and [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions). 

However, the third change can be challenging to handle since there is no way a program can map an old URL to a new URL.

We can try to solve the challenge by setting up a server that would take the requests from the old domain name. Then it would search for the needed post in a site database using a unique post ID. 

Next, it will create a new URL using the fetched blog post title and return the redirect information to the new URL.

However, the above will pose a few challenges. The database queries will add latency to the request and may be expensive to keep running. 

We need to generate a one-to-one mapping of all the old web addresses to the new ones. This implies that every web address on the old domain will have a unique URL rewrite rule. A challenge comes if it involves many posts as it will lead to a lot of work.

However, one can create a one-time script during migration that loops through each database entry and automatically generates the rewrite rules. 

Unfortunately, the case would be identical if we use edge functions. We will still need to create one-to-one mappings, raising latency issues.

The critical difference is that web servers such as NGINX read the rules sequentially. This would mean that if we have 100,000 redirect rules and a visitor requests the last one. The server must loop through all the rules before reaching the desired one to return the redirect information.

Edge Computing offers [key-value storage](https://www.akamai.com/blog/news/now-available-edgekv-distributed-key-value-store). This implies that each of the 100,000 redirect rules will have *O(n)* complexity in the above scenario. 

In simple terms, it takes longer to reach the last item in the list as the items in the list continue to increase.

Edge's key-value storage devices come with an O(1) complexity. This means that no matter the number of items in the list, the look-up times will remain the same. 

In our previous example, we can save the URL mappings inside edge key-value storage. Then edge functions can automatically check if there is redirect information in each request.

This would follow the use steps below:
1. The user will request the old URL.
2. Then, the edge function near the user takes care of the request.
3. Next, using the edge function, we will search for the redirect web address inside the edge key-value storage using the requested web address.
4. The user will get redirect information from the edge function.
5. The user will access the new web address.
6. The new web address server responds to the request.

Using edge functions to handle the restructuring issues solves the latency issues. It also improves the performance for large-scale redirects where regex or wildcards are not effective.

#### Complexity issues
NGINX comes with added complexity for serving static assets, performing reverse proxy, and load balancing. 

A redirect server does not have to be complex. This complexity is much reduced when using Edge Computing, making developers more productive. 

Setting up and configuring NGINX is complex and requires developerS to read through its documentation from time to time.

Edge Computing works with [serverless functions](https://www.pubnub.com/blog/what-is-a-serverless-function/), which are highly scalable. Developers do not need to worry about provisioning a server, the resources the server needs, or even the region to deploy servers. 

With Edge Computing, developers write functions, and the service provider decides where to run the code efficiently. It can scale accordingly to handle any additional load.

### Conclusion
In this article, we have discussed how Edge Computing offers benefits when performing migrations and handling redirects. These benefits include:
- Reduced waiting time since redirect servers work more effectively.
- Minimal compute time required to process large URL mappings.
- There is less complexity involved in edge redirects than in provisioning and scaling a redirect server.

### Further reading
- [A Guide to URL redirection](https://www.semrush.com/blog/redirects/).
- [Creating NGINX rewrite rules](https://www.nginx.com/blog/creating-nginx-rewrite-rules/).
- [Edge Key Value Storage](https://docs.fastly.com/en/guides/about-edge-dictionaries).
- [Cloudfare Edge Key Value Storage](https://www.cloudflare.com/products/workers-kv/).

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)