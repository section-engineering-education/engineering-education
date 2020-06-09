# Kubernetes as a service: Comparing EKS vs AKS vs GKE

All the major cloud service providers offer managed Kubernetes services for their customers. Managed Kubernetes services provide and administer the Kubernetes control plane, the set of services that would normally run on Kubernetes master nodes in a cluster created directly on virtual or physical machines. While dozens of vendors have received Certified Kubernetes status from the Cloud Native Computing Federation, which means their Kubernetes offering or implementation offers conformance to a consistent interface, details between offerings can differ. This variation can be especially true for managed Kubernetes services, which will often support different features and options for their cluster control planes and nodes.


This article reviews the Kubernetes offerings from the three providers: Amazon Elastic Kubernetes Service (EKS)  from Amazon Web Services (AWS), Azure Kubernetes Service (AKS) from Microsoft Azure, and Google Kubernetes Engine (GKE) from Google Cloud. When selecting which hosted Kubernetes offering is best for you, you have to look beyond just price. Additional considerations like scalability, standardization, update frequency, recovery, and whether or not a service mesh is included are all critical to making the best decision.

### Amazon Web Services’ Elastic Kubernetes Services
![logo](https://github.com/gagan3012/engineering-education/blob/master/KaaS/263-2635408_amazon-eks-logo-amazon-eks.png)

Elastic Kubernetes Services (EKS) is one of the managed container offerings that are available on AWS, and is the least integrated offering as far as interacting with other AWS services like CI/CD pipelines. Elastic Container Service (ECS) that preceded EKS and Fargate are more preferred offerings within the AWS ecosystem; but as EKS is based on Kubernetes, most everything you will need to connect to it will work, as the industry is moving towards supporting Kubernetes as a deployment target for applications and data source for logs and application performance metrics. EKS is a good choice if you already have a large AWS footprint and are either experimenting with Kubernetes or want to migrate workloads from Kubernetes on other clouds.
### Google Cloud Platform Kubernetes Engine
![logo](https://github.com/gagan3012/engineering-education/blob/master/KaaS/download.png)

The Google Cloud Platform (GCP) entry in the hosted Kubneretes space is Google Kubernetes Engine (GKE). GKE is the most resilient and well-rounded Kubernetes offering when compared to AKS and EKS. It has the highest SLA for uptime (see table below) and is the only one with a marketplace to deploy applications from. It has support for the Istio service mesh, and gvisor for an extra layer of security between running containers. It also has an on-premises offering in development as part of Google’s Anthos offering for hybrid/multi cloud environments on dedicated hardware.
### Microsoft Azure Kubernetes Service
![logo](https://github.com/gagan3012/engineering-education/blob/master/KaaS/image.png)

AKS is the Microsoft developed Kubernetes offering that runs on Azure Public Cloud, Government Cloud, and even Azure Stack for on-premises. It is deeply integrated with the rest of the Microsoft cloud services and has managed worker nodes (unlike EKS). Like most things Microsoft does, it is definitely best-of-breed when it comes to seamless integration with their cross-platform development tools, including VS Code and DevOps (formerly Visual Studio Team Services). If you have an established relationship with Microsoft, and no strong preference for another cloud, then AKS will fit your needs.
| Measure|EKS|GKE|AKS|
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
