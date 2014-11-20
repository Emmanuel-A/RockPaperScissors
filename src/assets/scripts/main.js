
// Wait for DOM to Load
jQuery(function($) {

    // Random color generator
    function randomColor () {
      return '#' + Math.floor(Math.random()*16777215).toString(16);
    }   

    // Set our max values
    var maxX = $(window).width();
    var maxY = $(window).height();
    var userID;
    var firstConnection = true;

    // Create New Socket Connection using Socket.io
    var socket = io();

    // A bada55 box
    var box = $('.box');
    var rockBtn = $('.rockBtn');

    // Handle device change
    var orientationChange = function(event){
    var x = Math.floor(event.beta);
    var y = Math.floor(event.gamma);
    socket.emit('move', [x,y, userID]);
  };

    // Listen to device orientation event on the window
    window.addEventListener('deviceorientation', orientationChange);

    // Listen for connected event
    socket.on('connected', function(id){
      if (firstConnection){
        userID = id;
        firstConnection = false;
      }
      var box = $('<div class="box"></div>');
      var rockBtn = $('<button class="rockBtn">rock</button>');
      var paperBtn = $('<button class="paperBtn">paper</button>');
      var scissorsBtn = $('<button class="scissorsBtn">scissors</button>');


      box.attr('id', 'box-' + id);
      box.css('backgroundColor', randomColor());
      $('body').append(box);

      // rockBtn.attr('id', 'box-' + id); 
      rockBtn.css('backgroundColor', randomColor());           
      $('body').append(rockBtn);
    });

    // Recieve Update Event From The Server
    socket.on('update', function(coord){
      var x = coord[0];
      var y = coord[1];
      var id = coord[2];

      if (x >  90) { x =  90};
      if (x < -90) { x = -90};

      x += 90;
      y += 90;

      x = (maxX * x / 180 - 50);
      y = (maxY * y / 180 - 50);

      var str = 'translate('+y +'px, ' + x +'px, 0)';
      var box = $('#box-' + id);
      box.css({transform: str, webkitTransform: str});
  });

// jQuery(function($) {
//   var game = {
//     playerChoice:' ',
//     computerChoice:' ',
//     getComputerChoice:function (){
//       var num = Math.floor(Math.random()*3);
//       var choices = ['rock','paper','scissors'];
//       this.computerChoice = choices[num];
//     },
//     getPlayerChoice:function(choice){
//       this.playerChoice = choice;
//       this.getComputerChoice();
//       this.compare();
//     },

//     // Create New Socket Connection using Socket.io
//     var socket = io();

//     // Listen for connected event
//     socket.on('connected', function(id){
//       if (firstConnection){
//         userID = id;
//         firstConnection = false;
//       }
//       var rock = $('<div class="rock"></div>');
//       rock.attr('id', 'rock-' + id);
//       // box.css('backgroundColor', randomColor());
//       $('body').append(rock);
//     });

//     compare:function(){
//       if(this.playerChoice === this.computerChoice){
//         alert('draw');      
//       }
//       else if(this.playerChoice === 'rock' && this.computerChoice === 'scissors'){
//         alert('player threw:' + this.playerChoice +' computer threw:'+ this.computerChoice + ' you win!');
//       }
//       else if(this.playerChoice === 'rock' && this.computerChoice === 'paper'){
//         alert('player threw:' + this.playerChoice +' computer threw:'+ this.computerChoice + ' you lose!');
//       }
//       else if(this.playerChoice === 'paper' && this.computerChoice === 'scicors'){
//         alert('player threw:' + this.playerChoice +' computer threw:'+ this.computerChoice + ' you lose!');
//       }
//       else if(this.playerChoice === 'paper' && this.computerChoice === 'rock'){
//         alert('player threw:' + this.playerChoice +' computer threw:'+ this.computerChoice + ' you win!');
//       }
//       else if(this.playerChoice === 'scissors' && this.computerChoice === 'paper'){
//         alert('player threw:' + this.playerChoice +' computer threw:'+ this.computerChoice + ' you win!');
//       }
//       else if(this.playerChoice === 'scissors' && this.computerChoice === 'rock'){
//         alert('player threw:' + this.playerChoice +' computer threw:'+ this.computerChoice + ' you lose!');
//       } 
//     }
//   };
});