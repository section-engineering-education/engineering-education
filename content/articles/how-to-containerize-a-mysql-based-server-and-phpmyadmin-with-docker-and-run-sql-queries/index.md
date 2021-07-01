MySQL is an open-source relational database management system (RDBMS) with a large user base. You can use several relational database management systems (RDBMS) to run SQL queries, such as MySQL, PostgreSQL, SQLite SimpleDB, and Elasticsearch. At times it is hectic to set up an SQL server on your local computer. For example, let's say you are using a Windows environment and running a MySQL database server. In this case, you have download software that supports the RDBMS to run SQL commands and access your databases and records, such as WAMP, MySQL workbench, and XAMPP. While installing these environments, something can go wrong, or maybe your computer needs other dependencies and libraries locally installed to support these programs. This makes it hard, especially for a beginner configuring, let's say, a MySQL server to run SQL queries. Furthermore, it can be hard to specify which versions of MySQL you want to run. You have to download that specific version and reinstall it on your computer.

With [docker](/engineering-education/getting-started-with-docker/), things get a little easier. This time you don't need to install all dependencies that you locally need to set up a MySQL server. Docker helps you to containerize software environments so that you can run them as containers. This way, you set a couple of commands that you want your application environment to run on. Then docker will execute these instructions for you, set up that specific environment, and deliver fully [packaged and containerized application](/engineering-education/running-and-managing-docker/) dependencies and libraries. This allows you to specify things like the version of the MySQL server you want to run.

You don't need to install and configure the MYSQL environment to access databases and records. Instead, docker provides you with images (official software) that you use and run within your docker containers, such as PHPMyAdmin, Adminer, and Sequel Pro (for Mac OS), to access your record database.

When you need to execute SQL queries, you will only set up a dockerize yml file, run a few commands, and docker will set everything ready for you. Thus, as a beginner, you can run and use SQL queries in a containerized environment.

The [docker concept](/engineering-education/docker-concepts/) is the most efficient and user-friendly way to practice, develop, and learn. Rather than worrying about the database's download, installation, and configuration, you can focus on other things. You can easily spin up a container, test and develop in it, and then spin it down again.

This tutorial will dockerize a MySQL Database Server and set up PHPMyAdmin or Adminer to interact with the MySQL Database. In simple words, dockerize means create a docker image (a virtualized instance) of an application.

Whenever you are dockerizing an application, you first need to write a docker-compose file and specify the instances you want to containerize to form your stack. So let's go ahead and demonstrate how to create this MYSQL, PHPMyAdmin, or Adminer stack and run any SQL-based queries for local-based databases.

### Prerequisites

