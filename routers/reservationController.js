const { Router } = require("express");
const reservationRouter = Router();
const reservationService = require("../service/reservationService");

reservationRouter.post("/", async (req, res) => {
  try {
    await reservationService.createReservation(req.body);
    res.status(201).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

reservationRouter.delete("/:id", async (req, res) => {
  try {
    await reservationService.cancelReservation(req.params.id);
    res.status(200).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = reservationRouter;
