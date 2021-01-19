import React from 'react'
import { Typography } from 'antd';

const { Title } = Typography;

function MainImage(props) {
    return (
        <div className='movies-banner'
            style={{
                background:`url('${props.image}')`}}
        >
        <div>
            <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }} >
                    <Title style={{ color: 'white' }} level={2} > {props.title} </Title>
                    <p style={{ color: 'white', fontSize: '1rem' }}  >{props.text} </p>
                    <p style={{ color: 'gray', fontSize: '1rem',fontFamily:'cursive'}} >{props.tag} </p>
                </div>
            </div>
        </div>
    )
}

export default MainImage
