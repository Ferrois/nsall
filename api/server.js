const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const { Server } = require("socket.io");
const { v4 } = require("uuid");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


io.on("connection",(socket)=>{
    console.log(socket.id, "Connected to the server")
    socket.on("hello",()=>{
        console.log('received message')
    })
})

server.listen(PORT,()=>{
    console.log("testing on port",PORT)
})
// require("dotenv").config();