import React,{useEffect,useState}from 'react'
import axios from 'axios'
import Iframe from 'react-iframe'


function WhatMovie(props) {
    //const
    const nameMovie = props.match.params.nameMovie
    const episode = props.match.params.episode
    const url = `http://motphimmoi.net/${nameMovie}`
    const [movie, setMovie] = useState('')
    const [movieActors, setMovieActors] = useState([])
    const [listVideo, setlistVideo] = useState([])
    const [linkPlay, setlinkPlay] = useState('')
    const urlVideo = `http://motphimmoi.net/xem-phim/${nameMovie}-${episode}`
    useEffect(() => {
        fetchData(url)
        fetchlistVideo(urlVideo);
    }, [url,urlVideo])

    const fetchData = async (url) =>{
        try {
            const res = await axios.post('/movie/fetchMoviesDetail', {url:url})
            setMovie(res.data.results);
            setMovieActors(res.data.results.actors)
            setlistVideo(res.data.results.playvideo)
        } catch (err) {
           return err.response.data.msg
        }
    }

    const fetchlistVideo = async (urlVideo) =>{
        try {
            const res = await axios.post('/movie/fetchPlayVideo', {url:urlVideo});
            setlinkPlay(res.data.playvideo)
            

        } catch (err) {
           return err.response.data.msg
        }
    }

    return (
        <div className='container'> 
            <div className='free-movie'>
                <Iframe url={linkPlay}
                        width="100%"
                        height="600px"
                        id='movie'
                        allowFullScreen
                        allow = "fullscreen" />
                
                <div className='movie-infor'>
                    <h2>{movie.title}</h2>
                    <div className='episode-movie'>
                    <button onClick={()=>{setlinkPlay(movie.trailer)}}>
                    Trailer</button>
                    {listVideo && listVideo.map((epi, index) => (
                                    <a href={`/whatmovie/${nameMovie}/tap-${index+1}-server-1`}>
                                        <button>{index+1}</button>
                                   </a>
                        ))}
                    </div>
                    <label>{movie.episode}</label>
                    <label>{movie.duration}</label>
                    <label>{movie.year}</label>
                    <label>{movie.country}</label>
                    <label>Diễn viên: {movieActors && movieActors.map((actor, index)=> (
                             <label >
                                 {index===0? actor:`,${actor}`}
                             </label>
                    ))}</label>
                    <label>{movie.category}</label>
                    <div className = 'movie-overview'>
                    Overview: {movie.overview}
                </div>
                </div>
            </div>
        </div>
    )
}

export default WhatMovie
