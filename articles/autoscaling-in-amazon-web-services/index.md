---
layout: engineering-education
status: publish
published: true
url: /engineering-education/autoscaling-in-amazon-web-services/
title: Autoscaling in Amazon Web Services (AWS) - An Overview
description: This article will go over Amazon Web Services or (AWS) which is a tool that provide various ways that enhance data management, storage, development, and networking in organizations.
author: onesmus-mbaabu
date: 2020-12-14T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/autoscaling-in-amazon-web-services/hero.jpg
    alt: Autoscaling AWS example image
---
Amazon Web Services (AWS) is a cloud computing services provider that has application programming interfaces (APIs) and platforms that are used for cloud computing by governments, individuals, and companies. These platforms include a mixture of various offerings such as [software as a service (SaaS)](https://en.wikipedia.org/wiki/Software_as_a_service), [infrastructure as a service (IaaS)](https://en.wikipedia.org/wiki/Infrastructure_as_a_service), and [platform as a service (PaaS)](https://en.wikipedia.org/wiki/Platform_as_a_service).
<!--more-->
### Introduction to Amazon Web Services
SaaS is a service model where a software is licensed out (usually) on a subscription basis (eg. Google Drive). PaaS is a service that provides the infrastructure, hardware, and software required for application development (eg. AWS Elastic Beanstalk). IaaS is a service model that provides the fundamental compute, storage, and network resources for cloud computing (eg. AWS EC2).

Some of the tools offered by AWS include content delivery, database storage, and computing power. Other services provided include data management, hybrid cloud, networking, artificial intelligence, development tools, analytics, security, and mobile development.

![Amazon Web Services](/engineering-education/autoscaling-in-amazon-web-services/amazon-web-services.png)

[Image Source: Quora](https://qph.fs.quoracdn.net/main-qimg-ae46c65ca4d8e7d0b61acbe429e0b04a)

### What is autoscaling?
Autoscaling refers to a cloud computing feature in which computational resources are varied automatically based on usage. In this context, computational resources are measured by the number of (active) servers. In this feature, computational resources are added or removed depending on demand to ensure that any traffic slump or surge is handled smoothly.

For example, when there is a heavy traffic load, the autoscaling feature increases the computational resources to reduce the risk of crumbling. In times of low traffic, the cloud auto-scaler will automatically reduce computational resources.

### Introduction to AWS autoscaling
AWS autoscaling is an advanced feature offered in Amazon Web Services. In this feature, resource management is done automatically depending on the server load. The resources are scaled up or down through various mechanisms.

AWS offers flexibility in the configuration of a threshold CPU utilization value. A threshold level of resource utilization can also be configured. When the threshold is reached by the server, the AWS service will automatically initiate the scaling of resources.

### Components of AWS autoscaling
The main components of AWS that are involved in autoscaling include autoscaling groups, Amazon Machine Image (AMI), load balancer, snapshot, and EC2 instance.

#### EC2 instance
This is a virtual server that exists in the Elastic Compute Cloud (EC2). AWS applications are deployed through this server. This web service provides secure and resizable cloud computing capacity.

#### Autoscaling group
This is a collection of EC2 instances and related policies. 

An autoscaling group performs the following tasks:

- It adds or removes instances depending on the load of the server. When there is a high load, it will add instances. If the load is low, it will remove instances (extra ones).
- It scales EC2 instances up or down, which helps in managing the availability of applications.
- It runs the required number of instances. For example, if the required number of instances is 5, then it will run 5 EC2 instances.

![Autoscaling Group](/engineering-education/autoscaling-in-amazon-web-services/autoscaling-group.png)

[Image Source: Tudip](https://tudip.com/wp-content/uploads/2018/12/autoscaling-group.png)

#### Amazon Machine Image (AMI)
This is an executable image that is used in the creation of new instances. AMI provides all the information that is needed in the launch of new instances. Before launching an instance, an AMI must be specified.

Multiple instances can be launched from one AMI. In this case, all the instances have the same configuration. Instances that require dissimilar configurations should be launched from different AMIs.

#### Snapshot
This is a copy of the data that exists in an instance. Snapshot is a storage image, unlike AMI, that is an executable image.

#### Load balancer
A load balancer plays the role of dividing traffic among instances. It enhances the automatic identification and redirection of traffic based on loads. Load balancers enable concurrent users to be handled efficiently. They also make applications reliable.

There are two main types of load balancers: classic load balancer, and application load balancer. In a classic load balancer, traffic is divided equally among all instances. An application load balancer redirects traffic among instances using certain user-defined rules.

### Types of AWS autoscaling
There are four main types of AWS autoscaling: manual scaling, scheduled scaling, dynamic scaling, and predictive scaling.

#### Manual scaling
In this type of scaling, the number of instances is changed manually. It involves a manual execution of scaling actions. The number of instances can be increased or decreased manually using a CLI or console. This type of scaling is ideal when users do not need automatic scaling.

#### Scheduled scaling
This type involves the automatic execution of scaling actions based on certain schedules. They can be executed at a specific time during the day, month, week, or year. This type of scaling is ideal when traffic occurs at a specific time.

For example, it can be used if there is heavy traffic during the weekends and relatively less traffic during the weekdays. In this case, the number of instances can be scheduled to increase when the weekend begins. This number can be reduced when the weekend ends.

#### Dynamic scaling
In dynamic scaling, the number of EC2 instances is changed automatically based on signals that are provided by a CloudWatch alarm. Dynamic scaling is mostly employed when there is unpredictable traffic.

#### Predictive scaling
Predictive scaling involves using [machine learning](/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/) algorithms to program the desired number of instances. Future traffic can be predicted to provide the appropriate number of instances. This type of scaling is ideal when the traffic is predictable.

### How AWS scaling works
AWS uses the aforementioned components to complete the process of autoscaling. First, an AMI of a user’s server should be created. The AMI will provide all the information that is needed for launching instances. The template of configuration should contain all the systems.

After an AMI has been created, the configuration should be launched. At the launch configuration, the right type of instance should be chosen based on the need. An AWS autoscaling group should be created after a configuration has been launched. This group will be used in the launching of new instances.

![AWS Autoscaling](/engineering-education/autoscaling-in-amazon-web-services/aws-autoscaling.png)

[Image Source: Jayendra](https://jayendrapatil.com/wp-content/uploads/2016/03/AWS-Auto-Scaling-Configurations.png)

When there is a heavy traffic, the AWS autoscaling service will initiate the addition of new EC2 instances with identical configuration to the server. This happens with the aid of AMI. When there is relatively less traffic, the excess number of instances will be removed.

When new instances are launched, the load balancer will divide traffic among them. The system load is used as the basis for the division of traffic. The ratio of division depends on the type of load balancer employed. In the case of a classic load balancer, the traffic will be divided equally. In an application balancer, some rules will be used to guide the division of traffic.

### Getting started with AWS autoscaling: A simple practical guide
Using autoscaling in AWS requires you to make two main configurations: launch configuration and creating an autoscaling group. Before performing these set-ups, users should meet the following prerequisites.

- An AWS account. This can be created [here](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=header_signup&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start).
- Stable internet access
- AMI. Follow this [link](https://linuxroutes.com/create-custom-ami-aws/#:~:text=%20Steps%20to%20create%20custom%20AMI%20in%20AWS%3A,you%20can%20change%20the%20size%20of...%20More%20) to get a simple guide on how to create a custom AMI.

#### Launch configuration
To perform launch configurations, go to the right hand side of the dashboard and select the icon 'autoscaling'. There are two aspects under this icon: launch configuration and autoscaling group. Choose 'launch configuration' and then select 'create launch configuration'.

The following diagram shows the six main steps taken in creating a launch configuration (at the top).

![Launch Configuration](/engineering-education/autoscaling-in-amazon-web-services/launch-configuration.png)

[Image Source: WhizLabs](https://www.whizlabs.com/wp-content/uploads/2017/04/Figure2_LaunchConfiguration.png)

**Step 1:** Choose AMI

This step involves choosing the AMI that was created above.

**Step 2:** Choose instance type

In this step, users should choose instance types that suit their need.

**Step 3:** Configure details

This involves giving the launch configuration a name depending on the project you are working on. In this step, you can also enable monitoring and select the purchasing option.

**Step 4:** Add storage

This step involves creating the storage settings for your instance.

**Step 5:** Configure security group

Here, users should select a security group that will be attached automatically when a new instance is launched.

**Step 6:** Review

Review the configurations made in steps 1 to 5. Users can edit their settings based on their needs. If all the details are correct, click on 'create launch configuration'. This will lead you to a new window requiring you to choose a key pair (for the new instance).

When this is done, click on 'create launch configuration'. This will generate a message showing the status of launch configuration. If the launch configuration is done successfuly, proceed to the next stage of creating an autoscaling group.

#### 2. Creating an autoscaling aroup
To create an autoscaling group, go to the right hand side of the dashboard and click on the icon 'autoscaling'. Choose 'create autoscaling group'.

The following diagram shows the five main steps taken in creating an autoscaling group.

![Creating Autoscaling Group](/engineering-education/autoscaling-in-amazon-web-services/creating-autoscaling-group.png)

[Image Source: WhizLabs](https://www.whizlabs.com/wp-content/uploads/2017/04/Figure3_AutoScalingGroup.png)

**Step 1:** Configure autoscaling group details

This step involves configuring settings for aspects such as monitoring, load balancers, and health check type.

**Step 2:** Configure scaling policies

Some of the aspects that need configuration in this step include the number of instances needed, metric type, and target value. Users can also create alarms in this step.

**Step 3:** Configure notifications

Here, users should select notifications that will be sent to a certain endpoint (e.g email) if specific events occur (e.g instance termination).

**Step 4:** Configure tags

In this step, users should add new tags in the form of key-value pairs. These are used to identify a user's group.

**Step 5:** Review

Establish whether all details are correct. If this is the case, click on 'create autoscaling group'. This will generate a message indicating that the action is successful.

### Benefits of AWS autoscaling
AWS autoscaling provides the following benefits to users:

- AWS autoscaling enables users to minimize costs. This is because total usage is the basis for the total price charged, rather than capacity. When the load is low, autoscaling can enable some unutilized servers to be asleep, which reduces electricity costs.
- It can help in protecting against application, hardware, and network failures. This is because unhealthy instances can be replaced by the AWS autoscaling service.
- It enhances smart scaling decisions. This autoscaling service enables users to create resourceful scaling plans in which resources can be changed automatically to respond to any shift in demand.
- It enhances the optimal performance of applications. This is achieved because the autoscaling service monitors applications continually. Optimal performance happens even when workloads are unpredictable.
- AWS autoscaling allows users to set up scaling fast. Target utilization levels can be set for multiple resources using a single interface.

### Conclusion
Amazon Web Services provide various tools that enhance data management, storage, development, and networking in organizations. Autoscaling in AWS is important to organizations because it helps in optimizing utilization, costs, and performance. This autoscaling service can be an ideal choice for organizations or companies that want to optimize the performance of their applications.

### Resources
[Linux Daddy](https://linuxdady.com/aws-autoscaling-configuration-step-by-step-for-beginners/)

[Amazon](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html#:~:text=%20What%20is%20Amazon%20EC2%20Auto%20Scaling%3F%20,an%20AWS%20account,%20you%20can%20access...%20More%20)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)