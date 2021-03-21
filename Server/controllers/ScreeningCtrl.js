const theater_room = require('../models/Theater_Room')
const Theater = require('../models/Theater')
const Movie = require('../models/Movie')
const Screening = require('../models/Screening')


const ScreeningCtrl = {
    AddScreening : async(req,res) =>{
        try{
            const {theater_RoomId,MovieId,day} = req.body
            const check_Screening = await Screening.findOne({theater_RoomId,MovieId,day})
            if(check_Screening) return res.status(400).json({msg:'this Screening already exists!'})
            const newtheater_Screening = new Screening({theater_RoomId,MovieId,day})
            await newtheater_Screening.save();

            res.json({msg:'Add Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    GetInforScreening : async(req,res) =>{
        try{
            const {_id} = req.body
            const check_Screening = await Screening.findById({_id})
            res.json({Screening:check_Screening})

        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports = ScreeningCtrl