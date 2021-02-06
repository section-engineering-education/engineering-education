To secure a communication between a client and a web server, we often need to associate an incoming request with a set of credentials for identity. We refer to this as authentication, which is used to recognize user identity against credential information such as usernames or passwords. In this article, we will compare cookie and token-based authentication and how they work.

### Prerequisites

In this article, you will need a basic understanding of the [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview). Understanding various security concerns on the web and the client-server architecture flow will be handy.

### Understanding cookie-based authentication
A cookie is a small piece of data created by a web server and sent to your browser when you visit a website. Browsers often need to store and send it back to the server to tell that the request is coming from the same browsers, to keep the user authenticated. We read the browser cookies as "key-value" pairs. A Cookie-based authentication uses the HTTP cookies to authenticate the client requests and maintain session information on the server over the stateless [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview).

Here is a logical flow of the authentication process:
1. Via the web interface, commonly the web forms, the client sends a login request with credentials on the backend server.

2. The server then validates the credentials. If the login is successful, the web server will create a session in the database and include a Set-Cookie header on the response containing a unique ID in the cookie object.

3. The browser saves the cookie locally. As long as the user stays logged in, the client needs to send the cookie in all the subsequent requests to the web-server. The server then compares the session ID stored in the cookie against the one in the database to verify the validity.
   
4. During the logout operation, the server will make the cookie expire by deleting it from the database.


### Advantages of cookie-based authentication
1. By using cookies in authentication makes your application stateful. This will be efficient in tracking and personalizing the state of a user.

2. Cookies size is small, making them efficient to store on the client-side.

3. Cookies can be "HTTP-only" making them impossible to read on the client-side. This improves protection against any Cross-site scripting (XSS) attacks.
   
4. Cookies will add to the request automatically, so the developer will not have to implement them manually and therefore less code.

