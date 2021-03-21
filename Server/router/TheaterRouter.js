const router = require('express').Router()
const TheaterCtrl = require('../controllers/TheaterCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/addtheater',auth,authAdmin, TheaterCtrl.AddTheater)
router.delete('/deletetheater/:id',auth,authAdmin,TheaterCtrl.DeleteTheater)
router.post('/updatetheater',auth,authAdmin, TheaterCtrl.UpdateTheater)
router.get('/get_onetheater',auth,authAdmin, TheaterCtrl.GetOne_Theater)
router.get('/get_alltheater',auth,authAdmin, TheaterCtrl.GetAll_Theater)
module.exports = router


