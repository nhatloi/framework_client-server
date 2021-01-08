const router = require('express').Router()
const moviesCtrl = require('../controllers/moviesCtrl')


router.post('/fetchMovies',moviesCtrl.FreeMovies)
router.post('/fetchMoviesDetail',moviesCtrl.FreeMovieDetail)

module.exports = router