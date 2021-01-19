import React,{useState,useEffect}from 'react'
import axios from 'axios'
import {Row,Col} from 'antd';

function InTheatersPage(props) {
    //const
    const query = props.match.params.query
    const [movies, setMovies] = useState([])
    const url = `https://moveek.com/${query}`
 
    useEffect(() => {
        fetchData(url);
    },[url])

    const fetchData = async (url) =>{
        try {
            const res = await axios.post('/movie/fetchMovieTheaters', {url:url})
            return setMovies(res.data.movies);
        } catch (err) {
           return err.response.data.msg
        }
    }

    return (
        <div className='container'>
            <h2>{query}</h2>
            <div className='list-movies'>
                <Row gutter={[8, 8]}>
                        {movies && movies.map((movie, index) => (
                            <React.Fragment key={index}>
                               <Col span={6} >
                                   <div className='card-movie'>
                                       <label>{movie.episode}</label>
                                        <a href={`/intheaters/detail/${movie.title}`}>
                                            <img alt ='poster' src={movie.img}/>
                                            <div className='movie-infor'>
                                                {movie.title}<p/>
                                                Khởi chiếu: {movie.date}
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

export default InTheatersPage
