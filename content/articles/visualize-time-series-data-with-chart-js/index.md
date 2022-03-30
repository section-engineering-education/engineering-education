Time series data is a set of measurements and observations taken over a while. Time-series data is found anywhere because time is a component of everything visible. It is used to examine and track changes throughout time. Visualizing data makes it easier for the user to understand information. In this tutorial, you'll learn how to visualize time series data using Chart.js and InfluxDB. InfluxDB is a database created with time-series data in mind.

You can efficiently show time-series data by combining the features of InfluxDB with the flexibility and power of Chart.js. This guide will show the reader how to utilize Chart.js for data visualization.

### Table of contents
[Time series data](#time-series-data)
[Visualizing Time Series Data with Chart.js and InfluxDB](#visualizing-time-series-data-with-chartjs-and-influxdb)
[Use Flux to query data from the InfluxDB cloud](#use-flux-to-query-data-from-the-influxdb-cloud)

### Prerequisites
To follow this guide, you need HTML, CSS, and JavaScript knowledge. We will use VS Code editor as our development environment.

### Time series data
Time is a crucial factor when recording data that evolves constantly. Time series data is a series of events gathered through repeated measurements. Such data enable people to understand the past and predict the future. You can find it in businesses, finance, economics, hospitals, weather stations and other scientific fields that tend to show patterns such as trends, seasonal fluctuations, irregular cycles and variability. 

Time series data is gathered from a real-world point of interest. A computer analyzes the input and generates a graphic and analytical output. The results of the data analysis provide us with more information about real-world situations. Data is collected yearly, quarterly, monthly, daily, or even hourly in time-series.

Let's consider going through some time series data examples to have a clear understanding:
- The stock market is a highly volatile, time-sensitive business. Therefore it's essential to monitor and record the time series data when there are transactions.
- Annual profit for a company.
In the healthcare industry, time-series data is used to monitor the heart rate of patients taking particular medications to ensure that their heart rate does not fluctuate too much at any given time.
- The weatherman uses time-series data to predict what the temperature will be during different weeks and months.
- Retail businesses use time-series data to analyze how the business is doing by tracking how their total sales are trending over time.

Time series data has four aspects of behaviour:
- Trend: The overall direction of the series.
- Seasonality: occurs when there is repeated behaviour in the data, which occurs at regular intervals.
- Cycles: arise when a series follows a non-seasonal up-and-down trend.
- Unexplained variation.

### Visualizing time series data with chart.js and InfluxDB

#### Chart.js overview
Chart.js is an open-source library that helps users easily visualize data using JavaScript. It visualizes your data by creating and presenting it in bar charts, pie charts, line charts, etc. Chart.js is similar to [Google Charts](https://developers.google.com/chart) and [D3](https://d3js.org/), which also is a data visualization library.

Chart.js is a prevalent library for visualizing data. Most developers like it because it is simple, flexible, lightweight, and reliable. It allows us to create clean, elegant and responsive charts using the HTML5 canvas element for effective communication.

#### Set up a project with chart.js
There are several methods to get started with chart.js, as detailed [in this guide](https://www.chartjs.org/docs/latest/getting-started/installation.html). In our case, we will use a CDN. To get started, open the VS Code and create a folder that will hold the project files. Inside the folder, create files `index.html`, `script.js`, and `style.css`.

In the `index.html` file, add the basic `Html` tags. Include the `style.css` and `script.js` sections in the `head` section. Then copy and paste the most recent version of the CDN library inside the `script` tags as shown below:

Index.html file
```Html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
    <title>Visualizing Time Series Data with Chart.js</title>
</head>
<body>
    <h1>Chart.js</h1>
    <canvas id="charts" style="width:100%;max-width:700px"></canvas>

    <script src="script.js"></script>
    
</body>
</html>
```

As mentioned earlier, there are various types of charts in chart.js. We'll use line and bar charts to show how to present data in charts using time series data in this tutorial. You'll have the expertise and confidence to work with various charts after grasping the concept.

To come up with time-series data, we will use a dataset of daily petro consumed per litre at the pump.

```JavaScript
var days = ["Mon", "Tue", "Wed", "Thur","Fri", "Sat", "Sun"];
var litres = [150, 90, 95, 130, 85, 180, 85];
```

##### Chart.js line chart
Set the chart type to `line` to generate a line chart. To implement this, here is our files `script.js` and `style.css` which are included in the `index.html` file.
Script.js file:

```JavaScript
charts = document.getElementById("charts");//html canvas
//values of x and y axes
var days = ["Mon", "Tue", "Wed", "Thur","Fri", "Sat", "Sun"];//x axes
var litres = [150, 90, 95, 130, 85, 180, 85];//y axes
//create a line chart
new Chart(charts, {
    type: 'line', //This is a line chart
    data: {
    labels: days, //x-axes data 
    datasets: [{
        label:"Line Chart",
    data: litres, //y-axes data 
    borderColor: 'black',
    fill: false,
    }]
    },
   });

```

Style.css file:

```CSS
body{
    background-color:black;
   }
   h1{
    color: black;
    margin-left:4px;
   }
   #charts{
    margin:auto;
    background-color: white;
   }
```

Output:
![Line Chart](/engineering-education/visualize-time-series-data-with-chart-js/line-chart.jpg)

##### Chart.js bar chart
Modify the chart type to `bar`, just like you did with the line chart. You don't need to select the fill option when working with bar charts because they inherit the background color by default. Implement it using this JavaScript and CSS codes: 
Script.js:

```JavaScript
charts = document.getElementById("charts");//html canvas
//values of x and y axes
var days = ["Mon", "Tue", "Wed", "Thur","Fri", "Sat", "Sun"];//x axes
var litres = [150, 90, 95, 130, 85, 180, 85];//y axes
//create a line chart
new Chart(charts, {
    type: 'bar', //Declare bar chart
    data: {
    labels: days, //x-axes data 
    datasets: [{
        label:"Bar Chart",
    data: litres, //y-axes data 
    backgroundColor: 'black',//bar charts color
    }]
    },
    options:{
        legend: {display:false},
    }
   });
```

Style.css file:
```CSS
body{
    background-color:white;
   }
   h1{
    color: black;
    margin-left:4px;
   }
   #charts{
    margin:auto;
    background-color: cyan;
   }
```

Output:
![Bar Chart](/engineering-education/visualize-time-series-data-with-chart-js/bar-chart.jpg)

#### InfluxDB overview
[InfluxDB](https://www.influxdata.com/) is an open-source time-series database written in [Go](https://go.dev/) and developed by Influx data. It is designed to store and retrieve time series data quickly. With the right platform to collect, store and analyze data, obtaining valuable data and turning it into action can be seamless.

InfluxDB is a data platform that empowers developers to build transformative monitoring and analytics applications to handle huge volumes of time series data. It has developer-integrated tools that make it easy to get started quickly. InfluxDB is a simple database that you can use to store time-series data to make nice-looking graphs. To learn InfluxDB go to [InfluxDB university](https://influxdbu.com/). 

#### Set up InfluxDB
To get started with InfluxDB, head over to their [official website](https://portal.influxdata.com/downloads/) and download it. To learn more about InfluxDB, go through [this article](https://www.section.io/engineering-education/introduction-to-influxdb/). It is essential to have an instance of InstanceDB up and running. Also, sign up for a free InfluxDB cloud account.

![InfluxDB](/engineering-education/visualize-time-series-data-with-chart-js/influxdb.jpg)

We will install Influx DB version 2.1 then choose the platform it's being installed. We chose Windows binaries. Click the URL, and the download will start by default. Then unzip the file to your desired location. In our case, it's the Programs Files folder.

![Extract file](/engineering-education/visualize-time-series-data-with-chart-js/extract-influxdb.jpg)

Start the InfluxDB server by navigating to the command prompt and running commands. Then change the directory to the location you choose. In our case it's `cd C:\Program Files\InfluxData\Influxdb\influxdb2-2.1.1-windows-amd64`.

![Command Prompt](/engineering-education/visualize-time-series-data-with-chart-js/cd.jpg)

To start InfluxDB, run the command `influxd.exe`, and finally, you should see the below output:

![Start InfluxDB](/engineering-education/visualize-time-series-data-with-chart-js/start-influxdb.jpg)

We will need to create an account in [InfluxDB Cloud](https://cloud2.influxdata.com/signup). Then install the Influxdb client library.

![InfluxDB Cloud](/engineering-education/visualize-time-series-data-with-chart-js/influxdb-cloud.jpg)

We will install the [Influxdb Javascript client library](https://www.influxdata.com/blog/getting-started-with-node-influx/), which is a Node.js module. We will install it in the application folder.
`npm init -y influx-node-app`
`npm install @influxdata/influxdb-client`

### Use Flux to query data from the InfluxDB cloud
Querying is achieved with [Flux](https://docs.influxdata.com/influxdb/cloud/query-data/get-started/), a query language. Flux is a data scripting language that is functional, extensible, and composable for time series data. It is designed to query, analyze, act on data, and visualize your results. It has support for querying from various sources, including CSV, HTTP, SQL databases, etc.

Flux creates some composable functions for you to use as building blocks. The best way to think of the building blocks is the steps of a data pipeline. A Flux query retrieves data from the data source, filters data based on time or column values, processes results, and returns results. It can read data from anywhere and do anything it needs to do with that data.

In InfluxDB, we have buckets that act as databases. To create a bucket, navigate on the left side and select `Load Data` as shown:

![Load Data](/engineering-education/visualize-time-series-data-with-chart-js/load-data.jpg)

Then click the bucket button, create a bucket as shown, and you can easily populate it with data and submit the query. 

![Bucket](/engineering-education/visualize-time-series-data-with-chart-js/bucket.jpg)

Once you submit the query data, [time-series data visialization](https://www.influxdata.com/how-to-visualize-time-series-data/) occurs.

![Visualize data](/engineering-education/visualize-time-series-data-with-chart-js/visualize-data.png)

### Conclusion
Chart.js is a graphing library with various possibilities. You can look at [Chart.js documentation](https://www.chartjs.org/docs/latest/) to learn more about it. InfluxDB is a time-series database to store, analyze, and visualize data using bar charts and scatter charts.

To summarize this tutorial, you have learned:
1. What is time-series data.
2. How to visualize time series data with Chart.js and InfluxDB.
- Chart.js overview
- Worked on a Chart.js project to demonstrate the visualization of time series data with the help of line and bar charts.
- InfluxDB overview
- Set up InfluxDB account
3. Using Flux to query data from InfluxDB cloud.

Happy learning!
