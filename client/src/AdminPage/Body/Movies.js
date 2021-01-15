import React from 'react'

function Movies(props) {
    const trans = props.trans
    return (
        <div className='admin-movies' style={{transform:`translateX(${trans}px)`}}>
           <h2>Movies</h2>
        </div>
    )
}

export default Movies
