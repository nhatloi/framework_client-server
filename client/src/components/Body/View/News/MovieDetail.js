import React ,{useEffect,useState} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE,POSTER_SIZE,LANGUAGE } from '../../../../Config'
import { Button,Spin} from 'antd'
import ReactPlayer from 'react-player/youtube'
import { CloseOutlined,FieldTimeOutlined,CalendarOutlined} from '@ant-design/icons';
import GridCards from '../../commons/GridCards'

function MovieDetailPage(props) {

    //const 
    const movieId = props.match.params.movieId
    const [playvideo, setplayvideo] = useState()
    const [Key, setKey] = useState()
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])

    const LinkVideo =`https://www.youtube.com/watch?v=${Key}`


    //fetch API
    useEffect(() => {
        const endpoint_video = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=${LANGUAGE}`;
        fetchKey(endpoint_video)

        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`;
        fetchDetailInfo(endpointForMovieInfo)
        
    },[movieId])

    //get id video trailer
    const fetchKey = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setKey(result.results[0].key)
               
            })
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

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCasts(result.cast)
                    })
            })
            .catch(error => console.error('Error:', error)
            )
    }

    const PlayTrailer = () =>{
        setplayvideo('visible')
    }
    const CloseTrailer = () =>{
        setplayvideo('hidden')
    }


    //render
    return (
        <div className='body'>
             <div className='detail'>
                <div className='detail-banner'>
                    <img alt='banner' src={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}/>
                </div>
                <div  className='detail-card'>
                    <img alt='card' src ={`${IMAGE_BASE_URL}${POSTER_SIZE}${Movie.poster_path}`}/>
                    <span>
                        <div className='info-Movie'>
                            <h1>{Movie.original_title}</h1>
                            <div>
                                Genres: 
                                {Movie.genres && Movie.genres.map((genres, index) => (
                                    <label>
                                        {index === 0?
                                            <label>{genres.name}</label>:
                                            <label> - {genres.name}</label>
                                        }
                                    </label>
                                ))}
                                <div>Vote average: {Movie.vote_average}</div>
                            </div>
                            <CalendarOutlined /> {Movie.release_date} <FieldTimeOutlined /> {parseInt(Movie.runtime/60)}h{Movie.runtime%60}m
                            
                        </div>
                        <Button
                            onClick={PlayTrailer}
                            >
                        View Trailer</Button>
                        <a href={Movie.homepage}>Home page</a>
                        <div>
                            {Movie.production_companies && Movie.production_companies.map((companies, index) => (
                                <span>
                                    {
                                        companies.logo_path?<img alt='companies'
                                        src={`${IMAGE_BASE_URL}${POSTER_SIZE}${companies.logo_path}`}
                                        style={{width:30,height:30  }}/>:
                                        null
                                    }
                                </span>
                                        
                            
                            ))}
                        </div>
                        

                    </span>
                </div>
            </div>
        <div className='player-wrapper' style={{visibility:`${playvideo}`}}>
            Trailer
            <label onClick={CloseTrailer}><CloseOutlined /></label>
            <ReactPlayer
            url={LinkVideo}
            width='100%'
            height='90%'
            controls = {true}
            playing = {playvideo ==='visible' ? true:false }
            />
      </div>
    {/* Actors Grid*/}
     <h2>Series Cast</h2>
    <div className='actors'>
                {Casts && Casts.map((cast, index) => (
                        <React.Fragment key={index}>
                           <GridCards actor image={cast.profile_path} characterName={cast.name} characterC={cast.character}/>
                        </React.Fragment>
                    ))}
                {!Casts.length &&
                    <Spin tip="Loading..." />}
                </div>
        </div>
        
    )
}

export default MovieDetailPage

