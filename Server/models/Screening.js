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
    launch_date: {
        type:String,
        required:[true,'please enter'],
    },
    time_start: {
        type:String,
        required:[true,'please enter'],
    },
    time_lasts: {
        type:String,
        required:[true,'please enter'],
    },
    seats:{
        type:Number,
        default:0,
    },
    matrix_seats:{
        type:Array,
    }

})


module.exports = mongoose.model('Screening',screening)