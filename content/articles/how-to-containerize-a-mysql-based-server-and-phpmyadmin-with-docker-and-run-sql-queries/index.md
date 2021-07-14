MySQL is an open-source Relational Database Management System (RDBMS) with a large user base. You can use several RDBMS to run SQL queries, such as MySQL, PostgreSQL, SQLite, SimpleDB, and Elasticsearch.

At times, it becomes hectic to set up an SQL server on your local computer. For example, let's say you are working on a Windows environment and running a MySQL database server. In this case, you have download the software like WAMP, MySQL workbench, and XAMPP to run SQL commands, access your databases and records.

While installing these softwares in your local system, there are chances of failure, like error due to dependencies and libraries to support these programs. This makes it hard, especially for a beginner.

Let's say, you install MySQL server to run SQL queries. Even then, it can be hard to specify which version of MySQL is required. Based on the requirement, you will have to download that specific version and reinstall it on your computer.

With [docker](/engineering-education/getting-started-with-docker/), things get a little easier.

This time you need not install all dependencies to set up a MySQL server. Docker helps you to containerize these dependencies, so that you can run them as containers.

Docker will execute certain instructions for containerizing applications, set up specific environment, and deliver fully [packaged and containerized application](/engineering-education/running-and-managing-docker/) along with its dependencies and libraries. Here, we can specify the version of the MySQL server to be installed.

With Docker, you don't need to install and configure the MYSQL environment to access databases and records. Instead, it provides you with images (official software) that you use to run applications within your docker containers, such as PHPMyAdmin, Adminer, and Sequel Pro (for Mac OS).

When you need to execute SQL queries, you will only need set up a docker `yml` file, run a few commands, and docker will set everything ready for you. Thus, as a beginner, you can run and use SQL queries in a containerized environment.

You can learn more about the concepts of Docker [here](/engineering-education/docker-concepts/).

In this tutorial, we will learn to dockerize (create a docker image (a virtualized instance) of an application) a MySQL database server and set up PHPMyAdmin or Adminer to interact with the MySQL Database.

Whenever you are dockerizing an application, you first need to write a `docker-compose` file and specify the instances you want to containerize to form your stack. So, let's understand how to containerize MYSQL, PHPMyAdmin, or Adminer stack and run SQL-based queries for local-based databases.

### Prerequisites
As a prerequisite, you'll have to download [Docker](https://www.docker.com/products/docker-desktop) for depending the OS you use.

Once you install it, make sure you run `docker` in your command line. If you have no errors, then you're good to go.

