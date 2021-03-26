import React ,{useState,useEffect}from 'react'
import { API_URL, API_KEY,LANGUAGE ,IMAGE_BASE_URL,POSTER_SIZE} from '../../../../Config'
import { Row, Col,Input,Button, Radio ,Modal} from 'antd';
import axios from 'axios'
import InformationMovie from './InformationMovie'
import MovieCard from './MovieCard'

const { Search } = Input;



function AddNewMovie() {
    //const
    const [Movies, setMovies] = useState([])
    const [search, setsearch] = useState(false)
    const [visible, setvisible] = useState(false)

    //Effect
    useEffect(() => {
        if(search== false)
            fetcMovies()
    },[search])

    const fetcMovies = async () =>{
        try {
            const res = await axios.post('/movie/fetchMovieTheaters', {url:'https://moveek.com/sap-chieu/'})
            setMovies(res.data.movies)
        } catch (err) {
           return err.response.data.msg
        }
    }

    const handleAdd =(e) =>{
        setvisible (!visible)
    }

    const handleSearch = async(props) =>{
        if(!props){
            return
        }
        setsearch(true)
        const escapedValue = encodeURIComponent(props).replace('%20','+');
            try {
                const res = await axios.get('/movie/searchthemoviedb', {headers:{key:escapedValue}})
                setMovies(res.data.movies)
            } catch (err) {
               return err.response.data.msg
            }

    }

    const handleChange = async(props) =>{
        if(props.target.value === ""){
            setsearch(false)
        }
    }
    
    return (
        <div className= 'AddNewMovie'>
            <div style={{margin:'auto',padding:'10px'}}>
                <Search style={{width:'50%'}}
                    placeholder="Name Movie"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={handleSearch}
                    onChange={handleChange}
                    />
                    <Button style={{float:'right'}} onClick={handleAdd}>Custom</Button>
            </div>

            <div className='movie-search'>
            <Row gutter={[8, 16]}>
                {Movies && Movies.map((movie, index) => (
                                <React.Fragment key={index}>
                                     <Col span={4} >
                                        <div>
                                            <MovieCard movie={movie}/>
                                        </div>
                                     </Col>
                                </React.Fragment>
                            ))}
            </Row>
            </div>
            <Modal title="Basic Modal" visible={visible} onOk={handleAdd} onCancel={handleAdd}>
                <InformationMovie custom/>
            </Modal>
        </div>
    )
}

export default AddNewMovie
