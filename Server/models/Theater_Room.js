const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theater_room = new mongoose.Schema({
    theaterId: {
        type: Schema.Types.ObjectId,
        ref: 'Theater',
        required:[true,'please enter '],
    },
    index: {
        type:Number,
        required:[true,'please enter index room'],
    },
    address: {
        type: String,
        required:[true,'please enter your email'],
    },
    seats:{
        type:Array,
        required:[true,'please enter seats'],
    }

}, { timestamps: true })


module.exports = mongoose.model('Theater_Room',theater_room)