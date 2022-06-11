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

const adminInfo = {
  name: "Tacoman Fook Yuu",
  username: "admin",
  password: "admin",
  ethnicity: "Double Barreled Chinese Mexican",
  nric: "S9923232A",
  id: "2b51ccfd-05bd-4b60-ba60-67f1e9269e50",
  medicalHist: [
    { disease: "Asthma", has: true, severity: "Mild" },
    { disease: "Small Penis", has: true, severity: "Serious" },
    { disease: "Big Brain", has: false, severity: "None" },
  ],
  ippt: {
    goal: 70,
    record: [
      { date: "27/3/19", pushups: 15, situps: 30, run: 600, score: 54 },
      { date: "21/1/22", pushups: 17, situps: 35, run: 660, score: 58 },
    ],
  },
  leaves: [
    { date: "22/8/22", status_: "Rejected", reason: "Leg Pain" },
    {
      date: "25/8/22",
      status_: "Pending",
      reason: "Petfish got his fins amputated",
    },
    { date: "26/8/22", status_: "Success", reason: "Dont feel like going" },
  ],
  loc: {
    lastloc: { lat: 1.35, lng: 103.8 },
    lastSeen: "22/2/22 1422",
    active: false,
    vibratePerm: true,
  },
};

io.on("connection", (socket) => {
  console.log(socket.id, "Connected to the server");
  //   socket.on("hello", () => {
  //     console.log("received message");
  //   });
  socket.on("login", ({ username, password }) => {
    console.log({username,password})
    if (username == adminInfo.username && password == adminInfo.password) {
      socket.emit("login-return", { status_: "S", userInfo: adminInfo });
      return;
    }
    socket.emit("login-return", { status_: "F", userInfo: {} });
  });

//   socket.on("sendLoc");
});

server.listen(process.env.PORT || PORT, () => {
  console.log("testing on port", process.env.PORT || PORT);
});
// require("dotenv").config();
