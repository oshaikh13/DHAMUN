import io from 'socket.io-client';

let socket = io(SERVER_URL);

export { socket };