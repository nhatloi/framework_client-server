import React from 'react'
import {Typography} from 'antd';

const { Text} = Typography;

function Theaters(props) {
    const index = props.index
    return (
        <div className='theaters'>
             <h2><Text underline>Theaters Manager</Text></h2>
        </div>
    )
}

export default Theaters
