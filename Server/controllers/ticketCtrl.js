const Screening = require('../models/Screening')
const Ticket = require('../models/Ticket')


const TicketCtrl = {
    AddTicket : async(req,res) =>{
        try{
            const {ScreeningId,UserId,number_seat} = req.body
            const check_ticket= await Ticket.findOne({ScreeningId,UserId,number_seat})
            if(check_ticket) return res.status(400).json({msg:'this Ticket already exists!'})
            const newTicket = new Ticket({ScreeningId,UserId,number_seat})
            var check_seat= await Screening.findById(ScreeningId)
            if(check_seat.matrix_seats[number_seat[0]][number_seat[1]] == 0)
                return res.status(500).json({msg:"seats already exists!"})
            check_seat.matrix_seats[number_seat[0]][number_seat[1]] = 0 
            await Screening.findOneAndUpdate({_id:ScreeningId},{matrix_seats:check_seat.matrix_seats,seats:check_seat.seats-1})
            await newTicket.save();
            res.json({msg:'Add Screening successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    DeleteTicket : async(req,res) =>{
        try{
            const check_ticket= await Ticket.findById(req.params.id)
            var check_seat= await Screening.findById(check_ticket.ScreeningId)
            check_seat.matrix_seats[check_ticket.number_seat[0]][check_ticket.number_seat[1]] =1
            await Screening.findOneAndUpdate({_id:check_ticket.ScreeningId},{matrix_seats:check_seat.matrix_seats,seats:check_seat.seats+1})
            await Ticket.findByIdAndDelete(req.params.id)
            res.json({msg:'Delete Ticket successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    Change_seat : async(req,res) =>{
        try{
            const {number_seat,id} = req.body
            const check_ticket= await Ticket.findById(id)
            var check_seat= await Screening.findById(check_ticket.ScreeningId)
            if(check_seat.matrix_seats[number_seat[0]][number_seat[1]] == 0)
                return res.status(500).json({msg:"seats already exists!"})
            check_seat.matrix_seats[number_seat[0]][number_seat[1]] = 0
            check_seat.matrix_seats[check_ticket.number_seat[0]][check_ticket.number_seat[1]] = 1
            await Ticket.findOneAndUpdate({_id:id},{number_seat:number_seat})
            await Screening.findOneAndUpdate({_id:check_ticket.ScreeningId},{matrix_seats:check_seat.matrix_seats})
            res.json({msg:'Change seat successfully!'})
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    Get_allTicket : async(req,res) =>{
        try{
            const ticket = await Ticket.find()
            return res.json({ticket:ticket})
           
        }catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },

    Get_byUser : async(req,res) =>{
        try{
            const {userId} = req.body
            const ticket = await Ticket.find({UserId:userId})
            return res.json({ticket:ticket})
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

module.exports = TicketCtrl