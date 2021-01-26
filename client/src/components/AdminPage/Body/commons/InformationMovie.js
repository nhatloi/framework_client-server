import React,{useState,useEffect} from 'react'
import { Row, Col,Input,Button, Radio ,Modal} from 'antd';
import axios from 'axios'
import './commons.css'
import {Rate} from 'antd'

function InformationMovie(props) {
    const {data,soureFetch} = props
    const [movie, setmovie] = useState()

    useEffect(() => {
        if(soureFetch === 'themoviedb') fetcMoviesThemoviedb(data)
    }, [data])

    const fetcMoviesThemoviedb = async(data) => {
        try {
            const res = await axios.post('/movie/themoviedbdetail',{id:data})
            setmovie(res.data.movie)
            console.log(movie)
        } catch (err) {
           return err.response.data.msg
        }
       
    }

    if(soureFetch === 'new')
    return (
        <div className="box-create">
            
        </div>
    )

    if(soureFetch === 'themoviedb') {
        return (
            <div className="box-create">
                <div>
                    {/* <img src={movie.poster_path} style={{height:'300px'}}/> */}
                    
                </div>
                <div className='right-box'>
                    {/* TITLE : {movie.title}<p/>
                    VOTE COUNT : <Rate disabled  defaultValue={movie.vote_average/2} /><p/>
                    RELEASE DATE : {movie.release_date}<p/>
                    OVERVIEW: {movie.overview}<p/>
                    ID in themoviedb : {movie.id}<p/> */}
                    VIDEO TRAILER: 
                </div>
            </div>
        )
    }
    
}

export default InformationMovie
