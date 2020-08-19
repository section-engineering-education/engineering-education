# Node.js: Frontend or Backend?
<!-- 
1. Understand and clarify the doubt of whether node.js is frontend or backend
2. List out various applications in both frontend and backend
3. Understand how node.js complements other technologies in frontend and backend, -->

Let us understand what node.js is. node.js is a runtime environment for executing server-side code with high efficiency and presents a larger bandwidth to handle large code payloads. The choice of the language that Ryan Dahl, the creator of node.js, used was the most popular programming language at the time, JavaScript. node.js increased the control developers had over applications. Developers could control the I/O calls like system calls, database calls, or network calls. Such an improvement resulted in high performance, rich with features web applications. Javascript is still the most preferred programming language across the world. StackOverlfow survey results prove the same. node.js community benefits extensively from this feat that JavaScript has achieved.

![](stackoverflowresults.jpg)
Source: https://insights.stackoverflow.com/survey/2020

<!-- Frontend -->
### The Question: Frontend or Backend?

How do we analyze the question? node.js set out as a server-side engine. There are a massive number of libraries built for node. The idea of using node.js for frontend is a natural extension of the various features that it provides. Let us understand why the inclusion of node.js enhances the developer experience. 

1. JavaScript: The ability to use the same language for both frontend and backend makes it easier for the developer.
2. Availability of Packages and Libraries: There are many libraries available for use in the frontend. For example, the moment is a library that processes date in the specified format. 
3. The availability of the JS engine on the browser makes the integration of node packages efficient. 

Now that we know frontend applications can use node.js, the answer is YES. Yes, node.js is used in both the frontend and backend applications. Let us now dive into the applications that node.js supports in the frontend and backend.

### Frontend


1. **Code Processors**: Code processors are required for displaying text in the browser. The HTML and CSS files that we received are usually minimized in size by removing all the unnecessary characters for faster rendering and transmission. The pre-processors help the browser in rendering the files. Node.js enables us to code these processors in JS, thus allowing larger flexibility and customizability. 
   
2. **Code Linters**: A linter is a program that helps us to identify and correct issues in our codebase. Issues related to syntax, certain custom standards specified by the development team, programming errors can be identified using linters. Custom linters enhance the overall efficiency of the dev team at a company. One such example is the ESLint written in Node.js. Linters help interpreted languages, such as JavaScript, as the compilation step does not exist. With the help of a linter, errors are caught while coding. The list of errors can be found at [official documentation](https://eslint.org/docs/rules/) for ESLint. Custom linters can be built on top of the ESLint. The Airbnb configuration, developed by Airbnb for internal software development, is made open source. It is used by the majority of JS developers across the globe. 

     
3. **Module Bundlers**: Module bundlers are programs that take in various code files and bundle them into a single file. Such programs are usually included with Web frameworks like React. Webpack is one such application. It is a static module bundler built on top of Node.js. 
   
4. **Styling**: Styling the webpages is usually done with CSS. Packages such as styled-components have made styling very easy. styled-components is a library written for React.js. It allows easier integration of styling with JS, resulting in efficient styling code for user interaction. 
    
5. **Packages**: npm offers many packages to smoothen the process of development. For example, we can access components like text editors, color pickers, authentication components, etc from npm. Building the frontend is as simple as collecting a bunch of required components and stitching them together to create a beautiful UI.
   

<!-- Backend -->

### Backend

Since node.js uses non-blocking IO, a significant reduction in the number of threads required for handling IO requests if otherwise, is possible. This results in making it a light-weight environment. Having looked at the various applications that seamlessly integrate into enhancing our web experience, let's consider the applications that node.js was initially built for.

1. **Network and API call**: We looked at the various libraries available that allow us to make API calls, in this [article](htgtps://www.section.io/engineering-education/http-requests-nodejs/). Have a look at it to get further insights. node.js gives us a greater level of control over the HTTP requests made. We can specify the headers, set up proxies, and receive responses in formats suitable to our application.   
2. **Database Integration**: Node.js has libraries and interfaces that allow seamless integration with databases. CRUD (Create, Read, Update, and Delete) operations are done using JS. Database integrations allow us to handle database operations in JavaScript, making the learning curve for databases lesser.   
3. **Operating System-Level Control over Application**: System level programming, considering the computational resources a program will use can be controlled using node.js. JavaScript provides features for concurrency and OS programming.  Let us look 
4. **Real-Time Applications**: Let us look at some examples of real-time applications. They range from software solutions like live streaming, real-time deliveries, and tracking, social networking platforms to hardware solutions such as Internet Of Things(IoT) Applications. All the features discussed above help in designing systems that are scalable, feature-rich. The advantages of having the codebase predominantly in one language enable developers to debug errors easily and build systems that are easily integrable with each other.

### Conclusion

In this article, we have considered the question of whether node.js is an environment for frontend or backend. node.js developed as a server-side runtime environment is extensively being used in frontend as well. node.js provides customizability, flexibility, and a large library of packages to help create feature-rich full-stack applications. Until the next article, be legendary.


