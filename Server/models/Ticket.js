const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticket = new mongoose.Schema({
    ScreeningId: {
        type: Schema.Types.ObjectId,
        ref: 'Theater_Room',
        required:[true,'please enter'],
    },
    number_seat: {
        type: String,
        required:[true,'please enter room number seat'],
    },


}, { timestamps: true })


module.exports = mongoose.model('Ticket',ticket)