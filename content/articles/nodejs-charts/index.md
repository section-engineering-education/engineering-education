### Table of contents
- [Table of contents](#table-of-contents)
- [Getting started with billboard.js](#getting-started-with-billboardjs)
- [Prerequisites](#prerequisites)
- [Project setup](#project-setup)
  - [Installing billboard.js](#installing-billboardjs)
  - [Supported chart types in billboard.js](#supported-chart-types-in-billboardjs)
  - [Creating charts using billboard.js](#creating-charts-using-billboardjs)
  - [Displaying categorical data using billboard.js](#displaying-categorical-data-using-billboardjs)
  - [Chart themes in billboard.js](#chart-themes-in-billboardjs)
- [Conclusion](#conclusion)

### Getting started with billboard.js

`billboard.js` is a javascript library that facilitates data visualization in charts and is based on D3 V4+. `billboad.js` makes it easier for developers to visualize data instantly without the need to write a lot of boilerplate code.


### Prerequisites
1. [Node.js](https://nodejs.org/en/) installed on your computer.
2. [Npm](https://www.npmjs.com/) installed on your computer.
3. [Javascript](https://www.w3schools.com/js/js_intro.asp) and [HTML](https://www.w3schools.com/html/default.asp) knowledge.

### Project setup
1. Create a project directory named `charts`.
2. Within the `charts` directory created above, create a new HTML file name `index.html`.

#### Installing billboard.js
`billboard.js` can be added to a project in two ways:-
1. **Manual download**
   Download `billboad.js` files from the [billboard.js official website](https://naver.github.io/billboard.js/). Add the CSS and Javascript files downloaded into the `chart` directory we created above.
   
   In the `index.html`, add the code snippet below into the header section.
   ```Html
   <!-- Load D3.js -->
    <script src="https://d3js.org/d3.v5.min.js"></script>

    <!-- Load billboard.js -->
    <script src="billboard.js"></script>

    <!-- Load style -->
    <link rel="stylesheet" href="billboard.css">
   ```

2. **Installation through npm.**
   To install `billboard.js` into our project through npm, we must initialize npm in the root directory of our project. 
   - Open the terminal and change the current directory to our projects directory.
   - Execute the command below to create `package.json` and `package.lock.json` files which are used by Node.js to manage external libraries added to Node.js applications.
  
    ```bash
    $ npm init
    ```
   - To install `billboard.js` into our project through npm, execute the command below.
    ``` bash
    $ npm install billboard.js
    ```

#### Supported chart types in billboard.js
`billboard.js` supports a variety of charts.

#### Creating charts using billboard.js

#### Displaying categorical data using billboard.js

#### Chart themes in billboard.js

### Conclusion
Now that you have learned how to integrate `billboard.js` into a Node.js application, explore the available charts and themes from the [billboard.js official docs](https://naver.github.io/billboard.js/). Find the full source code of the application [here]().
