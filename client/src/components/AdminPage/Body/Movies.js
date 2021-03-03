import React,{useState,useEffect} from 'react'
import {Typography,Drawer} from 'antd';
import AddNewMovie from './commons/AddNewMovie'
import {useSelector} from 'react-redux'
import axios from 'axios'

const { Text} = Typography;


function Movies(props) {
    
    //const 
    const [visible, setvisible] = useState(false)
    const token = useSelector(state => state.token)
    const handleEdit =() =>{
        setvisible (!visible)
    }
    const [Movies, setMovies] = useState([])

    useEffect(async()=>{
        const res = await axios.get('/movie/getallmovie/',{headers:{Authorization:token}})
        setMovies(res.data.movie)
        console.log(Movies)
    },[])



    const index = props.index
    return (
        <div className='admin-movies' style={{zIndex:index}}>
           <h2><Text underline>Movies Manager</Text></h2>
           <div className='add'>
               <button onClick={handleEdit}>+</button>
           </div>
           <Drawer
                height={'100%'}
                title="Search new movies"
                placement="top"
                visible={visible}
                onClose={handleEdit}
                >
                <AddNewMovie/>
            </Drawer>

        </div>
    )
}

export default Movies
