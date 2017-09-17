import io from 'socket.io-client';

let socket;

var options = {
  'reconnection': true,
  'reconnectionDelay': 100,
  'reconnectionDelayMax' : 100,
  'reconnectionAttempts': Infinity
}

if (typeof SERVER_URL !== "undefined") {
  
  socket = io(SERVER_URL, options);

} else {
  socket = {
    emit: function (event, object) {
      // stub
    }
  }
}

export { socket };