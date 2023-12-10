const { Review } = require('../models/review');

async function createReview(data) {
    const review = new Review(data);
    await review.save();
}

module.exports = {
    createReview
};
