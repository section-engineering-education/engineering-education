---
layout: engineering-education
status: publish
published: true
slug: kubernetes-as-a-service
title: Kubernetes as a service - Comparing EKS vs AKS vs GKE
description: This article breaks down how to approach building a Natural Language Processing (NLP) chatbot across a diverse set of use cases, including healthcare, media, finance, and human resources, among others.
author: gagan-bhatia
date: 2020-07-02T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/kubernetes-as-a-service/hero.jpg
    alt: kubernetes example image

---
All the major cloud service providers offer managed Kubernetes services for their customers. Managed Kubernetes services provide and administer the Kubernetes control plane, the set of services that would run on Kubernetes master nodes in a cluster created on virtual or physical machines. While dozens of vendors have received Certified Kubernetes status from the Cloud Native Computing Federation, which means their Kubernetes offering or implementation offers conformance to a consistent interface, details between offerings can differ. This variation can be especially true for managed Kubernetes services, which will often support different features and options for their cluster control planes and nodes.

<!--more-->

This article reviews the Kubernetes offerings from the three providers: Amazon Elastic Kubernetes Service (EKS) from Amazon Web Services (AWS), Azure Kubernetes Service (AKS) from Microsoft Azure, and Google Kubernetes Engine (GKE) from Google Cloud. When selecting which hosted Kubernetes offering is best for you, you have to look beyond price. More considerations like scalability, standardization, update frequency, recovery, and whether a service mesh is included are all critical to making the best decision.

![logo](/engineering-education/kubernetes-as-a-service/amazon-eks-logo-amazon-eks.png)
### Amazon Web Services’ Elastic Kubernetes Services
[Elastic Kubernetes Services (EKS)](https://aws.amazon.com/eks/) is one of the managed container offerings that are available on AWS. It is the least integrated offering as far as interacting with other AWS services like CI/CD pipelines. Elastic Container Service (ECS) that preceded EKS and Fargate are more preferred offerings within the AWS ecosystem.  As the industry is moving towards supporting Kubernetes as a deployment target for applications and data sources for logs and application performance metrics. EKS is a good choice if you already have a large AWS footprint and are either experimenting with Kubernetes or want to migrate workloads from Kubernetes on other clouds.

![logo](/engineering-education/kubernetes-as-a-service/download.png)
### Google Cloud Platform Kubernetes Engine
The Google Cloud Platform (GCP) entry in the hosted Kubernetes space is. [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine). GKE is the most resilient and well-rounded Kubernetes offering when compared to AKS and EKS. It is the only one with a marketplace to deploy applications from. It has support for the Istio service mesh. And a  gvisor for an extra layer of security between running containers. It also has an on-premises offering in development as part of Google’s Anthos offering for hybrid/multi-cloud environments on dedicated hardware.

![logo](/engineering-education/kubernetes-as-a-service/image.png)
### Microsoft Azure Kubernetes Service
[Azure Kubernetes Service](https://azure.microsoft.com/en-in/services/kubernetes-service/.)
is the Microsoft developed Kubernetes offering that runs on Azure Public Cloud, Government Cloud, and Azure Stack. It is deeply integrated with the rest of the Microsoft cloud services and has managed worker nodes (unlike EKS). AKS is best when it comes to seamless integration with its cross-platform development tools, including VS Code and DevOps. If you have an established relationship with Microsoft, and no strong preference for another cloud, then AKS will fit your needs.

### Technical Components

|Measure|EKS|GKE|AKS|
|---------:|---:|---:|---:|
| Year Released	|2018|	2014|	2017|
|Kubernetes Versions|	1.12, 1.13, 1.14|	1.13, 1.14, 1.15|	1.12, 1.13, 1.14|
|Global Availability|	Yes|	Yes|	Yes + Government|
|SLA	|99.9%	|99.5% (zone) 99.95% (regional)| 99.5%|
|Control Plane Cost|	$0.20/hr|	Free|	Free|
|Control Plane Upgrades|	On-Demand|	Automation and On-Demand|	On-Demand|
|Worker Upgrades|	No|	Yes|	Yes|
|Bare Metal Nodes|	Yes|	No|	No|
|GPU Nodes|	Yes|	Yes|	Yes|
|Linux Containers	|Yes|	Yes|	Yes|
|Windows Containers	|Yes	|Yes	|Yes|
|Resource Monitoring	|3rd Party	|Yes (StackDriver)|	Yes (Azure Monitor)|
|Nodes per Cluster	|100	|5000	|500|
|App Secret Encryption	|No|	Yes|	No|
|RBAC	|Yes	|Yes	|Yes|
|Network Policies|	3rd Party|	Yes|	Beta|
|Compliance|	HIPAA, SOC, ISO, PCI DSS	|HIPAA, SOC, ISO, PCI DSS	|HIPAA, SOC, ISO, PCI DSS|
|FedRAMP	|High	|Moderate	|High|
|Documentation	|Weak but complete, and a strong community	|Not very thorough, but has an active community	|Extensive official documentation and a strong community|
|CLI Support	|Partial	|Yes	|Yes|

### Conclusion
Kubernetes is now an integral part of the technology landscape and is expected to be around for a long time as part of any cloud infrastructure. So regardless if you are just getting started on GKE, leveraging your Microsoft Enterprise Agreement to get better pricing and support on Azure, or want to make transitioning on-premises applications to the cloud easier with EKS on Amazon, there is a certified hosted Kubernetes offering that will meet your needs.

### Resources
[Azure Kubernetes Service](https://codeteddy.com/2019/08/15/azure-kubernetes-services-day-three-deploying-asp-net-core-application-to-azure-kubernetes-services/)

[Google Cloud Platform Kubernetes Engine](https://devopedia.org/google-kubernetes-engine)

[AWS EKS](https://medium.com/containers-101/getting-started-with-amazon-eks-provisioning-and-adding-clusters-ff02738118e8)
