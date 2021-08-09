# Implementing Video Conferencing with ReactJS, NodeJS and WebRTC

### Introduction:
Developers around the world have an incredible task of handling client requirements, and video conferencing is one of those requirements developers experience difficulty implementing due to its complexity. The pandemic has opened up opportunities in remote work and “work from home” which comes at the cost of efficient video conferencing and packets handling.
ReactJS and webRTC provides an excellent tool for making the implementation of web-based video conferencing seamlessly easy. We will take a deep dive into the details of using these frameworks to efficiently and effectively develop a video conferencing handler.

### Prerequisites:
For better understanding and utilization of this article, the reader is expected to have basic knowledge of the following
- Geting started with ReactJS ES6
- Getting started with Nodejs 
- Getting started with Graphql and
- WebRTC

### Fundamentals of Web-Based Video Conferencing:
Video conferencing is essentially the visual interaction between two or more nodes connected to the internet. It provides the transmission of static images, texts, full motion and high-definition audio between multiple nodes
Implementing video conferencing requires basic knowledge of the following concepts

- WebRTC
- Graphql
- Nodejs
- ReactJS

#### WebRTC: 
WebRTC is an open-source technology that provides real-time communication capabilities to an application. It supports video, audio and other kinds of data to be transferred between nodes. It also allows developers to integrate voice and video functionalities into their application effortlessly.

### Components of Video Conferencing System:
Web-based video conferencing involves the synergy of the various frameworks and libraries which includes the following

- A network connection for audio and video data transfer which involves the use of 3G, 4G or 5G broadband
- Voice over data internet protocol (VoIP), Integrated service Digital Networks (ISDN)
- Microphones and Webcams
- Display screen, monitor or projector
- Software-based coding and decoding technologies (CODEC)
- Acoustic echo cancellation (AEC) software for audio optimization and real-time communication.

### Requirements for Web Packets Handling:
For a network communication to succeed it is necessary to have a unified standard for defining the architecture of communication systems. A digital environment supporting multiple data types including audio and video significantly increases the efficiency of a video conferencing application including greater bandwidth utilization.

### Implementation and Coding:
The application being a full stack project is divided into two segments, namely

1. The Client-Side and
2. The Server-Side

### Client-Side Setup - (index.js):
The Client interface is setup using ReactJS which is a lightweight frontend JavaScript library. the various pages and subdivision of the client interface includes the following

#### Step 1. Getting started with a new React app:
npx

    npx create-react-app react-video-conferencing-app

npm

    npm init react-app react-video-conferencing-app

yarn

    yarn create react-app react-video-conferencing-app

the above command should get you started with a new react app with all the default dependencies appropriately installed.

    cd react-video-conferencing-app
    npm start

the above command will change the directory to your new react app and get the development server running.

#### Step 2. Installing the required Client dependencies: 
For a successful development of the application a few dependencies must be installed to enable react process and perform specific instructions and they include the following.

    javascript
    npm install
    Or
    yarn add
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

#### Step 3. Setting up the Client Index file:
This file is the main file for integrating the client and the server codes together. It also enables the initialization of React DOM element, the Apollo-Client elements, WebRTC adapter and the other facilities for the implementation of the application.  

    javascript
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

#### Step 4. Setting up the routes and other pages for the client UI:
The application is divided into five (5) pages namely

- Home Page
- Login/ Sign-Up Page
- Contacts Page
- Message Page
- Settings Page

And their respective routes are implemented as follows

    javascript
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

#### Step 5. Setting up the Video components:
The video component is the essential component of the application as it facilitates the connection and communication between the various nodes in the application. It also attaches event listeners to the microphone and webcam of the connected devices.
It also enables the following operations

- Call Statuses
- Accept Call
- Ignore Call
- Hang Up

The implementation of the video component is illustrated below

    javascript
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

### Server-Side Setup
The first task in getting the server instance ready for subsequent development involves the following

    Mkdir server
    Cd server

Ensure that the server folder is in the main application folder containing the client
Npm

    npm init

Yarn

    yarn init

the above command should initialize your server instance, ensure the instructions are followed appropriately.

### Installing the Required Server Dependencies

    npm install
    Or
    yarn add
    javascript
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

