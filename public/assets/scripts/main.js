
// Wait for DOM to Load
jQuery(function($) {
   
    // Create New Socket Connection using Socket.io
    var socket = io();
    var userID;

    // by default socket.io is a function... that takes two parameters
    // redefine what socket.io represents
    // socket.on = ('connected');
    socket.on('updateUsersID', function(id){
      userID = id;
    });

    // Send A Message To The Server
    $('#rock').on('click', function(){
      var obj = {id: userID, choice: 'rock'}; 
      socket.emit('playerchoice', obj);
      console.log('You chose rock');
    });

    $('#paper').on('click', function(){
      var obj = {id: userID, choice: 'paper'}; 
      socket.emit('playerchoice', obj);
      console.log('You chose paper');
    });

    $('#scissors').on('click', function(){
      var obj = {id: userID, choice: 'scissors'}; 
      socket.emit('playerchoice', obj);
      console.log('You chose scissors');
    });

    socket.on('result', function(text){
      console.log(text);
      $('#result').html(text);
    });

    socket.on('countdown', function(text){
      console.log(text);
      for (var i = 1; i > 0; --i){
        $('#countdown').html(text);
      }  
    });
});