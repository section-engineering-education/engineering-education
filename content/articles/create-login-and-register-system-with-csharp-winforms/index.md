---
layout: engineering-education
status: publish
published: true
url: /create-login-and-register-system-with-csharp-winforms/
title: Create Login and Register System with C# Winforms
description: This article will go over how we can use C# to create a Desktop system with a login functionality. The object-oriented functionality can help in code re-use without doing much coding from scratch.
author: sylvester-tamba
date: 2021-02-14T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/create-login-and-register-system-with-csharp-winforms/hero.jpg
    alt: Register System with C# Winforms example image
---
Many developers in recent years have been using C# to develop their applications. In this tutorial, we'll go through a simple example of how to create a basic user authentication in C#. 
<!--more-->
### Introduction
C# or C-sharp is an object-oriented programming language developed by Microsoft. C# or C-sharp runs on a framework called the .Net framework. 

The language has created many applications like:
- Web applications
- Mobile applications
- Computer games
- Desktop applications
- Database applications
- Virtual reality applications

### Prerequisites
To follow this article along it would be helpful to have the following:
- An editor, in my case, I'll be using [Visual Studio](https://visualstudio.microsoft.com/vs/).
- Some basic C# and SQL knowledge.
- Knowledge on how to run relational database management in this case, we will use [MySQL](https://www.mysql.com/).
- Visual Studio knowledge and how to create projects.

### Step I: Create a database and table with required columns
```sql

   Create database userdata;
```

![DATABASE CREATION](/engineering-education/create-login-and-register-system-with-csharp-winforms/create-db-cmd.PNG)

Create table command:

```sql

    CREATE TABLE `user_info` ( `id` INT NOT NULL AUTO_INCREMENT , `names` VARCHAR(50) NOT NULL , `username` VARCHAR(20) NOT NULL , `password` VARCHAR(50) NOT NULL , PRIMARY KEY (`id`)) ;
```

![TABLE CREATION](/engineering-education/create-login-and-register-system-with-csharp-winforms/create-table-cmd.PNG)

### Step II: Create a project
Create a Visual Studio project by clicking on `File -> New -> Project` and then select Visual C#. From the window, choose Windows Forms App(.Net Framework). Give your application a name. Then click ok. The project will come with default form called Form 1.

### Step III: Create a config class to execute MySQL queries
Since C# is object-oriented, we will create a class that will handle the execution of queries that we will use in our program.

From the Solution Explorer window right-click and select add -> New Item -> Class. Name the class Config.cs the click on the button add.

- Add MySQL.Data Library by right-clicking on solution explorer window, then Manage Nuget packages, then search for MySQL.Data Library and install.

![MYSQL LIBRARY](/engineering-education/create-login-and-register-system-with-csharp-winforms/add-mysql-lib-vs.jpg)

- Add the following class to help in the execution of MySQL queries.

Config.cs
```c#

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
//add this for MessageBox
using System.Windows.Forms;

// add data function classes
using System.Data;

namespace LoginSysten
{
    public class Config
    {
        string ConectionString = "";  // save connection string
        public MySqlConnection connection = null;
        public string server = "127.0.0.1";// MySQL host / ip of the computer
        public string user = "root";// MySQL user
        public string password = "";// MySQL password 
        DataSet ds;
        DataTable dt;
        public string Table = "user_info"; // initialize db table
        public string ConnectionType = "";
        string RecordSource = "";

        DataGridView tempdata;

        public Config()
        {

        }

        // function to connect to the database
        public void Connect(string database_name)
        {
            try
            {

                   ConectionString = "SERVER=" + server + ";" + "DATABASE=" + database_name + ";" + "UID=" + user + ";" + "PASSWORD=" + password + ";";

                connection = new MySqlConnection(ConectionString);
            }
            catch (Exception E)
            {
                MessageBox.Show(E.Message);
            }
        }

        // Function to execute select statements
        public void ExecuteSql(string Sql_command)
        {

            nowquiee(Sql_command);

        }

        // creates connection to MySQL before execution
        public void nowquiee(string sql_comm)
        {
            try
            {
                MySqlConnection cs = new MySqlConnection(ConectionString);
                cs.Open();
                MySqlCommand myc = new MySqlCommand(sql_comm, cs);
                myc.ExecuteNonQuery();
                cs.Close();


            }
            catch (Exception err)
            {

                MessageBox.Show(err.Message);
            }
        }

        // function to execute delete , insert and update
        public void Execute(string Sql_command)
        {
            RecordSource = Sql_command;
            ConnectionType = Table;
            dt = new DataTable(ConnectionType);
            try
            {
                string command = RecordSource.ToUpper();

                //======================if sql contains select==========================================
                MySqlDataAdapter da2 = new MySqlDataAdapter(RecordSource, connection);

                DataSet tempds = new DataSet();
                da2.Fill(tempds, ConnectionType);
                da2.Fill(tempds);

                //======================================================================================


            }
            catch (Exception err) { MessageBox.Show(err.Message); }
        }

        // function to bring selected results based on column name and row index
        public string Results(int ROW, string COLUMN_NAME)
        {
            try
            {
                return dt.Rows[ROW][COLUMN_NAME].ToString();
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
                return "";

            }
        }

        // function to bring selected results based on column index and row index
        public string Results(int ROW, int COLUMN_NAME)
        {
            try
            {
                return dt.Rows[ROW][COLUMN_NAME].ToString();
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
                return dt.Rows[ROW][COLUMN_NAME].ToString();

            }
        }

        // Execute select statement
        public void ExecuteSelect(string Sql_command)
        {
            RecordSource = Sql_command;
            ConnectionType = Table;

            dt = new DataTable(ConnectionType);
            try
            {
                string command = RecordSource.ToUpper();
                MySqlDataAdapter da = new MySqlDataAdapter(RecordSource, connection);
                ds = new DataSet();
                da.Fill(ds, ConnectionType);
                da.Fill(dt);
                tempdata = new DataGridView();
            }
            catch (Exception err)
            {
                MessageBox.Show(err.Message);
            }


        }

        // count Number of rows after selecy
        public int Count()
        {
            return dt.Rows.Count;
        }
    }
}

```

- Now that we have Config.cs, we can execute any MySQL statement.

### Step IV: Create register windows form
In Microsoft Visual Studio, create a new project. Choose project -> Add Windows Form from File submenu in the left corner, give the form a name `Register` , and click Add.

We have two Windows form classes that is Form1.cs and Register.cs.

### Step V: Design login and register interface
### Login form
- Click on Form1.cs in Solution Explorer, and on the form that displays, add three buttons, two textboxes, and two labels.

The first button will be the register button, that launch the Register form. The second button will be the Login button. When the second button is clicked, it will query the database with the input entered. The second button will execute the login MySQL query. The third button will close the application.

The first textbox will allow the username input for login, while the second textbox will enable the password's input. These two inputs will be passed to the SQL.

The labels will indicate the functionality of the two textboxes.

![LOGIN INTERFACE](/engineering-education/create-login-and-register-system-with-csharp-winforms/login-interface.jpg)

### Register form
- Click on Register.cs in the Solution Explorer and on the form that displays add two buttons, three textboxes, and three labels.

The first button will be a register button to save data entered, and the second one will be an exit button that will close the Register form.

The first textbox will allow the input of the names for the user. The second textbox will allow input of the user's username. The third textbox is for entering the password.

The labels will or show the functionality of the three textboxes.

![REGISTER INTERFACE](/engineering-education/create-login-and-register-system-with-csharp-winforms/register-interface.jpg)

### Step VI: Login logic

- Initialize the Config file in Form1.cs to allow us to access the database with ease.

```c#

 // Initialize the connection class
        Config db = new Config();
        public Form1()
        {
            InitializeComponent();
            // pass the database you want to connect to
            db.Connect("userdata");
        }
```

On click of the register button, add the following code.

```c#

 // start register window
            Register register = new Register();
            register.Show();
```

On click of the login button, add the following code.

```c#

  // querry MySQL database for the data passed from textboxes
            db.ExecuteSelect("SELECT * FROM `user_info` where username='" + textBox1.Text+ "' and password ='" + textBox2.Text+"'");

            if (db.Count() == 1)
            {
                MessageBox.Show("Success You will Login as"+db.Results(0, "names"));
            }
            else
            {
                MessageBox.Show("Wrong username and password combination" );
            }
```

On click of the exit button, add the following code.

```c#

  private void button3_Click(object sender, EventArgs e)
        {
            // closes the application
            Environment.Exit(0);
        }
```

Final Form1.cs.

```c#

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LoginSysten
{
    public partial class Form1 : Form
    {

        // Initialize the connection class
        Config db = new Config();
        public Form1()
        {
            InitializeComponent();

            // pass the database you want to connect to
            db.Connect("userdata");
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // querry MySQL database for the data passed from textboxes
            db.ExecuteSelect("SELECT * FROM `user_info` where username='" + textBox1.Text+ "' and password ='" + textBox2.Text+"'");

            if (db.Count() == 1)
            {
                MessageBox.Show("Success You will Login as"+db.Results(0, "names"));
            }
            else
            {
                MessageBox.Show("Wrong username and password combination" );
            }
            
        }

        private void button2_Click(object sender, EventArgs e)
        {
            // start register window
            Register register = new Register();

            register.Show();
        }

        private void button3_Click(object sender, EventArgs e)
        {

            // closes the application
            Environment.Exit(0);
        }
    }
}

```

### Step VII: Register logic
- Initialize the Config file in Register.cs to allow us to access the database with ease.

```c#

  Config db = new Config();
        public Register()
        {
            InitializeComponent();
            // pass the database you want to connect to
            db.Connect("userdata");
        }

```

On click of the exit button, add the following code.

```c#

 private void button3_Click(object sender, EventArgs e)
        {
            // closses the register window
            this.Close();
        }
```

On click of the register button, add the following code to save the information.

```c#

     private void button2_Click(object sender, EventArgs e)
        {
            // saves data in the database
            db.Execute("INSERT INTO `user_info` (`id`, `names`, `username`, `password`) VALUES (NULL, '"+textBox3.Text+"', '"+textBox1.Text+"', '"+textBox2.Text+"');");

            this.Close()
        }


```

Find the above application in GitHub [Login and Register application](https://github.com/tambastar/Create-Login-and-Register-System-with-C--Winforms).

### Conclusion
From the example above, we have seen how we can use C# to create a Desktop system with a login functionality. The object-oriented functionality helps in code re-use without doing much coding from scratch.

In this article:
- We created a database for our application.
- Created Login and Register Interfaces.
- Connected our application with the database.
- Coded logic and functionality.

Happy C-sharp coding ahead!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
