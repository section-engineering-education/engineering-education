---
layout: engineering-education
status: publish
published: true
url: /video-conferencing-app-with-react-node/
title: Implementing Video Conferencing with React, Node.js, and WebRTC
description: This article will help the reader understand the various components and requirements for implementing a web-based video conferencing application with React, Node.js, Graphql and WebRTC.
author: samuel-cletus
date: 2021-08-20T00:00:00-06:10
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/video-conferencing-app-with-react-node/hero.jpg
    alt: Implementing Video Conferencing with React, Node.js, and WebRTC 
---
Video conferencing is a key feature in the modern world. However, most developers experience difficulties implementing it due to its complexity. 
 <!--more-->
The pandemic has opened up an opportunity for people to work from home. However, this requires efficient video conferencing and packet handling.

React.js and WebRTC are excellent platforms for the development of web-based video conferencing applications. 

We will take a deep dive into these frameworks by developing a video conferencing handler.

### Prerequisites
To follow along, the reader should have some basic knowledge of the following:
- Getting started with React.js ES6
- Getting started with Node.js and Command Terminal
- Getting started with Graphql and WebRTC

### Fundamentals of web-based video conferencing
Video conferencing is the visual interaction between two or more nodes connected to the internet. 
It supports the transmission of static images, texts, full-motion, and high-definition audio between multiple nodes.

