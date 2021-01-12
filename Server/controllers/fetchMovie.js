const axios = require('axios');
const cheerio = require('cheerio')
const fs = require("fs");
const url = "http://motphimmoi.net"
const urlUpcomingMovie= "https://moveek.com/sap-chieu/"
const urlTheMovieMowPlaying = "https://moveek.com/dang-chieu/"


const fetchData = async(url) =>{
    const result = await axios.get(url)
    return result.data
}
const GoogleNews = async () =>{
    const content = await fetchData(url)
    const $ =cheerio.load(content)

    fs.writeFile('news.txt', '', function (err) {
        if (err) throw err;
      });
    console.log('writing...');
    $('.NiLAwe.y6IFtc.R7GTQ.keNKEd.j7vNaf.nID9nc').each((i,e)=>{
        const title = $(e).find('h3 >.DY5T1d').text();
        const source = $(e).find('.wEwyrc').text();
        const time =  $(e).find('.WW6dff').attr('datetime');
        const description = $(e).find('.xBbh9').text();
        const link = 'https://news.google.com/' + $(e).find('.VDXfz').attr("href") +'\n';
        const avatar =$(e).find('img.tvs3Id.QwxBBf').attr("src")+'\n';
        fs.appendFile('news.txt',title +'\n'
        + description +'\n'
        + link +'\n'
        + source +'\n'
        + time +'\n'
        + avatar +'\n'
        ,function (err) {
            if (err) throw err;
            });

    })
    console.log(content)
}

// scraper all movies in Home page
const ScraperHomePage = async () =>{
    const content = await fetchData(url)
    const $ =cheerio.load(content)
    const movies=[]
        const movie ={
            title:'',
            img:'',
            time:'',
            href:''
        }

    fs.writeFile('./File/movies.txt', '', function (err) {
        if (err) throw err;
      });
    $('.halim-thumb').each((i,e)=>{

        const title = $(e).find('img').attr('title');
        movie.title = title
        const img = $(e).find('img').attr('src');
        movie.img = img
        const time = $(e).find('.duration').text();
        movie.time = time
        const href = $(e).attr('href');
        movie.href = href

        ScraperMovieDetail(href)
        // movies detail
        fs.appendFile('./File/movies.txt',title +'\n'
        + img +'\n'
        + time +'\n'
        + href +'\n'
        +'\n'
        ,function (err) {
            if (err) throw err;
            });

    })
}

// scraper Movies detail
const ScraperMovieDetail = async (href) =>{
    
    const movie = {
        title:'',
        year:'',
        episode:'',
        duration:'',
        actors:'',
        category:'',
        poster:'',
        trailer:'',
        linkMovies:[]
    }
    const movies = []
    const content = await fetchData(href)
    const $ =cheerio.load(content)

    fs.writeFile('./File/moviesDetail.txt', '', function (err) {
        if (err) throw err;
    });
        const body = $('#content');

        // movies infor
        movie.title = body.find('.entry-title').text().trim()
        movie.year = body.find ('.title-year').text()
        movie.episode = body.find ('.episode').text().trim()
        movie.duration = body.find ('.duration').text().trim()
        
        movie.actors = body.find ('.actors').text().trim()
        movie.category = body.find ('.category').text().trim()

        //movies link
        movie.poster = body.find('.movie-thumb').attr('src').trim()
        movie.trailer = body.find('.show-trailer').attr('data-url')

        //get link movies
        const link = body.find('.halim-watch-box > a').attr('href').trim()
        const Linkview = await fetchData(link)
        const $$ =cheerio.load(Linkview)
        movie.linkMovies = $$('#content').find('iframe.embed-responsive-item').attr('src');
        movies.push({results:movie})
        console.log(movies)
}

// write to file

const Write = (file,value) =>{

    fs.appendFile(`${file}`,value
    ,function (err) {
        if (err) throw err;
        });
}

// crawler movie playing theaters
const CrawlerMovieTheaters = async (url) =>{
    const content = await fetchData(url)
    const $ =cheerio.load(content)

    fs.writeFile('movies.txt', '', function (err) {
        if (err) throw err;
      });
    fs.writeFile('moviesDetail.txt', '', function (err) {
        if (err) throw err;
      });
    $('.col-lg-2').each((i,e)=>{
        const img = $(e).find(' .card > a >img').attr('data-src');
        const title = $(e).find('h3> a').attr('title');
        const date = $(e).find('div.text-muted').text().trim();
        const linkmovie = 'https://moveek.com'+ $(e).find('.card > a ').attr('href');
        CrawlerDetailMovie(linkmovie)
       
        // movies detail
        fs.appendFile('movies.txt',title+'\n'
        + img +'\n'
        + date +'\n'
        + linkmovie +'\n'
        +'\n'
        ,function (err) {
            if (err) throw err;
            });

    })

}

//crawler detail movie
const CrawlerDetailMovie = async (url) =>{
    const content = await fetchData(url)
    const $ =cheerio.load(content)
    const movie = {
        title:'',
        time:[],
        actors:[],
        name:'',
        overview:'',
        poster:'',
        trailer:'',
        linkMovies:''
    }

      const body = $('#app');
      movie.img = body.find('img.img-fluid').attr('data-src');
      movie.title = body.find('h1.text-truncate > a').attr('title');
      movie.name = body.find('p.text-truncate').text().trim();
      movie.name= movie.name.replace(/\s+/g,' ')
      movie.trailer = 'https://www.youtube.com/watch?v=' + body.find('.row .text-sm-left > a.btn-outline-light').attr('data-video-url');
      movie.overview = body.find('p.text-justify').text();

      $('.text-sm-left > span').each((i,e)=>{
        movie.time.push($(e).text());
    })
    $('span > a.text-danger').each((i,e)=>{
        movie.actors.push($(e).text()); 
    })

    
      fs.appendFile('moviesDetail.txt',
      movie.img+"\n"
      +movie.title+'\n'
      +movie.name+'\n'
      +movie.trailer+'\n'
      +movie.overview+'\n'
      +movie.time+'\n'
      +movie.actors+'\n'
      , function (err) {
        if (err) throw err;
      });
    console.log(movie)

}


//run app
ScraperHomePage()




