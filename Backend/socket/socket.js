import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
const app = express();

const server = http.createServer(app);
const io = new Server(server);
app.use(cors());
let socket;

io.on("connection", (socket) =>{
    const user_id = socket.handshake.query.userId;
    if (user_id != "undefined") {
      socketUsers[user_id] = socket.id;
      console.log("socket users", socketUsers);
    }

    socket.on("new-connection", )

    socket.on("disconnect", () => {
        console.log("user-disconnected", socket.id);
        delete socketUsers[user_id];
        io.emit("onlineUsers", Object.keys(socketUsers));
      });
})