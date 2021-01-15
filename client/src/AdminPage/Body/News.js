import React from 'react'

function News(props) {
    const trans = props.trans
    return (
        <div className='news' style={{transform:`translateX(${trans}px)`}}>
           <h2>News</h2>
        </div>
    )
}

export default News
