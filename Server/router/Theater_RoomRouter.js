const router = require('express').Router()
const Theater_RoomCtrl = require('../controllers/theater_roomCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/addtheater_room',auth,authAdmin, Theater_RoomCtrl.AddTheater)
module.exports = router


