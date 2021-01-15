import React from 'react'

function Theaters(props) {
    const trans = props.trans
    return (
        <div className='theaters' style={{transform:`translateX(${trans}px)`}}>
            <h2>Theaters</h2>
        </div>
    )
}

export default Theaters
