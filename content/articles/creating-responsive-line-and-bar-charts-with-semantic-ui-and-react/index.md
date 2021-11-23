
Creating Responsive Line and Bar charts with React and Semantic-ui

### Introduction
A graphic illustration is a basic form of content presentation in front-end web development. For example, line and bar charts may have various applications to show statistics of user engagements, user growth, ratings, etc. Creating the perfect responsive charts for your company or personal website will be made simple and easy to implement. 

This tutorial will walk you through the various steps and dependencies required to build a responsive chart project. We will use React.js, semantic-ui, and CSS to generate line and bar charts with a set of coordinates and datasets. 

Think of it as plotting a graph with a set of variables in mathematics but in this case, React.js.

### Key Takeaways
It is expected that after this article, the reader will be equipped with the knowledge and necessary skill to understand and perform and the following:
- Getting started with React functional components
- Installing and adding the semantic-UI dependency to your web project
- Creating reusable components with React.js
- Generating Line and Bar charts with react-chartjs-2
- Styling the components with CSS and semantic-ui

### Prerequisite
This tutorial requires intermediate knowledge of React.js, CSS, and any modern web styling libraries similar to Semantic-UI. So, for absolute beginners, take a moment and enroll in a crash course.

### Getting started with React functional components
React functional component is a recent enhancement to React.js, the former being a class-based component. A functional component is a react function that accepts a `props` and returns a JSX (JavaScript syntax extension). For this tutorial, we will adopt react functional components for our application.

To get started, we need to create the `react-app`. Creating the react-app is done through the command terminal. So, click open the command terminal and run the command below.

```bash
    npm create-react-app chart-app
```

Or for yarn users

```bash
    yarn create-react-app chart-app
```

If you correctly implemented the command above, your new react application should be set up and ready for development. This process takes a few minutes, so ensure the operation is completed before proceeding to the next step.

### Chart building overview
The task of creating responsive line and bar charts with React.js alongside other dependencies will be subdivided into the following steps:
- Setting up the coordinate dataset
- Installing the required dependencies (react-chartjs-2 and semantic-UI.)
- Creating and setting up the chart component (Chart.js)
- Styling and viewing our application
  Now let us begin with our first step, shall we?

#### Setting up the coordinate dataset (Data.js):
The coordinate dataset is similar to the table of values when plotting a graph in algebra. It provides a set of numbers and labels for the chart components, which will be passed down as `props` and displayed. 

To set up the coordinate dataset, we simply navigate to the `src` folder, then create a `Data.js` file. In the `Data.js`, we implement the code snippet below:

```JavaScript
let demoChart1 = {
  data1: (canvas) => {
    let vas = canvas.getContext("2d");
    let linearstroke = vas.createLinearGradient(0, 230, 0, 50);
    linearstroke.addColorStop(1, "rgba(7, 105, 204, 0.2)");
    linearstroke.addColorStop(0.4, "rgba(17, 135, 253, 0)");
    linearstroke.addColorStop(0, "rgba(29,140,248,0)");

    return {
      labels: [ "MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN",],
      datasets: [
        {
          label: "My cordinates",
          backgroundColor: linearstroke,
          borderWidth: 2,
          borderColor: "#085aa1",
          pointBackgroundColor: "#085aa1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointBorderWidth: 15,
          pointHoverRadius: 4,
          pointRadius: 3,
          data: [70, 90, 105, 110, 85, 105, 115],
        },
      ],
    };
  },
  options: FirstChartOption,
};
module.exports = {
  demoChart1
};
```

From the code snippet above, we worked with the concept of the canvas, which, as we know, is used to render graphical elements in React.js.

- We created a two-dimensional (2d) linear gradient called `linearstroke`, which we will use to generate the line and bar chart with the dataset above.
- We also added some labels displayed at the bottom of the chart to provide names to the corresponding data, i.e. (“MON” representing 70, etc.)
- Finally, we added border-width, border-color, background-color, and other styles properties to the dataset. Those default properties should be provided to make the chart look good and presentable.
 
To conclude the coordinate setup, we need to create the option we passed to the `demoChart` above. The option will provide the x and y-axis, responsiveness, scales, spacings, etc. to do that, still, in the `Data.js` file, ship the code snippet above:

```JavaScript
let FirstChartOption = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};
```

Note: to fix a possible error that may occur, place the `FirstChartOption` we just created above the `DemoChart`. Because we are attempting to use a set of variables before it is declared, and React.js frowns at it.

