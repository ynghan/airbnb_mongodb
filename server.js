const express = require("express");
const app = express();
const mongoose = require("mongoose");
const houseController = require("./routers/houseController");
const reservationController = require("./routers/reservationController");
const guestController = require("./routers/guestController");
const reviewController = require("./routers/reviewController");
const { generateDummyData } = require("./faker");
const { House } = require("./models");
const hostname = "127.0.0.1";
const port = 3001;

const DB_URI = "mongodb://127.0.0.1:27017/airbnb";

const server = async () => {
  try {
    await mongoose.connect(DB_URI);
    generateDummyData(10, 10, 4);
    //(nMember, nBlogPerMember, nCommentPerMember)
    // generateDummyData(5, 10, 10);
    app.use(express.json());
    app.use("/guest", guestController);
    app.use("/house", houseController);
    app.use("/reservation", reservationController);
    app.use("/review", reviewController);
    app.listen(port, hostname, () => {
      console.log("server is running");
    });
  } catch (err) {
    console.log(err);
  }
};

server();
