# What is the CORS Policy
The CORS policy or the Cross-Origin Resource Sharing policy prevents acessing web resources from sources other than the server the website is running on for security purposes.   
### Accessing Assets
For most websites, all of the assets (images, text, files, etc.) they use are held on the same server the website is hosted on. Since a website should be trusted by the server hosting it, the site is given permission to use resources held by the host server. This is called the same-origin policy, as both the website and the assets share the same origin, namely the server they are hosted on. 
### Assets on Another Server
Imagine you wanted a website to make a call to another server with information on it. This can be done easily with the `fetch()` JavaScript function.
~~~javascript
// gets the text written by the server and prints it in the console
fetch("url_of_server").then(req => req.text()).then(console.log)
~~~
With the above GET request, we can access the information stored on the servers we target.
 
 ### Why CORS Is Important
Now that we can get arbitrary data from another server with a GET request, we can just as easily change or modify that data on the server by sending DELETE, POST, or UPDATE requests.  

The server needs a way to make sure malicious websites can't seal or damage protected information, while still allowing access to approved sites. 
### Simulating CORS
We can see how this works by making a simple webserver.  Try running this Node.js server with [this repl.it link](https://repl.it/@NadivGold/cors1).
~~~javascript
//This is the template Node.js code provided by repl.it
var http = require('http');
//create a server object:
http.createServer(function  (req, res)  {
	res.write('Section is cool');  //write a response to the client
	res.end();  //end the response
}).listen(6003);  //the server object listens on port 6003
~~~
If you have Node.js, I recommend running this code locally.

To test the webserver, open the browser's [console](https://support.monday.com/hc/en-us/articles/360002197259-How-to-Open-the-Developer-Console-in-your-Browser) on this website, and enter:
~~~javascript
fetch("https://cors1--nadivgold.repl.co/").then(req=> req.text()).then(console.log)
~~~
If you're using the Node.js local version, use:
~~~javascript
fetch("localhost:6003").then(req => req.text()).then(console.log)
~~~
Running this `fetch()` command in the console acts as if the website was sending the request.

You should see a CORS error in your console, looking something like:
~~~
Access to fetch at 'https://cors1--nadivgold.repl.co/' from origin 'NOTE: PLEASE REPLACE THIS SENTENCE IN ALL CAPS WITH THE URL OF THIS ARTICLE INSIDE THESE SINGLE QUOTATION MARKS' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
~~~
The asset we tried to request was the string "Section is cool" from the Node.js web server. Our request was blocked because the server did not explicitly give our website permission. 

To fix this issue, we can add the 'Access-Control-Allow-Origin' to our web server. This HTML header lets CORS know that we are okay with letting others request the asset. Just add
~~~javascript
res.setHeader("Access-Control-Allow-Origin",  "*")  //sets the allow use to all requests html header
~~~
to the Node.js server before the write, or use this [new replit link](https://repl.it/@NadivGold/cors2).

The star symbol in the second argument denotes that all requests are accepted. If we just wanted to give access to one site, replace the star with the url of that site. 

We can now run the same fetch request as above to access our string.

If you're using the new replit version, use this fetch instead:
~~~javascript
fetch("https://cors2--nadivgold.repl.co/").then(req => req.text()).then(console.log)
~~~

We should now see `Section is cool` in the console. 
### Wrap Up
The most important thing to remember when dealing with CORS is to drink responsibly. 
The second most important thing is to remember is that, if you need something from another server, you also need that server's permission.
