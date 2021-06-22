Containerization is young, disruptive, and growing rapidly. Containers are significant to application management since they allow your applications to run reliably and consistently on any infrastructure environment or operating system. Containerized applications are mainly shipped, stored, and delivered using Docker images. Docker images are your starting point if you are a first-time Docker user.

Containers are created using read-only templates referred to as Docker images. These images consist of several layers combined into a single virtual filesystem. While Docker images are immutable, you can add extra layers and save them as new images. You can change or add content in a Docker image without changing the image directly.

In this article, we discuss what Docker images are, why Docker image layers are important, Docker image anatomy, and use cases.

### What are Docker images?

Applications consist of Docker containers as the main building blocks, with each container representing an image (Docker image). Docker images are built up of layers staked up one on top of the other. Docker reads instructions from Dockerfile to build images automatically. It does so using the [Docker build](https://docs.docker.com/engine/reference/commandline/build/) feature.

Each Docker image layer represents an instruction in the Dockerfile. A [Dockerfile](https://docs.docker.com/engine/reference/builder/) refers to a text document consisting of all the commands required to assemble an image. Only the top layer of Docker images has read-write permissions; the rest have read-only permissions. Like the [copy-on-write concept](https://en.wikipedia.org/wiki/Copy-on-write#), this technology ensures that the changes you make when running a container from the image are made to the top writable layer.

### Why image layers are important

Docker image layers are beneficial in many ways.

- Layers allow you to work with Docker images faster. This is because the builds avoid unnecessary steps, and the puling and pushing of images skips the transfer of large unchanged amount of data already available in the intended destination.
- The use of the copy-on-write filesystem saves on disk space for future containers and images.
- Layers allow you to apply less computational effort (in image building) and save on bandwidth (in image distribution).

### Docker image layers

Images contain everything you need to configure and run a container environment. These include system libraries, dependencies, and tools.

Docker images consist of many layers. Each layer is built on top of another layer to form a series of intermediate images. This arrangement ensures that each layer depends on the layer immediately below it. The way layers are placed in a hierarchy is very significant. It allows you to place the layers that frequently change high up the hierarchy so that you manage the docker image's lifecycle efficiently.

Changes made to a Docker image layer trigger Docker to rebuild that particular layer and all other layers built from it. By making changes to a layer at the top of the stack, you ensure the rebuilding of the entire image using less computational resources. This means you should keep the layers with the least or no changes at the bottom of the hierarchy formed.

![Docker image layers](/engineering-education/understanding-docker-image-layers/docker-image-layers.png)

[Image source](https://subscription.packtpub.com/book/application_development/9781788992329/1/ch01lvl1sec14/understanding-docker-images-and-layers)

#### Base image

All of the container images are created from the base image. This is an empty first layer that allows users to build their first Docker images from scratch. If you do not want to create your base image from scratch, you can use an [official Docker image](https://docs.docker.com/docker-hub/official_images/) like [Centos](https://hub.docker.com/_/centos) as your base image or customize one of the official Docker images to your requirements.

#### Parent image

The parent image is, in most cases, the first Docker image layer. All other layers in your Docker are built upon this foundation. Thus, this layer provides the basic building blocks for container environments.

#### Layers

The other Docker layers are added to the base image using a code to allow them to run in a container. Docker's default status displays all the top-layer images, including file sizes, tags, and repositories. Catching of intermediate layers makes it is easier to view the top layers. Storage drives in Docker manage the contents in image layers.

#### Container layer

Besides creating a new container, a docker image creates a container or writable layer. The changes that you make to your running container are hosted here. The deleted and newly written files and changes made to the existing files are stored in this layer as well. This layer is also useful when customizing containers.

#### Docker manifest

The list of all image layers created by specific image names is known as a Docker manifest. These manifests are used in the same way you would use an image name in the docker run, and Docker pull commands.

### Docker image use cases

Docker images provide users with everything they require to run containerized apps. These include environmental variables, config files, and code. Images deployed to Docker environments can be executed as Docker containers. You need to execute the [docker run command](https://docs.docker.com/engine/reference/commandline/run/) to create a container from an image of your choice. Docker images are both reusable and deployable on any host. This allows you to use static image layers of a particular project in another projects. This helps to avoid recreating images from scratch and saves time.

### Conclusion

This article has introduced us to the basics of the Docker image and its layers. It is critical to understand various Docker image concepts before starting to build your first Docker image.

### Further reading

[How to Create Django Docker Images](/engineering-education/django-docker/)

[How to Create Spring Boot Docker Images](/engineering-education/spring-docker/)

[Getting Started with Docker](/engineering-education/getting-started-with-docker/)

[Managing and Running Docker Containers](/engineering-education/running-and-managing-docker/)