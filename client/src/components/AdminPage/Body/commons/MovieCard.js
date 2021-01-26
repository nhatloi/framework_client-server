import React,{useState,useEffect} from 'react'
import {Button,Modal} from 'antd';
import InformationMovie from './InformationMovie'

function MovieCard(props) {
    
    const {movie,soureFetch} = props
    const [Video, setVideo] = useState([])
    const [visible, setvisible] = useState(false)
    const handleAdd =(e) =>{
        console.log(movie.title)
        setvisible (!visible)
    }
    const handleSubmit =(e) =>{
        setvisible (!visible)
    }

    const fetcMoviesThemoviedb = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setVideo(result.results)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    return (
        <div className='search-detail'>
            <img src={movie.poster_path} onClick={handleAdd}/>

        

            <Modal
                height='70%'
                width="80%"
                title="Add new movies"
                placement="top"
                visible={visible}
                title="Information Movie"
                closable={false}
                footer={[
                    <Button key="back" onClick={()=>{setvisible (!visible)}}>
                      Return
                    </Button>,
                    <Button key="submit" type="primary"  onClick={handleSubmit}>
                      Submit
                    </Button>,
                  ]}
                >
                <InformationMovie soureFetch = {soureFetch} data = {movie.id}/>
            </Modal>
        </div>
    )
}

export default MovieCard