The essential requirement is to download [docker](https://www.docker.com/products/docker-desktop) for either Mac or Windows or any environment you are in and install it on your local computer. Once you have it make sure you run `docker` in your command line. If you have no errors, then you're good to go.

### Pulling MySQL with docker

The first thing you have to do to create and test the database server in docker is to pull a MySQL image from the [docker hub](https://hub.docker.com/search?q=&type=image) with this pretty simple command.

```bash
docker pull mysql:latest
```

`docker pull` will inform the docker hub that you want this specified image in your local docker engine. So you go ahead and specify that you wish to get an [MYSQL image](https://hub.docker.com/_/mysql). MYSQL servers have different versions of the release, and each version is different and not compatible with the previous versions. So you need to specifically tell the docker hub which MYSQL server version it should pull to your docker. The best practice here is to have the latest stable MYSQL server version. That's why we are adding a `latest` flag to `docker pull mysql`. Otherwise, if you have a specific version that you want to use, you can go ahead and include that in your pull command. For example, `docker pull mysql:8`.

![Docker pull MySQL latest](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/docker-pull-mysql-latest.png)

You can then run `docker images` to see a list of docker images you have pulled from the docker hub. And right there, we can see MySQL image is now available to our locally installed docker.

![Docker images](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/docker-images.png)

### Create an MYSQL image container to run the MySQL server

So now we have an image ready, we can now create a container that will run this image. To do so, we will use these instructions.

- `docker run` - this will automatically run a created docker container.

- `--name mysql_db` - the flag `--name` will instruct docker to create a container named `mysql_db`.

- `-d` - this optional flag stands for the detouch mode. When included, the MySQL database will run in the background as a docker demon.

- `-p 3306:3306` - this port number will map the MySQL server to its default port which is 3306.

- `-e MYSQL_ROOT_PASSWORD = mypassword` - the flag `e` stands for environment variables. In this case, we need a root password to access the MySQL server. We will assign the root password as an environment variable.

- `mysql:latest` specifies the image that we want to include in this container. This image must be downloaded/pulled and made available in a local docker.

Now we ready to run these instructions as one command.

```bash
docker run --name mysql_db -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mypassword mysql:latest
```

When you execute the command above, a container will be created with a container id. And if you run `docker ps`, you can see the created container assigned to name `mysql_db`.

![mysql db container](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/mysqldb-container.png)

### Running the MySQL server from the container

Now we are going to execute the MySQL server demons directly from this container we have created.

We will use the below instructions.

- `docker exec` - will execute a docker command and point it directly to a specified docker container.

- `-it` -  `i` stand for interactive and `t` for terminal.

- `mysql_db` - specifies the name of the container you want to execute.

- `/bin/bash` - this specifies the shell you want to use; you can even use the cmd or the PowerShell. In this case, I chose to use bash. So make sure you have [git bash](https://git-scm.com/downloads) installed in your computer for `/bin/bash` to work.

The summarized single command should be;

```bash
docker exec -it mysql_db /bin/bash
```

![A bash shell](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/bash-shell.png)

As you can see, we have the bash ready. We can now connect to the MySQL server and start interaction with SQL command. We can use the password root environment that we defined earlier and be able to access the server. To log in to the server, we will need a username and a password. In this case, the username should be the default `root` and the password should be `mypassword`.

We will use the below instruction.

- `mysql` for the MySQL server.

- `-uroot` - for the default root username.

- `-pmypassword` - for the set root password.

The summarized single command should be;

```bash
mysql -uroot -pmypassword
```

And now you can see we are inside the MySQL server and ready to run SQL commands.

![Docker MySQL server](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/mysql-server.png)

Let's execute a create database example here.

```sql
CREATE DATABASE my_test_db;
```

![Docker create mysql database](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/create-database.png)

And there you go, you can see Query Ok and the affected rows indicating the query executed correctly. And you can actually view the list of the available databases.

```SQL
SHOW databases;
```

![Docker show databases](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/docker-show-databases.png)

There you can see we have the `my_test_db` database we have created.

You can start interacting with this database and execute and MySQL queries inside it. Run `use my_test_db` to switch to the database and execute queries such as:

- Create table

```SQL
CREATE TABLE users ( id int not null auto_increment, name varchar(225) not null, constraint pk_example primary key (id));
```

- Insert into this table

```SQL
INSERT INTO users ( id, name ) VALUES ( null, 'Alexa' );
```

- Select from this table

```SQL
SELECT * FROM users;
```

![MySQL server docker queries](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/mysql-server-docker-queries.png)

It's straightforward to execute these SQL queries from a dockerized MySQL server environment.

In all the above examples, we are using a terminal to run these queries as a beginner. This can be hectic and a little hard. This tutorial will set a PHPMyAdmin and help you interact with the server and execute queries off the command line.

### Adding PHPMyAdmin

#### Option one: Connect MySQL and PHPMyAdmin containers

We will create an additional `phpmyadmin` container then link it with the previous `mysql_db` container.

- Pull [PHPMyAdmin image](https://hub.docker.com/_/phpmyadmin) from docker hun using this command;

```bash
docker pull phpmyadmin/phpmyadmin
```

So now we have an image ready, we can now create a container that will run this image and connect it to the `mysql_db` container. To do so, we will use these instructions.

- `docker run` - this will automatically run a created docker container.

- `--name phpmyadmin` - the flag `--name` will instruct docker to create a container named `phpmyadmin`.

- `-d` - this optional flag stands for the detouch mode. When included, the MySQL database will run in the background as a docker demon.

- `-p 8068:80` - This port number will map the PHPMyAdmin and be able to access it over the browser.

- `--link mysql_db:db` - this will link the `phpmyadmin` container to the `mysql_db`.

- `phpmyadmin` -specifies the image that we want to include in this container. This image must be downloaded/pulled and made available in local docker.

Now we ready to run these instructions as one command.

```bash
docker run --name phpmyadmin --link mysql_db:db -p 8068:80 -d phpmyadmin
```

Now you can open the browser and access the PHPMyAdmin using `http://localhost:8068/`. This loads the PHPMyAdmin, and you are ready to log in. Use username as `root` and password as `mypassword` just as we defined when creating a `mysql_db` container.

![A linked docker MySQL server and phpmyadmin](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/a-linked-docker-mysql-server-and-phpmyadmin.png)

#### Option two: Spin MySQL and phpmyadmin using docker-compose

To do so, we will set a docker-compose.yml and set the MySQL server and PHPMyAdmin, and run both in a single container. So let's go ahead and create a sample folder. And open it with a preferred text editor, for example, [visual studio code](https://code.visualstudio.com/).

Here we will create a docker file. Note: name this file as Dockerfile.

Add these MySQL instructions into this file.

```yml
FROM MySQL:latest
ENV MYSQL_DATABASE: my_db
ENV MYSQL_USER: my_password
ENV MYSQL_PASSWORD: secret
ENV MYSQL_ROOT_PASSWORD: secret
EXPOSE 3307:3307
```

On the same directory, create a docker-compose.yml file. Instead of using the docker command, we will use docker-compose to set up this container. Go ahead and write the MySQL and PHPMyAdmin instructions as follows, inside the docker-compose.yml file.

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

On your terminal run, `docker compose up -d`. This will download any additional libraries set in the docker-compose.yml file and the spin-up MySQL server with PHPMyAdmin. The flag `-d` will run this stack in detouch mode, i.e., in the background.

Now you can access your MySQL server using PHPMyAdmin by executing the localhost port 8080 on the browser, i.e., `http://localhost:8080/`. Now you have a PHPMyAdmin wizard, and you can log in with username as `root` and password as `secret` (the root password we set on the ENV of Dockerfile).

![A localhost dockerized phpmyadmin](/engineering-education/how-to-containerize-a-mysql-based-server-and-phpmyadmin-with-docker-and-run-sql-queries/a-localhost-dockerized-phpmyadmin.png)

An there you go, ready to execute SQL queries more interactively.

As an alternative to PHPMyAdmin, [Adminer](https://hub.docker.com/_/adminer) can also be used. The best thing with Adminer is that its easily compatible with a variety of relational databases such as MySQL, SimpleDB, SQLite, PostgreSQL, and Elasticsearch.

So you would replace the following PHPMyAdmin service with the Adminer service.

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
This is a very simple way to run a relational database management systems. And the same process works for other relational databases such as PostgreSQL. In this case, you pull a [PostgreSQL image](https://hub.docker.com/_/postgres) and spin it together with the [pgadmin4 image](https://hub.docker.com/r/dpage/pgadmin4), and you will be able to run it as well in a container. I think that's a good alternative. You should probably go ahead with the two images from the [docker hub](https://hub.docker.com/search?q=&type=image) and see how you can set a docker PostgreSQL containerized environment.