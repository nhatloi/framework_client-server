const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");
const Scraper = require('images-scraper');
const Movie = require('../models/Movie')

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
    //watch movies Free
    FreeMovies : async (req,res) =>{
        url = req.body.url
        const movies=[]
        var totalPage=[];
        try {
            const content = await fetchData(url)
            const $ =cheerio.load(content)
            $('.halim-thumb').each((i,e)=>{
                const title = $(e).find('img').attr('title');
                const img = $(e).find('img').attr('src');
                const time = $(e).find('.duration').text();
                const href = $(e).attr('href');
                const episode = $(e).find('>span.episode').text();
                const movie ={
                    title:title,
                    img:img,
                    time:time,
                    href:href,
                    episode:episode,
                }
                movies.push(movie)
            })
            $('ul.page-numbers > li > a.page-numbers').each((i,e)=>{
                
                const page = $(e).text();
                totalPage.push(page);
            })
                totalPage.pop()
            res.json({totalPage:totalPage[totalPage.length-1],result:movies})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }    
    },
    FreeMovieDetail : async (req,res) =>{
        url = req.body.url
        //const 
        const movie = {
            title:'',
            year:'',
            episode:'',
            duration:'',
            country:'',
            actors:[],
            category:'',
            poster:'',
            trailer:'',
            overview:'',
            playvideo:[],
        }

        try {
             // movies infor
             const content = await fetchData(url)
             const $ =cheerio.load(content)
                 const body = $('#content');
         
                 // movies infor
                movie.title = body.find('.entry-title').text().trim()
                movie.year = body.find ('.title-year').text()
                movie.episode = body.find ('.episode').text().trim()
                movie.duration = body.find ('.duration').text().trim()
                movie.country = body.find ('.actors').first().text().trim()
                movie.overview = body.find('.item-content > p').text().trim()

                $('.movie-detail > p.actors > a').each((i,e)=>{
                    movie.actors.push($(e).attr('title'));
                })
                movie.actors.splice(0, 1)
                movie.category = body.find ('.category').text().trim()
        
                //movies link
                movie.poster = body.find('.item-content > p > img').attr('src')
                movie.trailer = body.find('.show-trailer').attr('data-url')

                 //get link movies
                const linkPlay = body.find('.halim-watch-box > a').attr('href')
                const getlink = await fetchData(linkPlay)
                const $$ =cheerio.load(getlink)
                $$('li.halim-episode > a').each((i,e)=>{
                    movie.playvideo.push($$(e).attr('href'));
                })

                res.json({results:movie})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
       

    }, 
    PlayVideo : async (req,res) =>{
        url = req.body.url
        try {
            const content = await fetchData(url)
            const $ =cheerio.load(content)
            const playvideo = $('iframe.embed-responsive-item').attr('src');
            return res.json({playvideo})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

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
            
            const urlTrailer = `${THEMOVIEDBURL}movie/${movie_id}/videos?api_key=${THEMOVIEDBKEY}&language=${LANGUAGE}`
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
            return res.json({movies:movie})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },


}


module.exports = moviesCtrl