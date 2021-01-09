import React,{useEffect,useState}from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'


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
            <div>
                <img alt='poster' src={movie.poster}/>
                <ReactPlayer 
                url={movie.trailer}
                controls={true}/>

            </div>
            

        </div>
    )
}

export default WhatMovie
