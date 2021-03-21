const router = require('express').Router()
const ScreeningCtrl = require('../controllers/ScreeningCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/addscreening',auth,authAdmin, ScreeningCtrl.AddScreening)
router.get('/getinforscreening',auth,authAdmin, ScreeningCtrl.GetInforScreening)
module.exports = router


