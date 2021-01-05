import React ,{useEffect,useState} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE,POSTER_SIZE } from '../../../Config'
import { Button } from 'antd'
import ReactPlayer from 'react-player/youtube'

function MovieDetailPage(props) {

    //const 
    const movieId = props.match.params.movieId
    const [Key, setKey] = useState()
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [LoadingForKey, setLoadingForKey] = useState(true)
    const [ActorToggle, setActorToggle] = useState(false)
    const movieVariable = {
        movieId: movieId
    }
    const LinkVideo =`https://www.youtube.com/watch?v=${Key}`


    //fetch API
    useEffect(() => {
        const endpoint_video = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
        fetchKey(endpoint_video)

        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)
        
    }, [])

    //get id video trailer
    const fetchKey = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setKey(result.results[0].key)
               
            }, setLoadingForKey(false))
            .catch(error => console.error('Error:', error)
            )
    }

    // get infor Movie
    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCasts(result.cast)
                    })

                setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    //render
    return (
        <div>
            <div className='detail'>
                <div className='detail-banner' style={{height:'100%'}}>
                    <img src={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}/>
                </div>
                <div  className='detail-card'>
                    <img src ={`${IMAGE_BASE_URL}${POSTER_SIZE}${Movie.poster_path}`}/>
                    <label>
                        {Movie.original_title}<br/>
                        Time: {parseInt(Movie.runtime/60)}h:{Movie.runtime%60}m<br/>
                        Release Date: {Movie.release_date}<br/>
                        Overview<br/>{Movie.overview}<br/> 
                        <Button>View Trailer</Button>
                    </label>
                </div>
            </div>
            <ReactPlayer url={LinkVideo}/>
        </div>
        
    )
}

export default MovieDetailPage

