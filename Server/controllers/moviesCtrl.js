const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");
const Scraper = require('images-scraper');
const Movie = require('../models/Movie');

const {THEMOVIEDBURL,THEMOVIEDBKEY,BACKDROP_SIZE,IMAGE_SIZE,IMAGE_BASE_URL,LANGUAGE,POSTER_SIZE} = process.env



const fetchData = async(url) =>{
    const result = await axios.get(url)
    return result.data
}

const fetchTrailer = async(movie_id) =>{
    const urlTrailer = `${THEMOVIEDBURL}movie/${movie_id}/videos?api_key=${THEMOVIEDBKEY}`
    const trailer = ((await fetchData(urlTrailer)).results)[0].key
    return trailer
}

const moviesCtrl = {
    //watch movies in theaters
    MovieTheaters : async (req,res) =>{
        url = req.body.url
        const movies = []
        try {
            const content = await fetchData(url)
            const $ =cheerio.load(content)
            const tab_onshow = $('#tab_onshow')
            $('.col-lg-2').each((i,e)=>{
                const movie={
                    poster_path:'',
                    title:'',
                    release_date:'',
                    linkmovie:'',
                }
                movie.poster_path = $(e).find(' .card > a >img').attr('data-src');
                movie.title = $(e).find('h3> a').attr('title');
                movie.release_date = $(e).find('div.text-muted').text().trim();
            
                movie.linkmovie = 'https://moveek.com'+ $(e).find('.card > a ').attr('href');

                movies.push(movie)
            })
            return res.json({movies})
          
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
        
    
    },
    DetailMovieMovieTheaters : async (req,res) =>{
        url = req.body.url
        const content = await fetchData(url)
        const $ =cheerio.load(content)
        const movie = {
            original_title:'',
            release_date:'',
            runtime:'',
            actors:[],
            directors:[],
            title:'',
            overview:'',
            poster_path:'',
            trailer:'',
        }
    
          const body = $('#app');
          movie.poster_path = body.find('img.img-fluid').attr('data-src');
          movie.title = body.find('h1.text-truncate > a').attr('title');
          movie.original_title = body.find('p.text-truncate').text().trim();
          movie.original_title = movie.original_title.replace(/\s+/g,' ')
          const trailer = body.find('.row .text-sm-left > a.btn-outline-light').attr('data-video-url');
          if(!trailer) movie.trailer = 'null'
          else  movie.trailer = 'https://www.youtube.com/watch?v=' + trailer
          movie.overview = body.find('p.text-justify').text();
    
        $('.text-sm-left > span').each((i,e)=>{
            if(i === 0) movie.release_date = $(e).text();
            if(i === 1) movie.runtime = $(e).text();
        })
        $('.mb-2').each((i,e)=>{
            if(i===0){
                $(e).find('span > a.text-danger').each((index,e2)=>{
                    movie.actors.push($(e2).text());
                })
            }
            if(i===1){
                $(e).find('span > a.text-danger').each((index,e2)=>{
                    movie.directors.push($(e2).text());
                })
            }

        })

        //get poster
        const google = new Scraper({  
          } );
        const results = await google.scrape(`banner movie : '${movie.original_title}'`,1);
        movie.backdrop_path = results[0].url
        return res.json({movie})        
    },
    SearchMovie : async (req,res) =>{
        url = req.body.url
        const movies = []
        try {
            const content = await fetchData(url)
            const $ =cheerio.load(content)
            const tab_onshow = $('.slick-track')
            $('div.mb-4').each((i,e)=>{
                const movie={
                    img:'',
                    title:'',
                    date:'',
                    linkmovie:'',
                }
                movie.img = $(e).find('a > img').attr('data-src');
                movie.title = $(e).find('h3> a').attr('title');
                movie.date = $(e).find('p.text-muted').text().trim();
            
                movie.linkmovie = 'https://moveek.com'+ $(e).find('a ').attr('href');

                movies.push(movie)
            })
            return res.json(movies)
          
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
        
    
    },

    MovieThemoviedb : async (req,res) =>{
        const movies = []
        try {
            const url = `${THEMOVIEDBURL}movie/popular?api_key=${THEMOVIEDBKEY}&language=${LANGUAGE}`
            const results = (await fetchData(url)).results

            results.forEach(movie => {
                const newMovie = {
                    id:'',
                    title:'',
                    poster_path:'',
                    release_date:'',
                }
                newMovie.id = movie.id
                newMovie.poster_path =`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                newMovie.title = movie.original_title
                newMovie.release_date = movie.release_date
                movies.push(newMovie)
              }); 

            return res.json({movies})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
        
    
    },
    MovieDetailThemoviedb : async (req,res) =>{
        const movie_id = req.body.id
        try {
            const url = `${THEMOVIEDBURL}movie/${movie_id}?api_key=${THEMOVIEDBKEY}&language=${LANGUAGE}`
            const results = (await fetchData(url))
            const movie = {
                original_title:'',
                release_date:'',
                runtime:'',
                actors:[],
                directors:[],
                title:'',
                overview:'',
                poster_path:'',
                trailer:'',
                backdrop_path:'',
            }
            movie.original_title = results.original_title
            movie.release_date = results.release_date
            movie.runtime = results.runtime + 'P'
            movie.title = results.title
            movie.overview = results.overview
            movie.poster_path =`${IMAGE_BASE_URL}${POSTER_SIZE}${results.poster_path}`
            movie.backdrop_path = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${results.backdrop_path}`
            
            const urlTrailer = `${THEMOVIEDBURL}movie/${movie_id}/videos?api_key=${THEMOVIEDBKEY}`
            const keyTrailer = (await fetchData(urlTrailer)).results[0].key
            movie.trailer = 'https://www.youtube.com/watch?v=' + keyTrailer

            const urlCredits= `${THEMOVIEDBURL}movie/${movie_id}/credits?api_key=${THEMOVIEDBKEY}&language=${LANGUAGE}`
            const credits = (await fetchData(urlCredits))
            const actors = credits.cast
            actors.forEach(actor => { 
               movie.actors.push(actor.original_name)
            }); 
            const directors = credits.crew
            directors.forEach(director => { 
                if(director.department === 'Directing')
                movie.directors.push(director.original_name)
             }); 
            return res.json({movie:movie})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    AddMovie : async (req,res) =>{
        try {
            const movie = req.body.movie
            const {original_title,release_date,runtime,actors,directors,title,overview,poster_path,trailer,backdrop_path} = movie
            const check_movie = await Movie.findOne({original_title,title,runtime})
            if(check_movie) return res.status(400).json({msg:'this Movie already exists!'})
            const newMovie = new Movie({
                original_title,release_date,runtime,actors,directors,title,overview,poster_path,trailer,backdrop_path
            })


            await newMovie.save();
            res.json({msg:"Movie Added!"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    GetAllMovie : async (req,res) =>{
        try {
            const movie = await Movie.find()
            return res.json({totalResult:movie.length,movie:movie})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    DeleteMovie : async (req,res) =>{
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.json({msg:'delete success!'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    DeleteAllMovie : async (req,res) =>{
        try {
            await Movie.deleteMany()
            res.json({msg:'delete all success!'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    


}


module.exports = moviesCtrl