### Pulling MySQL with docker
The first thing you have to do to create and test the database server in docker is to pull a MySQL image from the [Docker hub](https://hub.docker.com/search?q=&type=image) with this pretty simple command.

```bash
docker pull mysql:latest
```

`docker pull` will inform the Docker hub that you want to download this specified image to your local docker engine.

You can have a look at [MYSQL image](https://hub.docker.com/_/mysql) in Docker hub.

MySQL servers have different versions of the release, and each version is different and not compatible with the previous versions. So, you need to specify the version of MYSQL to be downloaded.

The best practice would be to download the latest stable MYSQL server version. That's why we are adding a `latest` flag to `docker pull mysql`. If you wish to download a specific version, then you have to specify it something like `docker pull mysql:8`.

![Docker pull MySQL latest](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/docker-pull-mysql-latest.png)

You can then run `docker images` to see a list of docker images you have pulled from the docker hub. And right there, we can see MySQL image is now available to our locally installed docker.

![Docker images](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/docker-images.png)

### Create an MYSQL image container to run the MySQL server
Now, having the MySQL docker image ready, we can now create a container that will run this image.

To do so, we will follow these instructions:
- `docker run` - this will automatically run a created docker container.
- `--name mysql_db` - the flag `--name` will instruct docker to create a container named `mysql_db`.
- `-d` - this optional flag stands for the detouch mode. When included, the MySQL database will run in the background as a docker demon.
- `-p 3306:3306` - this port number will map the MySQL server to its default port which is `3306`.
- `-e MYSQL_ROOT_PASSWORD = mypassword` - the flag `e` stands for environment variables. In this case, we need a root password to access the MySQL server. We will assign the root password as an environment variable.
- `mysql:latest` specifies the image that we want to include in this container. This image must be downloaded/pulled and made available in a local docker.

```bash
docker run --name mysql_db -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mypassword mysql:latest
```

When you execute the command above, a container will be created along with a container ID. And if you run `docker ps`, you can see the created container assigned to name `mysql_db`.

![mysql db container](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/mysqldb-container.png)

### Running the MySQL server from the container
Now, we are going to execute the MySQL server demons directly from this container that we have created.

We will follow the below instructions:
- `docker exec` - will execute a docker command and point it directly to a specified docker container.
- `-it` -  `i` stand for interactive and `t` for terminal.
- `mysql_db` - specifies the name of the container you want to execute.
- `/bin/bash` - this specifies the shell you want to use. You can even use the `cmd` or the `PowerShell`.

In this case, I've chosen to use `git bash`. So, make sure you have [git bash](https://git-scm.com/downloads) installed in your computer for `/bin/bash` to work.

The summarized single command would be:

```bash
docker exec -it mysql_db /bin/bash
```

![A bash shell](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/bash-shell.png)

We can now connect to the MySQL server and start the interaction using SQL command. We can use the password from the environment variable to access the server.

To log in to the server, we will need a username and a password. In this case, the username should be the default `root` and the password should be `mypassword` as shown:

```bash
mysql -uroot -pmypassword
```

- `mysql` for the MySQL server.
- `-uroot` - for the default root username.
- `-pmypassword` - for the set root password.

And now, you can see we logged on to the MySQL server and ready to run SQL commands.

![Docker MySQL server](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/mysql-server.png)

Let's execute a create database example here:

```sql
CREATE DATABASE my_test_db;
```

![Docker create mysql database](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/create-database.png)

And there you go, you can see `Query Ok` and the affected rows indicating the query has executed correctly. You can view the list of the available databases using:

```SQL
SHOW databases;
```

![Docker show databases](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/docker-show-databases.png)

As you can see, we have the `my_test_db` database created.

Now, you can start interacting with this database and execute MySQL queries inside it. Run `use my_test_db` to switch to the database and execute queries such as:

- To create a table:

```sql
CREATE TABLE users ( id int not null auto_increment, name varchar(225) not null, constraint pk_example primary key (id));
```

- To insert into this table:

```sql
INSERT INTO users ( id, name ) VALUES ( null, 'Alexa' );
```

- To select from this table:

```sql
SELECT * FROM users;
```

![MySQL server docker queries](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/mysql-server-docker-queries.png)

It's straightforward to execute these SQL queries from a dockerized MySQL server environment.

In all of the above examples, we use a terminal to run these queries. This can be a little hard for the beginners. Now, we will learn to set a PHPMyAdmin, to help you interact with the server and execute queries off the command line.

### Using PHPMyAdmin
#### Method 1: Connect MySQL and PHPMyAdmin containers
We will create an additional `phpmyadmin` container, then link it with the previous `mysql_db` container.

- Pull [PHPMyAdmin image](https://hub.docker.com/_/phpmyadmin) from docker hub using this command:

```bash
docker pull phpmyadmin/phpmyadmin
```

Having the image ready, we can now create a container that will run this image and connect it to the `mysql_db` container.

To do so, we will follow the below instructions:

- `docker run` - this will automatically run a created docker container.
- `--name phpmyadmin` - the flag `--name` will instruct docker to create a container named `phpmyadmin`.
- `-d` - this optional flag stands for the detouch mode. When included, the MySQL database will run in the background as a docker demon.
- `-p 8068:80` - This port number will map the PHPMyAdmin and be able to access it over the browser.
- `--link mysql_db:db` - this will link the `phpmyadmin` container to the `mysql_db`.
- `phpmyadmin` -specifies the image that we want to include in this container. This image must be downloaded/pulled and made available in local docker.

```bash
docker run --name phpmyadmin --link mysql_db:db -p 8068:80 -d phpmyadmin
```

Now, you can open the browser and access the PHPMyAdmin using `http://localhost:8068/`. This loads up the PHPMyAdmin page. You can login with the username as `root` and password as `mypassword`. Just as we defined when creating a `mysql_db` container.

![A linked docker MySQL server and phpmyadmin](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/a-linked-docker-mysql-server-and-phpmyadmin.png)

#### Method 2: Spin MySQL and phpmyadmin using docker-compose
To do so, we will set a `docker-compose.yml`, set the MySQL server and PHPMyAdmin, and run both in a single container.

Let's go ahead and create a sample folder. You can use your preferred text editor, for example, [Visual Studio Code](https://code.visualstudio.com/).

Here, we will create a docker file.

> Note: Name this file as `Dockerfile`.

Add these MySQL instructions into this file:

```yml
FROM MySQL:latest
ENV MYSQL_DATABASE: my_db
ENV MYSQL_USER: my_password
ENV MYSQL_PASSWORD: secret
ENV MYSQL_ROOT_PASSWORD: secret
EXPOSE 3307:3307
```

On the same directory, create a `docker-compose.yml` file.

Instead of using the docker command, we will use docker-compose to set up this container. Go ahead and write the MySQL and PHPMyAdmin instructions as follows:

```yml
version: '3.8'
services:
    mysql_db:
        build:
            context: .
            dockerfile: Dockerfile
        image: mysql:latest
        container_name: mysql
        restart: unless-stopped

    phpmyadmin:
        image: phpmyadmin/phpmyadmin
        restart: unless-stopped
        environment:
            PMA_HOST: mysql_db
        depends_on:
            - mysql_db
        ports:
            - '8080:80'
```

On your terminal run, `docker compose up -d`.

This will download any additional libraries set in the `docker-compose.yml` file and the spin-up MySQL server with PHPMyAdmin. The flag `-d` will run this stack in detouch mode, i.e., in the background.

Now, you can access your MySQL server using PHPMyAdmin by executing the localhost port `8080` on your browser, i.e., `http://localhost:8080/`. You can login using the same credentials, as mentioned earlier.

![A localhost dockerized phpmyadmin](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/a-localhost-dockerized-phpmyadmin.png)

And, there you go, you are ready to execute SQL queries more interactively.

As an alternative to PHPMyAdmin, [Adminer](https://hub.docker.com/_/adminer) can also be used. The best thing with Adminer is that, it is easily compatible with a variety of relational databases such as MySQL, SimpleDB, SQLite, PostgreSQL, and Elasticsearch.

So, you could replace the following PHPMyAdmin service with the Adminer service.

```yml
adminer:
    image: adminer:latest
    restart: unless-stopped
    ports:
        - 8000:8080
    depends_on:
        - mysql_db
    environment:
        ADMINER_DEFAULT_SERVER: mysql_db
```

![Adminer](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/adminer.png)

Provide username as `root` and password as `secret`, same as PHPMyAdmin.

![A localhost dockerized adminer](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/a-localhost-dockerized-adminer.png)

### Conclusion
we learnt a very simple way to install and run a relational database. This method for other relational databases such as PostgreSQL. In this case, you pull a [PostgreSQL image](https://hub.docker.com/_/postgres) and spin it together with the [pgadmin4 image](https://hub.docker.com/r/dpage/pgadmin4), and you will be able to run it as well in a container.

In this article, we have understood how to containerize and run MySQL server using Docker. Using Docker, we have simplified the whole process of installation, configuration, and running the database.

To understand better, try them out by yourself.

Happy coding.