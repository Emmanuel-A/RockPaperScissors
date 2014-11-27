
// Require Native Node.js Libraries
var express = require('express');
var app = express();
var http = require('http');
http = http.Server(app);
var io = require('socket.io');
io = io(http);
var id = 1;
var playerone;
var playertwo;
var playeronechoice;
var playertwochoice;
var countdown = 5;

// Route our Assets
app.use('/assets/', express.static(__dirname + '/public/assets/'));

// Route our Home Page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// Handle Socket Connection 
io.on('connection', function(socket){

  // Store user id on the socket itself
  socket.id = id;

  console.log('A User Is Connected', id);

  // Set playerone and playertwo to equal id
  if(!playerone){
    playerone = id;
  } else if(!playertwo){
    playertwo = id;
  }

  // Emit to the client their id
  io.emit('updateUsersID', id);

  // Increment
  id = id + 1;

  // Listen to players choices
  socket.on('playerchoice', function(obj){
    if(obj.id == playerone){
      playeronechoice = obj.choice;
    } else if(obj.id == playertwo){
      playeronechoice = obj.choice;
    }
  });
});

io.on('disconnect', function(socket){
  if(socket.id == playerone){
    playerone = null;
  } else if(socket.id == playertwo){
    playertwo = null;
  }
});

// var win = function() {
//     document.getElementById("game").style.backgroundColor = "red";
// };

// Game logic
  var gameLoop = function(){
    var text = countdown;
    io.emit('countdown', text);
    countdown = countdown - 1;
    if (countdown <= 0){
      countdown = 5;
      compare();
    };
    setTimeout(gameLoop, 1500);
  };
  gameLoop();

  var getComputerChoice = function (){
    var num = Math.floor(Math.random()*3);
    var choices = ['rock','paper','scissors'];
    return choices[num];
  };

  var compare = function(){
    var a = playeronechoice;
    var b = playertwochoice;
    var text;

    // Randomly generates choices if a or b are not set
    if(!a){
      a = getComputerChoice();
    }
    if(!b){
      b = getComputerChoice();
    }

    if(a === b){
      text = 'draw';      
    }
    else if(a === 'rock' && b=== 'scissors'){
      text = 'player threw:' + a +' computer threw:'+ b + ' you win!';
    }
    else if(a === 'rock' && b === 'paper'){
      text = 'player threw:' + a +' computer threw:'+ b + ' you lose!';
    }
    else if(a === 'paper' && b === 'scissors'){
      text = 'player threw:' + a +' computer threw:'+ b + ' you lose!';
    }
    else if(a === 'paper' && b === 'rock'){
      text = 'player threw:' + a +' computer threw:'+ b + ' you win!';
      // win();
    }
    else if(a === 'scissors' && b === 'paper'){
      text = 'player threw:' + a+' computer threw:'+ b + ' you win!';
      // win();      
    }
    else if(a === 'scissors' && b === 'rock'){
      text = 'player threw:' + a +' computer threw:'+ b + ' you lose!';
    } 
    io.emit('result', text);
    playeronechoice = null;
    playertwochoice = null;
  };

// Start Server
http.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = http.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});
