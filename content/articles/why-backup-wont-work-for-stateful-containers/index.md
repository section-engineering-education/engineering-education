---
layout: engineering-education
status: publish
published: true
url: /why-backup-wont-work-for-stateful-containers/
title: Why Backup won't Work for Stateful containers?
description: This article will explore why backup solutions may not work for stateful containers. It will also discuss myths and misconceptions about stateful containers.
author: verah-ombui
date: 2021-09-13T00:00:00-15:10
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-backup-wont-work-for-stateful-containers/hero.png
    alt: Why Backup Will not Work for Stateful containers Cover image
---
There is a myth that containers are stateless. However, this is not true since a container can contain a state. The state is temporal, unique, and resides on the host machine. 
<!--more-->
Containers consist of read-only layers. Every layer holds the last changes made on the `config` file with configuration and installation commands. 

After executing the commands from the `config` file, the system changes are stored in a disk layer.

A temporal writable layer is usually created on top of the previous disk image when the container is running. The writable layer is unique to every container on a specific host and can survive when the container restarts. 

This writable layer does not store any stateful data, such as persistent application data. Its sole purpose is to temporarily store the data of the running application in the container.

### Table of contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Where containers stores state](#where-containers-store-state)
4. [Backing up and restoring a Docker container](#backing-up-and-restoring-a-docker-container)
5. [Reasons why backup solutions fail](#reasons-why-backup-solutions-fail)
6. [Possible alternative](#possible-alternative)
7. [Conclusion](#conclusion)

### Prerequisites
To follow along, you need to have:
- [Docker](https://www.docker.com/products/docker-desktop) for desktop installed.
- knowledge of [Docker commands](https://docs.docker.com/engine/reference/commandline/docker/).
- Basic knowledge of [containers](https://www.cio.com/article/2924995/what-are-containers-and-why-do-you-need-them.html).

### Where containers store state
As mentioned earlier, containers do not save the state in the container image. 

Alternatively, they store the state in persistent external storage like [blocks](https://www.ibm.com/cloud/learn/block-storage), [objects](https://www.netapp.com/data-storage/storagegrid/what-is-object-storage/), or [file](https://www.ibm.com/cloud/learn/file-storage) storage services and systems.

In most cases, enterprises use a [storage array](https://www.dnsstuff.com/storage-array) that is integrated into the Kubernetes environment using [Persistent Volume Claims](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) (PVCs).

### Backing up and restoring a Docker container
Docker assists developers in automating the development and deployment process of an application. 

Developers can also build a packaged environment that runs applications, which makes them more portable and lightweight. 

Docker containers also assist in maintaining applications' versions. The software that run on Docker are platform-independent.

We will assume we have a container executing in a local environment. We can take a snapshot or backup of the specified container to undo any changes or even run it in the previous timestamp in case of an emergency.

This section will cover how we can backup and restore Docker containers using inbuilt Docker commands.

#### Backing up a Docker container
We can back up a Docker container using the following command.

We can list all running containers and get their ids, as shown below:

```bash
$ docker ps −a
```

Then we will copy the container's ID that we want to back up. To take a snapshot of the Docker container, we will execute the below command:

```bash
$ docker commit −p (ID of the CONTAINER) (BACKUP_NAME)
```

For instance, we can pull a WordPress Docker image using the below commands:

```bash
$ docker pull wordpress
```

The output will be:

![Wordpress image pull](/engineering-education/why-backup-wont-work-for-stateful-containers/docker-image-pull.png)

We can then list all our containers using the following command:

```bash
$ docker ps -a
```

The output will be:

![Docker list all](/engineering-education/why-backup-wont-work-for-stateful-containers/docker-ps-all.png)

We can then take the snapshot of our container image by running the below command:

```bash
$ docker commit -p 1571dbfe094f wordpress-backup
```

And the output will be:

```bash
$ docker commit -p 1571dbfe094f wordpress-backup
sha256:abe166f1f1ff6c59c978ab898dbc6f843c10c4a8415d7a2b012660420d205f8a
```

We store the container image in form of a `tar` file in the local storage, as illustrated below:

```bash
$ docker save -output wordpress-backup.tar wordpress-backup
```

#### Restoring a Docker container
After we have created a backup, we can restore the Docker container, as demonstrated below:

```bash
$ docker load -i wordpress-backup.tar
```

The output will be:

```bash
$ docker load -i wordpress-backup.tar
Loaded image: wordpress-backup:latest
```

We can check whether the image was restored successfully by executing the following command:

```bash
$ docker images
```

We can then pull back the Docker image, as highlighted below:

```bash
$ docker pull wordpress-backup:latest
```

After restoring the Docker image, we can use the below command to execute a restored instance of the Docker container:

```bash
$ docker run -ti wordpress-backup:latest
```

### Reasons why backup solutions fail
[Storage-based snapshots](https://stonefly.com/resources/what-is-storage-snapshot-technology/) are not enough for data mobility and backup. 

They are periodic, require scheduling, and do not deliver the granularity that DevOps requires today. In a fast-paced technological world, where containers regularly start and terminate as per the user's preference, a backup snapshot is not enough.

In addition, performing container backup at the storage layer means the organization will be prone to vendor lock-ins. As the business grows, they will fail to support the agility needed in the modern world.

Also, containers are not perfect for backing up data due to the following reasons:
- Containers are highly scalable, with numerous instances, each performing a tiny part of the same task. It means that there is no single container that can be the master in an application. Many containers may access similar persistent data each time, unlike virtual machines (VMs), where only one VM accesses data.
- Containers are temporal and cannot be up each time backups need to be taken. This is different from virtual mchines which mostly keep running the VM machine software.

Architectural differences that come with containers demonstrate why backup solutions may fail. 

A different approach to performing continuous backups of stateful application data is required.

### Possible alternative
A better solution should not rely on the container for backup and replication. Also, it cannot rely on one storage solution. 

Instead, it can be installed on the Kubernetes cluster as [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/). The cluster offers data protection with an [RPO](https://www.ibm.com/services/business-continuity/rpo) from `5` or `10` seconds.

These DaemonSets integrate into the persistent storage to gain access to persistent data independent of any container. 

Unifying all cluster nodes and the cluster API allows [Zerto](https://www.zerto.com/solutions/workloads-and-applications/zerto-for-kubernetes/) for Kubernetes to work more efficiently. It channels persistent data without container duplication or performance issues.

Zerto can also be integrated with clusters, making persistent data replication easier. It is storage agnostic and supports [CSI-compatible](https://kubernetes-csi.github.io/docs/) block storage. This makes it ideal for data migration and mobility solutions.

Organizations should ensure they go for a solution that stores stateful data and captures the Kubernetes state for each application. 

It will also enhance data protection for components like [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and services. These components can rebuild the application when performing data recovery on the same or another cluster.

### Conclusion
Many users and developers do not backup their container. Most argue that containers are stateless and cannot store data; thus, they do not require backup and recovery operations. 

The container infrastructure and Kubernetes offer improved availability. Containers can be started and stopped as needed. 

However, if anything happens, the entire cluster and container nodes with associated data are destroyed or lost. This means that Kubernetes, Docker, and other applications may need to be backed up.

Happy learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
