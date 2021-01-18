import React ,{useState,useEffect}from 'react'
import { API_URL, API_KEY,LANGUAGE ,IMAGE_BASE_URL,POSTER_SIZE} from '../../../Config'
import { Row, Col,Input,Button, Radio } from 'antd';
import axios from 'axios'
const { Search } = Input;
// const search = require('youtube-search');
// var opts = {
//     maxResults: 10,
//     key: 'AIzaSyDI_zPC4aEbkvVm03X2qtHoZL03XipKxTs'
//   };



function AddNewMovie() {
    //const
    const [Movies, setMovies] = useState([])
    const [soureFetch, setsoureFetch] = useState('themoviedb')

    
    useEffect(() => {

        if(soureFetch === 'themoviedb'){
            const endpoint_video = `${API_URL}trending/movie/week?api_key=${API_KEY}&language=${LANGUAGE}`;
            fetcMoviesThemoviedb(endpoint_video)
        }
        if(soureFetch === 'moveek'){
            fetchMovieMoveek()
        }
    },[soureFetch])

    function onChange(e) {
        setsoureFetch(e.target.value)
    }



    const handleSearch = async(props) =>{
        if(!props) return
        if(soureFetch === 'themoviedb'){
            const endpoint_video = `${API_URL}search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${props}`;
            fetcMoviesThemoviedb(endpoint_video)
        }
        if(soureFetch === 'moveek'){
            const url = ` https://moveek.com/tim-kiem/?s=${props}`
            try {
                const res = await axios.post('/movie/searchTheaters', {url:url})
                setMovies(res.data)
                console.log(res)
            } catch (err) {
               return err.response.data.msg
            }

        }
    }

    const fetchMovieMoveek = async () =>{
        try {
            const res = await axios.post('/movie/fetchMovieTheaters', {url:'https://moveek.com/sap-chieu/'})
            setMovies(res.data.movies)
        } catch (err) {
           return err.response.data.msg
        }
    }


    const fetcMoviesThemoviedb = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setMovies(result.results)
            })
            .catch(error => console.error('Error:', error)
            )
    }
    return (
        <div className= 'AddNewMovie'>
            <Radio.Group onChange={onChange} defaultValue="themoviedb">
                <Radio.Button value="themoviedb">The movie db</Radio.Button>
                <Radio.Button value="moveek">moveek</Radio.Button>
            </Radio.Group>
            <Search
                placeholder="Name Movie"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                />

            <div className='movie-search'>
            <Row gutter={[8, 16]}>
                {Movies && Movies.map((movie, index) => (
                                <React.Fragment key={index}>
                                     <Col span={6} >
                                        <div className = 'search-detail'>
                                            <img alt='movie-search' src={soureFetch ==='themoviedb'?
                                            `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                            :movie.img
                                            }/>
                                        </div>
                                     </Col>
                                   
                                
                                </React.Fragment>
                            ))}
            </Row>
            </div>
            <Button style={{background:'black',color:'white',position:'absolute',bottom:'10px',right:'50px'}}>Custom</Button>
        </div>
    )
}

export default AddNewMovie
