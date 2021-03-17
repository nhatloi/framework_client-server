const router = require('express').Router()
const TheaterCtrl = require('../controllers/TheaterCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/addtheater',auth,authAdmin, TheaterCtrl.AddTheater)
module.exports = router


