import React,{useState,useEffect} from 'react'
import {Button,Modal} from 'antd';
import InformationMovie from './InformationMovie'
import { API_URL, API_KEY,LANGUAGE ,IMAGE_BASE_URL,POSTER_SIZE} from '../../../../Config'

function MovieCard(props) {
    
    const {src,movie,soureFetch} = props
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

    //use effect
    useEffect(() => {

        if(soureFetch === 'themoviedb'){
            const endpoint_video = `${API_URL}movie/${movie.id}/videos?api_key=${API_KEY}&language=US-en`;
            fetcMoviesThemoviedb(endpoint_video)
            
        }
        if(soureFetch === 'moveek'){
            
        }
    },[soureFetch])

    return (
        <div>
            <img src={src} onClick={handleAdd}/>

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
                <InformationMovie video={Video[0]?Video[0].key:'null'}soureFetch = {soureFetch} src={src} information={movie}/>
            </Modal>
        </div>
    )
}

export default MovieCard
