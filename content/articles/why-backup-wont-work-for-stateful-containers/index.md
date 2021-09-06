---
layout: engineering-education
status: publish
published: true
url: /why-backup-wont-work-for-stateful-containers/
title: Why Backup won't work for Stateful containers?
description: Any data that containers create need to be backed up. It is easier to backup data stored in stateful apps compared to stateless apps. This article will debunk these myths and misconceptions and explore why backup solutions may not work for stateful containers.
author: verah-ombui
date: 2021-09-03T00:00:00-05:27
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-backup-wont-work-for-stateful-containers/hero.png
    alt: Why Backup won't work for Stateful containers cover image
---
### Introduction
There is a myth that containers are stateless. It is not true since a container can contain a state. However, the state is temporal, unique, and resides on the host machine it is running on. The myth focuses on that container images do not contain state and stores persistent data outside the container image.

Containers consist of layers that are read-only and cannot be changed. Every layer holds the last changes made on the `config` file with configuration and installation commands. After executing the commands from the `config` file, the system changes are stored in a disk layer.

A temporal writable layer is usually created on top of the previous disk image when the container is running. The writable layer is unique to every container on a specific host and can survive when the container restarts. This writable layer does not store any stateful data, such as persistent application data. Its only purpose is to temporarily store the data of the running application in the container.

### Table of contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Where containers stores state](#where-containers-stores-state)
4. [Backing up and restoring a Docker container](#backing-up-and-restoring-a-docker-container)
5. [Reasons why backup solutions fail](#reasons-why-backup-solutions-fail)
6. [Possible backup solution](#possible-backup-solution)
7. [Conclusion](#conclusion)

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) for desktop installed.
- Working knowledge of [Docker commands](https://docs.docker.com/engine/reference/commandline/docker/)
- Basic knowledge of [containers](https://www.cio.com/article/2924995/what-are-containers-and-why-do-you-need-them.html)

### Where containers stores state
As mentioned earlier, containers can never save the state inside the container image. In alternative, they store the state in persistent external storage like [blocks](https://www.ibm.com/cloud/learn/block-storage), [objects](https://www.netapp.com/data-storage/storagegrid/what-is-object-storage/), or [file](https://www.ibm.com/cloud/learn/file-storage) storage services and systems.

In most cases, enterprises use a [storage array](https://www.dnsstuff.com/storage-array) integrated into the Kubernetes environment using [Persistent Volume Claims](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) (PVCs).

### Backing up and restoring a Docker container
Docker assists the developers in automating the development and deployment process of an application. Developers are also able to build a packaged environment that runs an application, making applications more portable and lightweight. It also assists in maintaining applications’ versions. The applications that run on Docker are platform-independent.

We will assume we have a container executing in a local environment. We can take a snapshot or backup of the said container so as we can undo any changes or even run a container in the previous timestamp in case of an unforeseen disaster.

This section will cover how we can backup and restore Docker containers using inbuilt Docker commands.

#### Backing up a Docker container
We can back up a Docker container by using the following command to list all running containers and get their ids and choose one that we want to copy:

```bash
$ docker ps −a
```

Then we will copy the container ID that we want to back up. To take a snapshot of the docker container, we will execute the below docker command:

```bash
$ docker commit −p (ID of the CONTAINER) (BACKUP_NAME)
```

For instance, we can pull a WordPress docker image using the below commands:

```bash
$ docker pull wordpress
```

The output will be:

![Wordpress image pull](/engineering-education/why-backup-wont-work-for-stateful-containers/docker-image-pull.PNG)

We can then list all of our containers using the below command:

```bash
$ docker ps -a
```

The output will be:

![Docker list all](/engineering-education/why-backup-wont-work-for-stateful-containers/docker-ps-all.PNG)

We can then take the snapshot of our container image by running the below command:

```bash
$ docker commit -p 1571dbfe094f wordpress-backup
```

And the output will be:

```bash
$ docker commit -p 1571dbfe094f wordpress-backup
sha256:abe166f1f1ff6c59c978ab898dbc6f843c10c4a8415d7a2b012660420d205f8a
```

We store our container image in form of tar file in our local storage, we can execute the below command:

```bash
$ docker save -output wordpress-backup.tar wordpress-backup
```

#### Restoring a Docker Container
After we have created a Docker container backup, we can be able to restore the container. We can restore a backup of the Docker container tar file using the below command:

```bash
$ docker load -i wordpress-backup.tar
```

The output will be:

```bash
$ docker load -i wordpress-backup.tar
Loaded image: wordpress-backup:latest
```

We can check whether the image was restored successfully by executing the command below:

```bash
$ docker images
```

We can then pull back the Docker image using the below command:

```bash
$ docker pull wordpress-backup:latest
```

After restoring the Docker image, we can use the following command to execute a restored instance of the Docker container as below:

```bash
$ docker run -ti wordpress-backup:latest
```

### Reasons why backup solutions fail
[Storage-based snapshots](https://stonefly.com/resources/what-is-storage-snapshot-technology/) cannot be enough for data mobility and backup. They are periodic, require scheduling, and do not deliver the granularity that DevOps requires in today's world. In a fast-paced technological world, where containers regularly start up and terminate as per user preferences, a backup snapshot is, without a doubt, not enough.

In addition, performing container backup at the storage layer means the organization will be prone to vendor lock-ins. As the business grows, they will be stuck with one solution that cannot support the agility needed in today's IT world.

Also, containers are not perfect for backing up data either, for below two reasons:
- Containers are highly scalable, with numerous instances, each performing a tiny part of the same task. It means that there is no single container that can be the master in an application. Many containers may access similar persistent data each time, unlike virtual machines (VMs), where only one VM accesses similar data.
- Containers are temporal and cannot be up each time backups need to be taken, which is different from VMS, which mostly kept running the VM machine software such as VMware HA smoothly. Any single container does not determine container application availability and resilience.

The differences in architectures that come with containers demonstrate why backup solutions may not work for containers. A different approach to performing continuous backups of stateful application data is needed.

### Possible backup solution
The better solution cannot rely on the container for purposes of backup and replication. Also, it cannot rely on one storage solution. Instead, it can be installed on the Kubernetes cluster as [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) and offer data protection with an [RPO](https://www.ibm.com/services/business-continuity/rpo) from 5 or 10 seconds.

These DaemonSets integrate into the persistent storage to gain access to persistent data independent of any container. By unifying all cluster nodes and the cluster API, [Zerto](https://www.zerto.com/solutions/workloads-and-applications/zerto-for-kubernetes/) for Kubernetes works most efficiently. It journals the persistent data without container duplication or performance impact.

It can also be integrated with clusters, making persistent data replication used for disaster recovery easier. It is storage agnostic and supports [CSI-compatible](https://kubernetes-csi.github.io/docs/) block storage, thus making it ideal for data migration and mobility solutions.

The organization should ensure they go for a solution that stores stateful data and captures the Kubernetes state for each application. It will ensure that data protection for components like [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and services. These components can rebuild the application when performing data recovery on the same or another cluster.

### Conclusion
For many users and developers, backing up a container is foreign to them. Most argue containers are stateless, and they cannot store data; thus, it does not warrant backup and recovery operations. The container infrastructure offers high availability while Kubernetes runs in a cluster. Containers are started and stopped as needed. Most users cannot differentiate between the containers’ high availability with the ability to recover from a disaster.

However, if anything happens, the entire cluster and container nodes with associated persistent data are destroyed or lost. It would mean that Kubernetes, Docker, and associated applications may need to back up. The reasons backup might be needed for disaster recovery, migration purposes, and moving from development/test environment to production in case of upgrades.

Happy learning!
