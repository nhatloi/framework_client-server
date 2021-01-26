const router = require('express').Router()
const moviesCtrl = require('../controllers/moviesCtrl')


router.post('/fetchMovies',moviesCtrl.FreeMovies)
router.post('/fetchMoviesDetail',moviesCtrl.FreeMovieDetail)
router.post('/fetchPlayVideo',moviesCtrl.PlayVideo)
router.post('/fetchMovieTheaters',moviesCtrl.MovieTheaters)
router.get('/fetchMovieDetailTheaters',moviesCtrl.DetailMovieMovieTheaters)
router.post('/searchTheaters',moviesCtrl.SearchMovie)

router.get('/themoviedb',moviesCtrl.MovieThemoviedb)
router.get('/themoviedbdetail',moviesCtrl.MovieDetailThemoviedb)

module.exports = router