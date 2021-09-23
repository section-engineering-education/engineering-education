---
layout: engineering-education
status: publish
published: true
url: /build-a-websockets-powered-tic-tac-toe-with-adonisjs/
title: Building a Websocket Powered Tic-Tac-Toe Game with Adonis.js
description: In this article, we will learn about the WebSocket protocol. We will go over the details of building a Tic-Tac-Toe game using the WebSockets in Adonis.js.
author: osinachi-chukwujama
date: 2021-01-27T00:00:00-09:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-a-websockets-powered-tic-tac-toe-with-adonisjs/hero.png
    alt: Adonis.js Websocket image
---
Browser-based multiplayer games require split-second communication between players. Tic-Tac-Toe is no exception. Player1 needs to see Player2s move in less than a second. In this tutorial we will be using the WebSocket API to achieve this communication speed.
<!--more-->
### Introduction
For this article we will use Adonis.js, which is a Node.js MVC framework, on the backend. Adonis.js implements web sockets both on the client and server side. You can check out the completed app [here](https://tic-tac-toe-adonis.herokuapp.com/).

### Technologies involved
1. Node.js
2. Adonis.js
3. Redis

### Prerequisites
#### Node.js
![nodejs-logo.png](/engineering-education/build-a-websockets-powered-tic-tac-toe-with-adonisjs/nodejs-logo.png)

First, check that your Node.js version is >= 10.

```bash
$ node -v
# v10.19.0
```

Install the latest LTS version of Node.js from the [official website](http://nodejs.org/) if yours is less than v10.

#### Redis
![Redis Logo](/engineering-education/build-a-websockets-powered-tic-tac-toe-with-adonisjs/redis.png)

We will use Redis to handle the game state. Horizontal scaling is a common requirement in modern software development. We should be able to spin up and tear down servers at will. This means we shouldn't store the state in our apps since the instances will not be able to share the state.

Redis will allow us to maintain the game state for millions of gamers. Redis offers faster read-write operations than a traditional DB, so it is ideal for the game.

Follow the [instructions here](https://redis.io/topics/quickstart#installing-redis) to install Redis on your machine.

### What is a WebSocket?
According to Wikipedia:

> A WebSocket is a computer communication protocol, providing a full-duplex communication channel over a single TCP connection.

A WebSocket is a communication channel that allows for bi-directional communication. Emissions and broadcasts replace the request-response mechanism in HTTP.

![Client to server](/engineering-education/build-a-websockets-powered-tic-tac-toe-with-adonisjs/client-to-server.png)

A server can broadcast to several connected clients at the same time.

![Server to two clients](/engineering-education/build-a-websockets-powered-tic-tac-toe-with-adonisjs/server-to-multiple-clients.png)

Clients emit information to the server without waiting for a response. That way communication occurs through listeners that are set up by the client.

### Project architecture
The project follows this architecture:

- A user sets a username.

![set-username.gif](/engineering-education/build-a-websockets-powered-tic-tac-toe-with-adonisjs/set-username.gif)

- The user generates a game code.

![generate-game-code.gif](/engineering-education/build-a-websockets-powered-tic-tac-toe-with-adonisjs/generate-game-code.gif)

- The user shares the game code with a friend.

- The friend sets a username and uses the game code to initialize the game.

![joining-game-with-code.gif](/engineering-education/build-a-websockets-powered-tic-tac-toe-with-adonisjs/joining-game-with-code.gif)

- Both users are redirected to the game where they play in rounds.

### Getting started
We won't go into the details of the markup and frontend Javascript. We will instead look into the implementation of Websockets in Adonis.js.

Step 1: Clone the repo.

```bash
$ git clone https://github.com/vicradon/tic-tac-toe-tut
```

Step 2: Install the dependencies.

```bash
$ npm i
```

Step 3: Start the Redis server.

```bash
$ redis-server
```

Step 3: In another terminal, start the dev server.

```bash
$ npm run dev

# or
$ npm run dev
```

Now that everything is set up, we will look at the logic in core parts of the game and learn more about WebSockets.

### WebSockets in Adonis.js
Adonis.js uses channels to organize WebSocket business logic. For this game, we created one channel, tic-tac-toe, in `start/socket.js`. Clients can subscribe to different channels to listen to events on those channels.

```js
const Ws = use("Ws");

Ws.channel("tic-tac-toe", "TicTacToeController");
```

Clients can also communicate with other clients on a channel by emitting to an event.

```js
// in the browser
ws.getSubscription("tic-tac-toe").emit("checkForExistingGame");
```

If we wanted to add chat to our game, we will create another channel, named `chat`. We will also create a different controller for the chat channel.

```js
Ws.channel("chat", "ChatController");
```

The controllers are represented as classes.

```js
class TicTacToeController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
  }
  async onClose() {}
}
```

Every connected client links to an instance of this class. That way a client can communicate with other clients in the server environment. The connected client's socket is `this.socket`. We can also access the request object here using `this.request`. This means we can access cookies in the WebSocket Controller. This will prove useful as we go further.

```js
// get all cookies
this.request.cookies();
```

### Handling user registration
To identify a user, we set their username in an [encrypted, httpOnly cookie](https://adonisjs.com/docs/4.1/response#_cookies) during registration.

```js
// register method in UserController.js
session.flash({ success: "Account created successfully" });
response.cookie("username", username);
```

Since we didn't use session or JWT auth, the cookies serve as a Psuedo-auth. We return an authenticated view if the username cookie is present after reload. An example of this is displaying `Hi {{username}}` in `home.edge`.

```html
@if(username)
<div class="col-md-6 mb-5">
  <h2>Hi {{ username }}</h2>
  ...
</div>
@else ... @endif
```

The index method `HomeController.js` passes the variables in the `home.edge` view.

```js
// index method in HomeController.js
const game_code = await Redis.hget(request.cookie("username"), "game_code");
const username = request.cookie("username");
return view.render("home", { game_code, username });
```

### How to handle connected clients
When the home or game page loads, the browser tries to establish a connection with the server. An API call triggers the `setSocketId` method in `UserController.js`. This is where the gamer's socket-id is linked to their created Redis map.

```js
const username = request.cookie("username");
await Redis.hset(username, "socket_id", socket_id);
```

This happens every time the browser reloads, so the connection is always established.

### Server emissions
Events sent by your client to the server can [trigger emissions](https://adonisjs.com/docs/4.1/websocket-server#_methods) to:

1. Yourself using `this.socket.emit`.
2. Several connected clients using `t=his.socket.emitTo`.
3. All other connected clients except yourself using `this.socket.broadcast`.
4. All connected clients including yourself using `this.socket.broadcastToAll`.

This game utilizes 1 and 2. For example, when player1 makes a mark ("X") on the board, they send the board's index. The server then **emitsTo** player2 with player1's mark ("X") and the board index.

```js
this.socket.emitTo(
  "otherPlayerMove",
  { cell, other_player_mark: current_player_mark },
  [`tic-tac-toe#${next_player_socket_id}`]
);
```

This is an instance of where we can't rely on the client's input. We don't expect player1 not to change their mark from "X" to say "M". The client can do a lot to break our game so we must limit their power.

### How we handle player moves
When a player makes a move, we execute that turn's logic if the move is valid.

#### Turn logic
When a player makes a move, the game may resolve into either:
1. A win state
2. A draw state

#### Win state
The turn logic involves setting a player's mark on an array. The array's elements' indexes correspond to the game board.

```js
const board = JSON.parse(gameObject.board);
const { mark: current_player_mark } = JSON.parse(
  gameObject[`${username}_stats`]
);
board[Number(cell)] = current_player_mark;
```

Then checking if the board has a valid win state.

```js
// inside the `executeTurnLogic` method
const { status, player, sequence } = this.checkForWinner(board);
```

In the `checkForWinner` method, we iterate through a set of winning sequences.

```js
const winningSequences = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
```

We represent the board cells which map to the sequence as `boardSequence`. The first winning sequence will look like:

```bash
[0, 1, 2]
["O", "X", "X"]
```

We check if all elements in the current sequence mapping have the same values: "O" or "X". If it is "X", player1 wins, else player2 wins.

```js
for (let sequence of winningSequences) {
  const boardSequence = [
    board[sequence[0]],
    board[sequence[1]],
    board[sequence[2]],
  ];
  const player1IsWinner = boardSequence.every((value) => value === "X");
  if (player1IsWinner) {
    return { status: "win", player: "player1", sequence };
  }

  const player2IsWinner = boardSequence.every((value) => value === "O");
  if (player2IsWinner) {
    return { status: "win", player: "player2", sequence };
  }
}
```

Here's a visualization of an iteration on move 7.

![Winning Sequence Visualization](/engineering-education/build-a-websockets-powered-tic-tac-toe-with-adonisjs/winning-sequence-iteration.png)

#### Draw state
At the start of the game, the board is an 8 sized array of empty strings.

```js
const board = ["", "", "", "", "", "", "", ""];
```

If no empty string exists in the array, the game results in a draw. Both players will be able to request a rematch.

```bash
# Example of draw state
["X", "O", "X", "X", "X", "O", "O", "X", "O"]

X | O | X
X | X | O
O | X | O
```

### Client emissions and listeners
Since WebSockets support bidirectional communication, we can have simultaneous client-server communication. A client cannot **emit** events to other clients, it can only emit to the server which then emits to other clients.

### Board moves on the client
When we emit a `boardMove` event to the server. The server has to figure out how to process this event and send a "response" to both players.

```js
function makeMove(cell) {
  ws.getSubscription("tic-tac-toe").emit("boardMove", {
    cell,
  });
  updateTurnNotification(`It's ${other_player}'s turn`);
}
```

We can receive messages from the server by setting listeners like this.

```js
game.on("otherPlayerMove", (response) => {
  updateBoard(response);
  canMove = true;
  updateTurnNotification(`It's your turn`);
});
```

We set up all the listeners in the `subscribeToChannel` function in `game.js`. These listeners are like JavaScript event listeners. They keep handling the events they are listening to after their registration.

### Security considerations
Most of the game logic lives on the server. Every datastore on a web-browser is mutable by Javascript. Javascript can't read or change encrypted cookies. This gives them the highest security.

### Best practices when dealing with WebSockets
- Only use Websockets if HTTP, polling, and [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) aren't suitable for the problem. For example, a real-time dashboard with little or no events sent from the client should use SSE.
- Maintain state in a cache such as Redis or [Memcached](https://memcached.org/). You won't want to be making DB calls for time-sensitive operations.

### Conclusion
In this article, we learned about the WebSocket protocol. We saw the details of building Tic-Tac-Toe using the WebSockets in AdonisJS. Finally, we learned the best practices to follow when building websocket applications.

### References and resources
1. [Wikipedia Article on WebSockets](https://en.wikipedia.org/wiki/WebSocket)
2. [Mozilla Docs on the WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
3. [Internet Engineering Task Force (IETF) Websocket Protocol](https://tools.ietf.org/html/rfc6455)

---
Peer Review Contributions by: [Wilson Gichuhi](/engineering-education/authors/wilson-gichuhi/)

