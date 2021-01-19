import React from 'react'

function News(props) {
    const index = props.index
    return (
        <div className='news' style={{zIndex:index}}>
           <h2>News</h2>
        </div>
    )
}

export default News
