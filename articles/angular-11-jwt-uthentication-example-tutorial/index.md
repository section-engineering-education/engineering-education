Almost no web application can function without a user registration and authentication system. A user is usually authenticated by entering a username or email address and password and then being given access to various resources or services. By its very existence, authentication relies on maintaining the user's state. This seems to go against HTTP's fundamental property of being a stateless protocol.  

JSON Web Tokens (JWTs) are one solution to this problem. Your Angular app will communicate with a backend that generates tokens. The Angular app can then send the token to the backend as an Authorization header to show they're authenticated. The JWT should be checked by the backend, and access should be granted based on its validity.  

This tutorial will walk you through the process of developing and implementing JWT-based authentication in an Angular 11 application step by step.  


### Implement a JWT Server and Client with PHP and Angular 11
In this part, I'll show you how to use PHP in conjunction with an Angular 11 client to implement JWT authentication. Even though the principle is clear, the implementation necessitates familiarity with security best practices.  

The example provided here is incomplete, and it lacks a number of features that a production server would have. I'd therefore not recommend the source code in this tutorial for production purposes.    

I'll presume you're familiar with JavaScript and PHP and have installed Node.js.  

### Building a JWT authentication 


