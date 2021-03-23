const router = require('express').Router()
const NewsCrl = require('../controllers/NewsCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/addnews',auth,authAdmin, NewsCrl.AddNews)
router.get('/getnews', NewsCrl.GetNews)
router.get('/get_allnews',NewsCrl.GetAllNews)
router.delete('/deletenews/:id',auth,authAdmin, NewsCrl.DeleteNews)

module.exports = router