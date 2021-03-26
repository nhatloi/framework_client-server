import React,{useState} from 'react'
import {Button,Modal} from 'antd';
import InformationMovie from './InformationMovie'

function MovieCard(props) {
    
    const {movie} = props
    const [visible, setvisible] = useState(false)
    const handleAdd =(e) =>{
        setvisible (!visible)
    }

    return (
        <div className='search-detail'>
            <img style={{width:'180px'}} src={movie.poster_path} onClick={handleAdd}/>
            <div style={{color:'black'}}>{movie.title}</div>
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
                <InformationMovie data = {movie}/>
            </Modal>
        </div>
    )
}

export default MovieCard
