import React from 'react'

function Advertisement(props) {
    const trans = props.trans
    return (
        <div className='advertisement' style={{transform:`translateX(${trans}px)`}}>
            <h2>Advertisement</h2>
        </div>
    )
}

export default Advertisement
