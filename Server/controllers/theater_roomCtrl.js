const theater_room = require('../models/Theater_Room')
const Theater = require('../models/Theater')

const Theater_RoomCtrl = {
    AddRoom : async(req,res) =>{
        try{
            const {theaterId,index,seats} = req.body
            const check_Theater = await theater_room.findOne({theaterId,index})
            if(check_Theater) return res.status(400).json({msg:'this Theater Room already exists!'})
            const newtheater_room = new theater_room({theaterId,index,seats})
            await newtheater_room.save();

            res.json({msg:'Add Theater Room successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    DeleteRoom : async(req,res) =>{
        try{

            res.json({msg:'Delete Theater Room successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    UpdateRoom : async(req,res) =>{
        try{

            res.json({msg:'Update Theater Room successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    GetInfor_allRoom : async(req,res) =>{
        try{
            // const {_id} = req.body
            // const check_Room = await theater_room.findById({_id})
            // const check_Theater = await Theater.findById({_id:check_Room.theaterId})
            // if(!check_Room || !check_Theater) return res.status(400).json({msg:'not found!'})
            // res.json({Room:check_Room,Theater:check_Theater})
            res.json({msg:'get infor all Room in Theater successfully!'})

        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    GetInfor_oneRoomByindex : async(req,res) =>{
        try{
            
            res.json({msg:'get one room by index Theater Room successfully!'})

        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports = Theater_RoomCtrl