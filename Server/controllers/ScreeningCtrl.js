const Screening = require('../models/Screening')
const Movie = require('../models/Movie');
const Theater_Room = require('../models/Theater_Room');
const Theater = require('../models/Theater');
const { populate } = require('../models/Screening');
const mongoose = require('mongoose');

const ScreeningCtrl = {
    AddScreening : async(req,res) =>{
        try{
            const {theater_RoomId,MovieId,time_start,time_lasts,launch_date} = req.body

            const check_Screening = await Screening.findOne({theater_RoomId,MovieId,time_start,launch_date})
            if(check_Screening) return res.status(400).json({msg:"this Screening already exists!"})
            await Movie.findByIdAndUpdate(MovieId,{premiere:1})
            const Room = await Theater_Room.findById(theater_RoomId).select("matrix_chair")
            const matrix_chair = new Array();
            for(var i = 0 ; i < Room.matrix_chair[0]; i++){
                matrix_chair[i]= new Array();
                for(var j = 0 ; j < Room.matrix_chair[1]; j++){
                    matrix_chair[i][j] = 0;
                }
            }
            const seats = Room.matrix_chair[0]* Room.matrix_chair[1];
            const newtheater_Screening = new Screening({theater_RoomId,MovieId,time_start,time_lasts,launch_date,matrix_seats:matrix_chair,seats})
            await newtheater_Screening.save();
            res.json({msg:'Add Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    DeleteScreening : async(req,res) =>{
        try{
            await Screening.findByIdAndDelete(req.params.id)
            res.json({msg:'Delete Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    UpdateScreening : async(req,res) =>{
        try{
            const {theater_RoomId,MovieId,time_start,time_end,id} = req.body
            const check_Screening = await Screening.findOne({theater_RoomId,MovieId,time_start,time_end})
            if(check_Screening) return res.status(400).json({msg:"this Screening already exists!"})
            await Screening.findOneAndUpdate({_id:id},{
                theater_RoomId,MovieId,time_start,time_end
          })
            res.json({msg:'Update Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Get_allScreening : async(req,res) =>{
        const {still} = req.body
        if(still){
            try{
                const screening = await Screening.find({seats: { $gt: 0 }})
                return res.json({screening:screening})
            }catch(err) {
                return res.status(500).json({msg: err.message})
            }
        }
        else
        try{
            Screening.
                find().populate(
                    {
                        path: "theater_RoomId",
                        populate:{path:"theaterId"}
                        }
                ).
                populate('MovieId').
                exec(function (err, screening) {
                    if (err) return handleError(err);
                    return res.json({screenings:screening})
                });

        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Get_byMovie : async(req,res) =>{
        try{
            const {Movie_name} = req.body

            Screening.
                find({seats: { $gte: 0 }, MovieId: await Movie.findOne({title:Movie_name})}).
                exec(function (err, movie) {
                    if (err) return handleError(err);
                    return res.json({screening:movie})
                });
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    Get_byMovieandTheater : async(req,res) =>{
        try{
            const {Movie_id,Theater_id} = req.body

            Screening.
                find({MovieId: await Movie.findOne({MovieId:Movie_id}), theater_RoomId:await Movie.findOne({theaterId:Theater_id}) }).
                exec(function (err, screening) {
                    if (err) return handleError(err);
                    return res.json({screening:screening})
                });
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    
    Get_byMovieId : async(req,res) =>{
        try{
            const Movie_id = req.params.id

            Screening
            .find({MovieId:Movie_id})
            .populate(
                {
                    path:'theater_RoomId',
                    populate:{
                        path:'theaterId'
                    }
                }
            )
            .exec(function (err, screening) {
                    if (err) return handleError(err);
                    return res.json(screening)
                });
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Get_byTimeStart : async(req,res) =>{
        try{
            const {time_start} = req.body
            const screening = await Screening.find({time_start:time_start})
            return res.json({screening:screening})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports = ScreeningCtrl