---
layout: engineering-education
status: publish
published: true
url: /data-representation-with-react-and-ant-design/
title: Data Representation With React and Ant Design
description: In this tutorial, we will take you on a journey of data representation using React and Antd.
author: kuteyi-victor-toluwase
date: 2022-01-25T00:00:00-10:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-representation-with-react-and-ant-design/hero.jpg
    alt: data representation react ant image
---
Data representation! As old as time. According to home.adelphi.edu, data is the symbol that represents people, events, things, and ideas.
<!--more-->
Data representation is the form data is stored, processed, and expressed. We express data using charts, graphs, points, all dependent on the analysis method.

In this tutorial, we will take you on a journey of data representation using [React](https://reactjs.org) and [Antd](https://ant.design).

### Table of content
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Aim](#aim)
- [Getting started](#getting-started)
  - [Node](#node)
  - [Yarn](#yarn)
  - [Installing the node modules](#installing-the-node-modules)
  - [Integrating antd](#integrating-antd)
  - [Data representation using basic line](#data-representation-using-basic-line)
  - [Data representation using step line](#data-representation-using-step-line)
- [Conclusion](#conclusion)

### Prerequisites
You are required to be familiar with the following:
- JavaScript.
- React library.
- Node.js.
- HTML, CSS.

### Aim
Data representation has no shortage of fun; we are going to experience this together! At the end of the article, you should be able to:
- Integrate Antd into a React project.
- Visualize data with basic line graphs using Antd.
- Build step line data representation using Antd.

### Getting started
To begin any React project, we need to install `node.js` so we can use the Node package manager to install the React package.

Yarn (yet another resource negotiator) is also a program like npm. Developed by Facebook, it is another package manager for JavaScript.

We'll show you how to download and install Node and Yarn.

#### Node
[Here](https://nodejs.org/en/) is the download link to Node.js executable. Install the executable file for your operating system.

#### Yarn
If you have Node already installed, you can install `Yarn` using:

```bash
npm install --global yarn
```

OR [By clicking this link](https://classic.yarnpkg.com/latest.msi), then we can move to the next stage of installing the Node modules.

#### Installing the node modules
Installation of the Node modules is the most important part of this project. The Node modules contain the necessary package required to build our React project.

To do this, we'll follow the steps below:
- Create a base folder.
- Within the base folder, we type in the following command in our terminal:

```bash
npx create-react-app my-apps
```

The command above will create a folder named `my-apps` and install the necessary dependencies into that folder.

In your terminal, type the commands below one after the other:

```bash
cd my-apps

npm start
```

The `cd` command changes the current working directory to `my-apps` and, `npm start` initializes the React script.

On implementation of the commands above, our React app should be as shown below:

![react-app](/engineering-education/data-representation-with-react-and-ant-design/react-app.png)

#### Integrating antd
After installing the Node modules, type in the command in your terminal;

```bash
npm install
```

Running command above installs all the missing node packages; it can take some time.

The command `npm install -target file-` installs specific node packages. Below are lists of essential Antd packages needed and how to install them:

- Antd:

```bash
npm install antd
```

- Ant design chart library. It is an essential piece in the development of charts for our analysis:

```bash
npm install @ant-design/charts
```

Antd charts rely on Antd icons and lodash. We'll need to install both packages to our app as shown:

```bash
npm install lodash
npm install @ant-design/icons
```

#### Data representation using basic line
Inside the `src` folder, create a sub-folder named `charts`. It contains our Basic line and Step line javascript files.

To create a basic line chart, we need to initialize a React component to hold our data set.

The React component contains `react, react-dom and line chart`. A line chart is part of the ant design chart library.

**Example:**

```javascript
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/charts";

const DemoLine = () => {
  <></>;
};

export default DemoLine;
```

We did not make use of a large data set. Insert the data set below:

```javascript
const data = [
  {
    Date: "2012-11",
    scales: 1201,
  },
  {
    Date: "2012-12",
    scales: 1065,
  },
  {
    Date: "2013-01",
    scales: 1255,
  },
  {
    Date: "2013-02",
    scales: 1429,
  },
  {
    Date: "2013-03",
    scales: 1398,
  },
  {
    Date: "2013-04",
    scales: 1678,
  },
  {
    Date: "2013-05",
    scales: 1524,
  },
  {
    Date: "2013-06",
    scales: 1688,
  },
  {
    Date: "2013-07",
    scales: 1500,
  },
  {
    Date: "2013-08",
    scales: 1670,
  },
  {
    Date: "2013-09",
    scales: 1673,
  },
  {
    Date: "2013-10",
    scales: 1563,
  },
  {
    Date: "2013-11",
    scales: 1233,
  },
  {
    Date: "2013-12",
    scales: 1232,
  },
  {
    Date: "2014-01",
    scales: 1750,
  },
  {
    Date: "2014-02",
    scales: 1602,
  },
  {
    Date: "2014-03",
    scales: 1834,
  },
  {
    Date: "2014-04",
    scales: 1722,
  },
  {
    Date: "2014-05",
    scales: 1430,
  },
  {
    Date: "2014-06",
    scales: 1280,
  },
  {
    Date: "2014-07",
    scales: 1367,
  },
  {
    Date: "2014-08",
    scales: 1155,
  },
  {
    Date: "2014-09",
    scales: 1289,
  },
  {
    Date: "2014-10",
    scales: 1104,
  },
  {
    Date: "2014-11",
    scales: 1246,
  },
  {
    Date: "2014-12",
    scales: 1098,
  },
  {
    Date: "2015-01",
    scales: 1189,
  },
  {
    Date: "2015-02",
    scales: 1276,
  },
  {
    Date: "2015-03",
    scales: 1033,
  },
  {
    Date: "2015-11",
    scales: 934,
  },
  {
    Date: "2015-12",
    scales: 810,
  },
  {
    Date: "2016-01",
    scales: 782,
  },
  {
    Date: "2016-02",
    scales: 1089,
  },
  {
    Date: "2016-03",
    scales: 745,
  },
  {
    Date: "2016-04",
    scales: 680,
  },
  {
    Date: "2016-05",
    scales: 802,
  },
  {
    Date: "2016-06",
    scales: 697,
  },
  {
    Date: "2016-07",
    scales: 583,
  },
  {
    Date: "2016-08",
    scales: 456,
  },
  {
    Date: "2016-09",
    scales: 524,
  },
  {
    Date: "2016-10",
    scales: 398,
  },
  {
    Date: "2016-11",
    scales: 278,
  },
  {
    Date: "2016-12",
    scales: 195,
  },
  {
    Date: "2017-01",
    scales: 145,
  },
  {
    Date: "2017-02",
    scales: 207,
  },
];
const config = {
  data,
  padding: "auto",
  xField: "Date",
  yField: "scales",
  annotations: [
    // 低于中位数颜色变化
    {
      type: "regionFilter",
      start: ["min", "median"],
      end: ["max", "0"],
      color: "#F4664A",
    },
    {
      type: "text",
      position: ["min", "median"],
      content: "中位数",
      offsetY: -4,
      style: {
        textBaseline: "bottom",
      },
    },
    {
      type: "line",
      start: ["min", "median"],
      end: ["max", "median"],
      style: {
        stroke: "#F4664A",
        lineDash: [2, 2],
      },
    },
  ],
};

return <Line {...config} />;
```

We should have our Basic line chat as shown below:

![basic-line](/engineering-education/data-representation-with-react-and-ant-design/basic-line.png)

- `xField` takes in `key` values in our dataset to be our x-axis.
- `yField` takes in `key` values in our dataset to be our y-axis.
- The line that cuts through the chart divides it into the upper and lower median.
- The `regionFilter` (indicated by the red color) are the values in the lower median. In this case, the median is around 1200. Thus, the red color identifies values below 1200.
- The `min` takes the lowest valued number passed.
- The `max` takes the highest valued number passed.
- The `median` is the middle number in a list of numbers arranged in ascending order.

#### Data representation using step line
Step line charts show the changes that occur at irregular intervals.

To create our step line chart, we'll follow all the steps used in our basic line chart.

Your code should be as shown below:

```javascript
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/charts";

const DemoLine = () => {
  const data = [
    {
      year: "2000",
      number: 6,
    },
    {
      year: "2002",
      number: 4,
    },
    {
      year: "2004",
      number: 2,
    },
    {
      year: "2006",
      number: 8,
    },
    {
      year: "2008",
      number: 5.6,
    },
    {
      year: "2010",
      number: 7,
    },
    {
      year: "2012",
      number: 9,
    },
    {
      year: "2014",
      number: 9,
    },
    {
      year: "2016",
      number: 11,
    },
    {
      year: "2018",
      number: 8.9,
    },
  ];
  const config = {
    data,
    xField: "year",
    yField: "number",
    stepType: "vh",
  };
  return <Line {...config} />;
};

export default DemoLine;
```

After implementing the code above, we should have our Step line chart as shown below:

![step-line](/engineering-education/data-representation-with-react-and-ant-design/step-line.png)

### Conclusion
At this point, we've sheen how to represent data with React and Antd. [Here](https://github.com/Eze4Manuel/section_test) is a link to the GitHub repo containing the entire code for this article.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
