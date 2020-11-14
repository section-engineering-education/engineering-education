## Autoscaling in Amazon Web Services

### Introduction to Amazon Web Services
Amazon Web Services (AWS) are cloud computing services that provide application programming interfaces (APIs) and platforms for cloud computing to governments, individuals, and companies. These platforms include a mixture of various offerings such as software as a service (SAAS), infrastructure as a service (IAAS), and platform as a service (PAAS). 

Some of the tools offered by AWS include content delivery, database storage, and computing power. Other services provided include data management, hybrid cloud, networking, artificial intelligence, development tools, analytics, security, and mobile development.

![Amazon Web Services](/engineering-education/autoscaling-in-amazon-web-services/amazon-web-services.png)
[Image Source: Quora](https://qph.fs.quoracdn.net/main-qimg-ae46c65ca4d8e7d0b61acbe429e0b04a)

### What is Autoscaling?
Autoscaling refers to a cloud computing feature in which computational resources are varied automatically based on usage. In this context, computational resources are measured by the number of servers (active). In this feature, computational resources are added or removed depending on demand to ensure that the traffic slump or surge is handled smoothly. 

For example, when there is a heavy traffic load, the autoscaling feature increases the computational resources to reduce the risk of crumbling.  In times of low traffic, the cloud auto-scaler will automatically reduce computational resources. 

### Introduction to AWS Autoscaling 
AWS autoscaling is an advanced feature in cloud computing in which resource management is done automatically depending on the server load. The resources are scaled up or down through various mechanisms. 

AWS offers flexibility in the configuration of a threshold CPU utilization value. A threshold level of resource utilization can also be configured. When the threshold is reached by the server, the AWS service will automatically initiate the scaling of resources. 

### Components of AWS Autoscaling
The main components of AWS that are involved in autoscaling include Autoscaling Groups, Amazon Machine Image (AMI), Load Balancer, Snapshot, and EC2 Instance. 

#### EC2 Instance
This is a virtual server that exists in the Elastic Compute Cloud (EC2). AWS applications are deployed through this server. This web service provides secure and resizable cloud computing capacity.

#### Autoscaling Group
This is a collection of EC2 instances and related policies. An autoscaling group performs the following tasks;
* It adds or removes instances depending on the load of the server. When there is a high load, it will add instances. If the load is low, it will remove instances (extra ones).
* It scales EC2 instances up or down, which helps in managing the availability of applications.
* It runs the required number of instances. For example, if the required number of instances is 5, then it will run 5 EC2 instances.
![Autoscaling Group](/engineering-education/autoscaling-in-amazon-web-services/autoscaling-group.png)
[Image Source: Tudip](https://tudip.com/wp-content/uploads/2018/12/autoscaling-group.png)

#### Amazon Machine Image (AMI)
This is an executable image that is used in the creation of new instances. AMI provides all the information that is needed in the launch of new instances. Before launching an instance, an AMI must be specified. 

Multiple instances can be launched from one AMI. In this case, all the instances have the same configuration. Instances that require dissimilar configurations should be launched from different AMIs.

#### Snapshot
This is a copy of the data that exists in an instance. Snapshot is a storage image, unlike AMI, which is an executable image. 

#### Load Balancer
A load balancer plays the role of dividing traffic among instances. It enhances the automatic identification and redirection of traffic based on loads. Load balancers enable concurrent users to be handled efficiently. They also make applications reliable. 

There are two main types of load balancers: classic load balancer, and application load balancer. In a classic load balancer, traffic is divided equally among all instances. An application load balancer redirects traffic among instances using certain user-defined rules.

### Types of AWS Autoscaling
There are four main types of AWS autoscaling: manual scaling, scheduled scaling, dynamic scaling, and predictive scaling.

#### Manual Scaling
In this type of scaling, the number of instances is changed manually. It involves a manual execution of scaling actions. The number of instances can be increased or decreased manually using CLI or console. This type of scaling is ideal when users do not need automatic scaling. 

#### Scheduled Scaling
This type involves the automatic execution of scaling actions based on certain schedules. They can be executed at a specific time during the day, month, week, or year. This type of scaling is ideal when traffic occurs at a specific time. 

For example, it can be used if there is heavy traffic during the weekends and relatively less traffic during the weekdays. In this case, the number of instances can be scheduled to increase when the weekend begins. This number can be reduced when the weekend ends. 

#### Dynamic Scaling
In dynamic scaling, the number of EC2 instances is changed automatically based on signals that are provided by a CloudWatch alarm. Dynamic scaling is mostly employed when there is unpredictable traffic. 

#### Predictive Scaling
Predictive scaling involves using machine learning algorithms to program the desired number of instances. Future traffic can be predicted to provide the appropriate number of instances. This type of scaling is ideal when the traffic is predictable. 

### How AWS Scaling Works
AWS uses the aforementioned components to complete the process of autoscaling. First, an AMI of a user’s server should be created. The AMI will provide all the information that is needed for launching instances. The template of configuration should contain all system. 

After an AMI has been created, the configuration should be launched. At the launch configuration, the right type of instance should be chosen based on need. An AWS autoscaling group should be created after a configuration has been launched. This group will be used in the launching of new instances. 
![AWS Autoscaling](/engineering-education/autoscaling-in-amazon-web-services/aws-autoscaling.png)
[Image Source: Jayendra](https://jayendrapatil.com/wp-content/uploads/2016/03/AWS-Auto-Scaling-Configurations.png)

When there is a heavy traffic, the AWS autoscaling service will initiate the addition of new EC2 instances with identical configuration to the server. This happens with the aid of AMI. When there is relatively less traffic, the excess number of instances will be removed.

When new instances are launched, the load balancer will divide traffic among them. The system load is used as the basis for the division of traffic. The ratio of division depends on the type of load balancer employed. In the case of a classic load balancer, the traffic will be divided equally. In application balancer, some rules will be used to guide the division of traffic.

### Benefits of AWS Autoscaling
AWS autoscaling provides the following benefits to users;
* AWS autoscaling enables users to minimize costs. This is because total usage is the basis for the price charged, rather than capacity. When the load is low, autoscaling can enable some unutilized servers to be asleep, which reduces electricity costs. 
* It can help in protecting against application, hardware, and network failures. This is because unhealthy instances can be replaced by the AWS autoscaling service. 
* It enhances smart scaling decisions. This autoscaling service enables users to create resourceful scaling plans in which resources can be changed automatically to respond to any shift in demand.
* It enhances the optimal performance of applications. This is achieved because the autoscaling service monitors applications continually. Optimal performance happens even when workloads are unpredictable.
* AWS autoscaling allows users to set up scaling fast. Target utilization levels can be set for multiple resources using a single interface.

### Conclusion
Amazon Web Services provide various tools that enhance data management, storage, development, and networking in organizations. Autoscaling in AWS is important to organizations because it helps in optimizing utilization, costs, and performance. This autoscaling service can be an ideal choice for organizations or companies that want to optimize the performance of their applications.

### Resources

[Linux Daddy](https://linuxdady.com/aws-autoscaling-configuration-step-by-step-for-beginners/)

[Amazon](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html#:~:text=%20What%20is%20Amazon%20EC2%20Auto%20Scaling%3F%20,an%20AWS%20account,%20you%20can%20access...%20More%20)





