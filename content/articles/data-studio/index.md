---
layout: engineering-education
status: publish
published: true
url: /data-studio/
title: Introduction to Data Studio
description: An Introduction to Data Studio - a free cloud based data visualization tool platform by Google to transform data sets to life.
author: rohan-reddy
date: 2020-08-03T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-studio/hero.jpg
    alt: data studio image
---
[Data Studio](https://datastudio.google.com/) is a free data visualization platform by Google. It allows you to bring different sets of data into one place and transform that data into useful reports. You can choose from a variety of graphics, charts, and tables to bring your data to life. This makes it easier to see the story behind the numbers, share your findings with stakeholders, and collaborate with others.

<!--more-->
Data Studio is cloud-based, so anyone you want can see your reports anytime. When building a report, you can choose a template or create a new one. Editing a report is easy; simply insert and drag charts, then edit the charts using data filters and formatting. You can also add design components such as text, shapes, and images to tell a compelling story and communicate your goals.

![img](/engineering-education/data-studio/overview.png)

Data studio can load data from a variety of sources such as [Google Analytics](https://analytics.google.com/analytics/web/), [Google Sheets](https://sheets.google.com), [MySQL](https://www.mysql.com/), [CSV files](https://en.wikipedia.org/wiki/Comma-separated_values), [Google Ads](https://en.wikipedia.org/wiki/Google_Ads) and more. Developers can even create custom data connections for their own platform. Once you've connected data to Data Studio, your reports will dynamically update if the data changes, which means you don't have to redo manually. Data Studio is easy, free and customizable to your business needs.

### How Data Studio works
To use Data Studio, you'll start with a *dataset* -- a system outside of Data Studio that contains the information on which you want to report. Your dataset should contain two types of information:
* **Dimensions**: Data categories, values may include names, descriptions, date information, or other characteristics of a category.
* **Metrics**: measure the things contained in dimensions. Metrics in your Data Studio reports are aggregated, for example,  sums, counts, or ratios.

Once you have a dataset, we need to set up a *Data Source* in Data Studio. A Data Source is Data Studio's representation of your underlying data. It lets you decide which data you would like to visualize and who can view it.

To set up a Data Source, you'll choose a *connector*. [Connectors](https://datastudio.google.com/u/0/datasources/create) are pipelines which connect original dataset to Data Source so that if there are any changes in the dataset, then they also reflect in the Data Source. We need to choose the connector that matches your type of Data Set and Authorize Data Studio to access that data.

The metrics and dimensions will appear in the data source so you can choose which data you'd like to visualize and how it should appear in Data Studio reports. The report is a blank canvas where you can create visualizations, and it *can* be multiple pages which help in organizing your reports in logical ways. You can choose from different types of charts available such as bar charts, time series, geo maps and more. When you add a chart to your report, it is automatically created from the data from your Data Source. You can tweak what data is shown and customize the chart's design.

![img](/engineering-education/data-studio/flow.png)

### Guide for Building a Report
Let's build a report based on some dummy data. First, log in with your Google account and go to [Data Studio](https://datastudio.google.com).
#### Connect Data to Data Studio.
For this article, we will use a dummy dataset made in Google Sheets [here](https://docs.google.com/spreadsheets/d/1sEC7zGBUG6X4TKc1pWuNyF7uufjQP5cBLQ0k5sLkags/edit?usp=sharing).

![img](/engineering-education/data-studio/create.png)

Choose from the many official and third party connections depending on your data set.

![img](/engineering-education/data-studio/connection.png)

We selected Google Sheets Connector. Choose which spreadsheet you want to use as Data Set.

![img](/engineering-education/data-studio/sheets.png)

After creating a Data Source, you can see the Dimensions and Metrics, and you can edit the data-type, field name, choose to hide certain fields and so on.

![img](/engineering-education/data-studio/source.png)

Click on `Create Report` to make visualizations and build a report.

![img](/engineering-education/data-studio/sure.png)

#### Add Charts to the report

Click on the `Add a Chart` drop-down menu to select a suitable graph or table for your data.

![img](/engineering-education/data-studio/dropdown.png)

Time Series is used to show the change in a metric with respect to time. Scorecards are used to display a number (profit, loss, count, etc.). Bar charts are used to display and compare different discrete categories of data. A Pie chart illustrates the numerical proportion. Geo maps can be used to show how a metric changes wrt a location (We need a field with Type = `Geo`). These are some ways to visualize data.

We can create a new field off of the existing fields. For example, if you want to plot/calculate `Profit` from existing fields `Revenue` and `Cost`, we can create a new field (or) constant value.

Click on **Add a Field** in report or Data Source.

![img](/engineering-education/data-studio/addField.png)

Creating a new field is similar to creating [Excel Functions](https://www.excelfunctions.net/excel-math-functions.html). We can select from available math functions like SUM(), COUNT(), AVERAGE(), etc. Choose appropriate mathematical functions on fields to get desired output.

![img](/engineering-education/data-studio/inloss.png)

![img](/engineering-education/data-studio/totloss.png)


#### Add and configure report controls.
Once you've built a report to visualize your data, you can empower viewers to refine that visualization to meet their own needs by adding controls to your report.
* A **date range** control allows your viewers to change the time frame of a report.
* A **filter control** allows viewers to select one or more dimension values from a list by which to filter the report.
* A **data control** allows a report viewer to change the data set used by a specific type of data source.

![img](/engineering-education/data-studio/datecontrol.png)

#### Share reports with others
Once your report is ready, you can share it with others for collaboration or review. For reports, you can give others to view or edit access, at which point they'll receive an email with a link to view or edit that file. Viewers can view and interact with the report, while editors can make changes to the design, chart data, format, and so on. Similar to report sharing, you can give others to view or edit access to your data source files, at which point they'll receive an email with a link to view or edit that file.

![img](/engineering-education/data-studio/sharing.png)

### Conclusion
Data Studio is a powerful data visualization tool for all. Developers can create their custom designs and charts, using JavaScript and CSS. We can even use Data Studio reports incorporating insights into and predictions from the data, using powerful tools such as [TensorFlow](https://www.tensorflow.org/). TensorFlow provides a JavaScript API called [TensorFlow.js](https://www.tensorflow.org/js) which can be even used for training complex neural networks.

For more information, look at [Data Studio Community Visualizations](https://developers.google.com/datastudio/visualization/get-started). Check out my tutorial on [D3.js](https://www.section.io/engineering-education/data-visualization-with-d3js/) data visualization in JavaScript (Even D3.js can be used in Data Studio).

Data Studio is equally helpful for people who don't code in their profession like Marketing, Advertising, Sales and Accounting by providing an intuitive and useful click-and-drag based features. Data Studio can be easily integrated with Google Ads analytics, which is a major advertisement platform, to study how their ads are performing and the amount of traffic they are contributing to the business.

There are many data visualization tools out there like [Tableau](https://www.tableau.com/), [PowerBi from Microsoft](https://powerbi.microsoft.com/en-us/), these tools are **not free of cost**. They have more features, but they may be cost-prohibitive depending on your team size. If you are a small company or individual interested in data visualization, then Data Studio is a good starting point.

### References and Resources
* [Google Analytics Academy](https://analytics.google.com/analytics/academy/course/1)
* [Developer Guides](https://developers.google.com/datastudio)
* [Examples](https://datastudio.google.com/gallery)
* [White Paper](https://services.google.com/fh/files/misc/data_studio_product_overview.pdf)
