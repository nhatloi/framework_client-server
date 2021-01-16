import React from 'react'

function Advertisement(props) {
    const index = props.index
    return (
        <div className='advertisement' style={{zIndex:index}}>
            <h2>Advertisement</h2>
        </div>
    )
}

export default Advertisement
