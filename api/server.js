const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const { Server } = require("socket.io");
const { v4 } = require("uuid");
require("dotenv").config();
//Helper function
// const { default: returnDir } = require("./Utilities/returnDir");
//MongoDB Config
const mongoose = require("mongoose");
const dbURI = process.env.MONGODB_URI;
//Server Initiation
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//import schemas
const UserSchema = require("./Models/UserData.js");

console.log(dbURI);

mongoose.connect(`${dbURI}`, () => console.log("Conntected to MongoDB"));

const adminInfo = {
  name: "Tacoman Fook Yuu",
  username: "admin",
  password: "admin",
  ethnicity: "Double Barreled Chinese Mexican",
  nric: "S9923232A",
  id: "2b51ccfd-05bd-4b60-ba60-67f1e9269e50",
  group: "1",
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

  socket.on(
    "signup",
    async ({ name_, username, password, nric, ethnicity, group }) => {
      const currentTime = Date.now();
      // const existingUser = UserSchema.find({ username: username });
      // if (existingUser != null) return;
      const userData = new UserSchema({
        name: name_,
        username,
        password,
        nric,
        ethnicity,
        id: v4(),
        group,
        medicalHist: [],
        ippt: { goal: 70, record: [] },
        leaves: [],
        loc: {
          lastLoc: { lat: 1.35, lng: 103.8 },
          lastSeen: currentTime,
          active: false,
          vibratePerm: true,
        },
      });

      console.log("Signed up " + username);
      try {
        const savedUser = await userData.save();
        socket.emit("signup-return", { status_: "S", userInfo: savedUser });
      } catch (err) {
        console.log(err);
        socket.emit("signup-return", { status_: "F", userInfo: {} });
      }
    }
  );

  socket.on("login", async ({ username, password }) => {
    console.log("Login Request " + username + ":" + password);
    const selectedUser = await UserSchema.findOne({
      username: username,
    }).exec();
    if (selectedUser == null)
      return socket.emit("login-return", { status_: "F" });
    if (password != selectedUser.password)
      return socket.emit("login-return", { status_: "F" });
    socket.emit("login-return", { status_: "S", userInfo: selectedUser });
  });
  ////leave application socket
  ///find id and update==>findOneAndUpdate
  socket.on("submitted", async ({ id, date, reason }) => {
    console.log("yes");
    const userData = await UserSchema.findOne({ id });
    const currentLeaveArr = userData.leaves;
    currentLeaveArr.push({
      date,
      status_: "Pending",
      reason,
    });
    try {
      const savedData = await UserSchema.findOneAndUpdate(
        { id },
        { leaves: currentLeaveArr }
      );
      socket.emit("submitted-return", { status_: "S" });
    } catch (err) {
      socket.emit("submitted-return", { status_: "F" });
    }
  });

  socket.on("location", async ({ active, lat, lng, id, group }) => {
    const currentTime = Date.now();
    const locationData = {
      lastLoc: { lat, lng },
      lastSeen: currentTime,
      active,
      vibratePerm: true,
    };
    try {
      const savedData = await UserSchema.findOneAndUpdate(
        { id },
        { loc: locationData }
      );
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("ping-loc", async ({ id, group }) => {
    const arrOfUsersInGroup = await UserSchema.find({ group });
    // console.log(arrOfUsersInGroup)
    const newArr = [];
    for (const userObj of arrOfUsersInGroup) {
      let userPacket = { loc: userObj.loc, name: userObj.name, id: userObj.id };
      newArr.push(userPacket);
    }
    socket.emit("ping-loc-return", newArr);
  });
  //   socket.on("sendLoc");
});

server.listen(process.env.PORT || PORT, () => {
  console.log("Listening on port", process.env.PORT || PORT);
});
// require("dotenv").config();