### Setting Up the Server – (index.js)
The Backend server is setup using Nodejs and Graphql. In order to guarantee optimal operation of the application, it is essential to have a robust server instance. Here is the basic Nodejs setup for the server 

    javascript
    import express from 'express';
    import bodyParser from 'body-parser';
    import morgan from 'morgan';
    import path from 'path';
    import compression from 'compression';
    import cors from 'cors';
    import models from './models';
    import deserealizeUser from './lib/deserealize-user';
     
    // globals
    global.models = models;
    const app = express();
    app.enable('trust proxy');
    // Dev middleware
    app.use(morgan('dev'));
    // App middleware
    app.use(cors({ credentials: true }));
    app.use(bodyParser.urlencoded({ extended: false, limit: '2mb' }));
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(compression());
    app.use(express.static(path.join('.', '/public')));
    // Views
    app.set('view engine', 'pug');
    app.set('views', path.join('.', '/views/'));
    app.use(deserealizeUser);
     
    export default app;

### Setting-up Graphql server
In this project, Graphql server is the tool used to interface between the client and the server to provide a robust mechanism for video and audio data transfer between both interfaces. Graphql servers comes with fully equipped mutations for data modification and alteration, query for data fetch and subscription for real-time data instance monitoring.   Below is the setup of the Graphql server.

    javascript
    import graphqlExpress from 'express-graphql';
    import debug from 'debug';
    import { createServer } from 'http';
    import { execute, subscribe } from 'graphql';
    import { SubscriptionServer } from 'subscriptions-transport-ws';
    module.exports = function startServer() {
      /* eslint-disable global-require */
      if (!process.env.NODE_ENV) require('dotenv').load();
     
      const app = require('../src/server/app').default;
      const schema = require('../src/server/schema').default;
      const render = require('../src/server/routes/render').default;
     
      app.post('/graphql', graphqlExpress({ schema, graphiql: false }));
      app.use(render);
      const server = createServer(app);
      /**
       * onListen callback for server
       * @returns {undefined}
       */
      function onListen() {
        console.log(`Listening on port ${process.env.PORT}`);
        const addr = server.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        debug(`Listening on ${bind}`);
      }
      /**
       * onError callback
       * @param {Error} err the error
       * @returns {undefined}
       */
      function onError(err) {
        if (err.syscall !== 'listen') throw err;
        const bind = typeof port === 'string' ? `Pipe ${process.env.PORT}` : `Port ${process.env.PORT}`;
        switch (err.code) {
          case 'EACCESS':
            console.log(`${bind} requires elevated privilege`);
            break;
          case 'EADDRINUSE':
            console.log(`${bind} is already in use`);
            break;
          default:
            throw err;
        }
      }
      server.on('listening', onListen);
      server.on('error', onError);
      server.listen(process.env.PORT, () => new SubscriptionServer(
        {
          keepAlive: 1000,
          schema,
          execute,
          subscribe,
          onConnect: () => ({ app }),
        },
        {
          server,
          path: '/subscriptions',
        },
      ));
    };

### Setting Up the Required Mutations, Queries and Subscriptions
#### Step 1: The first mutation will be to establish connection with the second user for data transfer. Below is the code implementation of the mutation

    javascript
    import { GraphQLObjectType, GraphQLInt, GraphQLBoolean, GraphQLString } from 'graphql';
     
    export default {
      type: new GraphQLObjectType({
        name: 'CreateMessageThreadResponse',
        fields: {
          success: { type: GraphQLBoolean },
          message: { type: GraphQLString },
          threadId: { type: GraphQLInt },
        },
      }),
      name: 'CreateMessageThread',
      args: {
        contactId: { type: GraphQLInt },
      },
      async resolve(parent, { contactId }) {
        try {
          const contact = await models.contact.findById(contactId, { where: { blocker_id: null } });
          if (!contact) return { success: false, message: 'That contact is no longer reachable' };
          const thread = await models.message_thread.create({
            contact_id: contactId,
            user_1: contact.user_1,
            user_2: contact.user_2,
          });
          return { success: true, message: 'Success', threadId: thread.id };
        } catch (err) {
          console.log(err);
          return { success: false, message: 'Something went wrong creating your message' };
        }
      },
    };

