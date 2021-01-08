const axios = require('axios');
const cheerio = require('cheerio')
const fs = require("fs");

const fetchData = async(url) =>{
    const result = await axios.get(url)
    return result.data
}

const moviesCtrl = {
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
                const movie ={
                    title:title,
                    img:img,
                    time:time,
                    href:href
                }
                movies.push(movie)
            })
            $('ul.page-numbers > li > a.page-numbers').each((i,e)=>{
                
                const page = $(e).text();
                totalPage.push(page);
            })
                totalPage.pop()
            res.json({totalPage:totalPage[totalPage.length-1],totalResult:movies.length,result:movies})
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
            linkMovies:'',
            totalEpisode:0,
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

                $('.movie-detail > p.actors > a').each((i,e)=>{
                    movie.actors.push($(e).attr('title'));
                })
                movie.actors.splice(0, 1)
                movie.category = body.find ('.category').text().trim()
        
                //movies link
                movie.poster = body.find('.movie-thumb').attr('src').trim()
                movie.trailer = body.find('.show-trailer').attr('data-url')

         
                 //get link movies
                const link = body.find('.halim-watch-box > a').attr('href').trim()
                const LinkMovies = await fetchData(link)
                const $$ =cheerio.load(LinkMovies)
                movie.linkMovies = $$('#content').find('iframe.embed-responsive-item').attr('src');
                let count = 0
                $$('#halim-list-server .halim-server > ul.halim-list-eps > li.halim-episode').each((i,e)=>{
                    count++;
                })
                movie.totalEpisode = count;
                res.json({results:movie})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
       

    }
    
    
}

module.exports = moviesCtrl