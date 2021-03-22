const Theater = require('../models/Theater')

const TheaterCtrl = {
    AddTheater : async(req,res) =>{
        try{
            const {name,address} = req.body
            const check_Theater = await Theater.findOne({name,address})
            if(check_Theater) return res.status(400).json({msg:'this Theater already exists!'})
            const newTheater = new Theater({name,address})
            await newTheater.save();

            res.json({msg:'Add Theater successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    DeleteTheater : async(req,res) =>{
        try{
            await Theater.findByIdAndDelete(req.params.id)
        res.json({msg:'delete success!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    UpdateTheater : async(req,res) =>{
        try{
            const {name,address,id} =req.body
            await Theater.findOneAndUpdate({_id:id},{
              name,address
          })
            res.json({msg:'Update Theater successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    GetAll_Theater : async(req,res) =>{
        try{
            const theater = await Theater.find()
            return res.json({theater:theater})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    GetOne_Theater : async(req,res) =>{
        const {id,name} =req.body
        if(id)
        try{
            const theater = await Theater.findOne({_id:id})
            res.json({theater:theater})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
        if(name)
        try{
            const theater = await Theater.findOne({name:name})
            res.json({theater:theater})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports = TheaterCtrl