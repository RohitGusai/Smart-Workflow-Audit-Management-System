import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  autoConnect: true, // we connect after login
});

export default socket;
