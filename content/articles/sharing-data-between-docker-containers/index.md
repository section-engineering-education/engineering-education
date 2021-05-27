<<<<<<< HEAD
---
layout: engineering-education
status: publish
published: true
url: /engineering-education/sharing-data-between-docker-containers/
title: How to Share Data between Docker Containers
description: This article will guide on how to share data between different Docker containers.
author: 
date: 2021-05-17T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/sharing-data-between-docker-containers/hero.jpg
    alt: Creating your first Google Web Story
---
A container is a way of making a program run independently when moved from one environment to another. Containerization, on the other hand, is the process of packaging containers to make it easier to scale them out and enhance their portability.
<!--more-->

A Docker container enables you to develop, ship, and run your applications from your environment quicker. You can learn more about Docker from [here](https://docs.docker.com/get-started/overview/).
### Prerequisites
To get started, we have to install Docker on our system.
Check out this amazing [article](https://www.section.io/engineering-education/getting-started-with-docker/) on installing and getting up running with Docker. 

If you're not using Ubuntu be sure to check the official Docker [documentation](https://docs.docker.com/engine/install/) on how to do the same on your Operating System environment.
We will be using Ubuntu 20.04 for this tutorial but any environment is okay.

### Creating an Independent Volume
Before we get into the creation of volumes let's get to know what they are. Docker volumes are system files that are attached to Docker containers to keep data created by running the container. Docker volumes come into play mainly when one wants to share volume among different containers, separate volumes from storage just to mention a few. For more on Docker volumes, the [documentation](https://docs.docker.com/storage/volumes/) is a good reference.

We'll use the `docker volume create` command to create a volume without associating it to any container.
Let's create a volume named `NewVol1`:

```bash
docker volume create NewVol1
```

If we list our output now we can visibly see the created volume:

```bash
docker volume ls
DRIVER    VOLUME NAME
local     NewVol1
```

For us to see the volume in action, we have to set up a new container from the Ubuntu image. We use the `--rm` flag to immediately delete upon exit from the container, the `-v` flag is to attach to the new volume. The name of the volume must be specified followed by a colon and an absolute path to where we want the container to appear:

```bash
docker run -ti --rm -v NewVol1:/newvol1 ubuntu
```

The snippet below shows how to write data to the Docker volume whilst in the container.

```bash
root@77a92a143828:/# echo "Example1" > /newvol1/Example1.txt
```

By using `--rm`, the container will be expunged. The volume won't be deleted and will exist.
We exit the root by:

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

The output is in array as `JSON` format. It shows the timestamp the inspection was done by the `CreatedAt` attribute. The `Driver` and `Scope` are both in our local system and the `Labels` and `Options` are empty since we did not specify any. The `Mountpoint` shows the path the volume resides in. The `name` property shows the volume we are inspecting.

Next, let's start a new container and attach NewVol1:

```bash
docker run -ti --rm -v NewVol1:/newvol1 ubuntu
```

To check the contents:

```bash
docker run -ti --rm -v NewVol1:/newvol1 ubuntu
root@b4a69fffc60a:/# cat /newvol1/Example1.txt
Example1
root@b4a69fffc60a:/# exit
exit
```

Just an overview of this chapter we created a docker volume, link it to a container and uphold its tenacity.

### Volume from an Existing Directory with Data
Normally, setting up a Docker volume singly with `docker volume create` and creating one while generating a container are indistinguishable, with one anomaly. By setting up a Docker volume simultaneously to creating a container, a path is provided that contains data in the main image the data will be duplicated into the volume.

At the `/var` path, let's set up a container and add a Docker volume:

```bash
docker run -ti --rm -v NewVol2:/var ubuntu
root@976fbd71c0a7:/# exit
exit
```

The base image's contents from the `/var` directory are replicated into the Docker volume, and we attach the volume to the latest container and exit the current container.

Now, we'll be using the `ls` command as opposed to the default `bash` for launching the shell:

```bash
docker run --rm -v NewVol2:/newvol2 ubuntu ls newvol2
backups  cache	lib  local  lock  log  mail  opt  run  spool  tmp
```

The `newvol2` index duplicates the components of the main image's `/var` directory.

It's not a common way to attach `/var/` in this manner, however, it aids in rendering our own image. In the subsequent example, we show how a Docker volume can be shared across containers.

### Sharing Data Between Multiple Docker Containers
More often than not we'll want various containers to mount to similar Docker volume. Implementing this is comparatively elementary, a little caveat, though is that Docker doesn't handle file locking. To write various containers to the volume, the current environment of the containers should be a device to write to shared data stores.

#### Create Container3 and DataVolume3
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

We then exit the container and move to the host terminal and create a new container that attaches data volume from `Container3`.

#### Create Container4 and Attach Volumes from Container3
Let's attach `Container3` to the newly created `Container4` as shown below:

```bash
docker run -ti --name=Container4 --volumes-from Container3 ubuntu
```

The data constancy is checked as shown:

```bash
root@d19c4e150495:/# cat /newvol3/Example3.txt
Shared container file
root@d19c4e150495:/#
```

At this point let's append some texts from `Container4` then exit the container:

```bash
root@d19c4e150495:/# echo "Both containers can write to NewVol3" >> /newvol3/Example3.txt
root@d19c4e150495:/# exit
exit
```

Subsequently, we'll check if our data is still present in `Container3`.

#### Container4 changes
By refreshing `Container3` we check for the changes made to the Docker volume by `Container4`:

```bash
docker start -ai Container3
```

The extract below confirms if all containers were able to read and write from the Docker volume and then exit the environment:

```bash
root@1ef4d68f08b2:/# cat /newvol3/Example3.txt
Shared container file
Both containers can write to NewVol3
root@1ef4d68f08b2:/# exit
exit
```

#### Start Container5 and Attach the Volume Read-Only
If a container has been mounted by a data volume, we don't unmount it as a typical Linux file. We set up a new container and make the volume read-only. By appending the `:ro` flag at the end of the container name makes it read-only as shown below:

```bash
docker run -ti --name=Container5 --volumes-from Container3:ro ubuntu
```

We test the read-only prominence by trying to omit the file we created and exit out of the container:

```bash
root@9b1678a2d548:/# rm /newvol3/Example3.txt
rm: cannot remove '/newvol3/Example3.txt': Read-only file system
root@9b1678a2d548:/# exit
exit
```

The command below clear up our test containers and volumes:

```bash
docker rm Container3 Container4 Container5
docker volume rm NewVol3
```

In this chapter we've seen how data sharing occurs among containers and how Docker volumes can be attached as read-only files.

### Conclusion
In this tutorial, you have learned how to create an independent docker volume that permits data to recur when a container is deleted, shared data across containers which had a caveat of the application being designed in a way to handle file locking to curb corruption of data. Ultimately, we mounted a shared volume as read-only.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
