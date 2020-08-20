Node.js is a runtime environment for executing JavaScript runtime built
on Crime's V8 JavaScript enginee.Node.js is one of the top hottest
versatile open-source platforms for server scripting. It has a very
exponential growth adopted to develop modern applications, which are not
just light speed but efficient scalability for real-time web application
development with no buffering. Big corporates that have adopted node
applications include Netflix, Microsoft, Yahoo, GoDaddy, eBay, Walmart
just to name a few. Node.js has the capacity to run on various platforms
such as Microsoft Windows, Linux, OS X, UNIX etc.
Check [why node.js is wildly popular among developers](https://www.section.io/engineering-education/why-node-js-is-popular/) on Noje.js


However, for developers getting started with node.js application
development there a few basic knowhow that they need to be familiar with
as they move along to build their First Node.js application.

This article will cover some of the common tips you need to know from
getting started to deploying the first Node application.

1.  **Understand Node Package Manager (NPM)**

This is package manager for JavaScript Node Platform that helps in
package installation, version management and dependency management,
which is very easy to use. Npm helps to install package you want with
just a single line command. To use NPM you need Node to be installed in
you gadget. For OS X and window OS, the node installer has an easy to
use interface and NPM is included with Node.js Installation. Developers
using Linux need to run the following command inapt package managed to
set up node.js an npm

sudo apt-get update

sudo apt-get install node.js

sudo apt-get install npm

You can then verify NPM installation by writing the following in you
terminal npm -v or if you realize you have an older version run npm
install npm -g (for windows) or npm install -g npm\@latest (for Linus
and mac) to update to the current npm version. Npm helps to install node
modules. For example you just need to write npm install followed by your
specified module ie npm install express, once the package is installed
you will be able to use require () on your node project and they will
run just as if they were built-ins. Another important aspect of npm is
dependency management. You can run npm install in your root folder and
any listed dependency in you package.json (if you have one) will be
installed. This help mostly when installing Node.js project from git
repository For example vow (node testing framework) can be installed
from git and its single dependency eye can automatically be installed ie

git clone https://github.com/clonehad/vows.git

cd vows

Npm install

2.  **Understand A to Z Most Useful Node.js Modules and Frameworks**

The power of node.js lies on hundreds of packages that makes it easier
to write you program. The packages are open source and they are the
ecosystem of node applications. Every node develop will always interact
with this packages to get more efficient development workflow.

We collect a list of some of the most useful libraries that will help
you ease the development of Node.js applications.

-   [Express](http://expressjs.com/) : it a web application framework
    for Node.js that handle robust APIs and Web servers

-   [Gulp](https://www.npmjs.com/package/gulp): helps to automate
    development workflow. It helps to automates simple task in the
    development of web application.

-   [Moment](https://www.npmjs.com/package/moment): An insubstantial
    JavaScript date library for parsing, validating, manipulating and
    formatting dates.

-   [Async](https://caolan.github.io/async/v3/): provides powerful
    straightforward Over 70 functions for working with asynchronous
    JavaScript.

-   [Lodash](https://lodash.com/): makes JavaScript easier by taking out
    the irritation of working with arrays, numbers, objects, strings
    etc.

-   [Jshint](https://www.npmjs.com/package/jshint): Helps to detect
    errors and potential problems and threats in you Node.js
    (JavaScript) code in the way you want your code to execute

-   [Cheerio](https://cheerio.js.org/): Commonly used for web page
    scraping. It implement the subset of jQuery and removes DOM
    inconsistence and browser cleverness to extract API endpoint URLs
    from web pages.

-   [Browserify](https://github.com/browserify/browserify): It analyses
    require () calls in your node application to create a bundle that
    you can serve the browser in a single \<script\> tag.

-   [Nodemailer](https://www.section.io/engineering-education/node-mailer/): Allow email message
    sending (easy as cake)

Node open source modules are many and their usability depends on the
developer familiarity, knowhow capacity and the application being
developed. You can have a look at all available library on
[GitHub](https://github.com/aravindnc/A-to-Z-List-of-Useful-Node.js-Modules)

3.  **Http module for your Node.js server**

Node.js has a built-in module called HTTP (Hypertext Transfer Protocol).
It helps in making requests as a client and running the server to accept
requests and return responses. In this case, when you visit a webpage
from a browser, you make a request to another computer (webserver) via
the internet, which then provides you the webpage response. The
webserver receives HTTP requests from the client, which listens to a
server port and provides an HTTP response for example a HTML Page. To
use HTTP server and client in node.js you must use require ('http');.
Let\'s look at a simple Hello World HTTP Server module that will listen
on port no 3000.

**var** http = require(\'http\')

**var** server = http.createServer((**function**(request, response) {

    response.writeHead(200, { \"Content-Type\": \"text/plain\" });

    response.end(\"Hello World\\n\");

}));

server.listen(3000);

When you type localhost:3000 on you browser, The Output will be Hello
World.

Check
[MORE](https://www.section.io/engineering-education/http-requests-nodejs/)
on working HTTP with node.js

.

4.  **Embracing asynchronous Node functions**

Asynchronous is heavily used in Node.js to ensure non-­blocking
operations flow. It enables a system to handle thousands of concurrent
requests and process gigabytes of data with small RAM. Asynchronous I/O
permits other processing to continue even before the first transmission
has finished. Asynchronous helps to avoid the so-called "Call-back Hell"

Example of async/wait in Node.js

**async** **function** myFunction(inputValue) {

    try {

        **const** a = await asyncFunc1(\'value\');

        **const** b = await asyncFunc2(a);

        **const** c = syncFunc3(b);

        return await asyncFunc4(c);

    } catch (ex) {

        *// handle exception*

    }

}

In this scenario, we can see it is obvious that functions 1,2and 4 are
asynchronous.

5.  **Handling Node.js errors**

> Node.js application has four main  types of errors that you need to be familiar
> with and be able to handle them. The common node.js errors
> are:![Node.js-errors](/engineering-education/10-tips-for-working-with-node.js/node.js_error_types.png)

In node.js, errors are handled through exceptions. For example, if we
have an error that would occur when we divide a number by zero, our node
application will crash, so then we need to handle the error to continue
with the normal execution of our application ie

try {

    **var** m = 1;

    **var** n = 1 / 0;

} catch (err) {

    *//handle the error here.*

    *//the application do do something to execute the error without having to make our application crash*

}

6.  **Debugging Node.js programs**

Each code for developing an application must go around several debugging
techniques. The new developers with node.js interest must find a way on
how to handle bugs that may arise during application development. The
commonly used approach for debugging node.js applications is console.log

*// writing a hello world to console: *

console.log(\"hello world\");

console.log is provided by internet browsers such as Chrome DevTool, it
have debug protocols ported into a Node.js module and can be used to
debug Node apps. It requires you to install node -inspector(npm install
-g node -inspector) then run node-debug app.js ----debug--brk it will
open up Chrome Developer Tool and you can start debugging your app. You
can as well use node built-in debugger by running node debug app.js. Or
use watchers in expressions and variables. To start watching an
expression, include watch('my expression');. The command watcher will
print active watchers. To remove a watcher you can use line unwatch('my
expression');. Remember to check
out [MORE](https://www.section.io/engineering-education/debug-nodejs-vscode/)
ON SECTION.IO efficient ware to deal with bugs from your app.

7.  **Always keep your code simple and light**

It is important to keep the node.js code base compact and shallow to
reduce the latency and speed up the response time of a node.js
application. Some devices are slower and their latencies are higher thus
you need to keep the code small, well-arranged executions and light. The
same ideas should be applied to your server code as well. While writing
your node.js code ensure proper and appropriate naming of thing for
better referencing. This will serve as Documentation of your application
and make it easier to go back to your code when changes are required.
Better code quality helps in easier code maintainability

8.  **Security practices to your server**

As you get started with Node.js, try to secure your node application by
proper coding, tooling, and operations.

The main practice to ensure secure Node.js application include

-   Set up the secure Http headers

-   Do a static review of your codebase

-   Handle error carefully (error codes and stack traces)

-   Regularly use strict mode ie restricted variant, undeletable
    properties, validation, and authentication.

-   Do proper session management such as Http Only

-   Set cookie scope and cookie flags

-   Avoid command injection

-   Check for any vulnerabilities using retire.js. Retire.js will assist
    you to recognize module versions with associated vulnerabilities,
    install it using command npm install -g retire, later after running
    it, retire command will scan for each vulnerability in your
    application.

-   Constantly audit all the modules you have in your Node.js
    application using CLI Node Security Platform. Node Security CLI uses
    Command nsp which allows auditing of package.json or
    npm-shrinkwrap.json to check unsafe modules. Run npm install nsp
    -global from your node application project directory nsp check to
    start the check.

Subsequently, practice testing before application deployment to make
sure that your app passes all security demands.

9.  **Deploying you node.js application**

After finishing developing your app and all features are tested, you
need now be wondering how you will get your application out for the
world to interact with it. The most familiar Node.js deployment ways if
either PaaS provider
([Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs))
or
using [Docker](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/).

Let\'s look in brief what you need to deploy to Heroku;

This will happen after the app development process is over and it meets
all your security preferences. To get started on Heroku with Node.js
Download Heroku Cli for your app. You need to have node version to be
higher than 8 check node --v

Then confirm that that Heroku is installed by running heroku -v then
heroku login to start your heroku server account. Ensure you have git
installed (git install) and usable on the top-level directory of your
application. Use git status command to check if git exists on your
directory. If not, make a git directory (git init ) then git add. Now
you need to commit the files you have added to git by git commit -m
"initial commit" command. Now you can create heroku application using
command heroku create, this will create a git remote that is connected
to your git repository. You can now deploy your application to heroku
server, use git push heroku master. You can then heroku open to open
your application on your browser.
Check [MORE](https://www.section.io/engineering-education/deploying-nodejs-web-app/) on
how to deploy first Node.js application.

10. **Monitoring your Node application**

Monitoring helps to get the insight of your production, application to
enhance a fast, stable production system. Which is critical in helping
to detect performance problems of your system. As a developer, you need
to know your system downtimes even before your customers start to
complain about how your system is faulty thus you need real-time
alerting for you to be notified immediately. Proper monitoring helps to
get insight features of your application's behavior.you need to know how
much time does our app takes to run each function in the production
environment. In addition, if you are using microservices, you need to
monitor network connections and lower delays in the communication
between tour services. Node.js application has two main looks of
monitoring:

i.  Server monitoring

This revolves around your host machine. You need to constantly be
checking:

-   Disk space

```{=html}
<!-- -->
```
-   CPU memory

-   CPU Time

-   CPU profiling

-   Network reach

ii. Application monitoring

This revolves around monitoring the health of you application instances
such as

-   Databases

-   handling requests

-   response time

-   Server request

Node.js monitoring frameworks includes

+----------------------------------+----------------------------------+
| -   [Hapi]                       | -                                |
| (https://github.com/hapijs/hapi) |    [Derby](https://derbyjs.com/) |
|                                  |                                  |
| -   [Geddy]                      | -   [                            |
| (https://github.com/geddy/geddy) | Express](https://expressjs.com/) |
|                                  |                                  |
| -   [Moji                        | -   [Flatiron](https             |
| to](https://mojito.mx/docs/home) | ://github.com/flatiron/flatiron) |
|                                  |                                  |
| -                                | -   [Koa](https://koajs.com/)    |
|   [Restify](http://restify.com/) |                                  |
|                                  | -   [                            |
| -   [Trace]                      | Zabbix](https://www.zabbix.com/) |
| (https://trace.risingstack.com/) |                                  |
+----------------------------------+----------------------------------+

**Conclusion**

As a Node.js developer, there is many concepts you need to be familiar
with for you to have a good node application. Check out what you need to
know, learn, and be able to apply that in your system and all will be
good. Wish you the best as you learn to work with Node.js.
