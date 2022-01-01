Data representation! As old as time. For a clear understanding, we'll split it into two parts; data and represent.
According to home.adelphi.edu, data is a symbol that represents people, events, things and ideas. Data representation is the form data is stored, processed and expressed. We express data using charts, graphs, points, all dependent on the analysis method.

In this tutorial, we will take you on a journey of data representation using react and Antd. The reader is required to know the following:
- JavaScript.
- React library.
- Node.js.
- HTML, CSS.

It is necessary the reader has downloaded and installed node.js. With all this done, we can move to the next stage.
### Aim
Data representation has no shortage of fun and, we are going to experience this journey together! After this article, the reader should be able to:
- Integrate Antd into a react project.
- Visualisation of data with a basic line using Antd.
- Building Step line data representation using Antd.
### Getting started
To begin any react project, we need to install `node.js` to use the node package manager to install the react package. `Yarn` (yet another resource negotiator) is also a program like `npm`. Developed by Facebook,  it is another package manager for JavaScript. We'll show you how to download and install node and yarn below:
#### Node
- [Here](https://nodejs.org/en/) is the download link to Node.js executable. 
- Install the executable file for your operating system.
#### Yarn
- If you have node already installed, you can install yarn using 
```bash
npm install --global yarn
```
OR
- [By clicking this link](https://classic.yarnpkg.com/latest.msi)
Once done, we can move to the next stage of installing the node modules.
#### Installing the node modules
Installation of the node modules is the most important part of this project. The node modules contain the necessary package required to build our react project. To do this, we'll follow the steps below:
- Create a base folder.
- Within the base folder, we typed in the following command in our terminal
```bash
npx create-react-app my-apps
```
Note! this will create a folder called `my-apps` and install the necessary dependencies into that folder.
- In our terminal, we will type the commands below one after the other.
```bash
cd my-apps

npm start
```
`cd` changes the directory and, `npm start` initialises the react script. Since our desired directory is `my-apps`, the directory is changed to that folder. On implementation of the above, our react app should be as the below:

![react-app](engineering-education/data-representation-with-react-and-ant-design/react-app.png)

#### Integrating Antd
After installing the node modules, type in the command on our terminal;
```bash
npm install
````
Doing this will install all the missing node packages and, it can take some time. The command `npm install -target file-` installs specific node packages. Below are lists of essential Antd packages needed and how to install them:
- Antd.
```bash
npm install antd
```
- Ant design chart library. It is an essential piece in the development of charts for our analysis.
```bash
npm install @ant-design/charts
```
Antd charts rely on `Antd icons and lodash`. Thus, we'll need to install both packages to our app.
```
npm install lodash
npm install @ant-design/icons
```
After, we can go to the next step.

#### Data representation using Basic line
Within the src folder, we will create a sub-folder called charts. It will contain our basic line and step line javascript files. To create a basic line chart, we'll need to initialise a react component to hold our data set. The react component will contain `react, react-dom and line chart`. A line chart is part of the ant design chart library.
#### Example
```javascript
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/charts';

const DemoLine = () => {
 <>

 </>
};

export default DemoLine;
```
We are not making use of a large data set. Thus, we'll insert our data set as below:
```javascript
 const data = [
    {
 "Date": "2012-11",
 "scales": 1201
    },
    {
 "Date": "2012-12",
 "scales": 1065
    },
    {
 "Date": "2013-01",
 "scales": 1255
    },
    {
 "Date": "2013-02",
 "scales": 1429
    },
    {
 "Date": "2013-03",
 "scales": 1398
    },
    {
 "Date": "2013-04",
 "scales": 1678
    },
    {
 "Date": "2013-05",
 "scales": 1524
    },
    {
 "Date": "2013-06",
 "scales": 1688
    },
    {
 "Date": "2013-07",
 "scales": 1500
    },
    {
 "Date": "2013-08",
 "scales": 1670
    },
    {
 "Date": "2013-09",
 "scales": 1673
    },
    {
 "Date": "2013-10",
 "scales": 1563
    },
    {
 "Date": "2013-11",
 "scales": 1233
    },
    {
 "Date": "2013-12",
 "scales": 1232
    },
    {
 "Date": "2014-01",
 "scales": 1750
    },
    {
 "Date": "2014-02",
 "scales": 1602
    },
    {
 "Date": "2014-03",
 "scales": 1834
    },
    {
 "Date": "2014-04",
 "scales": 1722
    },
    {
 "Date": "2014-05",
 "scales": 1430
    },
    {
 "Date": "2014-06",
 "scales": 1280
    },
    {
 "Date": "2014-07",
 "scales": 1367
    },
    {
 "Date": "2014-08",
 "scales": 1155
    },
    {
 "Date": "2014-09",
 "scales": 1289
    },
    {
 "Date": "2014-10",
 "scales": 1104
    },
    {
 "Date": "2014-11",
 "scales": 1246
    },
    {
 "Date": "2014-12",
 "scales": 1098
    },
    {
 "Date": "2015-01",
 "scales": 1189
    },
    {
 "Date": "2015-02",
 "scales": 1276
    },
    {
 "Date": "2015-03",
 "scales": 1033
    },
    {
 "Date": "2015-11",
 "scales": 934
    },
    {
 "Date": "2015-12",
 "scales": 810
    },
    {
 "Date": "2016-01",
 "scales": 782
    },
    {
 "Date": "2016-02",
 "scales": 1089
    },
    {
 "Date": "2016-03",
 "scales": 745
    },
    {
 "Date": "2016-04",
 "scales": 680
    },
    {
 "Date": "2016-05",
 "scales": 802
    },
    {
 "Date": "2016-06",
 "scales": 697
    },
    {
 "Date": "2016-07",
 "scales": 583
    },
    {
 "Date": "2016-08",
 "scales": 456
    },
    {
 "Date": "2016-09",
 "scales": 524
    },
    {
 "Date": "2016-10",
 "scales": 398
    },
    {
 "Date": "2016-11",
 "scales": 278
    },
    {
 "Date": "2016-12",
 "scales": 195
    },
    {
 "Date": "2017-01",
 "scales": 145
    },
    {
 "Date": "2017-02",
 "scales": 207
    }
  ];
 const config = {
 data,
 padding: 'auto',
 xField: 'Date',
 yField: 'scales',
 annotations: [
 // 低于中位数颜色变化
      {
 type: 'regionFilter',
 start: ['min', 'median'],
 end: ['max', '0'],
 color: '#F4664A',
      },
      {
 type: 'text',
 position: ['min', 'median'],
 content: '中位数',
 offsetY: -4,
 style: {
 textBaseline: 'bottom',
        },
      },
      {
 type: 'line',
 start: ['min', 'median'],
 end: ['max', 'median'],
 style: {
 stroke: '#F4664A',
 lineDash: [2, 2],
        },
      },
    ],
  };

 return <Line {...config} />;
```
We should have our basic line chat as below:

![basic-line](engineering-education/data-representation-with-react-and-ant-design/basic-line.png)
- `xField` takes in key values in our dataset to be our x-axis.
- `yField` takes in key values in our dataset to be our y-axis.
#### Data representation using step Line
Step line charts show the changes that occur at irregular intervals. To create our step line chart, we'll follow all the steps used in our basic line chat. Thus, our code will be as below:
```javascript
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/charts';

const DemoLine = () => {
 const data = [
    {
 year: '2000',
 number: 6,
    },
    {
 year: '2002',
 number: 4,
    },
    {
 year: '2004',
 number: 2,
    },
    {
 year: '2006',
 number: 8,
    },
    {
 year: '2008',
 number: 5.6,
    },
    {
 year: '2010',
 number: 7,
    },
    {
 year: '2012',
 number: 9,
    },
    {
 year: '2014',
 number: 9,
    },
    {
 year: '2016',
 number: 11,
    },
    {
 year: '2018',
 number: 8.9,
    },
  ];
 const config = {
 data,
 xField: 'year',
 yField: 'number',
 stepType: 'vh',
  };
 return <Line {...config} />;
};

export default DemoLine;
```
On the implementation of the code above, we'll have our step line chart will be as below:

![step-line](engineering-education/data-representation-with-react-and-ant-design/step-line.png)

### Conclusion
At this point, we've shown the reader how to represent data with react and Antd. [Here](https://github.com/Eze4Manuel/section_test) is a link to the GitHub repo containing the entire code snippet.

Happy coding!
