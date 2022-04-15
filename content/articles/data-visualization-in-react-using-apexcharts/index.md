---
layout: engineering-education
status: publish
published: true
url: /data-visualization-in-react-using-apexcharts/
title: Data Visualization in React JS using Apex Charts
description: This article will cover how to install Apexcharts in your React application. It will also cover how to use it to visualize data from an API endpoint and the types of charts that are available in this library.
author: stephanie-opala
date: 2022-04-15T00:00:00-13:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-visualization-in-react-using-apexcharts/hero.jpg 
    alt: Data visualization in React JS using Apex Charts Hero Image
---
[ApexCharts.js](https://apexcharts.com/docs/react-charts/#) is a library that is used to visualize data. It provides features such as annotations, responsiveness, and animations that make your charts interactive. It can be used with other frameworks such as Vue and Angular.
<!--more-->
This article will cover how to install it in your React application, use it to visualize data from an API endpoint, and the types of charts that are available in this library.

### Table of contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Creating the React ApexCharts component](#creating-the-react-apexcharts-component)
- [Creating fake REST API using JSON server](#creating-fake-rest-api-using-json-server)
- [Fetching data](#fetching-data)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you will need to have:
- Basic knowledge of React JS.

### Getting started
In the terminal, run the following command to create a React application using Create React App.
```bash
npx create-react-app charts-app
```

Once the process is done, run the following command to get into the charts-app folder.
```bash
cd charts-app
```

Next, install the ApexCharts.js library using the following command in your terminal.
```bash
npm install react-apexcharts apexcharts
```

In this article, we will use a JSON server to create a fake REST API that we will consume in our application. However, if you have an existing API endpoint, this won't be necessary and you can skip to the next step. 

For the readers who want to create a dummy REST API, install the `json-server` library using the following command in your terminal. If you already have the `json-server` package installed, skip this step as well.

```bash
npm install -g json-server
```

This will install the JSON server globally on our computer.

Start the React application using the following command.
```bash
npm start
```

### Creating the React ApexCharts component
In the `src` folder, create a `components` folder. Inside the `components` folder, create a file `charts.js`, that will contain the component.

![folder structure](/engineering-education/data-visualization-in-react-using-apexcharts/folder-structure.png)

Next, create a functional component `MyCharts` as shown below in charts.js.

```javascript
import React from 'react';
import Chart from "react-apexcharts";

const MyCharts = () => {
  const series = [ //data on the y-axis
    {
      name: "Temperature in Celsius",
      data: []
    }
  ];
  const options = { //data on the x-axis
    chart: { id: 'bar-chart'},
    xaxis: {
      categories: []
    }
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="450"
      />
    </div>
  )
}

export default MyCharts;
```

On the second line of our file, we are importing `Chart` from `react-apexcharts`. We then declare two variables, `series` and `options`. We will then set the `series` and `options` props in the `<Chart />` component to these variables. `<Chart />` component accepts the following props:

- `options`: This is a prop type of object. All the optional chart configurations are passed here. In the `options` variable, the `chart` key has a value of an object `{ id: 'bar-chart'}`, which is the id of our chart. The key `xaxis` has a value of `categories`, which is the label that will be on the x-axis.

- `series`: This is a prop type of an array. It contains the data that we want to display on the y-axis.

- `type`: This is a prop type of string. It defines the type of chart that we want to display. In our case, a `bar` chart. There are other types such as `line` and `donut`.

- `width`: This is a prop type of string or number. It defines the width of the chart.

- `height`: This is a prop type of string or number. It defines the height of the chart.

### Creating fake REST API using JSON server
This section is for the readers using a JSON server to create the fake REST API. If you have an existing API endpoint, you can skip to the next section.
Create a `data` folder at the root of your project. Inside this folder, create a `db.json` file which will contain the following data.

```javascript
{
  "temperature": [
    {
      "id": 1,
      "date": "03/01/2022",
      "average_temp": 15
    },
    {
      "id": 2,
      "date": "03/02/2022",
      "average_temp": 27
    },
    {
      "id": 3,
      "date": "03/03/2022",
      "average_temp": 18
    },
    {
      "id": 4,
      "date": "03/04/2022",
      "average_temp": 20
    },
    {
      "id": 5,
      "date": "03/05/2022",
      "average_temp": 23
    },
    {
      "id": 6,
      "date": "03/06/2022",
      "average_temp": 17
    },
    {
      "id": 7,
      "date": "03/07/2022",
      "average_temp": 15
    }
  ]
}
```

This file contains dummy data about the average temperature (in degrees Celsius) in Nairobi City between 1st March 2022 and 7th March 2022.

Open another terminal and run the following command to start the server.
```bash
json-server --watch data/db.json --port 8000
```

The command above starts our JSON server on port 8000. We specify a port number because when you run the JSON server, it will try to run on port 3000, but we are already using this port to run our React application. 

Thus, we use port 8000. On the terminal, you will see this URL, `http://localhost:8000/temperature`. This will be the API endpoint that we will use to fetch the data in our application.

### Fetching data
In `charts.js`, we will use the `useEffect` hook to fetch data that will be displayed in the chart.

```javascript
import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";

const MyCharts = () => {
  const [averageTemp, setAverageTemp] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const getData = async () => {
    const url = 'http://localhost:8000/temperature';
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setAverageTemp(data?.map((item) => item.average_temp));
      setDate(data?.map((item) => item.date));
    } catch (error) {
        console.log(error);
    }
  };
    getData();
  }, []);

 const series = [ //data on the y-axis
    {
      name: "Temperature in Celsius",
      data: averageTemp
    }
  ];
  const options = { //data on the x-axis
  chart: { id: 'bar-chart'},
  xaxis: {
    categories: date
  }
};

```

In the code snippet above, `useEffect` fetches the data from the API endpoint when the component renders the first time. We then assign an API endpoint to the `url` variable. In our example, the endpoint is `http://localhost:8000/temperature`. This is because, we are using a fake REST API from the JSON server, but it can be replaced with any other real API endpoint.

Once the API is called, the response is converted into JSON and stored in a variable `data`. To get the values for our x-axis and y-axis, we map through `data` and return an array of `average_temp` values. We then store this array in the `averageTemp` state using `setAverageTemp` function.

We also map through `data` and return the `date` values. It is then stored in state, `date` using the `setDate` function. After fetching data using `useEffect`, `series[0].data` is assigned the `averageTemp` array and `options.xaxis.categories` is assigned `date` array.

ApexCharts.js has various charts as mentioned above. Therefore, if you would like to change the type of chart, you can pass a different chart type to the type props. In the example below, the second chart component takes in a type of `line`.

```javascript
return (
  <div>
    <Chart
      options={options}
      series={series}
      type="bar"
      width="450"
    />
    <Chart
      options={options}
      series={series}
      type="line"
      width="450"
    />
  </div>
)
```

Finally, import the `MyCharts` component into App.js. If you run the project on `localhost:3000`, below is an image of what will be on the browser.

```javascript
import MyCharts from './components/charts';

function App() {
  return (
    <div className="App">
      <MyCharts />
    </div>
  );
};

export default App;
```

![charts](/engineering-education/data-visualization-in-react-using-apexcharts/charts.png)

The first chart is a bar chart, the second chart is a line graph with data from our API endpoint.

### Conclusion
In this article, we have installed the ApexCharts.js library in our React application. We created a fake REST API using a JSON server, fetched data from the API endpoint, and displayed it in a bar chart and line graph. 

If you would like to explore more charts in this library and other features such as animating charts, check out the link in this [documentation](https://apexcharts.com/).

Happy coding.

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
