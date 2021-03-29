const router = require('express').Router()
const moviesCtrl = require('../controllers/moviesCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/fetchMovieTheaters',moviesCtrl.MovieTheaters)
router.get('/fetchMovieDetailTheaters',moviesCtrl.DetailMovieMovieTheaters)
router.get('/searchTheaters',moviesCtrl.SearchMovie)
router.get('/searchthemoviedb',moviesCtrl.SearchThemoviedb)
router.get('/themoviedb',auth,authAdmin,moviesCtrl.MovieThemoviedb)
router.post('/themoviedbdetail',moviesCtrl.MovieDetailThemoviedb)

router.post('/addmovie',auth,authAdmin, moviesCtrl.AddMovie)
router.post('/updatemovie',auth,authAdmin, moviesCtrl.UpdateMovie)
router.get('/getallmovie', moviesCtrl.GetAllMovie)
router.get('/getcomingsoon', moviesCtrl.GetComing_soon)
router.get('/getplaynow', moviesCtrl.GetPlaynow)
router.get('/getmoviebyid/:id',moviesCtrl.GetMovieById)
router.delete('/delete/:id',auth,authAdmin,moviesCtrl.DeleteMovie)
router.delete('/delete_all',auth,authAdmin,moviesCtrl.DeleteAllMovie)



module.exports = router