import React,{useState,useEffect}from 'react'
import {Row,Col} from 'antd';
import axios from 'axios'


function Totalmovie(props) {
    const key = props.match.params.key
    const [results, setresults] = useState([])


    useEffect(() => {
        fetchData();
    },[key])

    const fetchData = async () =>{
        try {
            var res
            if(key === 'playing_now')
                res = await axios.get(`/movie/getplaynow/`)
            if(key === 'comingsoon')
                res = await axios.get(`/movie/getcomingsoon/`)
            setresults(res.data.movie)
        } catch (err) {
           return;
        }
    }



    return (
        <div className='container'>
            <h2>{key==='playing_now'?'Playing Now' : 'Coming soon'}</h2>
            <div className='list-movies'>
                <Row gutter={[8, 8]}>
                        {results && results.map((movie, index) => (
                            <React.Fragment key={index}>
                               <Col span={6} >
                                   <div className='card-movie'>
                                       <label>{movie.episode}</label>
                                        <a href=''>
                                            <img alt ='poster' src={movie.poster_path}/>
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

export default Totalmovie
