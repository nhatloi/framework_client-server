import React,{useState,useEffect}from 'react'
import axios from 'axios'
import {Row,Col} from 'antd';


function Home() {
    const [movies, setMovies] = useState([])
 
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () =>{
        try {
            const res = await axios.get('/movie/getallmovie')
            return setMovies(res.data.movie);
        } catch (err) {
           return err.response.data.msg
        }
    }


    return (
        <div> 
           <div className='container'>
               
                        {movies && movies.map((movie, index) => (
                            <div className="slide">
                            <div className="box">
                                <div className="detail">
                                    <h2>{movie.title}</h2>
                                    <p>{new Date(movie.release_date).toLocaleDateString()}</p>
                                </div>
                                <img src={movie.poster_path}/>
                            </div>
                        </div> 
                        ))}
            </div>
        </div>
    )
}

export default Home
