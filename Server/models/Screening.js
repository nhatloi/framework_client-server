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
        type:String,
        required:[true,'please enter'],
    },

}, { timestamps: true })


module.exports = mongoose.model('Screening',screening)