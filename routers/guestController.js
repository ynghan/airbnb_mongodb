const { Router } = require("express");
const Guest = require("../models/guest");
const router = express.Router();
const guestService = require('../service/guestService');


router.post('/', async (req, res) => {
    try {
        await guestService.createGuest(req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

//
router.get('/:id/reservations', async (req, res) => {
    try {
        const reservations = await guestService.getReservationHistory(req.params.id, req.query.findType);
        res.status(200).send(reservations);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
