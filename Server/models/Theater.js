const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theater = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'please enter name'],
    },
    address: {
        type: String,
        required:[true,'please enter address'],
    },

}, { timestamps: true })


module.exports = mongoose.model('Theater',theater)