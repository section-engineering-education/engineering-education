![Hero](/Why-and-when-you-should-use-Kubernetes/hero.jpg) https://unsplash.com/photos/6Vg8N8u61aI?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink

Kubernetes is a powerful container management tool that automates the deployment and management of containers. Kubernetes is the next big wave in cloud computing and it’s easy to see why as businesses migrate their infrastructure and architecture to reflect a cloud-native, data-driven era.
Before the business decides to use Kubernetes, the question of why or when Kubernetes should be used arises. This article will address the issue.

### Key takeaways:

At the end of this article the learner will be able to:

1. Understand the overview of Kubernetes and container orchestration
2. Know the top reasons why a business should go for Kubernetes and the benefits it offers
3. Understand the instances when Kubernetes can be used or not used
4. Understand When you should not use Kubernetes

### What Is A Container And Container Orchastration?

A new technology called Cloud Natives has been adopted by many organization as a deployment approach for the software they build. Container technology is the key enabler to this Cloud Natives approach. Containers are a solution to the problem of how to get software to run reliably when moved from one computing environment to another. An Example, will be moving an application from test environment to production environment or moving an application from a physical machine to a VM or a public cloud. With this containerized approach, you will be always sure that your application will work right regardless.

Containers are usually made up of components which include runtime, system libraries, system tools, system settings and code. All these components are usually bundled into a lightweight executable package. Multiple containers can be deployed on a single OS and share the same Operating system kernel.

With the ability to have multiple containers being deployed on a single environment, organizations need orchestration tools to help them in such deployments. This is where Kubernetes comes in. Kubernetes, also known as K8s. Is an open-source system for automating deployment, scaling, and management of containerized applications[(https://kubernetes.io/)]

### Why And When Should An Organization Use Kubernetes?

#### When an Organization Wants To Move To The Cloud-NaticeApproach To Develop And Deploy Applications.

As an organization, you may currently be thinking of moving to the cloud in the near future. At the moment, building for the cloud may not be an option the organization prefers but rather working on-premise. In this scenario, the best solution will be to build on top of containers and Kubernetes as a way to prepare the organization to move to the cloud in the near future. Take note that the movement from on-premise to the cloud may not be a seamless migration. However, it will be way better than building on virtual machines and moving to a cloud Infrastructure as a Service.

#### When The Organization Needs To Scale

When the application you have built reaches a point where it needs to scale. At that point your application will be containing many services that need to talk to each other and requires scaling up and down depending on different factors. Doing it on Kubernetes may be a better choice for the organization. At this point the organization should start to think about orchestration.

#### When The Organization Wants To Practice Consistent Deployment.

Kubernetes is part of the CI/CD pipeline. It will help with deployment of your application into the production environment without having any downtime. Point to note is that the task of building, testing and delivering your application to a container registry is not part of Kubernetes.There are specific CI/CD tools for building and testing.

#### When Thinking of Building a Service Similar To Kubernetes.

It is not advisable to build this on your own. You will fail many times before you start to see the results of your hard work. Make sure that your organization has a really good reason to take this approach. The most ideal is to use either the Azure Kubernetes service or AWS.

### When Should An Organization Not Use Kubernetes.

#### When Developing A Monolithic Application.

When one is developing a monolithic application. With Monolithic architecture, the components of the application developed are dependent on each other. This is from the input/output operation to the processing and rendering of the data. With containers, your application will be divided into separate independent components.

#### Little Or No Time To Learn

When the organization does not have the time it requires to get it's employees to learn how to use Kubernetes. It has a steep learning curve. Kubernetes is a massive tool that requires sufficient time to learn. Your team also needs to get good knowledge of Kubernetes before they can start using it in their development process. It is quite complex.

### CONCLUSION

Kubernetes is a really powerful tool to learn and use. As an organization, one has to really do their analysis well to make sure that Kubernetes is a fit for their current application development. In as much as it is good, it does not fit every team and application.

Happy Learning!

### References

https://kubernetes.io/
