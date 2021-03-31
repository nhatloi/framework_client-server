import React,{useState,useEffect}from 'react'
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player/youtube'
import { List, message, Avatar, Spin,Row,Col} from 'antd';

import './Home.css'


function Home() {
    const [comingSoon, setcomingSoon] = useState([])
    const [playNow, setplayNow] = useState([])
    const [News, setNews] = useState([])
    const [autoPlay, setautoPlay] = useState(true)
    const [movieFocus, setmovieFocus] = useState([])

 
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () =>{
        try {
            const res = await axios.get('/movie/getplaynow')
            setmovieFocus(res.data.movie[0])
            setplayNow(res.data.movie);
            const res2 = await axios.get('/news/get_allnews')
            setNews(res2.data.news)
            const res3 = await axios.get('/movie/getcomingsoon')
            setcomingSoon(res3.data.movie)
        } catch (err) {
           return;
        }
    }

    const handleChange = (e)=>{
        setmovieFocus(playNow[e])
    }
    

    return (
        <div>
        <div className="home"> 
            <div className="list-movie">
                <Carousel verticalSwipe='natural' autoPlay={autoPlay} centerMode={true} infiniteLoop={true} onChange={handleChange}>
                    {playNow && playNow.map((movie, index) => (
                                        <div className="box">
                                            <div className="detail">
                                                <h2>{movie.title}</h2>
                                                <p>{new Date(movie.release_date).toLocaleDateString()}</p>
                                            </div>
                                            <a alt="movie-detail" href={`/movie/${movie._id}`}><img src={movie.poster_path} /></a>
                                        </div>
                                            ))}
                </Carousel>
                <a href='/movie/total/playing_now'><h2> Now Playing</h2></a>
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
            
            <div className="coming_soon">
                <a href='/movie/total/comingsoon'><h2>Coming Soon</h2></a>
            <Row gutter={[8, 8]}>
                        {comingSoon && comingSoon.map((movie, index) => (
                            <React.Fragment key={index}>
                               <Col span={6} >
                                   <div className='card-movie'>
                                       <label>{movie.episode}</label>
                                        <a href={`/movie/${movie._id}`}>
                                            <img alt ='poster' src={movie.poster_path}/>
                                            <div className='movie-infor'>
                                                {movie.title}<p/>
                                                Khởi chiếu: {new Date(movie.release_date).toLocaleDateString()}
                                                </div>
                                        </a>
                                   </div>
                                    
                                    
                                </Col>
                                
                            </React.Fragment>
                                
                        ))}
                </Row>
            </div>
        </div>
    )
}

export default Home
