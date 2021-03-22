const theater_room = require('../models/Theater_Room')
const Theater = require('../models/Theater')
const Movie = require('../models/Movie')
const Screening = require('../models/Screening')


const ScreeningCtrl = {
    AddScreening : async(req,res) =>{
        try{
            const {theater_RoomId,MovieId,time_start,time_end} = req.body
            const check_Screening = await Screening.findOne({theater_RoomId,MovieId,time_start,time_end})
            if(check_Screening) return res.status(400).json({msg:'this Screening already exists!'})
            const newtheater_Screening = new Screening({theater_RoomId,MovieId,time_start,time_end})
            await newtheater_Screening.save();

            res.json({msg:'Add Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    DeleteScreening : async(req,res) =>{
        try{
            res.json({msg:'Delete Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    UpdateScreening : async(req,res) =>{
        try{
            res.json({msg:'Update Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Get_allScreening : async(req,res) =>{
        try{
            res.json({msg:'get all Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Get_byMovie : async(req,res) =>{
        try{
            res.json({msg:'get by movie Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Get_byTimeStart : async(req,res) =>{
        try{
            res.json({msg:'get by time start Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports = ScreeningCtrl