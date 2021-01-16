import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Typography} from 'antd';

const { Text} = Typography;


function Movies(props) {
    //const 


    const index = props.index
    return (
        <div className='admin-movies' style={{zIndex:index}}>
           <h2><Text underline>Movies Manager</Text></h2>

        </div>
    )
}

export default Movies
