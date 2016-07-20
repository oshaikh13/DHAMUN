import io from 'socket.io-client';

let socket;

if (typeof SERVER_URL !== "undefined") {
  socket = io(SERVER_URL);
} else {
  socket = {
    emit: function (event, object) {
      // stub
    }
  }
}

export { socket };