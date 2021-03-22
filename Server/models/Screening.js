const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screening = new mongoose.Schema({
    theater_RoomId: {
        type: Schema.Types.ObjectId,
        ref: 'Theater_Room',
        required:[true,'please enter'],
    },
    MovieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required:[true,'please enter '],
    },
    time_start: {
        type:Date,
        required:[true,'please enter'],
    },
    time_end: {
        type:Date,
        required:[true,'please enter'],
    },
})


module.exports = mongoose.model('Screening',screening)