### Limitations of cookie-based authentication
1. It is vulnerable to [Cross-site request forgery attack](https://www.mozilla.developer.org/en-US/docs/Glossary/CSRF). It often needs other security measures such as [CSRF tokens](https://www.portswigger.net/websecurity/csrf/tokens) for protection.
   
2. You need to store the session data in a database or keep it in memory on the server. This makes it less scalable and increases overhead when the site is having many users.

3. Cookies normally work on a single domain. An example, it is impossible to read or send a cookie from a domain like jabs.com to a boo.com domain. This is an issue when APIs service is from a different domain to the mobile and web platforms. 

4. The client needs to send a cookie on every request, even with the URLs that do not need authentication for access.

### Understanding Token-based authentication
In token-based authentication, we store the user's state on the client. JSON Web Token(JWT) is an open standard [(RFC 7519)](https://tools.ietf.org/html/rfc7519) that defines a way of securely transmitting information between a client and a server as a JSON object. I will use tokens and JWT terms interchangeably in the article. Check [jwt.io](https://jwt.io) to parse the JWT tokens.

The anatomy of a JWT token comprises three parts separated by dots(.). The three parts include the JWT header, the JWT payload, and  its signature respectively. An example of a JWT token will look like:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`. 
The header part example:
```JSON
    {
    "alg": "HS256",
    "typ": "JWT"
    }
```
The JWT Header is a Base64URL-encoded JSON object. It contains information describing the type of token and the signing algorithm used, such as HMAC, SHA256, or RSA.

The payload part example:
```JSON
    {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
    }
```
The JWT Payload contains claims which are pieces of information asserted about a subject. The claims have statements about the user and any other additional data. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature. Claims will either be registered, public or private.
Creating the JWT signature involves taking the encoded header, the encoded payload, a secret key, and applying the algorithm specified.
This an example from [jwt.io](https://jwt.io/):
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```
This will create a JWT token using the `HMAC SHA256` algorithm. This is the signature to verify that the token is not changed when the secret key is applied on the backend.
You can use [jwt.io](https://jwt.io/) to experiment with JSON Web Tokens by decoding and encoding them.
Authentication via tokens is a stateless mechanism, as no information about the user is ever stored in the server memory or databases. Therefore, there is no issue with the domains serving your APIs and [downstream services](https://en.wikipedia.org/wiki/Downstream_(software_development)).

Authentication process via tokens in a web application:
1. The user submits login credentials to the backend server.
   
2. Upon the request, the server verifies the credentials before generating an encrypted JWT with a secret key and sends it back to the client.
   
3. On the client-side, the browser store the token in the local storage, session storage, or cookie storage.
   
4. On future requests, the JWT is added to the authorization header prefixed by the bearer, and the server will validate its signature by decoding the token before proceeding to send a response. The content of the header is like this:
   `Authorization: Bearer <token>`.
     
5. On the logout operation, the token on the client-side is destroyed without server interaction.

Note, only include the information necessary in the JWT and remove any sensitive information to prevent Cross-site scripting(XSS) security attacks.


### Advantages of Token-based authentication approach

1. Token authentication approach is stateless. The web server will not need to keep a record of tokens as each is self-contained, including the data required to check its validity and convey the user information through claims. The server only needs to sign tokens on successful login and verify that incoming tokens in the requests are valid.
   
2. A token-based authentication approach with CORS enabled makes it easy to expose APIs to different services and domains. This means the API can serve both the web and mobile platforms like iOS and Android and are much easier to implement, making them mobile-ready.

3. The data is stored in the JWT meaning it can contain any type of data giving the flexibility on what information is to be included in the token.

4. It improves overall system performance. For example, if you had an API endpoint like /API/books that retrieves all books on the database where only users with the role of admin have access to this data. In a cookie-based approach, once the call is made to the server, you could have one call to the database to check that the session id in the cookie is valid, another one to get the data about the user and verify the admin role, and finally the third call to get the data. With a JWT approach, the role can be stored in the JWT itself where decoding it may take less time than database lookups, so once the call is made the server and the JWT is verified, a single call to the database can be fired to retrieve the books.
   
5. They are easier to maintain and scale horizontally in the distributed systems.

### Limitations of Token-based authentication
1. Storing a lot of data in the token makes it huge, which slows the requests.

2. Tokens cannot be used to authenticate a user in the background on the server since no session exists on the database.

3. Token storage on the client-side is problematic. When the token is stored in the cookie, they are less efficient where the JWT size is large. You can store the token in the session storage, but it's cleared when the browser is closed. In the local storage, the JWT will bound to a specific domain.
   
4. Token in the client-side might be hijacked by an attacker making it vulnerable to Cross-site scripting(XSS) attacks. This occurs when an outside entity can execute code within your domain by embedding malicious JavaScript on the page to read and compromise the contents of the browser storage.

### When to choose between token and cookie authentication
None of this approach is a silver bullet in your system protection.
In summary, choose token authentication when:
1. When there is a need to use different domains on the system. For example, if you are on a section.com domain that wants to send an authenticated request to a github.com domain, using tokens becomes handy. This is useful in building distributed systems, particularly microservices on the cloud, where servers are on different domains, yet there is a need for authentication across them.

2. Tokens will be useful when the API is being used by different platforms such as the web, IoT, and mobile devices.

Cookies are a great internet experience when:
1. When the user profile needs personalization. When we need user preferences such as themes, we need a cookie session in the database. Cookies are also used to help build targeted ads to different users.

2. If the site needs to track the user by analyzing and recording user behavior while navigating on the site. An example in shopping sites is the list of items a user recently viewed.
   
3. In session management. Sessions regarding logins, shopping carts, and game scores may need tracking and saving in a database. Without cookies, you will need to log in every time you leave a site or rebuild your shopping cart if a page is closed.


### Conculusion
In conclusion, authentication technology improves system security by granting authenticated users access to protected resources.
In this article, we compared cookie and token-based authentication.
We highlighted the advantages and disadvantages that arise by choosing either of the approaches. In the next article, we will implement this using the React client library and the Express server. I appreciate your time to read this article.
