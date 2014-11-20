
// Wait for DOM to Load
jQuery(function($) {
   
    // Create New Socket Connection using Socket.io
    var socket = io();

    // Send A Message To The Server
    $('#rock').on('click', function(){
      var text = $('input').val();
      socket.emit('message', text);
      alert('Rock!');
    });

    $('#paper').on('click', function(){
        var text = $('input').val();
        socket.emit('message', text);
        alert('Paper!');
      });

    $('#scissors').on('click', function(){
      var text = $('input').val();
      socket.emit('message', text);
      alert('Scissors!');
    });

    // Recieve Update Event From The Server
    socket.on('update', function(msg){
      $('.game').append(msg).append('<br>');
    });
});