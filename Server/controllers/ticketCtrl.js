
const Ticket = require('../models/Ticket')


const ScreeningCtrl = {
    AddTicket : async(req,res) =>{
        try{
            // const {theater_RoomId,MovieId,day} = req.body
            // const check_Screening = await Screening.findOne({theater_RoomId,MovieId,day})
            // if(check_Screening) return res.status(400).json({msg:'this Screening already exists!'})
            // const newtheater_Screening = new Screening({theater_RoomId,MovieId,day})
            // await newtheater_Screening.save();

            res.json({msg:'Add Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    DeleteTicket : async(req,res) =>{
        try{
            res.json({msg:'Delete Ticket successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    UpdateTicket : async(req,res) =>{
        try{
            res.json({msg:'Update Ticket successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Get_allTicket : async(req,res) =>{
        try{
            res.json({msg:'get all Ticket successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Get_byUser : async(req,res) =>{
        try{
            res.json({msg:'get by user Ticket successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Get_byScreening : async(req,res) =>{
        try{
            res.json({msg:'get by Screening Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports = ScreeningCtrl