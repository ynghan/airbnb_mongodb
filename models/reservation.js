const { Schema, model, Types } = require("mongoose");

const ReservationSchema = new Schema({
  guest: { type: Types.ObjectId, required: true, ref: "Guest" },
  house: { type: Types.ObjectId, required: true, ref: "House" },
  num_people: Number,
  check_in: {
    year: Number,
    month: Number,
    day: Number,
  },
  check_out: {
    year: Number,
    month: Number,
    day: Number,
  },
});
const Reservation = model("Reservation", ReservationSchema);
module.exports = { Reservation };
