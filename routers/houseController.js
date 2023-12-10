const { Router } = require("express");
const { House } = require("../models/house");
const { isValidObjectId } = require("mongoose");
const reviewRouter = require("./reviewController");

const houseRouter = Router();

houseRouter.post("/", async (req, res) => {
  try {
    await houseService.createHouse(req.body);
    res.status(201).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

houseRouter.get("/", async (req, res) => {
  try {
    const houses = await houseService.getHousesByCondition(req.query);
    res.status(200).send(houses);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

houseRouter.get("/:id", async (req, res) => {
  try {
    const house = await houseService.getHouseDetail(req.params.id);
    if (house) {
      res.status(200).send(house);
    } else {
      res.status(404).send({ message: "House not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = houseRouter;
