---
layout: engineering-education
status: publish
published: true
url: /crud-operations-with-yii2-framework-using-gii/
title: CRUD Operations with YII2 Framework using GII
description: This article takes the reader through creating and carrying out CRUD operations using the YII 2 framework. YII 2 framework contains a module known as GII which is used to generate code for performing CRUD operations.
author: beatrice-muriithi
date: 2021-06-18T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/crud-operations-with-yii2-framework-using-gii/hero.png
    alt: CRUD operations image example
---

Programmers who have ever worked with the database are likely to have worked with CRUD operations. These operations are very important when a developer wants to learn any web framework. 
<!--more-->
In this article, we will learn how to carry out CRUD operations using the [YII 2 framework](https://www.yiiframework.com/).

### What is CRUD?

The acronym CRUD stands for Create, Read, Update and Delete.

The function of each of the above is as shown below:
1. **Create:** creates a new record by executing an `INSERT` process.
2. **Read:** reads one single record.
3. **Update:** updates a record.
4. **Delete:** deletes a record.

### What is GII?
[GII](https://www.yiiframework.com/extension/yiisoft/yii2-gii/doc/guide/2.2/en) is a YII module that generates code for CRUD operations.
In YII 2 Framework, GII is accessible by the localhost by default, and the module is accessed in the browser.

### Prerequisites
This tutorial assumes that you have:
1. Xampp installed in your machine. If not, follow [these](https://www.section.io/engineering-education/maria-data-base/) steps to install it. This will come along with PhpMyAdmin which we will use to manage our database record.

After installing Xampp, a folder `/opt/lampp` will be created in Linux OS. We will use this folder later on to create our YII project.

2. YII 2 installed. If not, refer [to this tutorial](https://www.section.io/engineering-education/php-yii2-framework/) on how to download it.

### Goal
We will do the following in this article:
1. Create a YII project named CRUD.
2. Create a simple database record using the terminal.
3. Operate CRUD using GII.
4. Store data in the database using GII.

Let's get started.

### Step 1 - Create a YII CRUD project
1. Navigate to the folder where the YII archive file was downloaded. In my case, it was downloaded in Downloads.
2. Move this archive to `/opt/lampp/htdocs` . To move it, open the Downloads folder with a terminal and type:

```bash
$ sudo mv yii-advanced-app-2.0.42.tgz /opt/lampp/htdocs
```

3. Open `/optlampp/htdocs` using a terminal. Type this command to open:

```bash
$ sudo /opt/lampp/htdocs
```

In `/optlampp/htdocs` type the command below:

```bash
$ sudo tar -xvzf yii-advanced-app-2.0.42.tgz
```

This command will unzip the Yii file and generate a new folder named `advanced`.

4. Navigate to the `advanced` folder by:

```bash
$ cd advanced
```

Run the command below:

```bash
$ sudo php init
```

This command will initialize your project in `advanced`. Choose option 0.

5. To rename this project to CRUD project, open `/opt/lampp/htdocs` and type:

```bash
$ sudo mv advanced CRUD
```

You have created a YII project named CRUD. Congrats!

> Please make sure you start your servers before running your project. 

Start Servers by entering the following command:

```bash
$ sudo /opt/lampp/lampp start
```

Click [here](https://www.section.io/engineering-education/maria-data-base/) to learn how to start the server.

To verify that you have created a project, open your browser and type `http://localhost/CRUD/frontend/web`. This is what you should see:

![crud project verification](/engineering-education/crud-operations-with-yii2-framework-using-gii/crud_project_verification.png)

### Step 2: connecting CRUD project with the database
Open the `CRUD` project with your favorite code editor and navigate to `common > config > mainlocal.php`. Change the code to look like this:

```php
<?php
return [
  'components' => [
      'db' => [
          'class' => 'yii\db\Connection',
          'dsn' => 'mysql:host=localhost;dbname=CRUD',
          'username' => 'root',
          'password' => '',
          'charset' => 'utf8',
      ],
      'mailer' => [
          'class' => 'yii\swiftmailer\Mailer',
          'viewPath' => '@common/mail',
          // send all mails to a file by default. You have to set
          // 'useFileTransport' to false and configure a transport
          // for the mailer to send real emails.
          'useFileTransport' => true,
      ],
  ],
];
```

In the code above, we have changed the `dbname` name from `yiiadvanced` to `CRUD  `. By doing this we have connected our Project with the database.

### Step 3: creating a simple database record
Let us now create a table in our database using the terminal. Click [here](https://www.section.io/engineering-education/maria-data-base/) to learn how to create a database and a table, then create a database named `CRUD` and a table named `student`.

### Step 4: CRUD operation using GII
Open your browser and type `http://localhost/CRUD/frontend/web/index.php?r=gii `. If there is no error, you should see a welcome page like the following:

![gii_welcome_page](/engineering-education/crud-operations-with-yii2-framework-using-gii/gii_welcome_page.png)

Kudos! You're now ready to use the GII module.

Now, let us use GII to generate the code for our `student` table.

1. Click `start` on the `Model Generator`. This will open a page like the one below:

![model_generator](/engineering-education/crud-operations-with-yii2-framework-using-gii/model_generator.png)

We need to fill the blank spaces. Let's do it:

Table name - `Students`.

Model class name - `Students`.

Name space - here we are changing the path from `apps\models` to `frontend\models`.

Click `Preview`. You will get a page like the one below:

![generate](/engineering-education/crud-operations-with-yii2-framework-using-gii/generate.png)

Now click on `Generate` and you will see a congratulations note at the bottom of your page.

2. Click on `CRUD GENERATOR` and fill the blank spaces as shown in the image below:

![crud_generator.png](/engineering-education/crud-operations-with-yii2-framework-using-gii/crud_generator.png)

Now click `Generate`. If it's successful, at the bottom you will have the message "The code has been generated". You will also see the list of files created.

### Storing data in the database using GII
We will start our CRUD operations at this point.

Our GII is now ready to store data in the database. Let's create a simple record and store it in the database. Open `http://localhost/CRUD/frontend/web/index.php?r=student%2Fcreate` in your browser.

Fill in the blank spaces as shown below and click save:

![create](/engineering-education/crud-operations-with-yii2-framework-using-gii/create.png)

From the acronym CRUD, we have seen the function of the letter `C` which is CREATE. After clicking save, we will work with the function of the letter `R` which is READ. 

Here, you will open a page with all the records you have created. You should have only one record since we only have a single record. It should look like the following:

![read](/engineering-education/crud-operations-with-yii2-framework-using-gii/read.png)

Create another record since we will have to delete one as we move on to the letter `D`.

In your database you should have this:

![database_record](/engineering-education/crud-operations-with-yii2-framework-using-gii/database_record.png)

Let us move on to the letter `U` which represents update. As we had said earlier, we update a record depending on the primary key. Let's update our first record with the primary key "1". Click `UPDATE` and update as the following:

![update](/engineering-education/crud-operations-with-yii2-framework-using-gii/update.png)

Save your update and navigate to the database to see the changes.

Let's delete record two which has the Primary Key "2". Since you are working on record "1", navigate to your URL and change the id from `id = 1` to `id = 2`, refresh your browser.

Click the `Delete` button. Then click `Ok` on the confirmation pop-up that will appear on your screen.

You will have only one record as shown in the figure below. The record is deleted in the database as well.

![delete](/engineering-education/crud-operations-with-yii2-framework-using-gii/delete.png)

Wow!… CRUD operations completed.👏

To see the files generated by the GII for the functionality of CRUD, open:

- Views:

```bash
htdocs > CRUD > frontend > views > student
```

- Models: 

```bash
htdocs > CRUD > frontend > models > Student.php
```

- Controllers:

```bash
htdocs > CRUD > frontend > controllers > StudentController.php
```

You can customize the files to meet your needs.

### Understanding the URL
Our URL looks quite confusing 😕. Let us look at the following URL:

`http://localhost/CRUD/frontend/web/index.php?r=student%2Fcreate`

`r` is the route for our application, `student` is the controller, and `create` is the action.

### Conclusion
CRUD are the basic operations of persistent storage which are very important for a web application developer. It saves developers time and also reduces the amount of code a developer has to write.

Happy coding! 🙂

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
