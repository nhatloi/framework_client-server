import React,{useState,useEffect}from 'react'
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player/youtube'

import './Home.css'


function Home() {
    const [movies, setMovies] = useState([])
    const [autoPlay, setautoPlay] = useState(true)
    const [movieFocus, setmovieFocus] = useState([])
    const [tranform, settranform] = useState('500%')

 
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () =>{
        try {
            const res = await axios.get('/movie/getallmovie')
            setmovieFocus(res.data.movie[0])
            return setMovies(res.data.movie);
        } catch (err) {
           return err.response.data.msg
        }
    }

    const handleChange = (e)=>{
        setmovieFocus(movies[e])
    }
    

    return (

        <div className="home"> 
            <div className="list-movie">
                <Carousel verticalSwipe='natural' autoPlay={autoPlay} centerMode={true} infiniteLoop={true} onChange={handleChange}>
                    {movies && movies.map((movie, index) => (
                                        <div className="box">
                                            <div className="detail">
                                                <h2>{movie.title}</h2>
                                                <p>{new Date(movie.release_date).toLocaleDateString()}</p>
                                            </div>
                                            <img src={movie.poster_path} />
                                        </div>
                                            ))}
                </Carousel>
            </div>
            <div className='trailer'>
                <ReactPlayer url={movieFocus.trailer} onPlay={()=>{setautoPlay(false); settranform('-500%')}} onPause={()=>{setautoPlay(true);settranform('500%')}}/>
                <div className='overview' style={{background:'black'}} >{movieFocus.overview}</div>
            </div>
       


        </div>
    )
}

export default Home
