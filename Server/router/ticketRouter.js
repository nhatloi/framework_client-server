const router = require('express').Router()
const TicketCtrl = require('../controllers/ticketCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/addticket',auth,authAdmin, TicketCtrl.AddTicket)
router.post('/deleteticket',auth,authAdmin, TicketCtrl.DeleteTicket)
router.post('/updateticket',auth,authAdmin, TicketCtrl.UpdateTicket)
router.get('/get_allticket',auth,authAdmin, TicketCtrl.Get_allTicket)
router.get('/get_byuser',auth,authAdmin, TicketCtrl.Get_byUser)
router.get('/get_byscreening',auth,authAdmin, TicketCtrl.Get_byScreening)
module.exports = router