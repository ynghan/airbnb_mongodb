const { Router } = require("express");
const houseRouter = Router();
const reservationService = require('../service/reservationService');


router.post('/', async (req, res) => {
    try {
        await reservationService.createReservation(req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await reservationService.cancelReservation(req.params.id);
        res.status(200).send();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
