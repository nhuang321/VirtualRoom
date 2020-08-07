var socket = io();
socket.emit('new player', );

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});


setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
socket.on('state', function(players) {
  console.log('socket.id=', socket.id)
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'blue';
  for (var id in players) {
    var player = players[id];
    context.beginPath();

    if ( socket.id == id ) {
      context.fillStyle = 'green';
    } else {
      context.fillStyle = 'blue';
    }

    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});
