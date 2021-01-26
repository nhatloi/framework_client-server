import React ,{useState,useEffect}from 'react'
import { API_URL, API_KEY,LANGUAGE ,IMAGE_BASE_URL,POSTER_SIZE} from '../../../../Config'
import { Row, Col,Input,Button, Radio ,Modal} from 'antd';
import axios from 'axios'
import InformationMovie from './InformationMovie'
import MovieCard from './MovieCard'

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
    const [visible, setvisible] = useState(false)

    //Effect
    useEffect(() => {

        if(soureFetch === 'themoviedb'){
            fetcMoviesThemoviedb()
        }
        if(soureFetch === 'moveek'){
            fetchMovieMoveek()
        }
    },[soureFetch])

    function onChange(e) {
        setsoureFetch(e.target.value)
    }

    const handleAdd =(e) =>{
        setvisible (!visible)
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


    const fetcMoviesThemoviedb = async() => {
        try {
            const res = await axios.get('/movie/themoviedb')
            setMovies(res.data.movies)
        } catch (err) {
           return err.response.data.msg
        }
       
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
                                     <Col span={4} >
                                        <div className = 'search-detail'>
                                            <MovieCard src={movie.poster_path}
                                            soureFetch = {soureFetch}/>
                                        </div>
                                     </Col>
                                   
                                
                                </React.Fragment>
                            ))}
            </Row>
            </div>
            <Button onClick={handleAdd}
            style={{background:'black',color:'white',position:'absolute',bottom:'10px',right:'50px'}}>Custom</Button>
            <Modal
                height='70%'
                title="Add new movies"
                placement="top"
                visible={visible}
                title="Information Movie"
                closable={false}
                footer={[
                    <Button key="back" onClick={handleAdd}>
                      Return
                    </Button>,
                    <Button key="submit" type="primary"  onClick={handleAdd}>
                      Submit
                    </Button>,
                  ]}
                >
                <InformationMovie soureFetch='new'/>
            </Modal>
        </div>
    )
}

export default AddNewMovie
