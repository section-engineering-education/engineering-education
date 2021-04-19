### Node.js Structural Comparisons

Node.js is a type of computer language based on JavaScript. When learning a new form of a computer language, finding commonalities between other computer languages can help. In this tutorial, Node.js is compared with C/C++.  

Structural topics included in this tutorial are installing modules, defining variables, and visualizations. Applying these concepts might become beneficial in various situations.  

#### Table of Contents
1. [Prerequisites](#prerequisites)
2. [Node.js](#nodejs)
3. [C](#c)


#### Prerequisites

* Windows device.
* Previous knowledge of installing modules.
* Some knowledge of interpreting graphs and similar visualizations.
* Prior knowledge of math and statistics.
* Installations of the following:  
  * [Kali Linux](https://kali.org).
  * [Node.js](https://nodejs.org) application.
* [Plotly](https://chart-studio.plotly.com) account.
* Some coding knowledge or experience.

Once most of the prerequisites are met, let's begin.  

#### Node.js

Node.js is written in a unique structure. One characteristic to consider is the steps to create or add modules into Node.js. As each coding language includes its sequenced procedure, Node.js also involves flexible options when defining variables.  

Modules can be found on open-source websites. In Node.js, folders and JavaScript files are known to hold modules. Modules inside the `node_module` folder can be used in the Node.js application. One method to install Node.js modules is shown below. Alternatively, `i` can substitute for `install`.  

```Bash
npm install plotly
```  

A branched-out path directory looks similar to the picture below.  

![Directory](/engineering-education/nodejs-structural-comparisons/path.jpg)  
_Screen capture_  

Remember to use the `npm rebuild` command. A module is installed after this command is entered. If this command is not entered, the installation is incomplete and cannot be included in Node.js scripts.  

Node.js is structured uniquely to define a variable properly. When using the `global` function, the function can optionally be included in other modules. For example, without a `global` function to define a variable, the variable will be named `undefined`.  

An example is shown below.  

```JavaScript
var name = 'section.io';
```  

**Output:**  
```JavaScript
undefined
```  

When adding `global` before the variable name, the value becomes defined. Defined `global` variables can be applied to many data types and used with various node.js modules.  

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

![Defining Variables](/engineering-education/nodejs-structural-comparisons/define.jpg)  
_Screen capture_  

Handling different data types inside an individual variable might need a specific structure. In this case, square brackets surround values.  

Plotly was selected to graph. To use Plotly, an account is required. The concept from defining variables is also applied to the Node.js script below.  

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

The image below is a frozen portion of the interactive graphic.  
![Graph](/engineering-education/nodejs-structural-comparisons/plotlyplt.jpg)  
_Screen capture_  

By visiting the following [link](https://chart-studio.plotly.com/~pkalynan/0), additional options to observe the data can be visualized. One example is converting any given Node.js script to other programming languages such as Python, R, and JSON. Another feature includes a mouse over technique to display labels.  

A general overview of the visual from the random number generator considers the scale and the physical positioning of the boxplot. The vertical box plot includes data points under the value of one. The graph includes most variables included in measures of central tendency although mean or average remained unavailable. The second graph positioned to the right is horizontal. Statistical values for a horizontal box plot on this scale and axis cannot be determined.  

#### C

In this portion of the tutorial, tips on the procedural process behind Matplotlib-cpp installations, defining variables, and applying these procedures to visualizations are discussed.  

The following is the most frequently used procedure to install a C module. [Matplotlib-cpp](https://github.com/lava/matplotlib-cpp) can be installed accordingly.  

After entering an installation command, a request to install other required dependent modules can be accepted or declined. At this point, enter `y` to complete installations.  

```Bash
apt-get install python-matplotlib python-numpy python2.7-dev
```  

Internally, Python can be installed with the following command:  

```Bash
apt install python
```  

Next, define variables in a C/C++ environment. Global and local variables are written in the format shown below. A text editor in the command line can help create a C file. For example, `nano` is a built-in text editor involved in the creation of C files.  

```Bash
nano test.c
```  

```C
#include <stdio.h>

static char num1[] = "Section.io";

int main(){
  static int num2 = 9;
  printf("Local variable is %d and global variable is %s", num2, num1);
  return 0;
};
```  

Compilation of the script above must be done before running the C script. Enter `sudo` at the start of every command when not in `ROOT` mode. Additional observations to note are `gcc` helps create C files, and `-o` creates a name of the output file.  

```Bash
gcc test.c -o test
./test
```  

**Output:**  
Local variable is 9 and global variable is Section.io.  

![Variables](/engineering-education/nodejs-structural-comparisons/exampleoutputs.jpg)  
_Screen capture_  

Visuals can display data in different forms. To graph, [Matplotlib-cpp](https://matplotlib-cpp.readthedocs.io/en/latest/) was chosen. As stated in Matplotlib-cpp documentation, installing python is necessary.  

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
        y.at(i) = -(13*cos(t) - 5*cos(2*t)) - (-(2*cos(3*t) - cos(4*t));
    }

    // plot() takes an arbitrary number of (x,y,format)-triples.
    // x must be iterable (that is, anything providing begin(x) and end(x)),
    // y must either be callable (providing operator() const) or iterable.
    plt::title("Soundwave Curves");
    plt::plot(x, y, "y-", x, [](double d) { return 12.5+abs(sin(d)); }, "bo");


    // show plots
    plt::show();
}
```  

Enter the command below to compile the cpp file written above. `g++` is designed to create c++ files. The command must also contain the python library directory.  

```Bash
g++ flip.cpp -I/usr/include/python3.9 -lpython3.9 -o section.io
./section.io
```  

If `kex` is open, the image should appear similar to the picture below.  

![Soundwave Curves on Matplotlib-cpp](/engineering-education/nodejs-structural-comparisons/soundcurve.jpg)  
_Screen capture_  

To recap the graph shown above, the graph is a mixture of many forms of sine and cosine waves. These trigonometric functions are also used to measure sound.  

#### Conclusion

As described, Node.js and C/C++ offers several features. Based on preferences and purposes, either computer language can complete tasks. Deciding which computer language to use depends on a case-to-case basis.  

#### Takeaways

* In Node.js, global variables are explicitly expressed.
* Plotly graphs generated with Node.js are sent to a separate  interactive browser window. Interactive features include script conversions and displaying labels.
* Browsers are used to display Node.js visualizations.
* C/C++ contains procedures that many computer languages no longer include. For example, compiling scripts.
* In C/C++, files are required to be compiled before running scripts.
* Matplotlib-cpp graphs are displayed with `kex`.

#### References

[Machine Learning Tool Alternatives](https://www.analyticsvidhya.com/blog/2021/04/alternative-tools-for-effective-machine-learning/)  
[Matplotlib-cpp](https://matplotlib-cpp.readthedocs.io/en/latest/)  
[Matplotlib-cpp Installation](https://github.com/lava/matplotlib-cpp)  
[Qt program](https://vitux.com/compiling-your-first-qt-program-in-ubuntu/)  
[TensorFlow](https://www.tensorflow.org/install/lang_c)  

Happy Coding!  

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
