---
layout: engineering-education
status: publish
published: true
url: /cookie-vs-token-authentication/
title: Cookie vs Token authentication
description: This article provides readers with a detailed guide on Token based authentication and Cookie based authentication and the advantages and disadvantages of these approaches.
author: wilson-gichuhi
date: 2021-02-07T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cookie-vs-token-authentication/hero.jpg
    alt:  Cookie vs Token authentication Hero Image
---
To secure communication between a client and a server, we often need to associate an incoming request with a set of credentials for identity. We refer to this as authentication, which is used to recognize user identity against credential information such as usernames or passwords. In this article, we will compare cookie and token-based authentication and how they work.
<!--more-->
### Prerequisites
In this article, you will need a basic understanding of the [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview). Understanding various security concerns on the web and the client-server architecture flow will be handy.

### Understanding cookie-based authentication
A cookie is a small piece of data created by a server and sent to your browser when you visit a website. Browsers often need to store and send it back to the server to tell that the request is coming from the same browser, to keep the user authenticated. We read the browser cookies as "key-value" pairs. 

A Cookie-based authentication uses the HTTP cookies to authenticate the client requests and maintain session information on the server over the stateless [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview).

Here is a logical flow of the cookie-based authentication process:
1. The client sends a login request with credentials to the backend server.

2. The server then validates the credentials. If the login is successful, the web server will create a session in the database and include a `Set-Cookie` header on the response containing a unique ID in the cookie object.

3. The browser saves the cookie locally. As long as the user stays logged in, the client needs to send the cookie in all the subsequent requests to the server. The server then compares the session ID stored in the cookie against the one in the database to verify the validity.
   
4. During the logout operation, the server will make the cookie expire by deleting it from the database.

### Advantages of cookie-based authentication
- Using cookies in authentication makes your application stateful. This will be efficient in tracking and personalizing the state of a user.

- Cookies are small in size thus making them efficient to store on the client-side.

- Cookies can be "HTTP-only" making them impossible to read on the client-side. This improves protection against any Cross-site scripting (XSS) attacks.
   
- Cookies will be added to the request automatically, so the developer will not have to implement them manually and therefore requires less code.

