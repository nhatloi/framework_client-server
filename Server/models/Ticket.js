const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticket = new mongoose.Schema({
    ScreeningId: {
        type: Schema.Types.ObjectId,
        ref: 'Screening',
        required:[true,'please enter fields'],
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:[true,'please enter fields'],
    },
    number_seat: {
        type: Array,
        required:[true,'please enter room number seat'],
        default:[-1,-1]
    },



}, { timestamps: true })


module.exports = mongoose.model('Ticket',ticket)