####Step 2: Now that our mutation is up and running, we need to setup the query to facilitate data fetch and retrieval for the client. Below is the Graphql server setup.

    javascript
    import { GraphQLList } from 'graphql';
    import Promise from 'bluebird';
    import moment from 'moment';
    import ContactRequest from '../types/ContactRequest';
     
    export default {
      type: new GraphQLList(ContactRequest),
      name: 'ContactRequests',
      async resolve(parent, args, req) {
        try {
          const pendingRequests = await models.contact_request.findAll({
            where: {
              recipient_id: req.user && req.user.id,
              status: models.contact_request.statuses.PENDING,
            },
            include: [{
              model: models.user,
              as: 'sender',
            }],
            order: [['createdAt', 'DESC']],
            limit: 100,
          });
          await Promise.map(pendingRequests, async (request) => {
            if (moment(request.createdAt) < moment().startOf('day').subtract(1, 'month')) {
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

#### Step 3: To enable real-time sockets monitoring, Graphql provides a tool called Subscription. Below is the subscription setup

    javascript
    import { RedisPubSub } from 'graphql-redis-subscriptions';
    import url from 'url';
     
    export * from './constants';
    const redisUrl = url.parse(process.env.REDISCLOUD_URL);
    export default new RedisPubSub({
      connection: {
        host: redisUrl.hostname,
        port: redisUrl.port,
        password: redisUrl.auth.split(':')[1],
      },
      retry_strategy: options => Math.max(options.attempt * 100, 3000),
    });

### Error Handling and Testing
Applications as we know it has its own fair share of bugs and errors and handling these errors is a crucial part of application development. Graphql posses some errors that we will briefly look at and the ways of handling them.

- Server Errors: these errors occur in the server and prevents appropriate server response to client-side queries and mutations.
- Transaction Errors: these errors occur while a server update such as a mutation is being executed
- Apollo Client Errors: these errors occur within the core or corresponding libraries.

 To set error policy on each request the following code block provided by Graphql should be integrated. Any error reported will fall under the ‘error’ prop along side the data returned from the server or cache

    javascript
    const MY_QUERY = gql`
      query WillFail {
        badField
        goodField
      }
    `;
    function ShowingSomeErrors() {
      const { loading, error, data } = useQuery(MY_QUERY, { errorPolicy: 'all' });
     
      if (loading) return <span>loading...</span>
      return (
        <div>
          <h2>Good: {data.goodField}</h2>
          <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
          </pre>
        </div>
      );
    }

#### Ignoring Errors
Errors may be ignored during application development. These errors are expected errors that the developer feels unbothered about, to achieve that the following code block should be integrated

    javascript
    onError(({ response, operation }) => {
      if (operation.operationName === "IgnoreErrorsQuery") {
        response.errors = null;
      }
    })

#### Using React Testing Library
React testing library is an excellent tool used in application modules and components testing. It is a lightweight solution for testing react components as it provides utility functions on top of **react-dom** and **react-dom/test-utils.** this is implemented using the following command

    javascript
    npm install --save-dev @testing-library/react
    or
    yarn add @testing-library/react
    and
    node build/start

### Conclusion
In this article we had an in-depth look at the various concepts, fundamentals, components and requirements for implementing a web-based video conferencing application with ReactJs, Nodejs, Graphql and WebRTC. Other areas such as error handling and testing were also discussed. I hope you find this article useful in your journey as a web developer.

Best Regards and Happy Coding
Cheers!

### References:
Centralized Conferencing (xcon). Left.org. 2014-07-16. Retrieved 2019-07-11

https://testing-library.com/docs/react-testing-library/intro/


https://www.apollographql.com/docs/react/v2/data/error-handling/

### About the Author:
Samuel Cletus
Samuel is an undergraduate student of computer engineering in Nigeria. He is also a full stack web developer and highly skilled in React, Node and Graphql web frameworks. He enjoys writing codes, watching Tv and making friends.
![mypicture](https://user-images.githubusercontent.com/68573570/128695123-a9e12eb2-3d03-4e09-be93-7bb784010a02.jpg)


### Hero
![Hero](https://user-images.githubusercontent.com/68573570/128691361-59d0ea70-00b7-407a-bd9f-f292367ea444.jpg)


---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
