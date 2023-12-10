const { Router } = require("express");

const guestRouter = Router();

guestRouter.post("/", async (req, res) => {
  try {
    await guestService.createGuest(req.body);
    res.status(201).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = guestRouter;
