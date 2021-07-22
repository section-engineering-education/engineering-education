### Docker Push for Publishing Images to Docker Hub
![hero_image](engineering-education/docker-push-for-publishing-images-to-docker-hub/hero.jpg)

### Introduction
Dockerfiles use has been on the rise in creating Docker containers. The untouched bit on Dockerfiles that rarely get a mention is its trivial advantage in creating a Docker image to which users can push to an online repository in Docker Hub. This makes it easier in sharing Docker images across various public and private repositories and registries giving users more flexibility in creating an earlier version of Docker images. We'll go through how to create a Dockerfile, create an account in Docker Hub from where we'll create a repository to which the built Docker image will be pushed. We'll also cover how to push Docker images to a registry.

The article will be beneficial for individuals with knowledge in Docker already or readers with fundamentals of containers will be able to pick it with cogent.

### Prerequisites
To get started, we have to install Docker on our system. Check out this amazing [article](/engineering-education/getting-started-with-docker/) on Getting Started with Docker.

If you're not using Ubuntu be sure to review the official [documentation](https://docs.docker.com/engine/install/) on how to install Docker on your Operating System environment.

> Note that we will be using `Ubuntu 20.04` in this tutorial.

### Creating a Dockerfile
Before we publish a Docker image it will be appropriate to build one right. So let's get to understand what a Dockerfile is first. A Dockerfile is a content file comprising of specific commands used to generate a Docker image. Let's proceed and create one, in your terminal create a directory and move into the directory created with the command below:

```
mkdir TestDocker
cd TestDocker
```
Create a file called `Dockerfile` with the command below:

```
touch Dockerfile
```

Since the file we created is empty, open it via a text editor of your choosing and update the file as shown below:

```
FROM linux

MAINTAINER testUser

RUN apt-get update

CMD ["echo", "Welcome to Dockerfile"]
```

* **FROM** - specifies the prop of the created image. It can start from the base image or the root image.
* **MAINTAINER** - Defines the author of that particular image. It can take a first name, last name, or email. **LABEL** attribute further highlights more about the image.
* **RUN** - It is a command that carries the set of instructions for executing the Dockerfile while building the image.
* **CMD** - The command provides a revert for a Dockerfile that's executing.

To check the content of the `Dockerfile` you can use the `cat` in the terminal:

```
oruko@oruko-ThinkPad-T520:~/Documents/TestDocker$ cat Dockerfile
FROM ubuntu

MAINTAINER testUser

RUN apt-get update

CMD ["echo", "Welcome to Dockerfile"]
```

### Creating a repository on Docker Hub
Now that we have created our Dockerfile before we push it to an online repository, let's create a repository within Docker.
If you're well-acquainted with the way Github works then Docker hub isn't that different from it. So head over to [Docker Hub](https://hub.docker.com/) and register an account. After signup clicks the `Repositories` tab in the navbar, you'll see a form like the one below:

![repository](engineering-education/docker-push-for-publishing-images-to-docker-hub/repo.jpg)

Create a repository called `docker-push` as that is the example we'll be using throughout the article. Now that our repository is set,  let's proceed and create an image from Docker and push it to the repository we created earlier.

### Build Docker Image using Docker Hub and for organization
To be able to build an image in Docker the command below is used:
 ```
 docker build -t username/repository_name .
 ```

The `-t` flag helps when dealing with various images in identifying which name they belong to. The `username` is your Docker hub name and the `repository_name` in this case is `docker-push` the repository we created earlier. We add a period `.` when in the folder of the Dockerfile. With this hindsight, let's proceed and build our Docker image by executing the command changing the username with yours as it appears in the Docker hub and the repository with `docker-push` as displayed below:

```
docker build -t bullet08/docker-push .
```

For more about Docker Hub commands check the documentation [here](https://docs.docker.com/docker-hub/repos/).

The same approach used when building Docker images for organizations, you change the username with the organization's account name and Docker hub repository of the organization.

### Pushing Docker image
Before we push the Docker image we need to log into the Docker hub. We can do this effortlessly using a command-line command shown below:

```
oruko@oruko-ThinkPad-T520:~/Documents/docker$ docker login
username: bullet08
password:
Login Succeeded
```

Once validated we can then push our container to the Docker hub.
We then push our container to the Docker hub using the commands below:

```
docker push bullet08/docker-push
```
With that done our Docker image is now available in Docker Hub. You can see it by visiting your repository.

### Pushing to a Non-Docker-Hub registry
A Docker registry is a memory board and a disseminated system for Docker images that enable Docker users to pull built images to their local and push new images to the registry when for authorized users. This far, we have conferred how to build a Docker image using our username. As this is important for individuals using the Docker Hub registry service, the procedures change a bit when pushing to the Docker-Hub registry. We append our registry to our username when building for the non-Docker-Hub-Registry. The example below shows an example of building an image for a registry at `registry.test.com`.

```
docker build -t registry.test.com/bullet08/docker-push .
```

We use the same command when logging into our Docker Hub before pushing our image, for this case we use the command below:

```
docker login registry-test.com
```

To push our built image to the Docker repository,  we use the command we shown earlier but now we change it to be our registry:

```
docker push registry.test.com/bullet08/docker-push
```

We have now not only succeeded in pushing our Docker images we created earlier but also other registries that we may need to push either private or public.

### Conclusion
In this article,  we get our hands on getting to know more about Docker Hub, building images for both our username, organization, and a registry using the command line.
We then pushed those respective Docker images to our Docker Hub repository and the non-Docker Hub. For more on getting to understand the incidentals of Docker Hub, check out their official [documentation](https://docs.docker.com/docker-hub/).

Happy Coding!
