const { Schema, model, Types } = require("mongoose");


const ReservationSchema = new Schema({
    guest: { type: Types.ObjectId, required: true, ref: "Guest" },
    house: { type: Types.ObjectId, required: true, ref: "House" },
    num_people: Number,
    check_in: {
        city: String,
        street: String,
        zipcode: String,
    },
    check_out: {
        city: String,
        street: String,
        zipcode: String,
    },
});
const Reservation = model("Reservation", ReservationSchema);
module.exports = { Reservation };