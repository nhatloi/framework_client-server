import React,{useEffect,useState}from 'react'
import axios from 'axios'
import {Card,Row,Col,Pagination} from 'antd';

const { Meta } = Card;

function FreeMovies(props) {

    //const     
    const category = props.match.params.category
    
    const [movies, setMovies] = useState([])
    const [totalPage, settotalPage] = useState(0)
    const [page, setpage] = useState(1)
    const url = `http://motphimmoi.net/${category}/page/${page}`



    
    useEffect(() => {
        fetchData();
    },[page])

    const fetchData = async () =>{
        try {
            const res = await axios.post('/movie/fetchMovies', {url:url})
            setMovies(res.data.result);
            settotalPage(res.data.totalPage)
        } catch (err) {
           return err.response.data.msg
        }
    }

    return (
        <div className='container'>
            <Pagination simple current={page} total={totalPage*10} onChange={(page)=>{setpage(page)}}/>
            <div className='list-movies'>
                <Row gutter={[8, 8]}>
                        {movies && movies.map((movie, index) => (
                            <React.Fragment key={index}>
                               <Col span={6} >
                                   <div className='card-movie'>
                                       <label>{movie.episode}</label>
                                        <a href={`/whatmovie/${movie.href.substring(22)}tap-1-server-1`}>
                                            <img src={movie.img}/>
                                            <div className='movie-infor'>
                                                {movie.title}<p/>
                                                {movie.time}
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

export default FreeMovies
