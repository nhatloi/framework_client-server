import React,{useState,useEffect}from 'react'
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player/youtube'
import { List, message, Avatar, Spin } from 'antd';

import './Home.css'


function Home() {
    const [movies, setMovies] = useState([])
    const [News, setNews] = useState([])
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
            setMovies(res.data.movie);
            const res2 = await axios.get('/news/get_allnews')
            setNews(res2.data.news)
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
                <ReactPlayer url={movieFocus.trailer} onPlay={()=>{setautoPlay(false)}} onPause={()=>{setautoPlay(true)}}/>
                <div className='overview' >{movieFocus.overview}</div>
            </div>
            <div className="news">
                <List
                    dataSource={News}
                    renderItem={item => (
                    <List.Item key={item.description}>
                        <List.Item.Meta
                        avatar={
                            <Avatar src={item.img} />
                        }
                        title={<a href={item.link}>{item.description}</a>}
                        description={`${item.source} - ${item.time}`}
                        />
                    </List.Item>
                    )}
                >
                    
                </List>
            </div>


        </div>
    )
}

export default Home
