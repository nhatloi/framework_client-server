const Screening = require('../models/Screening')
const Movie = require('../models/Movie');
const Theater_Room = require('../models/Theater_Room');

const ScreeningCtrl = {
    AddScreening : async(req,res) =>{
        try{
            const {theater_RoomId,MovieId,time_start,time_end} = req.body
            if(time_start >= time_end){
                return res.status(400).json({msg:'times not correct'})
            }

            const check_Screening = await Screening.findOne({theater_RoomId,MovieId,time_start,time_end})
            if(check_Screening) return res.status(400).json({msg:"this Screening already exists!"})

            const check_time_Screening = await Screening.find({theater_RoomId:theater_RoomId})
            if(check_time_Screening){
                var check = true;
                const n_start = new Date(time_start)
                n_start.setHours(n_start.getHours()+7)
                check_time_Screening.forEach(element => {
                    var t_end = new Date(element.time_end)
                        t_end.setHours(t_end.getHours()+7)
                    if(t_end >= n_start){
                        check= false;
                    }
                });
                if(check== false)
                    return res.status(400).json({msg:"this time of Screening already exists! "})
            }

            const Room = await Theater_Room.findOne({_id:theater_RoomId}).select("matrix_chair")
            const matrix_chair = new Array();
            for(var i = 0 ; i < Room.matrix_chair[0]; i++){
                matrix_chair[i]= new Array();
                for(var j = 0 ; j < Room.matrix_chair[1]; j++){
                    matrix_chair[i][j] = 1;
                }
            }
            const seats = Room.matrix_chair[0]* Room.matrix_chair[1];
            const newtheater_Screening = new Screening({theater_RoomId,MovieId,time_start,time_end,matrix_seats:matrix_chair,seats})
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
        try{
            const screening = await Screening.find()
            return res.json({screening:screening})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    Get_byMovie : async(req,res) =>{
        try{
            const {Movie_name} = req.body

            Screening.
                find({seats: { $gte: 0 }, MovieId: await Movie.findOne({title:Movie_name}).select("_id")}).
                exec(function (err, movie) {
                    if (err) return handleError(err);
                    return res.json({screening:movie})
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