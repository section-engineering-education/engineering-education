# Django PostgreSQL Migration from SQLite

- Table of Content
  [ToC]

In reference to the official documentation, PostgreSQL is a powerful, open-source object-relational database system that uses and extends the SQL language combined with many other features that safely store complicated data workloads.

The database comes with many features that not only help developers build applications but also help administrators protect data no matter how big or small the dataset is.

## Introduction

As developers, we often work on different projects depending on the level of expertise. As a beginner, you worked on an app like a 'to-do app' which didn't require a heavy mechanism of database to store records of tasks. But as you advance, the kind of projects you handle change with time. A point will reach where you will need to build a production-ready project which will need a database structure.

Usually, a basic Django project will ship with an SQLite database as the default. Even though this is the default database, Django also supports other databases like:

- PostgreSQL
- MySQL
- Oracle

In this article, our focus is going to be on PostgreSQL and how it can be implemented on Django projects.

## Why use PostgreSQL

PostgreSQL comes with many features that not only help developers build applications but also help administrators protect data no matter how big or small the dataset is.

So, why should you consider PostgreSQL over the others:

- It is free to use and it’s also an open-source program which makes it easy to upgrade or extend.
- It is highly extensible - for example, you can define your own data types, build your own functions and even write code from different programming languages without having to recompile your database.
- It also supports many SQL features.
- It supports multiple programming languages like Python, Java, C/C++, Ruby, etc…
- Works on most popular Operating Systems.
- It is not controlled by any cooperation meaning it is free.

Let's get started and see how to implement PostgreSQL.

## Setting up Django project

Now, for us to be able to make a database migration it means we need a project to with. Let's go ahead and create a new Django project.

As always the first step is to create a virtual environment, which is accomplished in two steps:

```python=
pip install virtualenvwrapper-win
```

this installs virtual a environment, the next step is to name the virtualenv:

```python=
mkvirtualenv [name]
```

which automatically activates the virtual environment.

Now, since we are working on a Django project, installing it is essential, it will be installed in the virtual environment

```python=
pip install django
```

Create our Django project, in this case, it can be named `testproject`.

```python=
django-admin startproject testproject
```

The next step, create an app within our project folder.

```python=
python manage.py startapp projectApp
```

and finally, we can run the project so as to initialize the SQLite database with this command.

```python=
python manage.py runserver
```

We will be using this simple Django application to perform the migration in the following steps.

### Step 1: Backup existing Database

In the first step, we will need to create a backup of our current data which we are going to export into PostgreSQL later on.

To perform a data backup, the following command is used

```sql=
python manage.py dumpdata > data.json
```

this command will generate a data.json file in the root of your project, this means you generated the dump data from SQLite which is stored in JSON format.

### Step 2: Installing PostgreSQL

When working with PostgreSQL, the operations can be done in two ways, that is by either using the desktop application or using the terminal to execute specific commands.

## 1. Desktop Setup

In order to install PostgreSQL, you will need to download it from the official website [HERE](https://www.postgresql.org/). After downloading run the installation and then launch it by opening the pgAdmin which will redirect you to the dashboard.

By default, we will have the Postgres database created there under the Database tab. At this point what we want to d is create a new database for our Django app and then connect the app to the database.

### Step 3: Configure `settings.py` file.

Back in our Django project, `settings.py` file, under the DATABASE section. By default this section will have the below configurations:

```python=
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

We are going to replace this with the configurations below:

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

An overview of what we have added into our Databases section:

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

Back in the pgAdmin dashboard, under the Database tab right click and create a Database in our case we are going to name it `test` because that is what we specified in the settings file.

The next step we will are going to utilize the new database and connect it to the Django app.

### Step 6: Sync Database

```python=
python manage.py migrate --run-syncdb
```

What this command does is, it’ll change the database backend to Postgresql.

### Step 7: Load Data

```python=
python manage.py loaddata data.json
```

What this command does is, dump our previous data from SQlite into Postgres.

To confirm that head back to pgAdmin refresh the page and under the database, we created our tables should be updated.

## 2. Use of Terminal

The use of the terminal comes in handy if you are running PostgreSQL on a server operating system.

Just like we did in the desktop setup the same steps will be followed only this time we will be using the terminal.

### Step 1: Installing PostgreSQL

To install Postgresql using the terminal the following steps are followed.

- Add the PostgreSQL package repository on your server OS the command below.

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
  By default after installation user `postgres` is created, we will use this user to perform administrative tasks

```bash=
sudo -u postgres psql
```

- Create Database

```bash=
CREATE DATABASE projectname;
```

- Database User
  This will be used to connect and interact with the database.

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

Now that the Django settings are configured we can go ahead and migrate our data.

```python=
python manage.py makemigrations
python manage.py migrate
```

By executing the commands successfully we have managed to successfully migrate our database from SQLite3 to PostgreSQL.

## Conclusion

In this article, we have gone through the steps to install and configure PostgreSQL as a backend for a Django project. Go make a change on your projects and start using PostgreSQL.
