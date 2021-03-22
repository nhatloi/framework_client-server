const router = require('express').Router()
const ScreeningCtrl = require('../controllers/ScreeningCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/addscreening',auth,authAdmin, ScreeningCtrl.AddScreening)
router.delete('/deletescreening/:id',auth,authAdmin, ScreeningCtrl.DeleteScreening)
router.post('/updatescreening',auth,authAdmin, ScreeningCtrl.UpdateScreening)
router.get('/get_allscreening',auth,authAdmin, ScreeningCtrl.Get_allScreening)
router.get('/get_bymovie',auth,authAdmin, ScreeningCtrl.Get_byMovie)
router.get('/get_bytime',auth,authAdmin, ScreeningCtrl.Get_byTimeStart)



module.exports = router


