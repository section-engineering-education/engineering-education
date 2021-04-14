## Node.js Structural Comparisons

Node.js is a type of computer language based on JavaScript. When structuring codes to produce and generate results, the number of lines of code can become time efficient and eventually valued. This tutorial will display structural breakdowns of numerous scenarios by comparing Node.js to R-Programming, C/C++, and Java.  

R-Programming, C/C++, and Java were selected to differentiate components that can be found quickly with Node.js. The tutorial will extend to other areas of programming structure such as sequencing, organization, features, and available options. Applying these concepts might become beneficial to specific situations such as data science, applications with possible graphic user interface preferences, and general scripts.  

### Table of Contents
* [Introduction](#introduction)
* [Prerequisites](#prerequisites)
* [Modules and Libraries](#modules-and-libraries)
* [Variables with Value](#variables-with-value)
* [Graphing](#graphing)
* [Graphical User Interface Applications](#graphical-user-interface-applications)

### Prerequisites

* Windows device.
* Previous knowledge of installing modules and libraries.
* R-Programming.
* Kali Linux (to compile C and C++ codes).
* NetBeans (to build in Java).
* Node.js application (to write in Node.js).
* Plotly account (to graph).
* Some coding knowledge or experience.

Once most of the prerequisites are met, let's begin.  

### Modules and Libraries

#### Node.js

Node.js computer language is written in a unique structure. One characteristic to consider are the steps to create or add modules into Node.js. As each coding language includes its own sequenced procedure, Node.js also involves flexible options.  

Node.js modules can be found on open-source websites. In Node.js, folders and JavaScript files are known to hold modules. Modules inside the `node_module` folder can be used in the Node.js application.  

A branched out path directory looks similar to the picture below.  

[directory](/engineering-education/nodejs-structural-comparisons/path.jpg)  
_Screen capture_  

Remember to use the `npm rebuild` command.  

```JavaScript
global.puny = require('punycode')
```  

Functions for the module should appear at the bottom of the Node.js application window.  

The choice to include dependencies is usually not available. This module can be used with the codes shown below.  

```JavaScript
global.char = 'sectionio';
global.changeto = puny.decode(char);
```  

**Output:**  
```JavaScript
'ઽ઺ૃરીૄ૆'
```  

The code snippet below shows how to encode the above output back to the original text string variable.  

```JavaScript
puny.encode(changeto);
```  

**Output:**  
```JavaScript
'sectionio'
```  

Shown below is how the code is displayed in a Node.js window.  

[punycode code snippet](/engineering-education/nodejs-structural-comparisons/punycodenodejs.jpg)  
_Screen capture_  

As a side note, installing external Node.js modules can be found in documentation.  

#### R-Programming

More information can be found in [CRAN documentation](https://cran.r-project.org). Further options can include `dependencies =` and `source = `.  

Similar to Node.js, R-Programming also uses browser windows to display. Usually in R-Programming, RStudio can display visuals. However, Graphic User Interface (GUI) applications are sent to an internet browser window.  

#### C/C++

The following is the most frequently used procedure to install a C module. An advanced statistical module will be installed. More information on how to install the TensorFlow library can be found [here](https://www.tensorflow.org/install/lang_c).  

1. Find a module.
2. Copy the URL.
3. Enter in the following command:  
```Bash
wget https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-cpu-linux-x86_64-2.4.0.tar.gz
```  

4. Extract. Usually with:  
```Bash
tar -C /usr/local -xzf libtensorflow-cpu-linux-x86_64-2.4.0.tar.gz
```  
6. Enter:  
```Bash
ldconfig
```  
Visuals of this procedure can be found [here](https://www.analyticsvidhya.com/blog/2021/04/alternative-tools-for-effective-machine-learning/).  

#### Java

This programming language can be limited. As NetBeans can attempt to bring vast number of features, the portability and compatibility are limited as technological preferences change.  

### Variables with Value

Under each programming language, the common lines to define a variable will be displayed.  

#### Node.js

Node.js is structured uniquely to properly define a variable. When using the `global` function, this can break all barriers from separate modules.  

For example, without a `global` function to define a variable, the variable will be named `undefined`.  

Take a look at the example below.  

```JavaScript
var name = 'section.io';
```  

**Output:**  
```JavaScript
undefined
```  

When adding `global` before the variable name, the value becomes defined. This can applied to many data types and node.js applications.  

The following are examples.  

```JavaScript
global.name = 'section.io';
global.number = [0,-10,3.14,-3.14];
global.alphanum = [name, number];
```  

**Output:**  
```JavaScript
'section.io'
[ 0, -10, 3.14, -3.14 ]
[ 'section.io', [ 0, -10, 3.14, -3.14 ] ]
```  

The picture below is a Node.js window.  
[Defining Variables](/engineering-education/nodejs-structural-comparisons/define.jpg)  
_Screen capture_  

Handling different data types inside an individual variable might need a specific structure, square brackets may surround values.  

#### R-Programming

When defining variables in R-Programming, the variable name and an arrow-type symbol (`<-`). For example, the codes below will show variables corresponding to a data type.  

Numerical list:   

```Bash
numbers <- list(5,7,2,8,0,3,-5)
# Lists are written in this format.
numbers
```  

**Output:**  

1 | 2 | 3 | 4 | 5 | 6 | 7
--- | --- | --- | --- | --- | --- | ---
[1] 5 | [1] 7 | [1] 2 | [1] 8 | [1] 0 | [1] 3 | [1] -5

Text and strings:  

```Bash
text <- c("section.io")
text
```  

**Output:**  
```Bash
[1] "section.io"
```  

Numerical lists and matrices:  

```Bash
x <- list(2,3,4,5,6,7)
matrix(x,ncol=3)
# Number of rows or columns is a divisible number.
```  

To avoid warning messages, choose a number divisible by 6 (the number count in the list). If not, the matrix will either repeat or cut the sequence in the given list.  

**Output:**  

index | [,1] | [,2] | [,3]
--- | --- | --- | ---
[1,] | 2 | 4 | 6
[2,] | 3 | 5 | 7

```Bash
matrix(x,ncol=9) # More than 6.
matrix(x,ncol=4) # Less than 6.
# Both number of rows or columns are not divisible by 6.
```  

**Outputs:**  

More than the number count in the list.  
index | [,1] | [,2] | [,3] | [,4] | [,5] | [,6] | [,7] | [,8] | [,9]
--- | --- | --- | --- | --- | --- | --- | --- | --- | ---
[1,] | 2 | 3 | 4 | 5 | 6 | 7 | 2 | 3 | 4

Less than the number count in the list.  
 index | [,1] | [,2] | [,3] | [,4]
 --- | --- | --- | --- | ---
[1,] | 2  |  4  |  6  |  2
[2,] | 3  |  5  |  7  |  3


#### C/C++

C++ is structured in a different way where compiling a script is required. Although, initializing variables remains similar to other computer languages.  

```C
int i = 8; //Numerical integers.
string v = "Section.io"; //Alpha text string.
```  

While a common practice of declaring or initializing variables are similar compared to many computer languages, classes could appear different.  

Typically, global and local variables are typically written compared to the code shown below.  

```C
#include <stdio.h>

static char num1[] = "Section.io";

int main(){
  static int num2 = 9;
  printf("Local variable is %d and global variable is %s", num2, num1);
  return 0;
};
```  

Compiling the script must be done before running the C script. Add `sudo` when necessary.  

```Bash
gcc test.c -o test
./test
```  

**Output:**  
Local variable is 9 and global variable is Section.io.  

[Variables](/engineering-education/nodejs-structural-comparisons/exampleoutputs.jpg)
_Screen capture_  

#### Java

Java is similar to C to initialize and define variables. A slight difference is private and public classes.  

Sample public class structure:  

```Java
public void publicclass() {
}
```  

Sample private class structure:  

```Java
private void privateclass () {
}
```   

Public classes can be used throughout an application whereas private classes are usually within a portion of a file.  


### Graphing

#### Node.js

Plotly was selected to graph. To use Plotly, an account could be required.  

```JavaScript
global.i = [];

global.y = [];
global.x = [];

for (i = 0; i < 50; i ++) {
	y[i] = Math.random();
	x[i] = Math.random() + 1;
}

global.plotly = require('plotly')("[enterusername]", "[enterkey]");

global.trace1 = {
  y: y,
  type: "box"
};
global.trace2 = {
  x: x,
  type: "box"
};
global.data = [trace1, trace2];
global.graphOptions = {filename: "basic-box-plot", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
```  

**Output:**  
```JavaScript
{
  streamstatus: undefined,
  url: 'https://chart-studio.plotly.com/~pkalynan/0',
  message: "High five! You successfully sent some data to your account on plotly. View your plot in your browser at https://chart-studio.plotly.com/~pkalynan/0 or inside your Plotly account where it is named 'basic-box-plot'",
  warning: '',
  filename: 'basic-box-plot',
  error: ''
}
```  

The image below is a frozen portion of the interactive graphic. More can be displayed by pressing on the buttons above the boxplot graph.  
[plotly test graph](/engineering-education/nodejs-structural-comparisons/plotlyplt.jpg)  
_Screen capture_  

#### R-Programming

Graphs are usually displayed fluently in a separate window. An example of a library that can provide data visuals without using a Graphical User Interface (GUI) is `latticist`.  

```Bash
library(latticist)
library(datasets)
data("morley")
latticist(morley)
dat <- morley
parallelplot(~dat, data = dat, col = trellis.par.get("plot.line")$col, par.settings = simpleTheme(), sub = list("N = 100, R 3.6.2", 0.99, "right", 0.7, 1))
```  

**Output:**  

[Parallel Coordinates Plot](/engineering-education/nodejs-structural-comparisons/parallelplotR.jpg)  
_Screen capture_  

The graph above shows a dataset visualized as a [parallel coordinates](https://www.data-to-viz.com/graph/parallel.html) plot.  

#### C/C++

Matplotlib-cpp was chosen to create a graph.  

```C
#include <cmath>
#include "matplotlibcpp.h"

using namespace std;
namespace plt = matplotlibcpp;

int main()
{
    // Prepare data.
    int n = 500000; // number of data points
    vector<double> x(n),y(n);
    for(int i=0; i<n; ++i) {
        double t = 2*M_PI*i/n;
        x.at(i) = 16*sin(t)*sin(t)*sin(t);
        y.at(i) = 13*cos(t) - 5*cos(2*t) - 2*cos(3*t) - cos(4*t);
    }

    // plot() takes an arbitrary number of (x,y,format)-triples.
    // x must be iterable (that is, anything providing begin(x) and end(x)),
    // y must either be callable (providing operator() const) or iterable.
    plt::title("Soundwave Curves");
    plt::plot(x, y, "y-", x, [](double d) { return 12.5+abs(sin(d)); }, "b-");


    // show plots
    plt::show();
}
```  

Enter the following line to compile the cpp file written above.  

```Bash
g++ modern.cpp -I/usr/include/python3.9 -lpython3.9 -o section.io
./section.io
```  

If you have `kex` open, the image should appear similar to the picture below.  

[Soundwave Curves on Matplotlib-cpp](/engineering-education/nodejs-structural-comparisons/plot.jpg)  
_Screen capture_  

To recap the graph shown above, it is a mixture of many forms of sine and cosine waves. These trigonometric functions are also used to measure sound.  

#### Java

Java written with NetBeans usually does not have many features for graphs.  

### Graphical User Interface Applications

#### Node.js

The library used to create GUI applications is `gui`.  

More information can be found on [Yue](https://libyue.com/docs/latest/js/guides/getting_started.html).  

This is a blank version of the app. If preferred, content could be added.

[Node.js GUI App](/engineering-education/nodejs-structural-comparisons/gui.jpg)  
_Screen capture_  

#### R-Programming

It is less known to create GUI applications with R-Programming. As most graphical functions are offered in RStudio. However, there are libraries that use a GUI instead of using raw codes. From a raw form of code, a pop-up browser window should appear.  

For example, [visualizing PCA in R-Programming with `Factoshiny`](https://www.analyticsvidhya.com/blog/2021/02/visualizing-pca-in-r-programming-with-factoshiny/) can provide codes, GUI interactions, and results.  

#### C

C++ is more accommodating for GUIs, and it might be slightly time consuming to find the proper current library. Here, `qtbase5-dev` will be used.  

The link about how to create a [Qt program](https://vitux.com/compiling-your-first-qt-program-in-ubuntu/) can help provide an outlined structure.  

The general C++ code will appear in this structure:  

```C                              
#include <QApplication>
#include <QLabel>
#include <QWidget>

int main(int argc, char *argv[ ])
{

QApplication app(argc, argv);
QLabel hello("<center>Section.io</center>");
hello.setWindowTitle("Welcome to Section.io Engineering Program");
hello.resize(400, 400);
hello.show();
return app.exec();

}
```  

**Output:**  
[C++ Qt Program](/engineering-education/nodejs-structural-comparisons/qtbase5dev.jpg)  
_Screen capture_  

#### Java

Java on NetBeans can be limited considering available features that seem to be functional.  

For example, Java may not consist of libraries whereas JavaFx may provide libraries to build a functional interactive GUI application. The Java script is shown below. The script below generates a GUI application that allows an individual to enter anything inside the textbox. Once the button is pressed, everything entered inside is cleared. The purpose is to express certain emotions that should probably not be sent to particular individuals.  

```Java
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package searchengine;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;
import javafx.scene.text.Text;



public class SearchEngine extends Application {

    @Override
    public void start(Stage primaryStage) {
        StackPane root = new StackPane();
        Scene scene = new Scene(root, 300, 250);
        Text titlet = new Text();
        titlet.setText("VENTAWAY");
        Button btn = new Button();
        TextField txtb = new TextField();
        txtb.setPrefSize(10,25);
        btn.setText("Enter and Send");


        btn.setOnAction(new EventHandler<ActionEvent>() {

           @Override
            public void handle(ActionEvent event) {
                txtb.clear();
                }


        });

        txtb.setOnAction(new EventHandler<ActionEvent>() {

           @Override
            public void handle(ActionEvent event) {
                //System.out.println(txtb.getCharacters());
                txtb.clear();
                }



        });



        StackPane.setAlignment(btn, Pos.CENTER_RIGHT);
        StackPane.setAlignment(titlet, Pos.TOP_CENTER);
        primaryStage.setTitle("Search Engine");
        root.getChildren().addAll(titlet, txtb,btn);
        primaryStage.setScene(scene);
        primaryStage.show();


    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }

}
```  

**Output:**  

[java app](/engineering-education/nodejs-structural-comparisons/ventaway.jpg)  
_Screen capture_  

### Conclusion
Node.js is quite a versatile computational language. R-Programming, Java, and C/C++ can be chosen accordingly. Deciding which computer language to use relies on the individual and possible circumstances.  

### Takeaways

* Node.js contains structures unique to its language.
* Each language can generate similar outcomes.
* The tutorial provides a sample to try.
* There are more to explore and discover.

### References

[CRAN documentation](https://cran.r-project.org)  
[Machine Learning Tool Alternatives](https://www.analyticsvidhya.com/blog/2021/04/alternative-tools-for-effective-machine-learning/)  
[Qt program](https://vitux.com/compiling-your-first-qt-program-in-ubuntu/)  
[TensorFlow](https://www.tensorflow.org/install/lang_c)  
[Visualizing PCA in R-Programming with `Factoshiny`](https://www.analyticsvidhya.com/blog/2021/02/visualizing-pca-in-r-programming-with-factoshiny/)  
[Yue](https://libyue.com/docs/latest/js/guides/getting_started.html)
