const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theater_room = new mongoose.Schema({
    theaterId: {
        type: Schema.Types.ObjectId,
        ref: 'Theater',
        required:[true,'please enter field'],
    },
    index: {
        type:Number,
        required:[true,'please enter index room'],
    },
    matrix_chair:{
        type:Array,
        required:[true,'please enter seats'],
        default:[0,0]
    }

}, { timestamps: true })


module.exports = mongoose.model('Theater_Room',theater_room)