We added barpercentage, paddings, fontColors, etc., to the chart in our options. As stated earlier, those are default properties provided to the chart component. 

Take a look at the official documentation of react-chartjs-2 for further clarity.

#### Installing the required dependencies
As you observed, we skipped installing the dependencies to set up our coordinate dataset. Whichever way you may choose to go about the project is okay. We are going to install the following dependencies to our application.

- Semantic-ui-react and
- React-chartjs-2
  To install the above dependencies, open the `package.json` file and add the dependencies below:

```JSON
"dependencies": {
    "react-chartjs-2": "2.11.1",
    "semantic-ui-css": "^2.4.1",
    "semantic-ui-react": "^2.0.3"
  },
```

Once that is done, open up the `command terminal` and run the command below:

```bash
npm install
```

Or for yarn users

```bash
yarn add
```

The command above should install the listed dependencies to our application—time to utilize them in the next step.

#### Setting up the Chart component (Chart.js):
The chart component will be set up using the react-chartjs-2 dependency we installed above and the coordinate dataset we created earlier. A quick overview of react-chartjs-2, before the development of react-chartjs-2, creating graphical illustrations such as line and bar chart was burdensome. Therefore, React-chartjs-2 provides line, bar, pie charts, etc., for importation and use. 

In this tutorial, we will use the line and bar charts. To create and set up our chart component, in our `App.js` file, clear the default boilerplate codes and replace them with the code snippet below:

```JavaScript
import React from "react";
import { Line, Bar } from "react-chartjs-2";
// semantic-ui components
import { Card} from "semantic-ui-react";
import {demoChart1} from "./Data.js";

function Chart() {
  const [demoChartData, setdemoChartData] = React.useState("data");

  return (
    <>
      <div className="container">
            <Card className="card-chart">
              <Card.Header>
                    <h5 className="card-details">Total Visits</h5>
                    <h2>Guests</h2>
              </Card.Header>
              <Card.Content>
                <div className="chart-zone">
                  <Bar
                    data={demoChart1[demoChartData]}
                    options={demoChart1.options}
                  />
                </div>
              </Card.Content>
            </Card>
            <Card className="card-chart">
                <h5 className="card-details">Total Inmates</h5>
              <Card.Content>
                <div className="chart-zone">
                  <Line
                    data={demoChart1.data}
                    options={demoChart1.options}
                  />
                </div>
              </Card.Content>
            </Card>
      </div>
    </>
  );
}

export default Chart;
```

Let us discuss what is happening with the code snippet we just shipped.
First, we imported the dataset we created in the first step. Then, we imported the `Line,` and `Bar` (Line for line-chart and Bar for bar-chart) components from the react-chartjs-2 library will be used to utilize the dataset and subsequently generate our charts.
- Secondly, we imported the Card component from the semantic-UI dependency we also installed. The Card component will act as a container from the charts and add additional styles and responsiveness to the charts.
  The Line and Bar charts accept two `props`, `data` and `options`. For the data, we pass down the `demoChart1.data` and then repeat the same for the option, replacing the data with options.
- Finally, we exported the Chart component for viewing on the browser window.

#### Styling and viewing our application
At this point, our application is ready for Styling and viewing. Since most of the elements we used are from the semantic-UI design library, default styles have already been added to the charts and texts, so we will add a few paddings and margins to keep things simple. 

Feel free to take it way beyond the basic styles that we will add. Adding styles to the application is easy. Open the `App.css` file in the `src` folder, clear all the default styles, and replace them with the CSS snippet below.

```CSS
.container {
    padding-left: 30px;
    margin: 0;
    height: 100%;
    width: 100%;
  }

.chart-zone {
  padding: 10px 0 25px;
  height: auto;
  width: 100%;
}

.card-details {
  text-transform: capitalize;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
}
```

We have successfully added a few styles to our application, i.e., font-weight, color, adjusted the font size, added width and height of 100%, and finally, some margin and padding.

That being done, it is time to view our application on the browser window. Open up the command terminal on your text editor, be sure to be inside the `chart-app` root directory, then run the command to start the development server shown below:

```bash
npm start
```

Or for yarn users

```bash
yarn start
```

Once the development server is up and running, a new tab will be opened on your default browser with beautiful-looking charts displayed.

### Conclusion
This tutorial covered various aspects of creating responsive lines and bar charts with semantic-ui and React.js. The tutorial is simple to ease understanding and clarity. Feel free to use the concepts discussed in this article in your future applications.

### References:

- https://react.semantic-ui.com/elements/
- https://www.npmjs.com/package/react-chartjs-2

