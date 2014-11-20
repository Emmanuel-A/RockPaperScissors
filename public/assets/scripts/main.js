
// Wait for DOM to Load
jQuery(function($) {

    // Set our max values
    var maxX = $(window).width();
    var maxY = $(window).height();
    var userID;
    var firstConnection = true;

    // Create New Socket Connection using Socket.io
    var socket = io();

    // A bada55 box
    // var box = $('.box');

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
      box.attr('id', 'box-' + id);
      $('body').append(box);
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
});