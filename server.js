// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

socket.on("chatMessage", (msg) => {
  io.emit("chatMessage", msg); // now msg is an object with user, text, time
});


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
