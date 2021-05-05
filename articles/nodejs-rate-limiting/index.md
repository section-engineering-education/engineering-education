### Node.js Rate Limiting

The rate-limiting feature makes it possible to secure the Backend API from malicious attacks. It allows us to cap the number of requests that a user can make to our APIs. We will cover various methods of implementing rate limiting with their pros and cons.


### Prerequisites
1. A General understanding of HTTP requests/responses.
2. Some knowledge of Node.js and REST APIs.
3. Knowledge of Node.js middlewares.


Rate limiting is a feature used to control outgoing and incoming requests in a server. We might limit the number of requests a user without a premium account makes to 100 to an hour. Once the user hits the limit then the API ignores the requests and returns an error message instead indicating that the user has exceeded the number of free requests.



### Rate limiting algorithms

#### Fixed window counter
A fixed window counter is a simple and most obvious way of implementing rate limiting. In this technique, we track the number of requests that a user makes in a window (time duration under consideration). For example, our API can allow 1000 requests per hour, meaning we have a 60-minute window.



### Conclusion
Now that you have learned various rate-limiting algorithms, try implementing the suitable rate-limiting algorithm in your application to protect your applications from malicious attacks i.e. DDOS.