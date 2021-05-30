---
layout: engineering-education
status: publish
published: true
url: /docker-wordpress-containerizing-wordpress-with-docker-compose/
title: Containerizing WordPress with Docker-Compose
description: This article provides a step by step guide on how to use Docker in a WordPress application. Docker Compose simplifies the management of an application's service dependencies.
author: rose-waitherero
date: 2021-04-12T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/docker-wordpress-containerizing-wordpress-with-docker-compose/hero.png
    alt: Containerizing WordPress with Docker-Compose
---
[Docker](https://docs.docker.com/get-started/overview/) is a container management system. It is used to manage an application that has multiple components. Docker-compose is a toolkit provided by Docker. It defines and runs a multi-container Docker application. 
<!--more-->
Most applications involve more than one architectural component. In such applications, Docker-compose will help you run these components as defined in your application stack. It provides a single file that defines how different containers interact with each other as required by your application stack.

A good example of a stack application is WordPress. WordPress is an open-source API for the content management system. WordPress API is used to create beautiful websites, blogs, or apps. It consists of a phpMyAdmin, MySQL database container, and a WordPress installation container. 

Docker allows us to create a simple `YAML` config file to bundle these WordPress containers (components). The components will interact and run as one application. We will use Docker-compose to run these three WordPress API containers to utilize the WordPress content management system.

Typically, setting up a WordPress installation involves multiple steps. You need to set up the WordPress environment manually. This can be very cumbersome. Furthermore, you should establish a local web server, configure the server to execute PHP code, and set up a MySQL database. 

You can also use pre-built bundles like MAMP for MacOS or XAMPP and Wamp for Windows to set all WordPress components on your local computer's system.

However, with Docker, you create a single file and run few commands. This will set up everything within Docker containers, and your WordPress will run fine. This is the most straightforward way to set up a WordPress website environment.

### Goal
This tutorial will demonstrate how to Dockerize a WordPress website using Docker-compose through Docker commands. 

### Prerequisites
- This guide uses Docker to implement the application containerization. Prior knowledge of [Docker](/getting-started-with-docker/) is essential.
- Basic knowledge on how to [create Docker images](/django-docker/) and [start Docker containers](https://docs.docker.com/engine/reference/commandline/start/).
- Basic knowledge on how to [install and use WordPress](youtube.com/watch?v=8AZ8GqW5iak).

### Getting ready
To get started, install [Docker](https://docs.docker.com/docker-for-windows/install/) on your computer.

While installing Docker on Windows, you might come across this error.

![Docker installation error](/engineering-education/docker-wordpress-containerizing-wordpress-with-docker-compose/docker-installation-error.jpg)

To solve this, download and install the [WSL 2 Linux kernel](https://docs.microsoft.com/en-us/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package). Restart the Docker desktop, and the error will be resolved.

> We will be using images that are readily available in the [Docker Hub](https://hub.docker.com/). 

These include:
- [WordPress](https://hub.docker.com/_/wordpress) - We need a WordPress image to create a WordPress website. WordPress image includes the Apache server that we need to execute PHP code.
- [MySQL](https://hub.docker.com/_/mysql) - This will set the WordPress environment variables such as the MySQL root password, users, and database.
- [phpMyAdmin](https://hub.docker.com/_/phpmyadmin) - It allows us to view database tables and columns.

We are now ready to create a single `YAML` file that will set all of these Docker images and containers.

### Setting the YAML file
First, create a project directory in your computer preferred location. i.e. `cd desktop`, And then your project directory `mkdir wordpress-docker`

Change directory to the newly created directory with `cd wordpress-docker`.

Inside the `wordpress-docker` directory, create a `.yaml` file, i.e. `docker-compose.yaml`. Run `type nul >> docker-compose.yaml` to create the file. If your are on Linux or Mac use `touch docker-compose.yaml`.

Docker-compose can also work with `.yml`.

Open the project with your preferred text editor. I am using [Visual Studio Code](https://code.visualstudio.com/). I will go ahead and open it with `code .`.

### Setting the compose environs
- The first thing to define in this YAML file is the version of the compose file to use. This should be the [Docker-compose latest version](https://docs.docker.com/compose/compose-file/compose-versioning/).

Go ahead and include the following line in the .yaml file top-level.

```yaml
Version: '3'
```

- Services - Defines the types of containers to run. In this case, they include WordPress and MySQL.

```yaml
services:
```

Add containers in the services block, as shown below.

```yaml
services:

  #MySQL Database image
  mysql_db:

  #Wordpress image based on Apache
  wordpress:
```

1. Database

- The container name. This will be the name you want to give the database container.

```yaml
container_name: database_container
```

- Restart mode: In case the container stops running for any reason, set it to restart. If the server reboots, the container restarts.

```yaml
restart: always
```

- Container image: To run a MySQL database, you need a MySQL image as provided in the [MySQL Docker hub](https://hub.docker.com/_/mysql). Ensure to include the latest version of the container image. 

Set this image, as shown below.

```yaml
image: mysql
```

- MySQL environments: The database environment consists of the database name and password and database username and password. WordPress will use these environment variables to connect to the MySQL container.

```yaml
environment:
    MYSQL_ROOT_PASSWORD: my_password_1234789
    MYSQL_DATABASE: my_wp_database
    MYSQL_USER: my_wp_user
    MYSQL_PASSWORD: my_wp_user_password
```

- Define the container volumes. This will map the MySQL container data to the volumes you created.

```yaml
volumes:
  - mysql:/var/lib/mysql
```

2. WordPress

Now, let's define the WordPress services.

- `Depend on`.  It ensures that a container only starts when the services it depends on are online. WordPress relies on the MySQL container, therefore, specify the `depend_on` as follows.

```yaml
depends_on:
  - my_database
```

The name should be equal to the name of the database service as defined in the MySQL container.

- Define the [WordPress image](https://hub.docker.com/_/wordpress).

```yaml
image: WordPress:latest
```

Always include annotation `latest` so that WordPress loads on the latest available version.

- Define the restart policy as always.

```yaml
restart: always
```

- Set WordPress container port. WordPress image is based on Apache, and you need to set the port that Apache runs on. By default, Apache runs on port `80`. Define this port to map the container to the local machine. Map the default apache port to `port 8000` of the local computer.

```yaml
ports:
  - "8000:80"
```

- WordPress environment variables. For a WordPress container to run, you should set the database environments that WordPress will utilize. These variables include the WordPress database host, WordPress database user name, database user password, and the database name defined in the MySQL container environs.

```yaml
environment:
    WORDPRESS_DB_HOST: my_database:3306
    WORDPRESS_DB_USER: my_wp_user
    WORDPRESS_DB_PASSWORD: my_wp_user_password
    WORDPRESS_DB_NAME: my_wp_database
```

- Set these WordPress volumes. They map the current directory to the directory containing the WordPress files.

```yaml
volumes:
  ["./:/var/www/html"]
```

3. Create a top-level volume that will define MySQL as stated in `mysql:/var/lib/mysql`.

```yaml
volumes:
  mysql: {}
```

### The complete YAML file

```yaml
version: "3"
services:
  #MySQL Database image
  my_database:
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: my_password_1234789
      MYSQL_DATABASE: my_wp_database
      MYSQL_USER: my_wp_user
      MYSQL_PASSWORD: my_wp_user_password
    volumes:
      - mysql:/var/lib/mysql

  #WordPress image based on Apache
  wordpress:
    depends_on:
      - my_database
    image: wordpress:latest
    restart: always
    ports:
      - "8000:80"
    environment:
      WORDPRESS_DB_HOST: my_database:3306
      WORDPRESS_DB_USER: my_wp_user
      WORDPRESS_DB_PASSWORD: my_wp_user_password
      WORDPRESS_DB_NAME: my_wp_database
    volumes:
      ["./:/var/www/html"]
volumes:
  mysql: {}
```

### Testing
The YAML file is ready to initialize the defined Docker container. Run the following command to set this container.

```bash
docker-compose up -d
```

> Ensure you are running the command above from the directory where your YAML file is located.

This will download all the environs required by WordPress. If you look at your directory, you'll realize that there are new files and folders. These are the WordPress files downloaded from the guideline set in the `docker-compose.yaml`.

![Wordpress files](/engineering-education/docker-wordpress-containerizing-wordpress-with-docker-compose/docker-wordpress-files.jpg)

To confirm if the WordPress site is working, open `http://localhost:8000/` in the browser. This will launch the normal WordPress wizard.

![Wordpress installation wizard](/engineering-education/docker-wordpress-containerizing-wordpress-with-docker-compose/wordpress-installation.jpg)

Click continue and provide the `wp-admin` information and install WordPress.

![WordPress wp-admin config information](/engineering-education/docker-wordpress-containerizing-wordpress-with-docker-compose/wp-admin-config-information.jpg)

Login with the information you have provided, and this will launch the WordPress back-end.

![WordPress wp-admin backend](/engineering-education/docker-wordpress-containerizing-wordpress-with-docker-compose/wp-admin-backend.jpg)

And you are done. You have dockerized a WordPress website.

Run `docker-compose down` to cut down the two containers.

### Setting PHPMyAdmin
Since we are using Mysql, we can add the service phpMyAdmin to access and view the database.

Go ahead and include the following [phpMyAdmin service](https://hub.docker.com/_/phpmyadmin) and its environs in your YAML file.

```yaml
phpmyadmin:
    depends_on:
      - my_database
    image: phpmyadmin/phpmyadmin
    restart: always
    ports:
      - '8080:80'
    environment:
      PMA_HOST: my_database
      MYSQL_ROOT_PASSWORD: my_password_1234789
```

Run `docker-compose up -d`, open `http://localhost:8000/` to view the website.

Navigate to `http://localhost:8080/` to view the phpMyAdmin. Enter your authentication details and you'll be able to view and interact with the MySQL database.

![wordpress PHPMyAdmin](/engineering-education/docker-wordpress-containerizing-wordpress-with-docker-compose/wordpress-php-my-admin.jpg)

### Conclusion
We now have WordPress up and running. This is an easier way to set up the WordPress API. Besides, you can use this method to carry out WordPress testing before releasing it to the public.

Happy coding!

### Further learning
- [Getting Started with Docker](/getting-started-with-docker/)
- [Understanding Docker Concepts](/docker-concepts/)
- [How to Create Django Docker Images](/django-docker/)
- [How to Create Spring Boot Docker Images](/spring-docker/)
- [Building A Node.js Application Using Docker](/building-a-nodejs-application-using-docker/)
- [Debugging a Node.js app running in Docker](/debug-node-docker/)
- [Breaking Down Kubernetes vs Docker Swarm](/breaking-down-kubernetes-vs-docker-swarm/)


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)