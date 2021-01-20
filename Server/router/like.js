const router= require('express').Router()
const likeCtrl = require('../controllers/likeCtrl')

router.post('/getLikes', likeCtrl.GetLikes)
router.post("/upLike",likeCtrl.Uplike )
router.post("/unLike", likeCtrl.Unlike )
router.post("/upDisLike",likeCtrl.Updislike )
router.post("/unDisLike", likeCtrl.Undislike )

module.exports = router