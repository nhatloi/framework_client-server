const router = require('express').Router()
const Theater_RoomCtrl = require('../controllers/theater_roomCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/addtheater_room',auth,authAdmin, Theater_RoomCtrl.AddRoom)
router.post('/deletetheater_room',auth,authAdmin, Theater_RoomCtrl.DeleteRoom)
router.post('/updatetheater_room',auth,authAdmin, Theater_RoomCtrl.UpdateRoom)
router.get('/get_indexroom',auth,authAdmin, Theater_RoomCtrl.GetInfor_oneRoomByindex)
router.get('/getinfor_allroom',auth,authAdmin, Theater_RoomCtrl.GetInfor_allRoom)
module.exports = router


