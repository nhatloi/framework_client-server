const theater_room = require('../models/Theater_Room')
// const Theater = require('../models/Theater')

const Theater_RoomCtrl = {
    AddRoom : async(req,res) =>{
        try{
            const {theaterId,index,matrix_chair} = req.body
            const check_Theater = await theater_room.findOne({theaterId,index})
            if(check_Theater) return res.status(400).json({msg:'this Theater Room already exists!'})
            const newtheater_room = new theater_room({theaterId,index,matrix_chair})
            await newtheater_room.save();
            res.json({msg:'Add Theater Room successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    DeleteRoom : async(req,res) =>{
        try{
            await theater_room.findByIdAndDelete(req.params.id)
            res.json({msg:'delete success!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    UpdateRoom : async(req,res) =>{
        try{
            const {theaterId,index,matrix_chair,id} =req.body
            await theater_room.findOneAndUpdate({_id:id},{
                theaterId,index,matrix_chair
          })
            res.json({msg:'Update Theater Room successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    GetInfor_allRoom : async(req,res) =>{
        try{
            const Room = await theater_room.find()
            return res.json({theater_room:Room})

        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    SearchRoom : async(req,res) =>{
        const {index,theaterId,_id} =req.body
        //search by index
        if(index)
        try{
            const Room = await theater_room.findOne({index:index})
            return res.json({theater_room:Room})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
        //search by Theater
        if(theaterId)
        try{
            const Room = await theater_room.findOne({theaterId:theaterId})
            return res.json({theater_room:Room})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
        //search by id
        if(_id)
        try{
            const Room = await theater_room.findById(_id)
            return res.json({theater_room:Room})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }


    },

}

module.exports = Theater_RoomCtrl