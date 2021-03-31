const router = require('express').Router()
const Theater_RoomCtrl = require('../controllers/theater_roomCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/addtheater_room',auth,authAdmin, Theater_RoomCtrl.AddRoom)
router.delete('/deletetheater_room/:id',auth,authAdmin, Theater_RoomCtrl.DeleteRoom)
router.post('/updatetheater_room',auth,authAdmin, Theater_RoomCtrl.UpdateRoom)
router.post('/searchRoom',auth,authAdmin, Theater_RoomCtrl.SearchRoom)
router.post('/get_many', Theater_RoomCtrl.GetMany_Room)
router.get('/getinfor_allroom',auth,authAdmin, Theater_RoomCtrl.GetInfor_allRoom)
module.exports = router


