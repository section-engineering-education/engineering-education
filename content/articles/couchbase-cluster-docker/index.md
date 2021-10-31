---
layout: engineering-education
status: publish
published: true
url: /couchbase-cluster-docker/
title: Creating Couchbase cluster using Docker compose
description: This tutorial will explain how to create Couchbase database cluster and deploy to Docker compose
author: jared-phelix
date: 2021-08-02T00:00:00-11:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/couchbase-cluster-docker/hero.png
    alt: How to create Couchbase cluster using Docker compose
---

In this tutorial, we will walk through [Couchbase](https://www.couchbase.com), a cloud edge server NoSQL database. Then we shall discuss how to set up the 3-node cluster to scale our applications using docker-compose.
<!--more-->
### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What's couchbase?](#whats-couchbase)
- [Creating nodes for couchbase](#creating-nodes-for-couchbase)
- [Configuring couchbase cluster](#configuring-couchbase-cluster)
- [Rebalancing couchbase clusters](#rebalancing-couchbase-clusters)
- [Conclusion](#conclusion)

### Prerequisites
Make sure you already have both Docker Engine and Docker Compose installed

### Objectives
This tutorial introduces you to the concepts of couchbase and creating node clusters. It helps you scale your applications elastically.

### What's couchbase?
Couchbase is a server. It's a NoSQL cloud document-oriented database.
This database is a merge of the [CouchDB](https://couchdb.apache.org) and [Membase](https://blog.couchbase.com/what-exactly-membase/) databases. 

It resides in server clusters that have multiple machines with several daemon processes. These processes provide data access from client libraries as well as management functions.

> For more details about couchbase, click [here](https://dzone.com/articles/couchbase-architecture-deep). 

### Creating nodes for couchbase
In this section, we're building the couchbase server nodes that will host a single instance of the couchbase server. This process entails the following steps: 

1. **Installed** - where the server is installed but not running.
2. **Started** - In this step, the node server has been started. At this point, you can perform various operations on the console.
3. **Initialized** - After installation, we have an option to initialize our servers.
4. **Provisioned** - You have access to the server as an admin.

Let's proceed to define our docker compose file contents: 
		
```yaml
# creating couchbase docker compose files
# define couchbase 1
couchbase1:
# get the image from the couchbase/server
  image: couchbase/server
  volumes:
    - ~/couchbase/node1:/opt/couchbase/var
# define couchbase 2
couchbase2:
# get couchbase image for couchbase 2
  image: couchbase/server
  volumes:
    - ~/couchbase/node2:/opt/couchbase/var
# define couchbase 3 and retrieve its image
couchbase3:
  image: couchbase/server
  volumes:
    - ~/couchbase/node3:/opt/couchbase/var
# define our application ports
  ports:
    - 8091:8091
    - 8092:8092 
    - 8093:8093 
    - 11210:11210
```

As we initially discussed, we're building a 3-node couchbase cluster hence the three services definition of the `couch bases 1 to 3 above`.
		
Now run the following on the terminal: 

```bash
# cd to project directory root and run the following command
 docker-compose up -d
```

Output:

```bash
Pulling couchbase1 (couchbase/server:)...
latest: Pulling from couchbase/server
25fa05cd42bd: Pulling fs layer
de18b9aa36b2: Pulling fs layer
25fa05cd42bd: Downloading [===========> ] 6.368MB/26.7MB
de18b9aa36b2: Download complete
ec756bf45a97: Waiting
b216da4530f7: Waiting
ec756bf45a97: Downloading [> ] 4.294MB/467.3MB
46635a5df01b: Waiting
25fa05cd42bd: Downloading [====> ]
de18b9aa36b2: Downloading [==================> ] 2.123MB/5.647MBnload complete
19ca04716876: Download complete
1.966kB/1.966kB
e5fe9996db61: Waiting
1a4a55520189: Waiting
```
Upon completion, check the status of your clusters by running the following command: 
		

```bash
docker ps
```	

Output:

```bash
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
75690285abdf couchbase/server "/entrypoint.sh couc…" 24 minutes ago Up 24 minutes 8091-8096/tcp, 11207/tcp, 11210-11211/tcp, 18091-18096/tcp couchbase_couchbase2_1
47f963ff40f7 couchbase/server "/entrypoint.sh couc…" 24 minutes ago Up 24 minutes 8094-8096/tcp, 0.0.0.0:8091-8093->8091-8093/tcp, :::8091-8093->8091-8093/tcp, 11207/tcp, 11211/tcp, 0.0.0.0:11210->11210/tcp, :::11210->11210/tcp, 18091-18096/tcp couchbase_couchbase3_1
6b38e3626f96 couchbase/server "/entrypoint.sh couc…" 24 minutes ago Up 24 minutes 8091-8096/tcp, 11207/tcp, 11210-11211/tcp, 18091-18096/tcp couchbase_couchbase1_1
```

You may as well run the following command to check the status. 
		
```bash
docker-compose ps
```

Output:

```bash
 Name Command State Ports 
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
couchbase_couchbase1_1 /entrypoint.sh couchbase-s ... Up 11207/tcp, 11210/tcp, 11211/tcp, 18091/tcp, 18092/tcp, 18093/tcp, 18094/tcp, 18095/tcp, 18096/tcp, 8091/tcp, 8092/tcp, 8093/tcp, 
8094/tcp, 8095/tcp, 8096/tcp 
couchbase_couchbase2_1 /entrypoint.sh couchbase-s ... Up 11207/tcp, 11210/tcp, 11211/tcp, 18091/tcp, 18092/tcp, 18093/tcp, 18094/tcp, 18095/tcp, 18096/tcp, 8091/tcp, 8092/tcp, 8093/tcp, 
8094/tcp, 8095/tcp, 8096/tcp 
couchbase_couchbase3_1 /entrypoint.sh couchbase-s ... Up 11207/tcp, 0.0.0.0:11210->11210/tcp,:::11210->11210/tcp, 11211/tcp, 18091/tcp, 18092/tcp, 18093/tcp, 18094/tcp, 18095/tcp, 18096/tcp, 
0.0.0.0:8091->8091/tcp,:::8091->8091/tcp, 0.0.0.0:8092->8092/tcp,:::8092->8092/tcp, 0.0.0.0:8093->8093/tcp,:::8093->8093/tcp, 8094/tcp, 
8095/tcp, 8096/tcp 
```

Now run the following commands to check your nodes' logs:

```bash
docker-compose logs
```

Output:

```bash
# our nodes logs
Attaching to couchbase_couchbase2_1, couchbase_couchbase3_1, couchbase_couchbase1_1
couchbase1_1 | Starting Couchbase Server -- Web UI available at http://<ip>:8091
couchbase1_1 | and logs available in /opt/couchbase/var/lib/couchbase/logs
couchbase3_1 | Starting Couchbase Server -- Web UI available at http://<ip>:8091
couchbase3_1 | and logs available in /opt/couchbase/var/lib/couchbase/logs
couchbase2_1 | Starting Couchbase Server -- Web UI available at http://<ip>:8091
couchbase2_1 | and logs available in /opt/couchbase/var/lib/couchbase/logs		
```

### Configuring couchbase cluster
In the previous section, we exposed ports to use while setting up the clusters.

Open [http://localhost:8091](http://localhost:8091) in your browser.

Output:

![Home Page](/engineering-education/couchbase-cluster-docker/home.png)

Default cluster view:

![default view](/engineering-education/couchbase-cluster-docker/default.png)
		
Setup your couchbase account and add the clusters we added above as shown below:

![settings](/engineering-education/couchbase-cluster-docker/settings.png)
		
### Rebalancing couchbase clusters
To distribute data evenly, we need to balance our clusters. 

To achieve this, browse to the servers tab or click on the `pending balance` tab to go to the unbalanced clusters.

![rebalance](/engineering-education/couchbase-cluster-docker/rebalance.png)

### Conclusion	
In this tutorial, we've discussed the couchbase clusters. 

First, we used docker-compose to create services for our application. We then created 3-node couchbase clusters and accessed them via the web portal on our local server.

Happy Coding!

---
Peer review contribution by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
