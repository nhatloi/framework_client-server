import React,{useState} from 'react'
import {Typography,Drawer} from 'antd';
import AddNewMovie from './commons/AddNewMovie'

const { Text} = Typography;


function Movies(props) {
    
    //const 
    const [visible, setvisible] = useState(false)
    const handleEdit =() =>{
        setvisible (!visible)
    }


    const index = props.index
    return (
        <div className='admin-movies' style={{zIndex:index}}>
           <h2><Text underline>Movies Manager</Text></h2>
           <div className='add'>
               <button onClick={handleEdit}>+</button>
           </div>
           <Drawer
                height={'100%'}
                title="Add new movies"
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
