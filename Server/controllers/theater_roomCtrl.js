const theater_room = require('../models/Theater_Room')

const Theater_RoomCtrl = {
    AddTheater : async(req,res) =>{
        try{
            const theater_room = req.body.theater_room
            const {theaterId,index,seats} = theater_room
            const check_Theater = await Theater.findOne({theaterId,index,seats})
            if(check_Theater) return res.status(400).json({msg:'this Theater Room already exists!'})
            const newtheater_room = new theater_room({theaterId,index,seats})
            await newtheater_room.save();

            res.json({msg:'Add Theater Room successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports = Theater_RoomCtrl