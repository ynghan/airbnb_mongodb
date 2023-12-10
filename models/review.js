const { Schema, model, Types } = require("mongoose");

const ReviewSchema = new Schema({
  content: { type: String, required: true },
  reservation: { type: Types.ObjectId, required: true, ref: "Reservation" },
});
const Review = model("Review", ReviewSchema);
module.exports = { Review };
