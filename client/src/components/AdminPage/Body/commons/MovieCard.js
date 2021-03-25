import React,{useState} from 'react'
import {Button,Modal} from 'antd';
import InformationMovie from './InformationMovie'

function MovieCard(props) {
    
    const {movie,soureFetch} = props
    const [visible, setvisible] = useState(false)
    const handleAdd =(e) =>{
        setvisible (!visible)
    }

    return (
        <div className='search-detail'>
            <img style={{width:'180px'}} src={movie.poster_path} onClick={handleAdd}/>
            <Modal
                height='70%'
                width="80%"
                title="Add new movies"
                placement="top"
                visible={visible}
                title="Information Movie"
                closable={false}
                footer={[
                    <Button key="back" onClick={()=>{setvisible (false)}}>
                      Close
                    </Button>
                  ]}
                >
                <InformationMovie soureFetch = {soureFetch} data = {movie.id}/>
            </Modal>
        </div>
    )
}

export default MovieCard
