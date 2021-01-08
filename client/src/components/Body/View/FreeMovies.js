import React,{useEffect,useState}from 'react'
import axios from 'axios'
import {message,Card,Row,Col} from 'antd';

const { Meta } = Card;

function FreeMovies(props) {

    //const 
    const category = props.match.params.category
    const [url, seturl] = useState('')
    
    const [movies, setMovies] = useState([])
    const [totalMovie, settotalMovie] = useState(0)
    const [totalPage, settotalPage] = useState(0)
    const [page, setpage] = useState(1)

    const findPage = () =>{
        if(category == 'Movie theaters')
            seturl('http://motphimmoi.net/phim-chieu-rap/');
        if(category == 'Good movies')
            seturl('http://motphimmoi.net/phim-hay/');
        if(category == 'Odd movies')
            seturl('http://motphimmoi.net/phim-le/');
        if(category == 'Series movies')
            seturl('http://motphimmoi.net/phim-bo/');
    }
    useEffect(() => {
        findPage()
        fetchData()
    }, [url])
    const fetchData = async () =>{
        try {
            const res = await axios.post('/movie/fetchMovies', {url:url})
            setMovies(res.data.result);
            settotalMovie(res.data.totalResult);
            settotalPage(res.data.totalPage)
        } catch (err) {
           return err.response.data.msg
        }
    }

    return (
        <div className='container'>
            <h2>{category}</h2>
            <button onClick={()=>{seturl(`${url}/page/1/`)}}>1</button>
            <button onClick={()=>{seturl(`${url}/page/2/`)}}>2</button>
            <div className='list-movies'>
                <Row gutter={[8, 8]}>
                    
                        {movies && movies.map((movie, index) => (
                            <React.Fragment key={index}>
                               <Col span={6} >
                                    <a href={`/freemovie/`}>
                                        <Card
                                                hoverable
                                                style={{ width: 240 }}
                                                cover={<img alt={movie.title} src={movie.img} />}
                                            >
                                                <Meta title={movie.title}  description={movie.time} />
                                        </Card>
                                   </a>
                                    
                                </Col>
                                
                            </React.Fragment>
                                
                        ))}
                </Row>
                
            </div>
        </div>
    )
}

export default FreeMovies
