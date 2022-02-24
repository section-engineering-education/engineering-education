---
layout: engineering-education
status: publish
published: true
url: /android-kotlin-mpandroidcharts-sqlite/
title: Creating a Data Visualization Dashboard using MPAndroid Chart Library
description: This article will cover creating an admin dashboard that allows users to view their data using different kinds of charts using Kotlin and an open-source chart library, MPAndroidChart.
author: sandra-moringa
date: 2022-01-31T00:00:00-11:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-kotlin-mpandroidcharts-sqlite/hero.jpg
    alt: Creating a data visualization dashboard using MPAndroid Chart library Hero Image
---
The easiest way for a user to get insight from information is through data visualization. The most common tool for data visualization is using charts. 
<!--more-->
This tutorial will create a simple admin dashboard that allows users to view data using three commonly used charts: pie, bar, and line charts using Kotlin and an open-source chart library, `MPAndroidChart`.

The app will simulate wild animal data in a game park. For the data, we will get it from an SQLite database. The data source is not so vital for you can use any. It can be from any API through JSON, Room persistence library, simple arrays, local storage, etc. We will achieve this in the end(The layout is configured for light mode only).

![Screenshot](/engineering-education/android-kotlin-mpandroidcharts-sqlite/screenshot-one.png)

> Find more about MPAndroidChart [here](https://weeklycoding.com/mpandroidchart/).

### Prerequisites
1. Basic knowledge of Kotlin programming language and its use in developing android applications.
2. [Android Studio](https://developer.android.com/studio?gclid=CjwKCAiAxJSPBhAoEiwAeO_fP-Hw958g745_zng07OQLg4N2Z-RLxaOxJJ-Edd-gH6UCHjFAa4EJqRoCXgkQAvD_BwE&gclsrc=aw.ds) or [IntellijIDEA](https://www.jetbrains.com/idea/)(configured for android development) installed on your machine.
3. Knowledge of [SQLite](https://developer.android.com/training/data-storage/sqlite) databases. Again, this is unnecessary because you can use any other data source. 
4. General Object-Oriented Programming(OOP) concepts.

### Goals
At the end of this article, the reader should be well-versed in:
- Creating an SQLite database.
- Adding charts to our projects using the MPAndroid Chart library.
- Populating the charts using data loaded from the SQLite database.

#### Step one: Setting up the library
After creating a new app, modify your Gradle files as outlined below:

1. Add the following dependency in your app-level `build.gradle` file:

```gradle
implementation 'com.github.PhilJay:MPAndroidChart:v3.1.0'
```

2. Finally, in the project-level `build.gradle` file under the `repositories` section, add this line of code:

```gradle
maven { url 'https://jitpack.io' }
```

> Note: If you run through a build error, you can also modify the `repositories` section of the `settings.gradle` file to this line:

```gradle
maven { url 'https://jitpack.io' }
```

#### Step two: Creating a model class
We will create a' AnimalModel' model class for organized and eased data manipulation. First, please create a new kotlin file and give it the same class name. Then, add the following lines of code:

```kotlin
class AnimalModel (var animalId: Int, var animalName:String, var totNumber:Int, var avgAge: Int, var avgGrowth: Int)
```

It models an animal's id, name, total number, average age, and average growth rate in the database.

#### Step three: Creating a database handler class
To handle the database logic, we will create a' DatabaseHandler' class that extends the `SQLiteOpenHelper` class. The extended class provides us with methods that enable the manipulation of the SQLite database. The database will not be a full CRUD(Create, Read, Update, and Delete) but only CR(Create and read). We only need to create the records and then fetch them to populate the charts.

This handler class will have a [companion object](https://blog.mindorks.com/companion-object-in-kotlin) with constant variables for storing the database, table, and field names.

```kotlin
    companion object {
        private val DB_VERSION = 1
        private val DB_NAME = "wildDB"
        private val MAIN_TABLE = "mainTable"
        private val ID_FIELD = "_id"
        private val NAME_FIELD = "name"
        private val NUMBER_FIELD = "tot_number"
        private val AGE_FIELD = "avg_age"
        private val GROWTH_FIELD = "growth_rate"
    }
```

We will also have two overridden methods, `onCreate()` and `onUpgrade()`.

The `onCreate()` method will create our table and its fields using the standard SQL statements. The database is passed as a parameter.

```kotlin
    override fun onCreate(ourDB: SQLiteDatabase?) {
        //creating our table with the respective fields
        val CREATE_MAIN_TABLE = ("CREATE TABLE " + MAIN_TABLE + "("
                + ID_FIELD + " INTEGER PRIMARY KEY,"
                + NAME_FIELD + " TEXT,"
                + NUMBER_FIELD + " INTEGER,"
                + AGE_FIELD + " INTEGER,"
                + GROWTH_FIELD + " INTEGER" + ")")
        //executing the create table query
        ourDB?.execSQL(CREATE_MAIN_TABLE)
    }
```

You will use the `onUpgrade()` method when you want to update the database safely. We will not be using it in our article, however. The parameters passed in are the database name, old version number, and new version number.

```kotlin
    //function to be invoked when upgrading your database
    override fun onUpgrade(ourDB: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {

        ourDB!!.execSQL("DROP TABLE IF EXISTS " + MAIN_TABLE)
        onCreate(ourDB)
    }

```

We will use a function called `addAnimalDetails()` to insert records. First, we pass in our animal model class as a parameter, open the database in a writable mode to make changes, and then insert the values from the model class using a [ContentValues](https://developer.android.com/reference/android/content/ContentValues) object.

After the insertion, we close the database and then return a status code to show if the operation was successful or not.

```kotlin
    //a method to insert records
    fun addAnimalDetails(animal: AnimalModel):Long{
        //opening the database in a writable mode to be able to make changes in it
        val ourDB = this.writableDatabase
        val ourContentValues = ContentValues()
        ourContentValues.put(ID_FIELD, animal.animalId)
        ourContentValues.put(NAME_FIELD, animal.animalName)
        ourContentValues.put(NUMBER_FIELD, animal.totNumber)
        ourContentValues.put(AGE_FIELD, animal.avgAge)
        ourContentValues.put(GROWTH_FIELD, animal.avgGrowth)
        val success = ourDB.insert(MAIN_TABLE, null, ourContentValues)
        //closse the database
        ourDB.close()
        return success
    }
```

Finally, we have a method to read the records. We call it `retreiveAnimals()`. It returns a generic list containing the retrieved records. We run a select query and open the database in a readable mode to 'read' the records, and then create a cursor object for storing the retrieved records.

Next, we execute the query and iterate through the cursor while assigning the values to the model class until all records are fetched. The try-catch helps us catch any SQLite exceptions when executing the query. 

> Note: The `@SuppressLint("Range")` annotation is used to suppress the error that comes about, hence requiring us to set a range for the cursor explicitly `cursor.getInt()` method.

```kotlin
    //method to read the animal records
    @SuppressLint("Range")
    fun retreiveAnimals():List<AnimalModel>{
        //a list to be returned after fetching the records
        val animalList:ArrayList<AnimalModel> = ArrayList<AnimalModel>()
        //the SELECT query
        val selectQuery = "SELECT  * FROM $MAIN_TABLE"
        //we open the database in a readable mode for fetching the records
        val ourDB = this.readableDatabase
        //cursor for storing the retrieved records
        var ourCursor: Cursor? = null
        try{
            ourCursor = ourDB.rawQuery(selectQuery, null)
        }catch (e: SQLiteException) {
            ourDB.execSQL(selectQuery)
            return ArrayList()
        }

        var animalIDReturned: Int
        var animalNameReturned: String
        var animalNumberReturned: Int
        var animalAgeReturned:Int
        var animalGrowthReturned:Int

        //fetch all the records until all are finished
        if (ourCursor.moveToFirst()) {
            do {
                //assign the values gotten to the respective strings
                animalIDReturned = ourCursor.getInt(ourCursor.getColumnIndex("_id"))
                animalNameReturned = ourCursor.getString(ourCursor.getColumnIndex("name"))
                animalNumberReturned = ourCursor.getInt(ourCursor.getColumnIndex("tot_number"))
                animalAgeReturned = ourCursor.getInt(ourCursor.getColumnIndex("avg_age"))
                animalGrowthReturned = ourCursor.getInt(ourCursor.getColumnIndex("growth_rate"))

                //add the values to the Model class and later to the arraylist
                val animalRow= AnimalModel(animalId=animalIDReturned,animalName=animalNameReturned,totNumber=animalNumberReturned,avgAge=animalAgeReturned,avgGrowth=animalGrowthReturned)
                animalList.add(animalRow)
            } while (ourCursor.moveToNext())
        }
        return animalList
    }
```

This is the complete code for the class.

```kotlin
import android.annotation.SuppressLint
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import android.content.ContentValues
import android.database.Cursor
import android.database.sqlite.SQLiteException

class DatabaseHandler(context: Context): SQLiteOpenHelper(context,DB_NAME,null,DB_VERSION) {
    companion object {
        private val DB_VERSION = 1
        private val DB_NAME = "wildDB"
        private val MAIN_TABLE = "mainTable"
        private val ID_FIELD = "_id"
        private val NAME_FIELD = "name"
        private val NUMBER_FIELD = "tot_number"
        private val AGE_FIELD = "avg_age"
        private val GROWTH_FIELD = "growth_rate"
    }
    override fun onCreate(ourDB: SQLiteDatabase?) {
        //creating our table with the respective fields
        val CREATE_MAIN_TABLE = ("CREATE TABLE " + MAIN_TABLE + "("
                + ID_FIELD + " INTEGER PRIMARY KEY,"
                + NAME_FIELD + " TEXT,"
                + NUMBER_FIELD + " INTEGER,"
                + AGE_FIELD + " INTEGER,"
                + GROWTH_FIELD + " INTEGER" + ")")
        //executing the create table query
        ourDB?.execSQL(CREATE_MAIN_TABLE)
    }

    //function to be invoked when upgrading your database
    override fun onUpgrade(ourDB: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {

        ourDB!!.execSQL("DROP TABLE IF EXISTS " + MAIN_TABLE)
        onCreate(ourDB)
    }


    //a method to insert records
    fun addAnimalDetails(animal: AnimalModel):Long{
        //opening the database in a writable mode to be able to make changes in it
        val ourDB = this.writableDatabase
        val ourContentValues = ContentValues()
        ourContentValues.put(ID_FIELD, animal.animalId)
        ourContentValues.put(NAME_FIELD, animal.animalName)
        ourContentValues.put(NUMBER_FIELD, animal.totNumber)
        ourContentValues.put(AGE_FIELD, animal.avgAge)
        ourContentValues.put(GROWTH_FIELD, animal.avgGrowth)
        val success = ourDB.insert(MAIN_TABLE, null, ourContentValues)
        //closse the database
        ourDB.close()
        return success
    }

    //method to read the animal records
    @SuppressLint("Range")
    fun retreiveAnimals():List<AnimalModel>{
        //a list to be returned after fetching the records
        val animalList:ArrayList<AnimalModel> = ArrayList<AnimalModel>()
        //the SELECT query
        val selectQuery = "SELECT  * FROM $MAIN_TABLE"
        //we open the database in a readable mode for fetching the records
        val ourDB = this.readableDatabase
        //cursor for storing the retrieved records
        var ourCursor: Cursor? = null
        try{
            ourCursor = ourDB.rawQuery(selectQuery, null)
        }catch (e: SQLiteException) {
            ourDB.execSQL(selectQuery)
            return ArrayList()
        }

        var animalIDReturned: Int
        var animalNameReturned: String
        var animalNumberReturned: Int
        var animalAgeReturned:Int
        var animalGrowthReturned:Int

        //fetch all the records until all are finished
        if (ourCursor.moveToFirst()) {
            do {
                //assign the values gotten to the respective strings
                animalIDReturned = ourCursor.getInt(ourCursor.getColumnIndex("_id"))
                animalNameReturned = ourCursor.getString(ourCursor.getColumnIndex("name"))
                animalNumberReturned = ourCursor.getInt(ourCursor.getColumnIndex("tot_number"))
                animalAgeReturned = ourCursor.getInt(ourCursor.getColumnIndex("avg_age"))
                animalGrowthReturned = ourCursor.getInt(ourCursor.getColumnIndex("growth_rate"))

                //add the values to the Model class and later to the arraylist
                val animalRow= AnimalModel(animalId=animalIDReturned,animalName=animalNameReturned,totNumber=animalNumberReturned,avgAge=animalAgeReturned,avgGrowth=animalGrowthReturned)
                animalList.add(animalRow)
            } while (ourCursor.moveToNext())
        }
        return animalList
    }
}
```

#### Step four: Adding data to the database and populating the charts
This step will add records to our database and then populate the charts using fetched records. We will achieve this by calling the database handler class methods we just created.

##### Saving the records
We do this by using `saveAnimals()` method and passing in the appropriate fields using the model class.

```kotlin
    //method for saving records in database
    fun saveAnimals() {

        val databaseHandler: DatabaseHandler = DatabaseHandler(this)
        val record1 = databaseHandler.addAnimalDetails(AnimalModel(1, "Lion", 470, 7, 87))
        val record2 = databaseHandler.addAnimalDetails(AnimalModel(2, "Impala", 1879, 10, 90))
        val record3 = databaseHandler.addAnimalDetails(AnimalModel(3, "Leopard", 570, 13, 89))
        val record4 = databaseHandler.addAnimalDetails(AnimalModel(4, "Crocodile", 150, 30, 66))
    }
```

##### Retrieving the records
We call the `retreiveAnimals()` method of the `DatabaseHandler` class to read the records and store them in arrays. Lastly, we call the methods for populating the charts by passing in the arrays.

```kotlin
    fun retrieveRecordsAndPopulateCharts() {
        //creating the instance of DatabaseHandler class
        val databaseHandler: DatabaseHandler = DatabaseHandler(this)
        //calling the retreiveAnimals method of DatabaseHandler class to read the records
        val animal: List<AnimalModel> = databaseHandler.retreiveAnimals()
        //create arrays for storing the values gotten
        val animalIDArray = Array<Int>(animal.size) { 0 }
        val animalNameArray = Array<String>(animal.size) { "natgeo" }
        val animalNumberArray = Array<Int>(animal.size) { 0 }
        val animalAgeArray = Array<Int>(animal.size) { 0 }
        val animalGrowthArray = Array<Int>(animal.size) { 0 }

        //add the records till done
        var index = 0
        for (a in animal) {
            animalIDArray[index] = a.animalId
            animalNameArray[index] = a.animalName
            animalNumberArray[index] = a.totNumber
            animalAgeArray[index] = a.avgAge
            animalGrowthArray[index] = a.avgGrowth
            index++
        }
        //call the methods for populating the charts
        populatePieChart(animalNumberArray, animalNameArray)
        populateBarChart(animalAgeArray)
        populateLineChart(animalGrowthArray)

    }
```

##### Populating the charts
The MPAndroid chart library is so easy to use. Let us see how the charts are populated with data. Let us begin with the pie chart. 

The values and labels of the pie chart are obtained from the arrays passed. The array will store the pie slices entries. First, `OurPieEntry` is created, after which it has added the values and labels using a loop which will be done in the `MainActivity` class.

```kotlin
        //an array to store the pie slices entry
        val ourPieEntry = ArrayList<PieEntry>()
        var i = 0

        for (entry in values) {
            //converting to float
            var value = values[i].toFloat()
            var label = labels[i]
            //adding each value to the pieentry array
            ourPieEntry.add(PieEntry(value, label))
            i++
        }
```

Next, we add the colors for the slices again, using an array.

```kotlin
        //assigning color to each slices
        val pieShades: ArrayList<Int> = ArrayList()
        pieShades.add(Color.parseColor("#0E2DEC"))
        pieShades.add(Color.parseColor("#B7520E"))
        pieShades.add(Color.parseColor("#5E6D4E"))
        pieShades.add(Color.parseColor("#DA1F12"))
```

A dataset used by the library to add data to the pie chart is passed in the pie slices entry values.

```kotlin
        //add values to the pie dataset and passing them to the constructor
        val ourSet = PieDataSet(ourPieEntry, "")
        val data = PieData(ourSet)
```

We then set the slices' divider width, add colors to the data set, and set the object to the pie chart's data property.

```kotlin
        //setting the slices divider width
        ourSet.sliceSpace = 1f

        //populating the colors and data
        ourSet.colors = pieShades
        ourPieChart.data = data
```

The next segment is about manipulating the chart's appearance. Again, the chart provides many methods and properties that you can explore. Unfortunately, we cannot exhaust all of them here.

> Note: I have added inline comments for a guide. The last line is crucial because it refreshes the chart.

```kotlin
        //refreshing the chart
        ourPieChart.invalidate()
```

Here is the complete code for the `populatePieChart()` method.

```kotlin
    private fun populatePieChart(values: Array<Int>, labels: Array<String>) {
        //an array to store the pie slices entry
        val ourPieEntry = ArrayList<PieEntry>()
        var i = 0

        for (entry in values) {
            //converting to float
            var value = values[i].toFloat()
            var label = labels[i]
            //adding each value to the pieentry array
            ourPieEntry.add(PieEntry(value, label))
            i++
        }

        //assigning color to each slices
        val pieShades: ArrayList<Int> = ArrayList()
        pieShades.add(Color.parseColor("#0E2DEC"))
        pieShades.add(Color.parseColor("#B7520E"))
        pieShades.add(Color.parseColor("#5E6D4E"))
        pieShades.add(Color.parseColor("#DA1F12"))

        //add values to the pie dataset and passing them to the constructor
        val ourSet = PieDataSet(ourPieEntry, "")
        val data = PieData(ourSet)

        //setting the slices divider width
        ourSet.sliceSpace = 1f

        //populating the colors and data
        ourSet.colors = pieShades
        ourPieChart.data = data
        //setting color and size of text
        data.setValueTextColor(Color.WHITE)
        data.setValueTextSize(10f)

        //add an animation when rendering the pie chart
        ourPieChart.animateY(1400, Easing.EaseInOutQuad)
        //disabling center hole
        ourPieChart.isDrawHoleEnabled = false
        //do not show description text
        ourPieChart.description.isEnabled = false
        //legend enabled and its various appearance settings
        ourPieChart.legend.isEnabled = true
        ourPieChart.legend.orientation = Legend.LegendOrientation.HORIZONTAL
        ourPieChart.legend.horizontalAlignment = Legend.LegendHorizontalAlignment.CENTER
        ourPieChart.legend.isWordWrapEnabled = true

        //dont show the text values on slices e.g Antelope, impala etc
        ourPieChart.setDrawEntryLabels(false)
        //refreshing the chart
        ourPieChart.invalidate()
    }
```

For the bar and line charts, the logic is the same. We pass in the values, set them using their entry arrays, set their properties, and then display them. The only difference is in what is passed in by the arrays. For example, we passed the labels and values for the pie chart, but we only passed the values and the positions for the other two. 

Here is a snippet for the Bar Chart entry.

```kotlin
        //adding values
        val ourBarEntries: ArrayList<BarEntry> = ArrayList()
        var i = 0

        for (entry in values) {
            var value = values[i].toFloat()
            ourBarEntries.add(BarEntry(i.toFloat(), value))
            i++
        }
```

If you want to display the values using custom axes, have a look at these two blogs:
 1. [Intense Coder MPAndroid Line Chart tutorial](https://intensecoder.com/line-chart-tutorial-using-mpandroidchart-in-kotlin/).
 2. [Intense Coder MPAndroid Bar Chart tutorial](https://intensecoder.com/bar-chart-tutorial-in-android-using-kotlin/).

Here is the code for the two methods:

```kotlin
    private fun populateBarChart(values: Array<Int>) {
        //adding values
        val ourBarEntries: ArrayList<BarEntry> = ArrayList()
        var i = 0

        for (entry in values) {
            var value = values[i].toFloat()
            ourBarEntries.add(BarEntry(i.toFloat(), value))
            i++
        }


        val barDataSet = BarDataSet(ourBarEntries, "")
        //set a template coloring
        barDataSet.setColors(*ColorTemplate.COLORFUL_COLORS)
        val data = BarData(barDataSet)
        ourBarChart.data = data
        //setting the x-axis
        val xAxis: XAxis = ourBarChart.xAxis
        //calling methods to hide x-axis gridlines
        ourBarChart.axisLeft.setDrawGridLines(false)
        xAxis.setDrawGridLines(false)
        xAxis.setDrawAxisLine(false)

        //remove legend
        ourBarChart.legend.isEnabled = false

        //remove description label
        ourBarChart.description.isEnabled = false

        //add animation
        ourBarChart.animateY(3000)
        //refresh the chart
        ourBarChart.invalidate()
    }

    private fun populateLineChart(values: Array<Int>) {
        val ourLineChartEntries: ArrayList<Entry> = ArrayList()

        var i = 0

        for (entry in values) {
            var value = values[i].toFloat()
            ourLineChartEntries.add(Entry(i.toFloat(), value))
            i++
        }
        val lineDataSet = LineDataSet(ourLineChartEntries, "")
        lineDataSet.setColors(*ColorTemplate.PASTEL_COLORS)
        val data = LineData(lineDataSet)
        ourLineChart.axisLeft.setDrawGridLines(false)
        val xAxis: XAxis = ourLineChart.xAxis
        xAxis.setDrawGridLines(false)
        xAxis.setDrawAxisLine(false)
        ourLineChart.legend.isEnabled = false

        //remove description label
        ourLineChart.description.isEnabled = false

        //add animation
        ourLineChart.animateX(1000, Easing.EaseInSine)
        ourLineChart.data = data
        //refresh
        ourLineChart.invalidate()
    }
```

The complete `MainActivity` code:

```kotlin
import android.os.Bundle
import android.graphics.Color
import android.graphics.Typeface
import androidx.appcompat.app.AppCompatActivity
import com.github.mikephil.charting.animation.Easing
import com.github.mikephil.charting.charts.BarChart
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.charts.PieChart
import com.github.mikephil.charting.components.Legend
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.*
import com.github.mikephil.charting.formatter.PercentFormatter
import com.github.mikephil.charting.utils.ColorTemplate


class MainActivity : AppCompatActivity() {
    private lateinit var ourPieChart: PieChart
    private lateinit var ourBarChart: BarChart
    private lateinit var ourLineChart: LineChart

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        ourPieChart = findViewById(R.id.ourPieChart)
        ourBarChart = findViewById(R.id.ourBarChart)
        ourLineChart = findViewById(R.id.ourLineChart)
        saveAnimals()
        retrieveRecordsAndPopulateCharts()
    }

    //method for saving records in database
    fun saveAnimals() {

        val databaseHandler: DatabaseHandler = DatabaseHandler(this)
        val record1 = databaseHandler.addAnimalDetails(AnimalModel(1, "Lion", 470, 7, 87))
        val record2 = databaseHandler.addAnimalDetails(AnimalModel(2, "Impala", 1879, 10, 90))
        val record3 = databaseHandler.addAnimalDetails(AnimalModel(3, "Leopard", 570, 13, 89))
        val record4 = databaseHandler.addAnimalDetails(AnimalModel(4, "Crocodile", 150, 30, 66))
    }

    fun retrieveRecordsAndPopulateCharts() {
        //creating the instance of DatabaseHandler class
        val databaseHandler: DatabaseHandler = DatabaseHandler(this)
        //calling the retreiveAnimals method of DatabaseHandler class to read the records
        val animal: List<AnimalModel> = databaseHandler.retreiveAnimals()
        //create arrays for storing the values gotten
        val animalIDArray = Array<Int>(animal.size) { 0 }
        val animalNameArray = Array<String>(animal.size) { "natgeo" }
        val animalNumberArray = Array<Int>(animal.size) { 0 }
        val animalAgeArray = Array<Int>(animal.size) { 0 }
        val animalGrowthArray = Array<Int>(animal.size) { 0 }

        //add the records till done
        var index = 0
        for (a in animal) {
            animalIDArray[index] = a.animalId
            animalNameArray[index] = a.animalName
            animalNumberArray[index] = a.totNumber
            animalAgeArray[index] = a.avgAge
            animalGrowthArray[index] = a.avgGrowth
            index++
        }
        //call the methods for populating the charts
        populatePieChart(animalNumberArray, animalNameArray)
        populateBarChart(animalAgeArray)
        populateLineChart(animalGrowthArray)

    }

    private fun populatePieChart(values: Array<Int>, labels: Array<String>) {
        //an array to store the pie slices entry
        val ourPieEntry = ArrayList<PieEntry>()
        var i = 0

        for (entry in values) {
            //converting to float
            var value = values[i].toFloat()
            var label = labels[i]
            //adding each value to the pieentry array
            ourPieEntry.add(PieEntry(value, label))
            i++
        }

        //assigning color to each slices
        val pieShades: ArrayList<Int> = ArrayList()
        pieShades.add(Color.parseColor("#0E2DEC"))
        pieShades.add(Color.parseColor("#B7520E"))
        pieShades.add(Color.parseColor("#5E6D4E"))
        pieShades.add(Color.parseColor("#DA1F12"))

        //add values to the pie dataset and passing them to the constructor
        val ourSet = PieDataSet(ourPieEntry, "")
        val data = PieData(ourSet)

        //setting the slices divider width
        ourSet.sliceSpace = 1f

        //populating the colors and data
        ourSet.colors = pieShades
        ourPieChart.data = data
        //setting color and size of text
        data.setValueTextColor(Color.WHITE)
        data.setValueTextSize(10f)

        //add an animation when rendering the pie chart
        ourPieChart.animateY(1400, Easing.EaseInOutQuad)
        //disabling center hole
        ourPieChart.isDrawHoleEnabled = false
        //do not show description text
        ourPieChart.description.isEnabled = false
        //legend enabled and its various appearance settings
        ourPieChart.legend.isEnabled = true
        ourPieChart.legend.orientation = Legend.LegendOrientation.HORIZONTAL
        ourPieChart.legend.horizontalAlignment = Legend.LegendHorizontalAlignment.CENTER
        ourPieChart.legend.isWordWrapEnabled = true

        //dont show the text values on slices e.g Antelope, impala etc
        ourPieChart.setDrawEntryLabels(false)
        //refreshing the chart
        ourPieChart.invalidate()

    }

    private fun populateBarChart(values: Array<Int>) {
        //adding values
        val ourBarEntries: ArrayList<BarEntry> = ArrayList()
        var i = 0

        for (entry in values) {
            var value = values[i].toFloat()
            ourBarEntries.add(BarEntry(i.toFloat(), value))
            i++
        }


        val barDataSet = BarDataSet(ourBarEntries, "")
        //set a template coloring
        barDataSet.setColors(*ColorTemplate.COLORFUL_COLORS)
        val data = BarData(barDataSet)
        ourBarChart.data = data
        //setting the x-axis
        val xAxis: XAxis = ourBarChart.xAxis
        //calling methods to hide x-axis gridlines
        ourBarChart.axisLeft.setDrawGridLines(false)
        xAxis.setDrawGridLines(false)
        xAxis.setDrawAxisLine(false)

        //remove legend
        ourBarChart.legend.isEnabled = false

        //remove description label
        ourBarChart.description.isEnabled = false

        //add animation
        ourBarChart.animateY(3000)
        //refresh the chart
        ourBarChart.invalidate()
    }

    private fun populateLineChart(values: Array<Int>) {
        val ourLineChartEntries: ArrayList<Entry> = ArrayList()

        var i = 0

        for (entry in values) {
            var value = values[i].toFloat()
            ourLineChartEntries.add(Entry(i.toFloat(), value))
            i++
        }
        val lineDataSet = LineDataSet(ourLineChartEntries, "")
        lineDataSet.setColors(*ColorTemplate.PASTEL_COLORS)
        val data = LineData(lineDataSet)
        ourLineChart.axisLeft.setDrawGridLines(false)
        val xAxis: XAxis = ourLineChart.xAxis
        xAxis.setDrawGridLines(false)
        xAxis.setDrawAxisLine(false)
        ourLineChart.legend.isEnabled = false

        //remove description label
        ourLineChart.description.isEnabled = false

        //add animation
        ourLineChart.animateX(1000, Easing.EaseInSine)
        ourLineChart.data = data
        //refresh
        ourLineChart.invalidate()
    }
}
```

#### Step five: Creating the layout XML file
I will not go deep into explaining this. We have a root vertical layout that has a horizontal linear layout. So we have two linear layouts with equal weights in the root layout.

The first inner layout has a horizontal orientation with two linear layouts of equal weights, which enables us to split the screen into two equal parts where we will have the pie and bar charts placed(The pie and bar charts are rendered in cards). The line chart is placed in the second layout. 

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:app="http://schemas.android.com/apk/res-auto"
              xmlns:tools="http://schemas.android.com/tools"
              android:layout_width="match_parent"
              android:layout_height="600dp"
              android:paddingBottom="30dp"
              android:layout_marginTop="8dp"
              android:orientation="vertical">
    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="horizontal"
            android:backgroundTint="@color/white"
            android:layout_weight="2">
        <androidx.cardview.widget.CardView
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                app:cardElevation="10dp"
                app:cardCornerRadius="5dp"
                app:cardMaxElevation="12dp"
                app:cardPreventCornerOverlap="true"
                app:cardUseCompatPadding="true"
                android:layout_marginTop="10dp"
                android:layout_weight="2"
                android:layout_marginBottom="1dp">
            <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:text="Animal no."
                    android:textStyle="bold" android:textAlignment="center" android:layout_marginTop="2dp"/>
        <com.github.mikephil.charting.charts.PieChart
                android:id="@+id/ourPieChart"
                android:layout_width="match_parent"
                android:layout_height="match_parent"

        />
        </androidx.cardview.widget.CardView>
        <androidx.cardview.widget.CardView
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                app:cardElevation="10dp"
                app:cardCornerRadius="5dp"
                app:cardMaxElevation="12dp"
                app:cardPreventCornerOverlap="true"
                app:cardUseCompatPadding="true"
                android:layout_marginTop="10dp"
                android:layout_weight="2"
                android:layout_marginBottom="1dp">
            <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:text="Age dist."
                    android:textStyle="bold" android:textAlignment="center" android:layout_marginTop="2dp"/>
        <com.github.mikephil.charting.charts.BarChart
                android:id="@+id/ourBarChart"
                android:layout_marginTop="25dp"
                android:layout_marginLeft="7dp"
                android:layout_marginRight="7dp"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
        />
        </androidx.cardview.widget.CardView>
    </LinearLayout>
    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical"
            android:layout_weight="2">
        <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Growth rate."
                android:textStyle="bold" android:textAlignment="center" android:layout_marginTop="2dp"/>
        <com.github.mikephil.charting.charts.LineChart
                android:id="@+id/ourLineChart"
                android:layout_marginTop="20dp"
                android:layout_marginRight="10dp"
                android:layout_marginLeft="10dp"
                android:layout_width="match_parent"
                android:layout_height="match_parent"/>
    </LinearLayout>
</LinearLayout>
```

### GitHub code and sample Apk
The GitHub code for this project is found [here](https://github.com/munubi254/sqliteMPAndroid). You can also access the APK file for this project [here](https://drive.google.com/file/d/1PilUpi50eKvqane86KKHEwGPOvJATZ-Z/view?usp=sharing).

### Conclusion
We looked at setting up the MPAndroid chart for our project, creating the model & database handler class, populating the charts, and creating the UI. I hope you got some insights to use for your next project.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
