const router = require('express').Router()
const moviesCtrl = require('../controllers/moviesCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/fetchMovieTheaters',moviesCtrl.MovieTheaters)
router.get('/fetchMovieDetailTheaters',moviesCtrl.DetailMovieMovieTheaters)
router.post('/searchTheaters',moviesCtrl.SearchMovie)

router.get('/themoviedb',moviesCtrl.MovieThemoviedb)
router.post('/themoviedbdetail',moviesCtrl.MovieDetailThemoviedb)

router.post('/addmovie',auth,authAdmin, moviesCtrl.AddMovie)
router.get('/getallmovie',auth,authAdmin, moviesCtrl.GetAllMovie)
router.delete('/delete/:id',auth,authAdmin,moviesCtrl.DeleteMovie)
router.delete('/delete_all',auth,authAdmin,moviesCtrl.DeleteAllMovie)



module.exports = router