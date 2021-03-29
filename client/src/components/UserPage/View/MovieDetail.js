import React,{useState,useEffect}from 'react'
import ReactPlayer from 'react-player/youtube'
import axios from 'axios'
import './MovieDetail.css'

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
        <div style={{
            background:`url(${movie.backdrop_path})`,
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat',
            backgroundAttachment:'fixed',
            backgroundSize:'cover'}}>
            <div className='banner'>
                <div className="poster">
                    <img alt="poster" src={movie.poster_path}/>
                    <div className='detail'>
                    {movie.original_title}
                    {movie.overview}
                    {movie.release_date}    
                </div>
                </div>
            </div>
            <div className='trailer'>
                <ReactPlayer url={movie.trailer}/>
            </div>
        </div>
    )
}

export default MovieDetail
