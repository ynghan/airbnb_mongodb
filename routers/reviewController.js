const { Router } = require("express");
const reviewRouter = Router({ mergeParams: true });
const { Review } = require("../models/review");
const { isValidObjectId } = require("mongoose");

router.post('/', async (req, res) => {
    try {
        await reviewService.createReview(req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = reviewRouter;

//후기 등록

