---
layout: engineering-education
status: publish
published: true
url: /comparing-aws-shared-responsibility-models-for-different-products/
title: Comparing AWS Shared Responsibility Models for Different Products
description: This article will explain what the AWS shared responsibility model is and why it is important to businesses.
author: bashiir-isla
date: 2022-02-23T00:00:00-02:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/comparing-aws-shared-responsibility-models-for-different-products/hero.jpg
    alt: Automation Example Image
---
Most cloud service providers operate under a shared responsibility model, and AWS is no exception. The cloud provider and customer share security and compliance responsibilities in this arrangement.
<!--more-->
Organizations are moving their workloads from on-premise to the cloud. As a result, they benefit from enhanced user performance, increased business efficiency, and a shorter time-to-market. Amazon Web Services ([AWS](/engineering-education/what-is-aws-and-why-is-aws-so-popular/)) is a cloud platform where organizations can deploy their workloads.

However, one area of concern for these organizations as they capitalize on this strategy is the security of their AWS environment. As a chief information security officer or a security practitioner in that organization, you'll need to understand the security of the AWS environment.

Ideally, understanding the AWS shared responsibility model is a significant starting point to improving the security of the organization's AWS environment.

This article will explain what AWS shared responsibility model is and why it is important to businesses. We'll also compare AWS shared responsibility models for different products and discuss the best practices for working with these models.

