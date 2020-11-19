A variety of applications use Socket on the modern web. For example chat applications, real-time databases and online multiplayer games. All use Socket under the hood. 

### Introduction
This article focuses on building a web application which lets you play Rock Paper Scissor online with your friends. A player has to create a room and share the unique Room ID with the other player. The other player can join the same room with this unique Room ID. Once both players have joined the room, they could start playing!

There are two parts to this application, 
- Front-end: To keep things simple, the front-end is built on basic HTML, CSS, JS with jQuery.
- Back-end: An Express server that uses Socket.io.

### Prerequisites
 
- HTML is the standard markup language for web page. Here's a useful [guide](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML) for beginners.
- CSS is style sheet language for improving the presentation of web pages. To learn more, check this [article](https://www.section.io/engineering-education/what-is-css/)
- [BootStrap](https://getbootstrap.com/) is a popular HTML, CSS, JS library. An [article](https://getbootstrap.com/docs/4.0/getting-started/introduction/)  to get started.
- [jQuery](https://jquery.com/) is a fast and feature-rich Javascript library. 
- [Express.js](https://expressjs.com/) is a web application framework  for Node.js. Introductory article on Express.js: [link](https://www.section.io/engineering-education/express/).
- [Socket.io](https://socket.io/) is a Real-Time Engine for Web. A helpful [article](https://www.section.io/engineering-education/understanding-socket/) to get started. This article covers the usage of Socket.io on both the server and client-side. These are essential to proceed further.



### Starter Code

In the interest of time and the intention to put more focus on Socket logic. Please download the starter code from this [Repository](https://github.com/HarishTeens/rps-online) on GitHub.  Follow the instructions as mentioned on README.md to set up the project on your local system.

If you are only here for final version of the code, check out the [final branch](https://github.com/HarishTeens/rps-online/tree/final) of the same Repository.

Here goes the file wise description of the Starter code,

- ```public/index.html``` : A Home Page for the app with all the required UI Components. 
- ```public/style.css``` : Styles for the entire application.
- ```public/game.js``` : Client-Side JavaScript file to handle events.
- ```app.js``` : Server Side NodeJS file for setting up the server.

Note that the app is not functional yet, we need to write the necessary logic to make the app functional. Also, feel free to tweak the boiler code to match your style.

There are two important files to focus on. One is  ```app.js``` that handles server-side logic. And the other is ```public/game.js``` that handles client-side logic.

### Game Flow 

![image](/engineering-education/nginx-reverse-proxy/rps.png)

This is a Sequence diagram that shows the timeline of events. It's important to understand the flow before we start coding. So make sure you understand the diagram completely.

Read through the below points if you are not familiar with Sequence Diagrams.

- Time flows downward.
- Arrows represent events. The start of Arrow denotes the Emitter, end of arrow denotes the listener. For example, Player1 emits the `Create Game` Event, Socket Server listens to this event.
- A rectangular box denotes waiting/processing time.

Player1 emits the create Game Event. The server acknowledges and responds back with a room ID. Once player2 emits join Game Event with the same room ID. The server detects that both players have joined the room and shares the other player's info with each other. Once both of the players have their choice, the server processes the result and sends back to both players.

Now that the flow is clear, let's jump right into coding.

### Create Game

Let us start by writing logic for the Create Game Event in the `public/game.js` file.

```
//Create Game Event Emitter
$(".createBtn").click(function(){
    firstPlayer=true;
    const playerName=$("input[name=p1name").val();
    socket.emit('createGame',{name:playerName});
})
```

The above code listens for a click event on the Create Button. Once that event is triggered, the client grabs player1's name and emits a socket event named `createGame` . The variable `firstPlayer` identifies the player who started the game.  The use of this variable will be explained later.

Now we write server-side code on `app.js` so that the server listens to this event.

```
io.on("connection",(socket)=>{
    console.log("connection established");

    //Create Game Listener
    socket.on("createGame",(data)=>{
        const roomID=randomstring.generate({length: 4});       
        socket.join(roomID);        
        players[roomID]=data.name;
        socket.emit("newGame",{roomID:roomID});
    })

})
```

All event listeners/emitters would go inside the `io.on` block as mentioned above. `connection` is the default event listener provided by Socket.io. A `connection` event is emitted under the hood everytime a connection is established.  
The `CreateGame` listener creates a new Room with a random Room ID and adds the client to that room. Later the server emits an event `newGame` which contains the roomID for the created room.

```
//New Game Created Listener
socket.on("newGame",(data)=>{
    $(".newRoom").hide(); 
    $(".joinRoom").hide();
    $("#message").html("Waiting for player 2, room ID is "+data.roomID).show();
    roomID=data.roomID;
})
```

The above code is added to `public/game.js`. This snippet lets player1 know that a room was created and player2 could use this roomID to join the room. Then it hides the Room elements and displays a message with Room ID.

### Join Game

Now that we have player1 waiting in the room, time for player2 to join the room with RoomID.  
Like the `createGame` event, we write client-side logic on `public/game.js` to emit the `joinGame` event.

```
//Join Game Event Emitter
$(".joinBtn").click(function(){
    const playerName=$("input[name=p2name").val();
    roomID=$("input[name=roomID").val();    
    socket.emit('joinGame',{
        name:playerName,
        roomID:roomID
    });
})
```
The client emits `joinGame` with player2's name and room ID, which we acquired from the input fields.



Now we write server-side logic on `app.js` to listen to the `joinGame` event and share each other info with the players.
```
//Join Game Listener
    socket.on("joinGame",(data)=>{        
        socket.join(data.roomID);
        socket.to(data.roomID).emit("player2Joined",{p2name: data.name,p1name:players[data.roomID]});
        socket.emit("player1Joined",{p2name:players[data.roomID],p1name:data.name});
    })
```
The above code adds player2 to the room. It then notifies player2 with player1's info and player1 with player2's info.

```
//Player 2 Joined
socket.on("player2Joined",(data)=>{
    transition(data)  ;
  })
 
//Player 1 Joined
socket.on("player1Joined",(data)=>{
    transition(data)  ;
})

const transition=(data)=>{
    $(".newRoom").hide();
    $(".joinRoom").hide();
    $(".leaderboard").show();
    $(".controls").show();
    $(".player1 .name").html(data.p1name);
    $(".player2 .name").html(data.p2name);
    $("#message").html(data.p2name+" is here!").show();
}
```
This is the code to update UI on the client end (`public/game.js`) so that both players could enter the game. The `transition()` function takes care of all the UI changes to enter the game mode.



### Players select Choice

Now we add logic for the client to be able to select a choice and emit events in the `public/game.js` file.

```
//Select Choice
$(".controls button").click(function (){
    const choice=$(this).html().trim();
    const choiceEvent=firstPlayer?"choice1":"choice2";
    socket.emit(choiceEvent,{
        choice: choice,
        roomID:roomID
    });
})
```
The above code gets the choice picked by the user and emits the choice Event.  The firstPlayer variable is used to distinguish between the kind of event the player has to emit. Player1 emits `choice1` , Player2 emits `choice2` . 
### Listen to Player's Choice
We add server-side side logic at `app.js` to listen to Player1's choice.
```
//Listener to Player 1's Choice
    socket.on("choice1", (data)=> {
        choice1 = data.choice;
        console.log(choice1, choice2);
        if (choice2 != "") {
            result(data.roomID);
        }
    });
```

The above code gets player1's choice and does nothing if player2 hasn't picked their choice yet.

```
//Listener to Player 2's Choice
    socket.on("choice2", (data)=> {
        choice2 = data.choice;
        console.log(choice1, choice2);
        if (choice1 != "") {
            result(data.roomID);
        }
    });
```
We also write logic to listen to player2's choice in `app.js`. Now that both of them have picked their choice, the server enters into the `if block` and invokes the `result()` function.



### Declare Winner

In `app.js`,
```
//Function to be executed after getting both choices
const result=(roomID)=> {
    var winner = getWinner(choice1, choice2);
    io.sockets.to(roomID).emit("result", {
        winner: winner
    });
    choice1 = "";
    choice2 = "";
}
```
The result function takes the roomID as an argument. The `getWinner()` function calculates the result based on the player's choices .   Later it emits the result to all the clients in the room, i.e both player1 and player2. And it resets the player's choices.

> Note that the `getWinner()` is already written as a part of the boiler code.

### Listen to Result

We now have the server emitting the result to both the players. Time to write client-side logic at `public/game.js` to listen to the `result` event.

```
//Result Event Listener
socket.on("result",(data)=>{
    if(data.winner=="draw"){
        $("#message").html("It's a draw!");
    }else{
        updateDOM(firstPlayer==data.winner?"player1":"player2");
    }
})

const updateDOM=(player)=>{
    const playerDOM=$("."+player+" span");
    const prevScore=parseInt(playerDOM.html().trim());
    playerDOM.html(prevScore+1);
    const winnerName=$("."+player+" .name").html().trim();
    $("#message").html(winnerName+" scored a point!");
}
```

The above code listens to the result event and updates the DOM with the help of `updateDOM()` function. The updateDOM function announces the winner and increases the score of the winner. If the result is draw, we just display a message that it's a draw.

### Conclusion

Kudos, You made it 🎉

This app although works, yet could use a lot of improvement. As mentioned before, the intention was to keep it simple to put more focus Socket logic. Learning never stops here, now that the app works. Next step is to do improvements in order to have a fruitful experience.



### Next Steps
- Refactoring the Code
- Error Handling
- Efficient usage of Events
- Improving the UI  
- Storing choice details in socket meta-data rather than using server-side variable

 For Reference, check out my full-fledged Rock Paper Scissor game. Here is the link to the [Github Repo](https://github.com/HarishTeens/rpsgames). The application is deployed to the web with Heroku. Feel free to try the app at this [link](https://rpsgames.herokuapp.com).