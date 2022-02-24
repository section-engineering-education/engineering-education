---
layout: engineering-education
status: publish
published: true
url: /sharing-data-between-docker-containers/
title: How to Share Data Between Docker Containers
description: This article will guide you on how to share data between different Docker containers. Docker volumes can help you persist and manage data.
author: oruko-pius
date: 2021-06-07T00:00:00-17:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sharing-data-between-docker-containers/hero.jpg
    alt: Sharing Data between Docker Containers
---
A container is a way of making a program run independently when moved from one environment to another. Containerization, on the other hand, is the process of packaging containers to make it easier to scale them out and enhance their portability.
<!--more-->
A Docker container enables you to develop and run your applications from your environment quickly. You can learn more about Docker from [here](/engineering-education/topic/containers/).

### Prerequisites
To get started, we have to install Docker on our system. Check out this amazing [article](/engineering-education/getting-started-with-docker/) on Getting Started with Docker. 

If you're not using Ubuntu be sure to review the official [documentation](https://docs.docker.com/engine/install/) on how to install Docker on your Operating System environment.

> Note that we will be using `Ubuntu 20.04` in this tutorial.

### Creating an independent volume
Docker volumes are system files that are attached to containers and help to persist data. Docker volumes are also vital when one wants to share data across different containers. 

Let's get started.

We'll use the `docker volume create` command to create a volume without associating it to any container.

Let's create a volume named `NewVol1`:

```bash
docker volume create NewVol1
```

If we list our output, we can see the created volume:

```bash
docker volume ls
DRIVER    VOLUME NAME
local     NewVol1
```

Next, we need to set up a new container from the `Ubuntu image`. We use the `--rm` flag to delete the container when the user exits. The `-v` flag mounts the new volume. 

The name of the volume must be specified followed by a colon and an absolute path, as shown below:

```bash
docker run -ti --rm -v NewVol1:/newvol1 ubuntu
```

The snippet below shows you how to write data to the Docker volume in a container.

```bash
root@77a92a143828:/# echo "Example1" > /newvol1/Example1.txt
```

We exit the root using the code snippet below:

```bash
root@77a92a143828:/# exit
```

To check if our volume still resides in our environment we use `docker volume inspect`:

```bash
docker volume inspect NewVol1
```

The output is:

```bash
[
    {
        "CreatedAt": "2021-05-12T20:20:24+03:00",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/NewVol1/_data",
        "Name": "NewVol1",
        "Options": {},
        "Scope": "local"
    }
]
```

The output is in a JSON array format. It shows the `timestamp` of the inspection. The `Driver` and `Scope` are both in our local system. 

However, the `Labels` and `Options` are empty since we did not specify them. The `Mountpoint` shows the path that the volume resides in. The `name` property indicates the volume we are inspecting.

Next, let's start a new container and attach `NewVol1`:

```bash
docker run -ti --rm -v NewVol1:/newvol1 ubuntu
```

You can check the contents, as shown below:

```bash
docker run -ti --rm -v NewVol1:/newvol1 ubuntu
root@b4a69fffc60a:/# cat /newvol1/Example1.txt
Example1
root@b4a69fffc60a:/# exit
exit
```

### Creating a volume from an existing directory with data
In this step, we will create a volume inside a container with data.

At the `/var` path, let's set up a container and add a Docker volume:

```bash
docker run -ti --rm -v NewVol2:/var ubuntu
root@976fbd71c0a7:/# exit
exit
```

>Note that contents from the `/var` directory are duplicated in the Docker volume. We also attach the volume to the latest container and exit the current directory.

We are using the `ls` command as opposed to the default `bash` for launching the shell:

```bash
docker run --rm -v NewVol2:/newvol2 ubuntu ls newvol2
backups  cache	lib  local  lock  log  mail  opt  run  spool  tmp
```

The `newvol2` index duplicates the components in the `/var` directory.

Using this method to attach `/var/` helps in rendering the image.

### Sharing data between multiple Docker containers
More often than not we'll want various containers to mount to similar Docker volume. However, Docker doesn't handle [file locking](https://www.baeldung.com/linux/file-locking). To write various containers to the volume, the current environment of the containers should be a device that supports shared data stores.

#### Creating Container3 and DataVolume3
We use `docker run` to set up a new container called `Container3` as below:

```bash
docker run -ti --name=Container3 -v NewVol3:/newvol3 ubuntu
```

We then add some text to a new file as shown below:

```bash
root@1ef4d68f08b2:/# echo "Shared container file" > /newvol3/Example3.txt
root@1ef4d68f08b2:/# exit
exit
```

We then exit the container and navigate to the host terminal where we create a new container that attaches data volume from `Container3`.

#### Create Container4 and attach volumes from Container3
Let's attach `Container3` to the newly created `Container4` as shown below:

```bash
docker run -ti --name=Container4 --volumes-from Container3 ubuntu
```

The data consistency is checked as shown:

```bash
root@d19c4e150495:/# cat /newvol3/Example3.txt
Shared container file
root@d19c4e150495:/#
```

At this point, let's append some texts from `Container4` then exit the container:

```bash
root@d19c4e150495:/# echo "Both containers can write to NewVol3" >> /newvol3/Example3.txt
root@d19c4e150495:/# exit
exit
```

Subsequently, we'll check if our data is still present in `Container3`.

#### Container4 changes
We can check for changes in the Docker volume by refreshing `Container3`:

```bash
docker start -ai Container3
```

The commands below confirm if all containers were able to read and write from the Docker volume and then exit the environment:

```bash
root@1ef4d68f08b2:/# cat /newvol3/Example3.txt
Shared container file
Both containers can write to NewVol3
root@1ef4d68f08b2:/# exit
exit
```

#### Start Container5 and attach the volume read-only
If a container has been mounted by a data volume, we don't unmount it as a typical Linux file. We set up a new container and make the volume read-only. 

Appending the `:ro` flag at the end of the container name makes it `read-only`, as shown below:

```bash
docker run -ti --name=Container5 --volumes-from Container3:ro ubuntu
```

We test the read-only prominence by trying to omit the file we created:

```bash
root@9b1678a2d548:/# rm /newvol3/Example3.txt
rm: cannot remove '/newvol3/Example3.txt': Read-only file system
root@9b1678a2d548:/# exit
exit
```

The command below clears our test containers and volumes:

```bash
docker rm Container3 Container4 Container5
docker volume rm NewVol3
```

### Conclusion
In this tutorial, we have learned how to create an independent Docker volume that persists data when a container is deleted. It also facilitates data sharing across different containers. 

The file locking mechanism reduces data corruption. Lastly, we have also learned how to mount a shared volume and make it read-only.

### Other resources
- [Docker](https://docs.docker.com/get-started/overview/)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
