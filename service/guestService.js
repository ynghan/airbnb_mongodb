const { Guest } = require('../models/guest');
const { Reservation } = require('../models/reservation');

async function createGuest(data) {
    const guest = new Guest(data);
    await guest.save();
}


async function getReservationHistory(guestId, findType) {
    let condition = {};
    condition.guestId = guestId;

    if (findType === 'oncoming') {
        condition.checkin = { $gt: new Date() };
    } else if (findType === 'terminated') {
        condition.checkout = { $lt: new Date() };
    }

    const reservations = await Reservation.find(condition).sort({ checkin: -1 });
    return reservations;
}

module.exports = {
    createGuest,
    getReservationHistory
};
