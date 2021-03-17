const Theater = require('../models/Theater')

const TheaterCtrl = {
    AddTheater : async(req,res) =>{
        try{
            const theater = req.body.theater
            const {name,address} = theater
            const check_Theater = await Theater.findOne({name,address})
            if(check_Theater) return res.status(400).json({msg:'this Theater already exists!'})
            const newTheater = new Theater({name,address})
            await newTheater.save();

            res.json({msg:'Add Theater successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports = TheaterCtrl