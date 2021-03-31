import React,{useState,useEffect}from 'react'
import ReactPlayer from 'react-player/youtube'
import axios from 'axios'
import './MovieDetail.css'
import {
    PlayCircleOutlined
  } from '@ant-design/icons';
import { Button } from 'antd'

function MovieDetail(props) {

    //const
    const id = props.match.params.id
    const [movie, setmovie] = useState([])

    useEffect(() => {
        fetchData();
    },[])

    
    const fetchData = async () =>{
        try {
            const res = await axios.get(`/movie/getmoviebyid/${id}`)
            setmovie(res.data)
            
        } catch (err) {
           return;
        }
    }
    return (
        <div>
            <div className="movie-detail">
            <div class="text">
                <p style={{marginTop:"5%"}}><h1 style={{color:'red'}}>{movie.original_title}</h1><p/>
                Actors : 
                {movie.actors && movie.actors.map((item, index) => (
                    index==0?`"${item}"`:` , "${item}"`
                                            ))}
                <p/>
                Directors : 
                {movie.directors && movie.directors.map((item, index) => (
                    index==0?`"${item}"`:` , "${item}"`
                                            ))}
                <p/>
                {movie.overview}<p/>
                <a href="#trailer"><PlayCircleOutlined/> View Trailer</a><p/>
                <a href={`/bookticket/${id}`}>Book tickets</a>
                </p>
                <img style={{height:"500px",width:"300px",opacity:'1',float:'right'}} src={movie.poster_path}/>
            </div>
                <img src={movie.backdrop_path}/>
               
             <div className='poster'>
            </div>
            </div>
            <div id='trailer' className="detail-trailer">
                <ReactPlayer url={movie.trailer}
                height='100%'
                width='100%' 
                playIcon
                controls={true}  
                />
            </div>
        </div>
    )
}

export default MovieDetail
