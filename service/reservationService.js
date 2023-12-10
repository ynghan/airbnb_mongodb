const { Reservation } = require('../models/reservation');

async function createReservation(data) {
    const reservation = new Reservation(data);
    await reservation.save();
}

async function cancelReservation(id) {
    await Reservation.findByIdAndRemove(id);
}

module.exports = {
    createReservation,
    cancelReservation
};
