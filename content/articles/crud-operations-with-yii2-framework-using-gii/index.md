---
layout: engineering-education
status: publish
published: true
url: /crud-operations-with-yii2-framework-using-gii/
title: CRUD Operations With YII2 Framework Using GII
description: This article takes the reader through creating and carrying out CRUD operations using the YII 2 framework. YII 2 framework contains a module known as GII which is used to generate code for performing CRUD operations.
author: beatrice-muriithi
date: 2021-06-09T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/crud-operations-with-yii2-framework-using-gii/hero.png
    alt: CRUD operations image example
---

Programmers who have ever worked with the database are likely to have worked with CRUD Operations. These operations are very important when a developer wants to learn any web framework. In this article, we will learn how to carry out CRUD operations using the [YII 2 framework](https://www.yiiframework.com/).

<!--more-->

### What is CRUD?

The acronym CRUD stands for Create, Read, Update and Delete.

The function of each of the above is as shown below:

1. CREATE - Creates a new record by executing an INSERT process.

2. READ - Reads one single record.

3. UPDATE - Updates a record.

4. Delete - Deletes a record.

### What Is GII?

[GII](https://www.yiiframework.com/extension/yiisoft/yii2-gii/doc/guide/2.2/en) is a YII module that generates code for CRUD operations.
In YII 2 Framework, GII is accessible by the localhost by default and the module is accessed in the browser.

### Prerequisites

This tutorial assumes that you have:

1. Xampp installed in your machine. If not, follow [these](https://www.section.io/engineering-education/maria-data-base/) steps to install it. This will come along with PhpMyAdmin which we will use to manage our database record.

After installing Xampp, a folder `/opt/lampp` will be created in Linux OS. We will use this folder later on to create our YII project.

2. YII 2 installed. If not, refer [to this tutorial](https://www.section.io/engineering-education/php-yii2-framework/) on how to download. Download it and install it on your machine.

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

3. Open, `/optlampp/htdocs` using a terminal. Type this command to open:

```bash
$ sudo /opt/lampp/htdocs
```

In `/optlampp/htdocs` type the command below:

```
$ sudo tar -xvzf yii-advanced-app-2.0.42.tgz
```

This command will unzip the Yii file and generate a new folder `advanced`.

4. Navigate to the `advanced` folder by typing:

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

_NB_: Please make sure you start your servers before running your project. Start Servers by entering the following command:

```
$ sudo /opt/lampp/lampp start
```

You can also refer to Step 1 [here](https://www.section.io/engineering-education/maria-data-base/) on how to start the server.

To verify that you have created a project, open your browser and type `http://localhost/CRUD/frontend/web`. This is what you should see:

![crud project verification](/engineering-education/crud-operations-with-yii2-framework-using-gii/crud_project_verification.png)

### Step 2 - Connecting CRUD project with the database

Open the `CRUD` project with your favorite type editor and navigate to, `common > config > mainlocal.php`. Change the code to look like this:

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

In the above code snippets, we have changed the `dbname` name from `yiiadvanced` to CRUD. By doing this we have connected our Project with the database.

### Step 3 - Creating a simple database record Using terminal

Let us now create a table in our database using the terminal. Refer on `Step - 2` [here](https://www.section.io/engineering-education/maria-data-base/) and create a database `CRUD` and table `student`

### Step 4 - CRUD Operation Using GII

Open your browser and type `http://localhost/CRUD/frontend/web/index.php?r=gii `. If there is no error, you should see a welcome page like the one below.

![gii_welcome_page](/engineering-education/crud-operations-with-yii2-framework-using-gii/gii_welcome_page.png)

Kudos! You're now ready to use the GII module.

Now, let us use GII and generate code for the `student` table that you created in the database.

1. Click `start` on the `Model Generator`. This will open a page like the one below:

![model_generator](/engineering-education/crud-operations-with-yii2-framework-using-gii/model_generator.png)

We need to fill the blank spaces. Let's do it:

Table name - `students`

Model Class Name - `Students`

Name space - here we are changing the path from `apps\models` to `frontend\models`

Click `Preview`. You will get a page like the one below:

![generate](/engineering-education/crud-operations-with-yii2-framework-using-gii/generate.png)

Now click on `Generate` and you will see a congratulations note at the bottom of your page.

2. Click on `CRUD GENERATOR` and fill the blank spaces as shown in the image below:

![crud_generator.png](/engineering-education/crud-operations-with-yii2-framework-using-gii/crud_generator.png)

Now click `Generate`. If it's successful, at the bottom you will have `The code has been generated .`. You will also see the list of files created

### Storing Data in the database using GII

We will start our CRUD operations at this point.

Our GII is now ready to store data in the database. Let's create a simple record and store it in the database. Copy and paste `http://localhost/CRUD/frontend/web/index.php?r=student%2Fcreate` on your browser.

Fill in the blank spaces as shown below and click save.

![create](/engineering-education/crud-operations-with-yii2-framework-using-gii/create.png)

From the acronym CRUD, we have seen the function of the letter `C` which is CREATE. On clicking Save, we will be working on the function of the letter `R` which is READ. Here, you will open a page with all records that you have created. You should have only one record since we only have a single record. It should look like the image below.

![read](/engineering-education/crud-operations-with-yii2-framework-using-gii/read.png)

Create another record since we will have to delete one as we move on to the letter `D`.

In your database you should have this:

![database_record](/engineering-education/crud-operations-with-yii2-framework-using-gii/database_record.png)

Let us move on to the letter `U` which represents Update. As we had said earlier, we update a record depending on the primary key. Let us update our first record with primary key 1. Click button `UPDATE` and update as below:

![update](/engineering-education/crud-operations-with-yii2-framework-using-gii/update.png)

Save your update and navigate to the database to see the changes.

Let us delete record two under Primary Key 2. Since your working on record 1 navigate to your URL and change the id from `...id=1` to `...id = 2`, Refresh your browser.

Click the `Delete` button. Click OK on the confirmation pop-up that will appear on your screen.

You will have only one record as shown in the figure below. The record is deleted in the database as well.

![delete](/engineering-education/crud-operations-with-yii2-framework-using-gii/delete.png)

Wow!… CRUD operations completed.👏

To see the files generated by GII for the functionality of CRUD, open:

- views-`htdocs>CRUD>frontend>views>student`

- models- `htdocs>CRUD>frontend>models>Student.php`

- controllers- `htdocs>CRUD>frontend>controllers>StudentController.php`

You can customize the files to meet your needs.

### Understanding the URL

Our URL looks quite confusing 😕. But it has some meaning.

Let us look at the URL below.

`http://localhost/CRUD/frontend/web/index.php?r=student%2Fcreate`

1. r - this is the route for our application.

2. student - this is the controller.

3. create - this is the action.

I hope it's clear now. 😹

### Conclusion

CRUD is an operation that is very important for a web application developer. It saves developers time and also reduces the amount of code a developer has to write.

Try it in your next web application project.

Happy coding! 🙂

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
