Websockets have a variety of applications in the modern web these days, from simple chat applications to realtime databases. Even online games use Socket under the hood to make multiplayer experience possible. 

###  Introduction
This article focuses on building a web application, which lets you play Rock Paper Scissor online with your friend. A player has to create a room, and share the unique Room ID to the other player. The other player can join the same room with this unique Room ID. Once both players have joined the room, they could start playing!

There are two parts to this application, 
- Front-end: To keep things simple, the front-end is built on basic HTML,CSS, JS.
- Back-end: An Express server which uses Socket.io.

<!-- All intros to be added -->

Refer this article to better understand Socket.io [article](https://www.section.io/engineering-education/understanding-socket/).


### Starter Code

In the interest of time and the intention to put more focus on Socket logic, download the starter code from this Repo. Check out this [Repository on GitHub](https://github.com/HarishTeens/rps-online).  Follow the instructions on README to set it up on your local system.

Here goes the file wise description,

- ```public/index.html``` : A Home Page for the app with all the required UI Components. 
- ```public/style.css``` : Styles for the entire application.
- ```public/game.js``` : Client Side JavaScript file to handle events.
- ```app.js``` : Server Side NodeJS file for the server setup and getWinner function to calculate winner.

Note that the app is not functional yet, we would be writing the necessary logics to make it functional. Also, feel free to tweak the boiler code to match your Style.

The only two files where majority would be written on, ```app.js``` file to handle the server side logic and ```public/game.js``` file to handle the client side logic.

### Game Flow  

![image](/engineering-education/nginx-reverse-proxy/rps.png)

This is a Sequence diagram which shows the timeline of events, where time passes as we move downwards. It's really important to understand the flow before we start coding, so I'd recommend to take a closer look at the diagram until one grasps it.

Read through the below points if you are familiar with reading a Sequence Diagram.

- Time flows downward.
- Arrows reprsent events. Start of the Arrow denotes the Emitter, end of the arrow denotes the listener. For example, Player1 emits the `Create Game` Event, Socket Server listens to this event.
- A rectanguar box has been used to denote waiting/processing time.

Player1 emits the create Game Event. Server acknowledges and responds with a roomID. Once player2 emits join Game Event with the same roomID. Server detects that both players have joined the room and shares the other player's info to each other. It then waits for both the players to select a choice, after that it processes the result and sends result to both of the players.

Now that the flow is clear, let's jump right into coding. 

### Create Game

Let us start by writing logic for the Create Game Event in `public/game.js` file.

```
//Create Game Event Emitter
$(".createBtn").click(function(){
    firstPlayer=true;
    const playerName=$("input[name=p1name").val();
    socket.emit('createGame',{name:playerName});
})
```

The above code listens for a click event on the Create Button, takes in the player1 Name and emits an event named `createGame` . The variable `firstPlayer` is used to identify the player who started the game, the use of this variable would be explained later.

Now we write server side code on `app.js` so that the server listens to this event.

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

All event listeners/emitters would go inside the `io.on` block as mentioned above. `connection` is the default event listener provided by Socket.io. Whenever a client connects to the socket server, it emits a `connection` event under the hood.  
The CreateGame listener creates a new Room with a random Room ID and adds the client to that room. It then emits an event `newGame` which contains the roomID for the created room.

```
//New Game Created Listener
socket.on("newGame",(data)=>{
    $(".newRoom").hide();
    $(".joinRoom").hide();
    $("#message").html("Waiting for player 2, room ID is "+data.roomID).show();
    roomID=data.roomID;
})
```

The above code has to be added to `public/game.js` so that we could let player1 know that a room has been successfully created and player2 could use this roomID to join the room.

### Join Game

Now that we have player1 waiting in the room, it is time for player2 to join the room with RoomID.  
Similar to the `createGame` event, we now have to write client side logic on `public/game.js` to emit `joinGame` event.

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
The above code emits the `joinGame` event once the player2 fills in the roomID and his name and hits the Join Button.


Now we write server side logic on `app.js` to listen to the `joinGame` event and share each other info to the players.
```
//Join Game Listener
    socket.on("joinGame",(data)=>{        
        socket.join(data.roomID);
        socket.to(data.roomID).emit("player2Joined",{p2name: data.name,p1name:players[data.roomID]});
        socket.emit("player1Joined",{p2name:players[data.roomID],p1name:data.name});
    })
```
The above code adds player2 to the room, notifies player2 that with player1's info and player1 with player2's info.

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
This is the code to update UI on the client end(`public/game.js`) so that both players could enter the game. The Transition Function takes care of all the UI changes that needs to happen to enter game mode.


### Players select Choice

Now that both of the players are in the room. They could start playing the game. Now we add logic for the client to be able to select choice and emit events accordingly in the `public/game.js` file.

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
The above code gets the choice picked by the user and emits the choice Event. Note that the firstPlayer variable is used here to distinguish between the kind of event it has to emit. Player emits `choice1` , Player2 emits `choice2` . 
### Listen to Player's Choice
We add server side logic at `app.js` to listen to Player1's choice.
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

The above code gets player1's choice and does nothing if player2 hasnt picked their choice.

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
Similarly, we also write logic to listen to player2's choice in `app.js`. Now that both of them have picked their choice, it enters into the if block and invokes the `result()` function.


### Declare Winner
```
//Function to do executed after gettin both choices
const result=(roomID)=> {
    var winner = getWinner(choice1, choice2);
    io.sockets.to(roomID).emit("result", {
        winner: winner
    });
    choice1 = "";
    choice2 = "";
}
```
The result function takes the roomID as an argument, calculates the result based on the player's choices with the help of `getWinner()` function and emits the result to all the clients in the room, i.e both player1 and player2 who are in the room.
And it resets the player's choices.

### Listen to Result

Now that the server has calculated the result and has emitted to all the players, time for us to write client side logic at `public/game.js` to listen to the `result` event.

```
//Result Event Listener
socket.on("result",(data)=>{
    if(data.winner=="draw"){
        updateDOM("player1");
        updateDOM("player2");
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

The above code listens to the result event and updates the DOM with the help of `updateDOM()` function. The updateDOM function announces the winner in the message field and increases the score of the winner, and if draw it increases both of their scores.

### Summary

This app although works, a lot of things could improved. Firstly Error Handling, avoiding usage of server side variables..etc. All these were intended this way to keep the article simple so that the reader would better grasp the usage of Socket.io in this context and is expected to refactor and tweak the performance after a solid understanding of the flow.

### Bonus Step:

Deploy it to the web, the easiest way is Heroko. Follow their documentation and deploy the app within minutes with the help of their SDK. Try it out with your friends and have fun.

After all this hard work of coding the game, it is time for you to play it with your friends and have some fun.

Also checkout my full fledged Rock Paper Scissor game rpsgames.herokuapp.com github.com/HarishTeens/rpsgames to have a better experience.