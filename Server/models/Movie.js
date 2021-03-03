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
    overview: {
        type:String
    },
    runtime:{
        type:String
    },
    actors:{
        type:Array
    },
    directors:{
        type:Array
    },
    poster_path: {
        type:String
    },
    backdrop_path: {
        type:String
    },

    trailer: {
        type:String
    },
}, { timestamps: true })


module.exports = mongoose.model('Movie',movie)