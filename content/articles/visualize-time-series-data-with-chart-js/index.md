Time-series data is a set of measurements and observations taken over time. Time-series data is found everywhere because time is a component of everything visible. 

Time series are used to examine and track changes throughout time. Visualizing data makes it easier for the user to understand the information. 

This tutorial will teach the reader to visualize time series data using [Chart.js](https://www.chartjs.org/) and [InfluxDB.](https://www.influxdata.com/) 

InfluxDB is a database created with time-series data in mind. You can efficiently show time-series data by combining the features of InfluxDB with the flexibility and power of Chart.js. 

### Table of contents
- [Prerequisistes](#prerequisites)
- [Time series data](#time-series-data)
- [Visualizing Time Series Data with Chart.js and InfluxDB](#visualizing-time-series-data-with-chartjs-and-influxdb)
- [Use Flux to query data from the InfluxDB cloud](#use-flux-to-query-data-from-the-influxdb-cloud)
- [Conclusion](#conclusion)

### Prerequisites
It would be best to have HTML, CSS, and JavaScript knowledge to follow this guide. We will use VS Code editor as our development environment.

### Time Series Data
Time is a crucial factor when recording data that evolves constantly. Such data enable people to understand the past and predict the future. 

You can find it in businesses, finance, economics, hospitals, weather stations and other scientific fields that tend to show patterns such as trends, seasonal fluctuations, irregular cycles and variability. 

Time series data is gathered from the real world and analyzed by a computer to generate a graphic and analytical output. 

The results of the data analysis provide us with more information about real-world situations. Data is collected yearly, quarterly, monthly, daily, or even hourly.

#### Examples of Time-series Data
- The stock market. This market is a highly volatile, time-sensitive business. Therefore it is essential to monitor and record the time series data when there are transactions.
- In the healthcare industry. Time-series data is used to monitor the heart rate of patients taking particular medications to ensure that their heart rate does not fluctuate too much at any given time.
- The weatherman uses time-series data to predict what the temperature will be during different weeks and months.
- Retail businesses use time-series data to analyze how the business is doing by tracking how their total sales are trending over time.

#### Aspects of Time-series Data
- Trend: The overall direction of the series.
- Seasonality: Occurs when repeated behaviour in the data occurs at regular intervals.
- Cycles: Arise when a series follows a non-seasonal up-and-down trend.
- Unexplained variation.

### Visualizing time series data with Chart.js and InfluxDB
#### Chart.js overview
[Chart.js](https://www.chartjs.org/) is an open-source library that helps users easily visualize data using JavaScript. Chart.js is similar to [Google Charts](https://developers.google.com/chart) and [D3](https://d3js.org/).

Most developers like Chart.js because it is simple, flexible, lightweight, and reliable. In addition, it allows us to create clean, elegant and responsive charts using the HTML5 canvas element for effective communication.

#### Setting up a Project with Chart.js
There are several methods to get started with chart.js, as detailed [in this guide](https://www.chartjs.org/docs/latest/getting-started/installation.html). In our case, we will use a CDN. 

To get started, open the VS Code and create a folder that will hold the project files. Then, create `index.html`, `script.js`, and `style.css` files inside the folder.

Add the following code snippets to the `index.html` file:

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

As mentioned earlier, there are various types of charts in chart.js. In this tutorial, we will use line and bar charts. After grasping the concept, you will have the expertise and confidence to work with various charts.

To develop time-series data, we will use a dataset of the petrol consumed by a pump per day in litres.

```JavaScript
var days = ["Mon", "Tue", "Wed", "Thur","Fri", "Sat", "Sun"];
var litres = [150, 90, 95, 130, 85, 180, 85];
```

##### Chart.js line chart
Set the chart type to `line` to generate a line chart. We need to include our `script.js` and `style.css`  files in the  `index.html` file.

Add the following snippets in the `script.js` file:

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

Add the following code snippets to style the webpage in the `stytle.css`  file.

```css
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
In the same way, we specified the chart type above; you need to modify the chart type to `bar`. You do not need to select the fill option when working with bar charts because they inherit the background color by default. 

Then proceed to add the snippets below to the JavaScript file:

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
[InfluxDB](https://www.influxdata.com/) is an open-source time-series database written in [Go](https://go.dev/) and developed by Influx data. It is designed to store and retrieve time series data quickly. Moreover, it works seamlessly with the right platform to collect, store and analyze data, thereby obtaining valuable data and turning it into action.

#### Setting  up InfluxDB
To get started with InfluxDB, head over to their [official website](https://portal.influxdata.com/downloads/) and download it. It is essential to have an instance of InstanceDB up and running. In addition, sign up for a free InfluxDB cloud account.

![InfluxDB](/engineering-education/visualize-time-series-data-with-chart-js/influxdb.jpg)

We will install Influx DB version 2.1 and then choose Windows as the platform. Next, click the URL, and the download will start by default. Then, unzip the file to your desired location. In our case, it is the `Programs Files` folder.

![Extract file](/engineering-education/visualize-time-series-data-with-chart-js/extract-influxdb.jpg)

Start the InfluxDB server by navigating to the command prompt and running the following commands. 

`cd C:\Program Files\InfluxData\Influxdb\influxdb2-2.1.1-windows-amd64`

![Command Prompt](/engineering-education/visualize-time-series-data-with-chart-js/cd.jpg)

To start InfluxDB, run the command `influxd.exe`, and finally, you should see the below output:

![Start InfluxDB](/engineering-education/visualize-time-series-data-with-chart-js/start-influxdb.jpg)

We will need to create an account in [InfluxDB Cloud](https://cloud2.influxdata.com/signup). Then install the Influxdb client library.

![InfluxDB Cloud](/engineering-education/visualize-time-series-data-with-chart-js/influxdb-cloud.jpg)

We will install the [Influxdb Javascript client library](https://www.influxdata.com/blog/getting-started-with-node-influx/), which is a Node.js module in the application folder.

```bash
npm init -y influx-node-app
npm install @influxdata/influxdb-client
```

### Use Flux to query Data from the InfluxDB Cloud
[Flux](https://docs.influxdata.com/influxdb/cloud/query-data/get-started/) is a functional, extensible, and composable data scripting language designed for time series data. It queries, analyzes and acts on data, then visualizes the results. It has support for querying from various sources, including CSV and SQL.

Flux creates some composable functions to use as building blocks. The best way to think of the building blocks is the steps of a data pipeline. A Flux query retrieves data from the data source, filters data based on time or column values, processes results, and returns results. It can read data from any source and perform required operations.

In InfluxDB, we have buckets that act as databases. To create a bucket, navigate on the left side and select `Load Data` as shown:

![Load Data](/engineering-education/visualize-time-series-data-with-chart-js/load-data.jpg)

Then click the bucket button, create a bucket as shown, and you can quickly populate it with data and submit a query. 

![Bucket](/engineering-education/visualize-time-series-data-with-chart-js/bucket.jpg)

Once you submit the query data, [time-series data visialization](https://www.influxdata.com/how-to-visualize-time-series-data/) occurs.

![Visualize data](/engineering-education/visualize-time-series-data-with-chart-js/visualize-data.png)

### Conclusion
Chart.js is a graphing library with various functionalities. You can look at [Chart.js documentation](https://www.chartjs.org/docs/latest/) to learn more about it. InfluxDB is a time-series database to store, analyze, and visualize data using bar charts and scatter charts.

In this tutorial, we learned about time-series data and how to analyse and visualize this type of data using Charts.js and InfluxDB. We built a working example to show how the process is done and used Flux to query data from an InfluxDB cloud.

Happy learning!