### What are the AWS Shared Responsibility Models?
The cloud provider and customer share security and compliance responsibilities in this arrangement. [AWS shared responsibility model](https://aws.amazon.com/compliance/shared-responsibility-model/) defines cloud customers' responsibilities and those of AWS.

Ideally, AWS takes care of AWS infrastructure security. And this includes protecting the networking, database, storage, and computing services against intruders.

Besides this, it provides [the Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html) to check the health of the cloud infrastructure and manage cyberattacks. Thus, the protection of physical facilities, hardware, and software that host AWS is the provider's responsibility.

On the other hand, it is the customers' responsibility to deploy and configure SDDC ([software-defined data center](https://searchconvergedinfrastructure.techtarget.com/definition/software-defined-data-center-SDDC#)) and virtual machines. Customers also manage network traffic from remote networks and configure AWS security group virtual firewall. It is also their responsibility to update and patch the guest operating system and related software.

In short, AWS takes care of the security infrastructure requirements and leaves the customers to handle the security requirements of the services they build on top of these infrastructures. For instance, AWS will configure infrastructure devices, and the customer will configure their own applications, OS, and databases.

### Why AWS Shared Responsibility Models Matter?
The AWS shared responsibility model ensures a secure environment for deploying and managing applications and data. It holds AWS accountable to secure the cloud infrastructure and administrative systems.

In that case, you can invest your time and resources in protecting your data and applications in the AWS cloud. AWS shared responsibility model empowers you to take control of the security of your organization's workloads in the cloud. With this in mind, you're better prepared to detect malicious threats and fix issues quickly.

### Comparing AWS Shared Responsibility Models for different products
Your security responsibilities and those of AWS may differ depending on the AWS Shared Responsibility Models product you're using. The provider may ease some of the responsibilities or add some of those responsibilities to you. Let's have a look at these AWS Shared Responsibility Models products:

- Amazon EC2
- AWS Lambda
- Elastic Beanstalk
- VMWare Cloud on AWS
- Amazon EKS

### Amazon EC2
Amazon Elastic Compute Cloud [Amazon EC2](https://aws.amazon.com/ec2/) is a self-managed computing service. The management and configuration of ECS is the sole responsibility of the customer.

That means it is your responsibility to execute patches, backup data, and configure dependencies. Security and network infrastructure management is also your responsibility.

With EC2, you've full control over your deployments and their management. In that case, you have the flexibility to customize any environment to fit your preferences. For example, you may want to install specific software versions in your environment.

### AWS Lambda
[AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/applications-console.html) entrusts the responsibility for managing user access, configuring resources, and securing software code to its customer. Identity access management (IAM) roles and identities are your responsibility as a chief information security officer (CISO) or security practitioner.

Each time you publish the Lambda function, Lambda creates a version of that function for you. However, creating versions of your function is your responsibility. AWS Lambda provides you with the [Lambda console](https://docs.aws.amazon.com/lambda/latest/dg/applications-console.html) to help you to complete this task.

If you're using supported Lambda runtimes, you do not need to worry about installing the latest security patches. AWS will do that for you – but you can be requested to test those patches before their deployment.

AWS Lambda does not limit the usage of programming languages to only the native ones. [Ruby](https://www.ruby-lang.org/en/), [Java](https://www.java.com/), [Python](https://www.python.org/), [Node.js](https://nodejs.org/), [PowerShell](https://github.com/PowerShell/PowerShell), and [GO](https://go.dev/) are native languages to Lambda. You can use other programming languages to write functions. Thanks to a Lambda Runtime API that allows this to happen.

### Elastic Beanstalk
[Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) has a managed update feature that executes patch updates automatically. Your operation burden as CISO is significantly reduced, in this case. You'll be notified to take control of updates if the managed update fails.

Additionally, Elastic Beanstalk monitors the health of your application, scales your deployment, and handles load balancing and capacity provisioning.

Elastic Beanstalk doesn't control all the updates. You need to ensure you download the latest versions of the components that you control.

Besides, you need to migrate Elastic Beanstalk environments running on older and unsupported versions to a supported version. If you opt-out of the managed update feature, the responsibility of patching the web server, application server, OS, and runtime shifts to you.

### VMWare Cloud on AWS
[VMware](https://docs.vmware.com/en/VMware-Cloud-on-AWS/index.html) protects VMware Cloud's systems and software components hosted on AWS service. This includes networking, computing, and storage resources. The responsibility to manage as well as service consoles that provision VMware Cloud on AWS lies on VMware.

As a customer, your responsibility includes configuring SDDC security and data. Activities in this role include managing gateway firewall, public IP address, network segments, etc. You are also tasked with deploying, managing, and migrating virtual machines (VMs).

It would be best to determine the Virtual private network (VPN) configuration and network firewall. You can manage virtual machines and set controls for users. In this light, VMware provides you with vCenter permissions and Roles to manage user security and data encryption.

### Amazon EKS
[Amazon EKS](https://aws.amazon.com/eks/) shared responsibility model dictates that the management and control of the EKS control plane (master node) is the work of AWS. EKS control plane hosts the control plane that runs Kubernetes software. These include an API server that handles connections from outside. [Etcd](https://etcd.io/) is also part of this control panel. It ensures fault tolerance and data consistency even when nodes fail entirely.

In that case, you're left to ensure the running of worker nodes by registering nodes to EKS and ensuring Kubernetes APIs can access the nodes.

### Best practices for working with AWS Shared Responsibility Models
The choice of AWS shared responsibility model product determines the responsibilities that you handle as the security practitioner in an organization. You must ensure the security of data and applications in the AWS cloud. You can follow several best practices to help you better manage the AWS shared responsibility model for whichever product your organization chooses.

Figure out cloud security requirements depending on what AWS shared responsibility model product the organization is using. In this way, you get ample time to plan for the security configurations, controls, and settings that apply to your side of the shared model.

Ensure you have a clear understanding of the part of the AWS shared responsibility model that your organization is responsible for. Know how the responsibilities are split between the cloud provider and your organization.

### Conclusion
To sum up, the AWS shared responsibility model splits security responsibilities between AWS and the subscribers. The responsibilities are never shared jointly, i.e, each party has clearly defined tasks to execute.

Organizations shift their share of responsibilities to their security team. Therefore, security professionals must understand the concept of the shared responsibility model.

In the shared responsibility model, AWS protects its software stack and infrastructure in general. On your part, you need to secure everything built on this infrastructure.

Understand the shared responsibility model first, and you have the key to enhancing the security of posture of your overall cloud environment.

### Further reading
- [Comparison Between Amazon Web Services (AWS) & Google Cloud](/engineering-education/aws-vs-google-cloud/)
- [Understanding AWS and its Popularity](/engineering-education/what-is-aws-and-why-is-aws-so-popular/)
- [Using Amazon Web Services for Django media file storage](engineering-education/using-amazon-web-service-for-django-media-files-storage/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
