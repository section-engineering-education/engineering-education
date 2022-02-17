# Django PostgreSQL Migration from SQLite

In reference to the official documentation, PostgreSQL is a powerful, open-source object-relational database system that uses and extends the SQL language combined with many other features that safely store complicated data workloads.

The database comes with many features that not only help developers build applications but also help administrators protect data no matter how big or small the dataset is.

### Table of Contents

<!-- TOC -->

- [Django PostgreSQL Migration from SQLite](#django-postgresql-migration-from-sqlite) - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Why use PostgreSQL](#why-use-postgresql)
  - [Setting up Django project](#setting-up-django-project)
    - [Step 1: Backup existing Database](#step-1-backup-existing-database)
    - [Step 2: Installing PostgreSQL](#step-2-installing-postgresql)
  - [1. Desktop Setup](#1-desktop-setup)
    - [Step 3: Configure `settings.py` file.](#step-3-configure-settingspy-file)
    - [Step 4: Install psycopg2 adapter](#step-4-install-psycopg2-adapter)
    - [Step 5: Creating PostgreSQL Database](#step-5-creating-postgresql-database)
    - [Step 6: Sync Database](#step-6-sync-database)
    - [Step 7: Load Data](#step-7-load-data)
  - [2. Use of Terminal](#2-use-of-terminal)
    - [Step 1: Installing PostgreSQL](#step-1-installing-postgresql)
    - [Step 2: Create Database and User](#step-2-create-database-and-user)
    - [Step 3: Migrate Database](#step-3-migrate-database)
  - [Conclusion](#conclusion)

<!-- /TOC -->

## Introduction

As programmers, we work on different projects depending on the level of expertise. As a beginner, you worked on an app like a 'to-do app' which didn't require a heavy mechanism of database to store records of tasks. But as you advance, the kind of projects you handle change with time. A point will reach where you will need to build a production-ready project which will need a database structure.

Usually, a basic Django project will ship with an SQLite database as the default. Even though this is the default database, Django also supports other databases like:

- PostgreSQL
- MySQL
- Oracle

In this article, our focus will be on PostgreSQL and how it can be implemented on Django projects.

## Why use PostgreSQL

PostgreSQL comes with many features that not only help developers build applications but also help administrators protect data no matter how big or small the dataset is.

So, why should you consider PostgreSQL over the others:

- It is free to use and it’s also an open-source program which makes it easy to upgrade or extend.
- It is extensible - you can define your data types, build your functions and even write code from different programming languages without having to recompile the database.
- It supports many SQL features.
- It supports multiple programming languages like Python, Java, C/C++, Ruby, etc…
- Works on most popular Operating Systems.
- It is not controlled by any cooperation meaning it is free.

Let's get started and see how to implement PostgreSQL.

## Setting up Django project

Now, to be able to make a database migration it means we need a project to do it with. Let's go ahead and create a new Django project.

As always the first step is to create a virtual environment, which is accomplished in two steps:

```python=
pip install virtualenvwrapper-win
```

this installs a virtual environment, the next step is to name the virtualenv:

```python=
mkvirtualenv [name]
```

which automatically activates the virtual environment.

Now, since we are working on a Django project, installing Django essential, this command will install Django library in the virtual environment.

```python=
pip install django
```

Create a Django project, in this case, we can name it `testproject`.

```python=
django-admin startproject testproject
```

The next step, is for us to create an app within the project folder.

```python=
python manage.py startapp projectApp
```

and finally, run the project to initialize the SQLite database with the help of this command.

```python=
python manage.py runserver
```

To perform the migration, we will be using this simple Django application in the following steps.

### Step 1: Backup existing Database

Yhe first step, is for us to create a backup of our current data which we are going to export into PostgreSQL later on.

To perform a data backup, the following command is used

```sql=
python manage.py dumpdata > data.json
```

this command generates a `data.json` file in the root of the project folder, this means the generated data from SQLite is stored in JSON format.

### Step 2: Installing PostgreSQL

When working with PostgreSQL, the operations can be done in two ways, that is by either using the desktop application or using the terminal to execute specific commands.

## 1. Desktop Setup

To install PostgreSQL, first step is to download it from the official website [HERE](https://www.postgresql.org/). After downloading run the installation and then launch it by opening the pgAdmin which redirects to the dashboard.

By default, we will have the Postgres database created there under the Database tab. At this point what we want to do is to create a new database for our Django app and then connect the app to the database.

### Step 3: Configure `settings.py` file.

Back in the Django project, `settings.py` file, under the DATABASE section. By default this section will have the below configurations:

```python=
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

These settings will be replaced with the configurations below:

```python=
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'test',
        'USER': 'postgres',
        'PASSWORD': 'test123',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

An overview of what has been added into the Databases section:

- `Name` - Name of the database we will be using.
- `User` - User with access to the data
- `Password` - it's the key required to connect to PostgreSQL.

* `Host` - it's the server name on which PostgreSQL is running.

- `Port` - it's the port number that will be used when listening to the connections, by default it is always set to 5432.

### Step 4: Install psycopg2 adapter

Psycopg is the most popular database adapter used by developers to connect databases to python.

One of its amazing features is the power it has to convert PostgreSQL array data types into Python lists.

To install it, the following command is used:

```cmd=
pip install psycopg2
```

### Step 5: Creating PostgreSQL Database

Back in the pgAdmin dashboard, under the Database tab right click and create a Database in this case it can be named `test` because that is what is specified in the settings file.

The next step is the utilizing of the new database and connecting it to the Django app.

### Step 6: Sync Database

```python=
python manage.py migrate --run-syncdb
```

What this command does is, it changes the database backend to Postgresql.

### Step 7: Load Data

```python=
python manage.py loaddata data.json
```

What this command does is, dump the previous data from SQlite into Postgres.

To confirm that, back in the pgAdmin dashboard refresh the page and under the database, the created tables should be updated.

## 2. Use of Terminal

The use of the terminal comes in handy if you are running PostgreSQL on a server operating system.

Just like in the desktop setup the same steps are followed only this time it;s the terminal that is in use.

### Step 1: Installing PostgreSQL

To install Postgresql using the terminal the following steps are followed.

- Firts is to add the PostgreSQL package repository on the server OS with the command below.

```bash=
echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" |
sudo tee /etc/apt/sources.list.d/pgsql.list
```

- Next, add the GPG key of the PostgreSQL package repository by running this command:

```bash=
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```

- The next step is to update the APT

```bash=
apt-get update
```

- Install PostgreSQL

```bash=
apt-get install -y postgresql
```

### Step 2: Create Database and User

- Log in to Postgres.
  By default after installation user `postgres` is created, we will use this user to perform administrative tasks.

```bash=
sudo -u postgres psql
```

- Create Database

```bash=
CREATE DATABASE projectname;
```

- Database User
  This is used to connect and interact with the database.

```bash=
CREATE USER projectuser WITH PASSWORD 'password';
```

we will also need to grant access to our users of the database.

```bash=
GRANT ALL PRIVILEGES ON DATABASE projectname TO projectuser;
```

Now at this point, we are ready to change settings in the Django project in the `settings.py` file.

The changes you make should reflect what we created in the PostgreSQL which is the `username` and `password`. In this case:

```python=
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': '',#database name
        'USER': '',#projectuser
        'PASSWORD': '',#password
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Step 3: Migrate Database

Now that the Django settings are configured, we can go ahead and migrate the data.

```python=
python manage.py makemigrations
python manage.py migrate
```

By executing the commands successfully the migration of the database from SQLite3 to PostgreSQL is successfully ompleted.

## Conclusion

In this article, we have gone through the steps to install and configure PostgreSQL as a backend for a Django project. Go make a change on your projects and start using PostgreSQL.
