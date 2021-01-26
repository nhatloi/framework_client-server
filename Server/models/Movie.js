const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movie = new mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type:String,
    },
    original_title: {
        type: String,
    },
    catogory: String,
    views : {
        type: Number,
        default: 0 
    },
    overview: {
        type:String
    },
    poster_path: {
        type:String
    },
    videotrailer: {
        type:String
    },
}, { timestamps: true })


module.exports = mongoose.model('Movie',movie)