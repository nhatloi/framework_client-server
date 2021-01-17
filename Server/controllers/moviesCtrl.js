const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");
const Scraper = require('images-scraper');


const fetchData = async(url) =>{
    const result = await axios.get(url)
    return result.data
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
                    img:'',
                    title:'',
                    date:'',
                    linkmovie:'',
                }
                movie.img = $(e).find(' .card > a >img').attr('data-src');
                movie.title = $(e).find('h3> a').attr('title');
                movie.date = $(e).find('div.text-muted').text().trim();
            
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
            title:'',
            date:'',
            time:'',
            ageLimit:'',
            actors:[],
            directors:[],
            name:'',
            overview:'',
            poster:'',
            trailer:'',
        }
    
          const body = $('#app');
          movie.img = body.find('img.img-fluid').attr('data-src');
          movie.title = body.find('h1.text-truncate > a').attr('title');
          movie.name = body.find('p.text-truncate').text().trim();
          movie.name= movie.name.replace(/\s+/g,' ')
          movie.trailer = 'https://www.youtube.com/watch?v=' + body.find('.row .text-sm-left > a.btn-outline-light').attr('data-video-url');
          movie.overview = body.find('p.text-justify').text();
    
        $('.text-sm-left > span').each((i,e)=>{
            if(i === 0) movie.date = $(e).text();
            if(i === 1) movie.time = $(e).text();
            if(i === 2) movie.ageLimit = $(e).text();
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
        const results = await google.scrape(`banner movie : '${movie.title}'`,5);
        movie.poster = results
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

}


module.exports = moviesCtrl