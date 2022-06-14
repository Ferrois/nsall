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
  cdt: {
    time: 1639682640000,
  },
};

io.on("connection", (socket) => {
  console.log(socket.id, "Connected to the server");

  socket.on(
    "signup",
    async ({ name_, username, password, nric, ethnicity, group }) => {
      console.log("Signing up" + username + ":" + password);
      const currentTime = Date.now();
      const existingUser = await UserSchema.find({ username: username }).exec();
      console.log(existingUser);
      if (existingUser.length != 0)
        return socket.emit("signup-return", {
          status_: "F",
          message: "Someone already has this username!",
        });
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
        cdt: {
          time: currentTime,
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
      const updatedUserInfo = await UserSchema.findOne({ id });
      socket.emit("submitted-return", {
        status_: "S",
        userInfo: updatedUserInfo,
      });
    } catch (err) {
      console.log(err);
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
      const updatedUserInfo = await UserSchema.findOne({ id });
      socket.emit("location-return", { userInfo: updatedUserInfo });
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
  socket.on("addmedinfo", async ({ disease, severity, has, id }) => {
    const medInfo = { disease, severity, has };
    const currentData = await UserSchema.findOne({ id });
    const medArr = currentData.medicalHist;
    medArr.push(medInfo);
    try {
      const savedData = await UserSchema.findOneAndUpdate(
        { id },
        { medicalHist: medArr }
      );
      const updatedUserInfo = await UserSchema.findOne({ id });
      socket.emit("addmedinfo-return", {
        status_: "S",
        userInfo: updatedUserInfo,
      });
    } catch (err) {
      console.log(err);
      socket.emit("addmedinfo-return", { status_: "F" });
    }
  });
  socket.on("goal-change", async ({ id, goal }) => {
    const userData = await UserSchema.findOne({ id });
    const updatedIppt = userData.ippt;
    updatedIppt.goal = goal;
    try {
      const savedData = await UserSchema.findOneAndUpdate(
        { id },
        { ippt: updatedIppt }
      );
      const updatedUserData = await UserSchema.findOne({ id });
      socket.emit("goal-change-return", {
        status_: "S",
        userInfo: updatedUserData,
      });
    } catch (err) {
      socket.emit("goal-change-return", { status_: "F" });
      console.log(err);
    }
  });
  socket.on("retrieve-info", async ({ id }) => {
    try {
      const userData = await UserSchema.findOne({ id });
      const requiredData = {
        name: userData.name,
        ethnicity: userData.ethnicity,
        medicalHist: userData.medicalHist,
      };
      socket.emit("retrieve-info-return", { status_: "S", info: requiredData });
    } catch (err) {
      console.log(err);
      socket.emit("retrieve-info-return", { status_: "F", info: {} });
    }
  });
  socket.on("addipptinfo", async ({ id, date, pushups, situps, run, score })=>{
    const userData = await UserSchema.findOne({id});
    const ipptData = userData.ippt;
    ipptData.record.push({date,pushups,situps,run,score,idx:v4()});
    try{
      const saveData = await UserSchema.findOneAndUpdate({id},{ippt:ipptData})
      const updatedUser = await UserSchema.findOne({id});
      socket.emit("addipptinfo-return",{status_:"S",userInfo:updatedUser})
    }catch(err){
      console.log(err)
      socket.emit("addipptinfo-return",{status_:"F"})
    }
  });
});

server.listen(process.env.PORT || PORT, () => {
  console.log("Listening on port", process.env.PORT || PORT);
});
// require("dotenv").config();
