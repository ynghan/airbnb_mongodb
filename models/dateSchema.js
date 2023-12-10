const { Schema, model, Types } = require("mongoose");

const DateSchema = new Schema({
    year: { type: Number },
    month: { type: Number },
    date: { type: Number },
});


const Date = model("Date", DateSchema);
module.exports = { Date };