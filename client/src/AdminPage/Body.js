import React from 'react'

function Body(props) {
    const transAcount = props.transAcount
    const transTheaters = props.transTheaters
    const transMovies= props.transMovies
    const transNews= props.transNews
    const transAdvertisement= props.transAdvertisement
    return (
        <div>
            {/* <div style={{transform:`translateX(${transAcount})`}}></div> */}
        </div>
    )
}

export default Body