### Limitations of cookie-based authentication
- It is vulnerable to [Cross-site request forgery attack](https://www.mozilla.developer.org/en-US/docs/Glossary/CSRF). It often needs other security measures such as [CSRF tokens](https://www.portswigger.net/websecurity/csrf/tokens) for protection.
   
- You need to store the session data in a database or keep it in memory on the server. This makes it less scalable and increases overhead when the site is having many users.

- Cookies normally work on a single domain. For example, it is impossible to read or send a cookie from a domain like jabs.com to a boo.com domain. This is an issue when the API service is from different domains for mobile and web platforms. 

- The client needs to send a cookie on every request, even with the URLs that do not need authentication for access.

### Understanding token-based authentication
In token-based authentication, we store the user's state on the client. JSON Web Token (JWT) is an open standard [(RFC 7519)](https://tools.ietf.org/html/rfc7519) that defines a way of securely transmitting information between a client and a server as a JSON object. I will use tokens and JWT terms interchangeably in the article. 

The [jwt.io](https://jwt.io) website can be used to parse the JWT token information. You can use [jwt.io](https://jwt.io/) to experiment with JSON Web Tokens by decoding and encoding them.

The anatomy of a JWT token comprises three parts separated by dots(.). The three parts include the JWT header, the JWT payload, and its signature respectively (`header.payload.signature`). 

Example of a JWT token:

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
``` 

The JWT Header is a Base64 URL-encoded JSON object. It contains information describing the type of token and the signing algorithm used, such as HMAC, SHA256, or RSA.

Example:

```JSON
{
   "alg": "HS256",
   "typ": "JWT"
}
```

The JWT Payload contains claims that are pieces of information asserted about a subject. The claims will contain the statements about the user and any other additional data. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature. Claims will either be registered, public or private.

Example:

```JSON
{
   "sub": "1234567890",
   "name": "John Doe",
   "admin": true
}
```

Creating the JWT signature involves taking the encoded header, the encoded payload, a secret key, and applying the algorithm specified.

Example:

```bash
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

This will create a JWT token using the `HMAC SHA256` algorithm. This is the signature to verify that the token is not changed when the secret key is applied on the backend.

Authentication via tokens is a stateless mechanism, as no information about the user is ever stored in the server memory or databases. Therefore, there is no issue with the domains serving your APIs and [downstream services](https://en.wikipedia.org/wiki/Downstream_(software_development)).

Authentication process via tokens in a web application:
1. The user submits login credentials to the backend server.
   
2. Upon the request, the server verifies the credentials before generating an encrypted JWT with a secret key and sends it back to the client.
   
3. On the client-side, the browser stores the token locally using the local storage, session storage, or cookie storage.
   
4. On future requests, the JWT is added to the authorization header prefixed by the bearer, and the server will validate its signature by decoding the token before proceeding to send a response. The content of the header would look like this: `Authorization: Bearer <token>`.
     
5. On the logout operation, the token on the client-side is destroyed without server interaction.

>Note, only include the information necessary in the JWT and remove any sensitive information to prevent Cross-site scripting (XSS) security attacks.

### Advantages of token-based authentication approach
- Token authentication approach is stateless. The web server will not need to keep a record of tokens as each is self-contained, including the data required to check its validity and convey the user information through claims. The server only needs to sign tokens on successful login and verify that incoming tokens in the requests are valid.
   
- A token-based authentication approach with CORS enabled makes it easy to expose APIs to different services and domains. This means the API can serve both the web and mobile platforms like iOS and Android and are much easier to implement, making them mobile-ready.

- The data is stored in the JWT, meaning it can contain any type of data giving the flexibility on what information is to be included in the token.

- It improves overall system performance. For example, if you had an API endpoint like `/api/books` that retrieves all books on the database where only users with the role of admin have access to this data. In a cookie-based approach, once the call is made to the server, you could have one call to the database check that the session id in the cookie is valid, another one to get the data about the user and verify the admin role, and finally the third call to get the data. With a JWT approach, the role can be stored in the JWT itself where decoding it may take less time than database lookups. So, once the call is made to the server and the JWT is verified, a single call to the database can be fired to retrieve the books.
   
- They are easier to maintain and scale horizontally in the distributed systems.

### Limitations of Token-based authentication
- Storing a lot of data in the token makes it huge, which slows the requests.

- Tokens cannot be used to authenticate a user in the background on the server since no session exists on the database.

- Token storage on the client-side is problematic. When the token is stored in the cookie, they are less efficient when the JWT size is large. You can store the token in the session storage, but it's cleared when the browser is closed. In the local storage, the JWT will be bound to a specific domain.
   
- Token in the client-side might be hijacked by an attacker making it vulnerable to Cross-site scripting (XSS) attacks. This occurs when an outside entity can execute code within your domain by embedding malicious JavaScript on the page to read and compromise the contents of the browser storage.

### When to choose between token and cookie authentication
Both approaches are not a silver bullet when protecting your system.

In summary, it is wise to *choose token authentication when:*
- When there is a need to use different domains on the system. For example, if you are on a section.com domain that wants to send an authenticated request to the github.com domain, using tokens becomes handy. This is useful in building distributed systems, particularly microservices on the cloud, where servers are on different domains, yet there is a need for authentication across them.

- Tokens will be useful when the API is being used by different platforms such as the web, IoT, and mobile devices.

*Choose cookie authentication when:*
- When the user profile needs personalization. When we need user preferences such as themes, we would use a cookie session in the database. Cookies are also used to help build targeted ads for different users.

- If the site needs to track the user by analyzing and recording user behavior while navigating on the site. An example in shopping sites is the list of items a user recently viewed.
   
- Sessions regarding logins, shopping carts, and game scores may need tracking and saving in a database. Without cookies, you will need to log in every time you leave a site or rebuild your shopping cart if a page is closed.

### Conculusion
Authentication improves system security by granting authenticated users access to protected resources.

In this article, we compared cookie-based authentication and token-based authentication. We highlighted the advantages and disadvantages that arise by choosing either of these approaches.

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)

