---
layout: engineering-education
status: publish
published: true
url: /understanding-hybrid-data-models/
title: Understanding Hybrid Data Models
description: This tutorial will explain the hybrid data models and how to implement them using functions provided by the databases.
author: george-wekesa
date: 2022-02-09T00:00:00-10:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-hybrid-data-models/hero.jpg
    alt: Understanding Hybrid Data Models Hero Image
---
The [relational database](https://www.ibm.com/cloud/learn/relational-databases) has been in existence for the longest time, making it the most popular data model used by developers worldwide. It abstracts the way it handles and stores data from the users.
<!--more-->
Due to this reason, developers find it flexible and straightforward to use in their applications.

However, applications are more data-intensive and not that simple in the modern world. Applications have revolutionized in many fields such as data explosion, social networks, the internet, artificial intelligence, among others.

This has resulted in applications dealing with massive unstructured data, making it challenging to handle relational databases that only deal with fixed tabular structured data. For this reason, developers have opted for other options such as non-relational databases, commonly known as [NoSQL databases](https://www.ibm.com/cloud/learn/nosql-databases).

Each NoSQL database has been designed to handle specific functions in the application where relational databases fail.

It is difficult to rely on one type of database with modern applications as it may not completely meet the application's needs. Therefore a hybrid database model is often adopted.

A [hybrid database model](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-hybrid.html) comprises several databases contained in one application.

The choice of the databases used in the hybrid model depends on the application needs and specifications. The selection of the databases is determined by the advantages and limitations offered by the given database. This means that the databases must complement each other.

In this guide, we will use some of the JSON functionalities offered by MariaDB to demonstrate the concept of hybrid data models.

### Prerequisites
- [MariaDB](https://mariadb.com/downloads/) installed.
- Knowledge of [MariaDB](https://www.mariadbtutorial.com/) and [JSON](https://www.json.org/json-en.html) commands.
- A clear understanding of [relational databases](https://www.ibm.com/cloud/learn/relational-databases) and [SQL commands](https://www.dataquest.io/blog/sql-commands/).

### How to model structured and semi-structured data
It is well known that MariaDB is RDMS at its core. However, it offers many capabilities besides that. It can handle JavaScript Object Notation (JSON) formatted data. JSON is also supported by the NoSQL databases.

JSON is now working well with relational databases, making it easy to create structured and semi-structured data models. It is now possible for applications to utilize the benefits offered by JSON even without comprising the advantages relational databases offer.

Both MariaDB and JSON support features that can be used to achieve a common goal. We will cover some of them using a hypothetical application.

We will assume that the application contains only one table named `computers`, which we will use to store the details of computers. We will not focus on the frontend as we are interested in the database side.

`Computers` table can contains different fields such as `type`, `brand`, `price`, and `stock`. At the same time, it can contains different properties that can be defined in JSON format, as demonstrated below:

![Structured and semi structured data](/engineering-education/understanding-hybrid-data-models/structured.png)

#### Creating the table
We start by creating a `computers` table using the following SQL commands:

```sql
CREATE TABLE IF NOT EXISTS computers
  ( c_id INT(10) NOT NULL AUTO_INCREMENT,
    type VARCHAR(25) NOT NULL,
    brand VARCHAR(25) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock INT(10) NOT NULL,
    properties JSON,
    CONSTRAINT C_id_pk PRIMARY KEY (c_id)
);
```

Note that the column `properties` in the `computers` table is defined as JSON datatype. The column has been assigned the datatype JSON, but there is no such datatype in the real sense. Therefore, it will be transformed into an existing datatype that MariaDB supports.

We can inspect the details of what we have created using the commands above by running this command:

```sql
SHOW CREATE TABLE computers;
```

The following results will be displayed:

![JSON Field](/engineering-education/understanding-hybrid-data-models/json-field.png)

From the image above, the datatype for the column `properties` has `LONGTEXT` assigned to it. More constraints have been added to the field, especially the `CHECK` constraint, which has the `JSON_VALID()` function invoked whenever the `properties` column data is updated or modified.

The `JSON_VALID()` function validates JSON data as shown below:

![JSON data valid](/engineering-education/understanding-hybrid-data-models/jsonvalid.png)

#### Inserting data
Inserting JSON data is easy as it is contained within the quotes provided that the string is valid. We will execute the statement below to insert the data:

```sql
INSERT INTO computers (type, brand, price, stock, properties) VALUES
     ('Laptop', 'HP', 536.67, 288,
  '{"details": {"RAM": "8GB", "Processor": "Core i3"},
        "store": [{"location": "Nairobi", "Address": 1025},
{"location": "Mombasa", "Address": 152}]}');
```

It is important to note that it is possible to use different JSON data with different structures in the same insert statement in the same table, as shown below:

```sql
INSERT INTO computers (type, brand, price, stock, properties) VALUES
     ('Desktop', 'LENOVO', 602.25, 187,
'{"class": "PC", "PurchaseDate": "14/01/2022"}');
```

The data will be inserted into the table; the table will appear as shown below:

![Show Table](/engineering-education/understanding-hybrid-data-models/showtbl.png)

### Querying JSON data
When dealing with JSON data in MariaDB, we use the predefined functions to perform most operations. We will use these functions to the end of this article.

#### Querying scalar data
To query for scalar data, we use the function `JSON_VALUE()`. The function outputs the JSON data from the path and data that have been specified in the select statement. In our case, the `properties` column becomes our specified data. The select statement would appear as follows:

```sql
SELECT brand, price, stock,
    JSON_VALUE(properties, '$.details.RAM') AS Specs
FROM computers
WHERE type = 'Laptop';
```

The following results will be displayed depending on the data inserted into the `computers` table initially:

![Scalar data](/engineering-education/understanding-hybrid-data-models/scalardata.png)

The function `JSON_VALUE()` can handle the null and non-existent values that form part of semi-structured data.

#### Querying object data
To return the JSON data, the function `JSON_QUERY()` accepts the JSON data and a JSON path. The difference between `JSON_QUERY()` and `JSON_VALUE()` is that `JSON_QUERY()` returns the entire JSON object data. The query would look like the one shown below:

```sql
SELECT brand, price,
    JSON_QUERY(properties, '$.details') AS CPU
FROM computers
WHERE type = 'Laptop'
```

The result will appear as shown below:

![Object data](/engineering-education/understanding-hybrid-data-models/objectdata.png)

#### Creating indexes
We are able to create performance-enhancing indexes. But first we create a virtual column in our table:

```sql
ALTER TABLE computers ADD COLUMN
    CPU VARCHAR(50) AS (JSON_VALUE(properties, '$.details.Processor')) VIRTUAL;
```

Then we will create a new index by adding a virtual column using:

```sql
CREATE INDEX CPu ON computers(CPU);
```

### Modifying JSON data
There may be a need to modify the data. MariaDB offers several JSON functions to achieve that. In the next sections, we will cover some of these JSON functions.

#### Inserting JSON data
Inserting the JSON data into our `properties` field is performed using `JSON_INSERT()` function. This function ensures that values or paths are added to the existing JSON data. The statement would be as follows:

```sql
UPDATE computers
SET properties = JSON_INSERT(properties,'$.RamType','DDR3')
WHERE C_id = 1;
```

Afterwards, run the following `SELECT` command to display the JSON data in our table:

```sql
SELECT properties FROM computers WHERE TYPE='Laptop';
```

The result will be as follows:

![Insert JSON data](/engineering-education/understanding-hybrid-data-models/insert-json.png)

#### Inserting arrays in JSON
We can insert arrays into the JSON data using the function `JSON_ARRAY()`. For instance in our case we can insert an array in the `properties` field as demonstrated below:

```sql
UPDATE computers
    SET properties = JSON_INSERT(properties,
 '$.Processor',
        JSON_ARRAY('Core i5', 'Core i7'))
WHERE c_id = 1;
```

Upon running the `SELECT` command, the results will be as shown below:

![Insert JSON Arrays](/engineering-education/understanding-hybrid-data-models/json-array.png)

#### Adding array elements
In order to modify an existing array, we add elements into it using the `JSON_ARRAY_APPEND()` function:

```sql
UPDATE computers
    SET properties = JSON_ARRAY_APPEND(properties,
                '$.Processor', “Core 2 Duo”)
WHERE c_id = 1;
```

Eventually, the updated result will be as shown below:

![Adding Array elements](/engineering-education/understanding-hybrid-data-models/json-array-append.png)

#### Deleting array elements
We can use `JSON_REMOVE()` function to delete the array elements from the JSON data:

```sql
UPDATE computers
    SET properties = JSON_REMOVE(properties,
                           '$.Processor[1]')
WHERE c_id = 1;
```

The array element “Core 2 Duo” will then be removed from the JSON data as it can be seen in the image below:

![Remove JSON elements](/engineering-education/understanding-hybrid-data-models/json-remove.png)

### Hybrid data querying
The function `JSON_OBJECT()` can be utilized to create semi-structured JSON data from the structured data as shown in the statement below:

```sql
SELECT
JSON_OBJECT('brand', brand, 'stock', stock) AS data
FROM computers
WHERE type = 'Laptop';
```

The output will be as follows:

![Hybrid Data query](/engineering-education/understanding-hybrid-data-models/json-object.png)

#### Merging data
It is possible to combine the existing JSON data with the data that is returned from the JSON object function. We use the function `JSON_MERGE()` for this purpose. We will use the statement below to merge the data:

```sql
SELECT
  JSON_MERGE(
    JSON_OBJECT(
        'brand', brand,
        'price', price,
        'stock', stock),
    properties) AS data
FROM computers
WHERE type = 'Laptop';
```

The output will appear as shown below:

```json
{
  "brand": "HP",
  "price": 536.67,
  "stock": 288,
  "details": {
    "RAM": "8GB",
    "Processor": "Core i3"
  },
  "store": [
    { "location": "Nairobi", "Address": 1025 },
    { "location": "Mombasa", "Address": 152 }
  ],
  "RamType": "DDR3",
  "Processor": ["Core i5", "Core i7"]
}
```

#### JSON to tabular data
To convert the JSON data to a table format we use the function `JSON_TABLE()`. The function can also be used alongside `FROM` clause to join other tables.

```sql
SELECT brand, RAM, Processor
FROM
    computers,
JSON_TABLE(properties,
         '$.details' COLUMNS(
                RAM VARCHAR(25) PATH '$.RAM',
                Processor VARCHAR(25) PATH '$.Processor')
           ) AS jt
WHERE c_id = 1;
```

The output would appear as in the image below:

![JSON Table](/engineering-education/understanding-hybrid-data-models/json-table.png)

### Enforcing data integrity
We can impose the data integrity of JSON data in MariaDB. This means that we can enforce constraints for the types of JSON allowed to exist within our tables.

In our case, we can create a new constraint and name it `check_comps`. It specifies that the JSON data must meet a specific condition for every computer type `Laptop`. It checks if a specified property exists through use of JSON functions that MariaDB supports.

```sql
ALTER TABLE computers ADD CONSTRAINT check_comps
       CHECK (
type = 'Laptop' and
       JSON_TYPE(JSON_QUERY(properties, '$.details')) = 'OBJECT' and
       JSON_TYPE(JSON_QUERY(properties, '$.store')) = 'ARRAY' and
       JSON_EXISTS(properties, '$.details.RAM') = 1 and
       JSON_EXISTS(properties, '$.details.Processor') = 1 and
JSON_LENGTH(JSON_QUERY(properties, '$.store')) > 0);
```

After we have enforced the constraints above on our JSON data, we can try to run the `INSERT` command again:

```sql
INSERT INTO computers (type, brand, price, stock, properties) VALUES
     ('Desktop', 'LENOVO', 602.25, 187,
'{"class": "PC", "PurchaseDate": "14/01/2022"}');
```

The following error message will pop up, meaning that the data we are trying to insert has violated the constraints we imposed. Therefore, the data will not be inserted.

![Data Integrity Error](/engineering-education/understanding-hybrid-data-models/dataintegrity-fail.png)

### Wrapping up
From the activities above, we can conclude that it is possible to use the MariaDB alongside JSON to take advantage of both databases offers. We have only covered a few of the functions as many of them exist.

Feel free to explore more functions and try them out to realize the power and flexibility they can offer.

### Further reading
- [Understanding structured and semi-structured data](https://k21academy.com/microsoft-azure/dp-900/structured-data-vs-unstructured-data-vs-semi-structured-data/).
- [Learning the JSON functions](https://mariadb.com/kb/en/json-functions/).
- [What is hybrid database?](https://www.softwaretestinghelp.com/hybrid-database/).

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
