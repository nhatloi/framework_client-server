import React,{useEffect,useState}from 'react'
import axios from 'axios'
import Iframe from 'react-iframe'


function WhatMovie(props) {
    //const
    const nameMovie = props.match.params.nameMovie
    const url = `http://motphimmoi.net/${nameMovie}`
    const [movie, setMovie] = useState('')

    useEffect(() => {
        fetchData()
    }, [nameMovie])
    const fetchData = async () =>{
        try {
            const res = await axios.post('/movie/fetchMoviesDetail', {url:url})
            setMovie(res.data.results);
        } catch (err) {
           return err.response.data.msg
        }
    }

    return (
        <div className='container'> 
            <div className='free-movie'>
                <img alt='poster' src={movie.poster}/>
                {/* <Iframe url={movie.linkMovies}
                        width="100%"
                        height="600px"
                        id='movie'
                        allowFullScreen
                        allow = "fullscreen" /> */}
            </div>
        </div>
    )
}

export default WhatMovie
