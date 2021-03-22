# Connecting-library-application-to-SQL-Server-using-Windows-forms

### Introduction


Windows forms is one of the best tools used in making applications. With windows forms, you can make a variety of applications, from a mini calculator to a library application that uses a database. According to [Mincrosoft](https://docs.microsoft.com/en-us/dotnet/desktop/winforms/overview/?view=netdesktop-5.0), Windows Forms is a UI framework for building Windows desktop apps. It provides one of the most productive ways to create desktop apps based on the visual designer provided in Visual Studio. Functionality such as drag-and-drop placement of visual controls makes it easy to build desktop apps.

In this tutorial, we will connect a library application to a SQL database server using Windows forms. We will use a windows forms project to add new forms, edit or delete from the library. Also, we will manage the authors, the stores & the publishers in the database, and display the information of each attribute & refresh it each time, a change accrues.

### Prerequisites

Before we begin, it would help you as the reader to have the following:

- A basic understanding of the C# programming language.
- A basic understanding of Windows forms.
- Visual Studio installed on your system.
- SQL Server installed on your system.

### Installation guide

- To install Visual Studio and setup the work environment, you can check [this](https://www.geeksforgeeks.org/setting-environment-c-sharp/) article on how to set up the C# environment in Visual Studio.
- To install SQL Server, you can download it from [here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
- If you are new to Windows forms, you can check [this](/engineering-education/getting-started-with-windows-forms-using-c-sharp/) tutorial which would help you understand the basic concepts.



### Creating the Pubs database

**Pubs** is a database that is used by programmers as a learning tool, like fetching data through queries,
it contains a large amount of information about books, authors, publishers, and store sales.

First of all, you should create the Pubs database Query in SQL server so it can be later connected to the application.
You can find the pubs database [here](https://github.com/microsoft/sql-server-samples/blob/master/samples/databases/northwind-pubs/instpubs.sql).

After copying the database query, paste it in a new query and execute it, you should be able to see the name of the database "pubs" to the left of your screen.

![CreatingPubs](/engineering-education/connecting-library-application-to-sql-server-using-windows-forms/CreatingPubs.png).

### Application main form

We will use a project that has a main form & add another 3 forms that would add edit & delete books from the database.
You can download the project from [here](https://github.com/mohamedgh16/Library-app-code-in-windowsforms).

After opening the project first we will work on the main form, As you can see it has 3 buttons, each button for a different operation.

![Mainform](/engineering-education/connecting-library-application-to-sql-server-using-windows-forms/Mainform.png).


Add a refresh button and 3 more tabs next to the Title tab to use later, then add 4 more columns to the `DataGridView1` to show the data of the library.
Also, don't forget to change the colors of the forms & the buttons to whatever suits your taste.

It should look like this ![Afterformwork](/engineering-education/connecting-library-application-to-sql-server-using-windows-forms/Afterformwork.png).

### Database connection
In order to connect to SQL server in C#, we will be
```c#
using System.Data.SqlClient; 
```          
The following code snippet will connect your computer to the database, but note that you need to put your own computer name instead of (HP-PAVILION).                                          
```c#
static SqlConnection connectionString = new SqlConnection(@"Data Source=HP-PAVILION;Initial Catalog=pubs;Integrated Security=True");
```
Each Select Query will be written in a string and get converted to SQL server then back to use it somewhere inside the code. 
```c#
 public static DataTable dataAdapterSelect(string sqlQuery)
        {
        // This method will convert any Select string to a query.
            SqlDataAdapter DataAdapter = new SqlDataAdapter(sqlQuery, connectionString);
            DataTable dt = new DataTable();
            DataAdapter.Fill(dt);
            return dt;
        }
```
The following method will be used to Add Edit & delete the information from the database.
```c#
// This method will convert any string that would manipulate the data to a query.
public static void sqlCommandQueryReader(string sqlQuery)
        {
            SqlCommand myCommand = new SqlCommand(sqlQuery, connectionString);
            myCommand.Connection.Open();
            SqlDataReader dr;
            dr = myCommand.ExecuteReader();
            while (dr.Read())
            {
                Console.WriteLine(dr[0]);
                Console.WriteLine(dr[1]);
            }
            myCommand.Connection.Close();
        }
```

 
The following code will use the dataAdapterSelect method to convert the Select string to a Query and display it inside the datagridview.
```c#
// This query is responsible for displaying the information about the books on the DataGridView.
 string sqlQuery = "SELECT title_id,title,type,pub_name,price,ytd_sales FROM titles inner join publishers ON titles.pub_id = publishers.pub_id";

            DataTable dt = DataBaseConnection.dataAdapterSelect(sqlQuery);
           
            foreach (DataRow dr in dt.Rows)
            {
                dataGridView1.Rows.Add(dr["title_id"], dr["pub_name"], dr["price"], dr["ytd_sales"], dr["title"],dr["type"]);
            }
```


### Add form 

Adding a new book will require the `titleID` `titleName` `titletype` `pubid` `pubbdate` & the `price` of the book.
We will request the information from the user and insert them into the database using the sqlCommandQueryReader method.
![Addform](/engineering-education/connecting-library-application-to-sql-server-using-windows-forms/Addform.png).

```c#
// We will be using the sqlCommandQueryReader method to add a new book the database.
  private void addButton_Click(object sender, EventArgs e)
        {   string titleID = titleIDTextBox.Text;
            string titleName = titleNameTextBox.Text;
            string titletype = Titletype.Text;
            string pubid = pubbid.Text;
            string pricee = price.Text;
            string pubbdate = pubdate.Text;

            string insertt = "insert into titles(title_id,title,type,pub_id,price,pubdate) values('" + titleID + 
            "','" + titleName + "','" + titletype + "','" + pubid + "','" + pricee + "','" + pubbdate + "');";

            DataBaseConnection.sqlCommandQueryReader(insertt);
            MessageBox.Show("Information inserted!");}
```
### Edit form 

Editing a book will require the present `oldid` & the present `oldname` of the book, then the new `Titlename` `Titletype` & `Titleprice`.
We will request the information from the user and edit them inside of the database using the sqlCommandQueryReader method.

![Editform](/engineering-education/connecting-library-application-to-sql-server-using-windows-forms/Editform.png).


```c#
 private void Edit_Click(object sender, EventArgs e)
        {
        // We will be using the sqlCommandQueryReader method to edit an existing book from the database. 
            string Titlename = Tname.Text;
            string Titletype = Ttype.Text;
            string Titleprice = Tprice.Text;

            string oid = oldid.Text;
            string oname = oldname.Text;
            if (Tname.Text.Length != 0 && Ttype.Text.Length != 0 &&
                oldname.Text.Length != 0 && oldid.Text.Length != 0 && Tprice.Text.Length != 0)
            {
                string editt = "update titles set title ='" + Titlename + "',type='" + Titletype + "',price='" + Titleprice + "'where titles.title_id ='" + oid + "' and titles.title='" + oname + "';";

                DataBaseConnection.sqlCommandQueryReader(editt);
                MessageBox.Show("Title has been edited!");
            }
            else
                MessageBox.Show("Missing information!");
        }
```

### Delete form

Deleting a book will require only the `titleid`, we will request the id from the user and delete the book from the database using the sqlCommandQueryReader method.

![Deleteform](/engineering-education/connecting-library-application-to-sql-server-using-windows-forms/Deleteform.png).

```c#
   private void Delbu_Click(object sender, EventArgs e)
        {         
        // We will be using the sqlCommandQueryReader method to delete an existing book from the database.
            string dell = Del.Text;
            string delete1 = "delete from roysched where roysched.title_id='"+dell+"'; delete from sales where sales.title_id='"+dell+"';delete from titles where titles.title_id='"+dell+"';";
            if (Del.Text.Length != 0)
            {
                DataBaseConnection.sqlCommandQueryReader(delete1);
                MessageBox.Show("Title has been deleted!");
            }
            else
                MessageBox.Show("enter a title id!");
        }
```
### Refresh button

The refresh button will simply display the information from the database and will be needed to be clicked after any operation to keep the information updated.

```c#
  private void refresh_Click(object sender, EventArgs e)
        {
         // This query will show the data of the library on the DataGridview, and each time the user clicks the button, it will refresh the data.
            dataGridView1.Rows.Clear();
            string sqlQuery = "SELECT title_id,title,type,pub_name,price,ytd_sales FROM titles inner join publishers ON titles.pub_id = publishers.pub_id";

            DataTable dt = DataBaseConnection.dataAdapterSelect(sqlQuery);

            foreach (DataRow dr in dt.Rows)
            {
                dataGridView1.Rows.Add(dr["title_id"], dr["pub_name"], dr["price"], dr["ytd_sales"], dr["title"], dr["type"]);
            }
        }
```

### Authors tab

The author's tab will display the `au_id` `au_fname` `phone` `address` `city` & `count` of each book the author wrote.

![Authors](/engineering-education/connecting-library-application-to-sql-server-using-windows-forms/Authors.png).

```c#
// This query will display all the information about the authors on the DataGridView.
string sqlQuery2 = "select * from authors order by au_fname asc";
            DataTable dt2 = DataBaseConnection.dataAdapterSelect(sqlQuery2);

            foreach (DataRow dr in dt2.Rows)
            {
                dataGridView2.Rows.Add(dr["au_id"], dr["au_fname"], dr["phone"], dr["address"], dr["city"]);
            }
// This query will only display the count of the books that the author wrote on the DataGridView.
            string sqlQuery3 = "SELECT authors.au_fname,count(titleauthor.title_id) as authorcount FROM authors, titleauthor WHERE authors.au_id = titleauthor.au_id GROUP BY authors.au_fname";
            DataTable dt3 = DataBaseConnection.dataAdapterSelect(sqlQuery3);

            foreach (DataRow dr in dt3.Rows)
            {
                dataGridView3.Rows.Add(dr["authorcount"]);
            }
```
### Publishers tab

The Publisher's tab will display the information of the `publishers` using the `pub_id`.

![Publishers](/engineering-education/connecting-library-application-to-sql-server-using-windows-forms/Publishers.png).

```c#
// This query will display all the information about the publishers on the DataGridView.
private void checkpub_Click(object sender, EventArgs e)
            { string idd = puid.Text; 
            string sqlQuery00 = "select * from  publishers where publishers.pub_id='" + idd + "'";
            DataTable dt00 = DataBaseConnection.dataAdapterSelect(sqlQuery00);

            if (dt00.Rows.Count > 0)
            {foreach (DataRow dr in dt00.Rows)
                { dataGridView4.Rows.Clear();
                  dataGridView4.Rows.Add(dr["pub_id"], dr["pub_name"], dr["city"], dr["state"], dr["country"]);}}
            else
            {MessageBox.Show("This Id is does not exist!");}}
```

### Store tab

The Store's tab will display the discounts available using a left outer join Query.

![Store](/engineering-education/connecting-library-application-to-sql-server-using-windows-forms/Store.png).

```c#
// This query will display the discounts using the discount id & the store id.
string q5 = " select * from stores left outer join discounts on stores.stor_id = discounts.stor_id ";           
            DataTable q55 = DataBaseConnection.dataAdapterSelect(q5);
            
            foreach (DataRow dr in q55.Rows)
            {
                dataGridView5.Rows.Add(dr["stor_name"], dr["discount"]);
            }
```

### Conclusion

In this tutorial we have learned how to connect an application to a database and convert any string to a Query that can be understood by the SQL server, we have also learned how to add edit & delete a book from the database & display the information of the books authors publishers & the discounts of each store. Don't forget to test out the code to fully understand how it works.