### WebRTC
[WebRTC](https://webrtc.org/) is an open-source technology that provides real-time communication capabilities to an application. It supports video, audio and other kinds of data to be transferred between nodes. 

In other words, it enables developers to integrate voice and video functionalities into their applications.

### Components of video conferencing system
Web-based video conferencing involves the synergy of various frameworks and libraries which include the following:

- A network connection for audio and video data transfer that involves the use of 3G, 4G, or 5G broadband.
- Voice over Internet Protocol (VoIP) and Integrated Service Digital Networks (ISDN).
- Microphones and webcams.
- Display screen or projector.
- Software-based coding and decoding technologies (CODEC).
- Acoustic Echo Cancellation (AEC) software for audio optimization and real-time communication.

### Requirements for web packets handling
For network communication to succeed, it is necessary to have a unified standard for defining the architecture of communication systems. 

A digital environment supporting multiple data types including audio and video significantly increases the efficiency of a video conferencing application including greater bandwidth utilization.

### Implementation and coding
The application is a full-stack project that is divided into two segments:
1. The client-side
2. The server-side

### Client-side setup - (index.js)
The client interface is set up using `React.js` which is a lightweight frontend Javascript library. The various pages of the client interface include the following:

#### Step 1: Getting started with a new React app

```bash
npx create-react-app react-video-conferencing-app
```

The command above should get you started with a new React app with all the default dependencies installed.

```bash
cd react-video-conferencing-app
npm start
```

The command above will change the directory to your new react app and start the development server.

#### Step 2: Installing the required client dependencies
For successful development, a few dependencies must be installed. They enable the React app, as well as perform specific instructions. 

We install the dependencies by running `npm install` or `yarn add` to initialize an empty Node.js project in the terminal.

Add the following dependencies in the `package.json` file and then run `npm install` to download them.

```json
 "apollo-cache-inmemory": "^1.1.9",
 "apollo-client": "^2.2.5",
 "apollo-client-preset": "^1.0.8",
 "apollo-link-http": "^1.4.0",
 "apollo-link-schema": "^1.0.6",
 "apollo-link-ws": "^1.0.7",
 "apollo-utilities": "^1.0.10",
 "classnames": "^2.2.5",
 "react-apollo": "^2.0.4",
 "react-dom": "^16.2.0",
 "react-redux": "^5.0.7",
 "react-router": "^4.2.0",
 "react-router-config": "^1.0.0-beta.4",
 "react-router-dom": "^4.2.2",
 "react-stay-scrolled": "^2.1.1",
 "redux": "^3.7.2",
 "redux-actions": "^2.2.1",
 "redux-devtools-extension": "^2.13.2",
 "redux-thunk": "^2.2.0",
 "socket.io": "^2.4.0",
 "socket.io-client": "^2.0.4",
 "socket.io-redis": "^5.2.0",
 "socketio-jwt": "^4.5.0",
 "style-loader": "^0.20.2",
```

#### Step 3: Setting up the client index file
This is the main file for integrating the client and the server code. It enables the initialization of the React DOM element, Apollo-Client elements, and the WebRTC adapter. 

```js
 import 'webrtc-adapter';
 import { InMemoryCache } from 'apollo-cache-inmemory';
 import { ApolloClient } from 'apollo-client';
 import { split } from 'apollo-client-preset';
 import { HttpLink } from 'apollo-link-http';
 import { WebSocketLink } from 'apollo-link-ws';
 import { getMainDefinition } from 'apollo-utilities';
 import React from 'react';
 import { ApolloProvider } from 'react-apollo';
 import ReactDOM from 'react-dom';
 import { Provider } from 'react-redux';
 import { renderRoutes } from 'react-router-config';
 import { BrowserRouter } from 'react-router-dom';
 import './styles/index.scss';
 import routes from './routes';
 import store from './store';
 import { setToken } from './actions/token';
 store.dispatch(setToken(window.__JWT_TOKEN__));

 const httpLink = new HttpLink({
   uri: process.env.GRAPHQL_URI,
   credentials: 'same-origin',
 });

 const wsLink = new WebSocketLink({
   uri: process.env.GRAPHQL_WS_URI,
   options: {
     reconnect: true,
   },
 });

 const subscriptionMiddleware = {
   applyMiddleware(options, next) {
     const { token } = store.getState();
     options.connectionParams = { authToken: token };
     next();
   },
 };

 wsLink.subscriptionClient.use([subscriptionMiddleware]);
 const link = split(
   ({ query }) => {
     const { kind, operation } = getMainDefinition(query);
     return kind === 'OperationDefinition' && operation === 'subscription';
   },
   wsLink,
   httpLink,
 );

 const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

 const client = new ApolloClient({ link, cache, connectToDevTools: process.env.NODE_ENV === 'development' });
 delete window.__APOLLO_STATE__;
 delete window.__JWT_TOKEN__;

   render() {
     return (
       <Provider store={store}>
         <ApolloProvider client={client}>
           <BrowserRouter>
             {renderRoutes(routes, { userAgent: navigator.userAgent })}
           </BrowserRouter>
         </ApolloProvider>
       </Provider>
     );
   }
 }
 function render() {
   ReactDOM.hydrate(
     <Routes />,
     document.getElementById('entry-point')
 }
 render();
```

#### Step 4: Setting up client-side routes and pages
The application has five major pages:

- Home Page
- Login/ Sign-Up Page
- Contacts Page
- Message Page
- Settings Page

And their respective routes are implemented as follows:

```js
  import React from 'react';
  import { Redirect } from 'react-router';
  import {
    INDEX_ROUTE,
    LOGIN_ROUTE,
    SIGNUP_ROUTE,
    CONTACTS_ROUTE,
    MESSAGES_ROUTE,
    CONTACT_REQUESTS_ROUTE,
    SETTINGS_ROUTE,
  } from '../constants';

  import PageLayout from '../containers/PageLayout';
  import Login from '../containers/Login';
  import Signup from '../containers/Signup';
  import Contacts from '../containers/Contacts';
  import Messages from '../containers/Messages';
  import Settings from '../containers/Settings';

  export default [{
    component: PageLayout,
    routes: [
      { path: INDEX_ROUTE, exact: true, component: () => <Redirect to={CONTACTS_ROUTE} /> },
      { path: LOGIN_ROUTE, component: Login },
      { path: SIGNUP_ROUTE, component: Signup },
      { path: CONTACTS_ROUTE, component: Contacts },
      { path: MESSAGES_ROUTE, component: Messages },
      { path: SETTINGS_ROUTE, component: Settings },
    ],
  }];
  ```

#### Step 5: Setting up the video components
The video component is essential since it facilitates the connection and communication between various nodes in the application.

It also attaches` event listeners` to the microphone and webcam of the connected devices.

The video component enables the following operations:
- Call status
- Accept call
- Ignore call
- Hang up

The implementation of the video component is illustrated below:

```js
  import React from 'react';
  import PropTypes from 'prop-types';
  import { connect } from 'react-redux';
  import classNames from 'classnames';

  import { preferOpus } from '../helpers/sdp-helpers';
  import {
    CallStatuses,
    acceptCall,
    ignoreCall,
    handleIceCandidate,
    sendSessionDescription,
    setCallStatusToInCall,
    setCallStatusToAvailable,
    setCallStatusToHangingUp,
    emitHangup,
  } from '../actions/call';

  import { addError } from '../actions/error';
  import Available from '../components/VideoChat/Available';
  import Calling from '../components/VideoChat/Calling';
  import ReceivingCall from '../components/VideoChat/ReceivingCall';
  import Controller from '../components/VideoChat/Controller';
  import CallOverlay from '../components/VideoChat/CallOverlay';
  import BannerContainer from '../components/Layout/BannerContainer';

   startPeerConnection() {
      try {
        this.peerConnection = new RTCPeerConnection({
          iceServers: this.props.iceServerConfig,
        });
        this.peerConnection.onicecandidate = this.props.handleIceCandidate;
        this.peerConnection.onaddstream = this.onRemoteStreamAdded.bind(this);
        this.peerConnection.onremovestream = this.onRemoteStreamRemoved.bind(this);
        this.peerConnection.addStream(this.localStream);
        if (!this.state.isInitiator) return;
        this.peerConnection.createOffer(
          this.setLocalDescriptionAndSendToPeer.bind(this),
          e => (
            console.log('createOffer() error', e)
            || this.props.addError('Something went wrong setting up the peer connection')
          )
        );
      } catch (err) {
        console.error(err);
        this.props.addError('Failed to create a connection.');
        this.startHangup();
      }
    }

   toggleAudioTrack() {
      return this.localStream.getAudioTracks().forEach(
        track => track.enabled = !track.enabled
      );
    }
    /**
     * @returns {undefined}
     */
    toggleVideoTrack() {
      return this.localStream.getVideoTracks().forEach(
        track => track.enabled = !track.enabled
      );
    }

  return (
        <div className="video-chat-container">
          <BannerContainer />
          <div className="remote-video-container">
            {[
              CallStatuses.AcceptingCall,
              CallStatuses.HangingUp,
            ].includes(this.props.status)
              && <CallOverlay />}
            <video
              ref={node => this.remoteVideo = node}
              className={classNames(
                'remote-video',
                [
                  CallStatuses.AcceptingCall,
                  CallStatuses.HangingUp,
                ].includes(this.props.status) && 'partially-transparent',
              )}
              autoPlay
            >
              <track kind="captions" />
            </video>
            <video
              ref={node => this.localVideo = node}
              className="local-video"
              autoPlay
              muted="muted"
            >
              <track kind="captions" />
            </video>
          </div>
          <Controller startHangup={this.startHangup} />
        </div>
      );
```

### The server-side setup
Preparing the server instance involves the following:

```bash
mkdir server
cd server
```

> Ensure that the server folder is in the main application folder containing the client-side code.

```bash
npm init
```

The command above should initialize the server instance.

### Installing the required server dependencies
For Node.js to perform the required server operations, some dependencies must be installed in the server folder. 

We do this by running the command below:

```bash
npm install
```

```json
"bcrypt": "^5.0.0",
"bluebird": "^3.5.1",
"body-parser": "^1.18.2",
"cors": "^2.8.4",
"css-loader": "^0.28.10",
"debug": "^3.1.0",
"dotenv": "^5.0.0",
"enum": "^2.5.0",
"express": "^4.16.2",
"express-graphql": "^0.6.12",
"express-jwt": "^6.0.0",
"extract-text-webpack-plugin": "^3.0.2",
"graphql": "^0.13.1",
"graphql-redis-subscriptions": "^1.4.0",
"graphql-subscriptions": "^0.5.8",
"graphql-tag": "^2.8.0",
"jsonwebtoken": "^8.1.1",
"lodash.clonedeep": "^4.5.0",
"lodash.debounce": "^4.0.8",
"lodash.isequal": "^4.5.0",
```

### Setting up the server – (index.js)
The backend server is set up using `Node.js` and `Graphql`. To guarantee optimal performance, it is essential to have a robust server instance. 

Here is the basic Node.js server setup:

```js
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import compression from "compression";
import cors from "cors";
import models from "./models";
import deserealizeUser from "./lib/deserealize-user";

// globals
global.models = models;
const app = express();
app.enable("trust proxy");
// Dev middleware
app.use(morgan("dev"));
// App middleware
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false, limit: "2mb" }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(compression());
app.use(express.static(path.join(".", "/public")));
// Views
app.set("view engine", "pug");
app.set("views", path.join(".", "/views/"));
app.use(deserealizeUser);

export default app;
```

### Setting-up Graphql server
The Graphql server acts as an interface between the client and the server to provide a robust mechanism for video and audio data transfer. 

Graphql servers are fully equipped with mutations for data modification and alteration, query for data fetching, and subscription for real-time data instance monitoring. 

Below is the setup of the Graphql server:

```js
import graphqlExpress from "express-graphql";
import debug from "debug";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";

module.exports = function startServer() {
  /* eslint-disable global-require */
  if (!process.env.NODE_ENV) require("dotenv").load();

  const app = require("../src/server/app").default;
  const schema = require("../src/server/schema").default;
  const render = require("../src/server/routes/render").default;

  app.post("/graphql", graphqlExpress({ schema, graphiql: false }));
  app.use(render);
  const server = createServer(app);
  /**
   * onListen callback for server
   * @returns {undefined}
   */
  function onListen() {
    console.log(`Listening on port ${process.env.PORT}`);
    const addr = server.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }
  /**
   * onError callback
   * @param {Error} err the error
   * @returns {undefined}
   */

  function onError(err) {
    if (err.syscall !== "listen") throw err;
    const bind =
      typeof port === "string"
        ? `Pipe ${process.env.PORT}`
        : `Port ${process.env.PORT}`;
    switch (err.code) {
      case "EACCESS":
        console.log(`${bind} requires elevated privilege`);
        break;
      case "EADDRINUSE":
        console.log(`${bind} is already in use`);
        break;
      default:
        throw err;
    }
  }

  server.on("listening", onListen);
  server.on("error", onError);
  server.listen(
    process.env.PORT,
    () =>
      new SubscriptionServer(
        {
          keepAlive: 1000,
          schema,
          execute,
          subscribe,
          onConnect: () => ({ app }),
        },
        {
          server,
          path: "/subscriptions",
        }
      )
  );
};
```

### Setting up the required mutations, queries, and subscriptions
#### Step 1
The first mutation is used to establish a data transfer connection with the second user. 

Below is the code implementation of the mutation:

```js
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
} from "graphql";

export default {
  type: new GraphQLObjectType({
    name: "CreateMessageThreadResponse",
    fields: {
      success: { type: GraphQLBoolean },
      message: { type: GraphQLString },
      threadId: { type: GraphQLInt },
    },
  }),
  name: "CreateMessageThread",
  args: {
    contactId: { type: GraphQLInt },
  },
  async resolve(parent, { contactId }) {
    try {
      const contact = await models.contact.findById(contactId, {
        where: { blocker_id: null },
      });
      if (!contact)
        return {
          success: false,
          message: "That contact is no longer reachable",
        };
      const thread = await models.message_thread.create({
        contact_id: contactId,
        user_1: contact.user_1,
        user_2: contact.user_2,
      });
      return { success: true, message: "Success", threadId: thread.id };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Something went wrong creating your message",
      };
    }
  },
};
```

#### Step 2
Now that our mutation is up and running, we need to set up the query to facilitate data fetch and retrieval for the client. 

Below is the Graphql server setup:

```js
import { GraphQLList } from "graphql";
import Promise from "bluebird";
import moment from "moment";
import ContactRequest from "../types/ContactRequest";

export default {
  type: new GraphQLList(ContactRequest),
  name: "ContactRequests",
  async resolve(parent, args, req) {
    try {
      const pendingRequests = await models.contact_request.findAll({
        where: {
          recipient_id: req.user && req.user.id,
          status: models.contact_request.statuses.PENDING,
        },
        include: [
          {
            model: models.user,
            as: "sender",
          },
        ],
        order: [["createdAt", "DESC"]],
        limit: 100,
      });
      await Promise.map(pendingRequests, async (request) => {
        if (
          moment(request.createdAt) <
          moment().startOf("day").subtract(1, "month")
        ) {
          request.status = models.contact_request.statuses.EXPIRED;
          await request.save();
        }
      });
      return pendingRequests;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
};
```

#### Step 3
Graphql provides a tool called `subscription` to enable real-time sockets monitoring. 

Below is the subscription setup:

```js
import { RedisPubSub } from "graphql-redis-subscriptions";
import url from "url";

export * from "./constants";

const redisUrl = url.parse(process.env.REDISCLOUD_URL);
export default new RedisPubSub({
  connection: {
    host: redisUrl.hostname,
    port: redisUrl.port,
    password: redisUrl.auth.split(":")[1],
  },
  retry_strategy: (options) => Math.max(options.attempt * 100, 3000),
});
```

### Error handling and testing
Applications usually have bugs and errors. Therefore, handling these errors is a crucial part of application development. 

Graphql has several errors that we will analyze and resolve.

They include:
- Server errors - These errors occur in the server and prevent appropriate server response to client-side queries and mutations.
- Transaction errors - They occur while a server updates. For instance, when a mutation is being executed.
- Apollo client errors - These errors occur within the core of corresponding libraries.

To set the error policy on each request, the following code block provided by Graphql should be integrated. 

Any error reported will fall under the `error` prop alongside the data retrieved from the server or cache.

```js
const MY_QUERY = gql`
  query WillFail {
    badField
    goodField
  }
`;
function ShowingSomeErrors() {
  const { loading, error, data } = useQuery(MY_QUERY, { errorPolicy: "all" });

  if (loading) return <span>loading...</span>;
  return (
    <div>
      <h2>Good: {data.goodField}</h2>
      <pre>
        Bad:{" "}
        {error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </pre>
    </div>
  );
}
```

#### Ignoring errors
Errors may be ignored during application development. In such cases, we wish to return `null` if an error occurs during the code execution process. 

We achieve this functionality using the following code block:

```js
onError(({ response, operation }) => {
  if (operation.operationName === "IgnoreErrorsQuery") {
    response.errors = null;
  }
});
```

#### Using React testing library
The React testing library is a lightweight solution for testing React components as it provides utility functions on top of **react-dom** and **react-dom/test-utils**. 

It is implemented using the following command:

```bash
npm install --save-dev @testing-library/react
node build/start
```

### Conclusion
This article explained the fundamentals, components, and requirements for implementing a web-based video-conferencing application. We also discussed error handling and testing. 

I hope you find this article useful in your journey as a web developer.

Happy Coding!

### Further reading
- [React testing library](https://testing-library.com/docs/react-testing-library/intro/)

- [Apollo Graphql](https://www.apollographql.com/docs/react/v2/data/error-handling/)


---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
