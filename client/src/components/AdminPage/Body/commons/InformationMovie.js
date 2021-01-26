import React from 'react'
import './commons.css'
import {Rate} from 'antd'

function InformationMovie(props) {
    const {information,src,soureFetch,video} = props
    if(soureFetch === 'new')
    return (
        <div className="box-create">
            
        </div>
    )

    if(soureFetch === 'themoviedb')
    return (
        <div className="box-create">
            <div>
                <img src={src} style={{height:'300px'}}/>
                
            </div>
            <div className='right-box'>
                TITLE : {information.title}<p/>
                VOTE COUNT : <Rate disabled  defaultValue={information.vote_average/2} /><p/>
                RELEASE DATE : {information.release_date}<p/>
                OVERVIEW: {information.overview}<p/>
                ID in themoviedb : {information.id}<p/>
                VIDEO TRAILER: {video==='null'?'No video trailer':<a href={`https://www.youtube.com/watch?v=${video}`}>youtube.com/watch?v={video}</a>}
            </div>
        </div>
    )
}

export default InformationMovie
