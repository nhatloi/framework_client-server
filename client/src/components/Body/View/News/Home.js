import React, { useEffect, useState } from 'react'
import {Carousel,Spin} from 'antd';
import { API_URL,API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE,LANGUAGE} from '../../../../Config'
import MainImage from '../../commons/MainImage'
import GridCard from '../../commons/GridCards'

function Home() {

    //const 
    const [MoviesPop, setMoviesPop] = useState([])
    const [MoviesComing, setMoviesComing] = useState([])
    const [MoviesNow, setMoviesNow] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState([])
    const [Loading, setLoading] = useState(true)

    //fetch Movies
    useEffect(() => {
        fetchMoviesPop(`${API_URL}movie/popular?api_key=${API_KEY}&language=${LANGUAGE}`)
        fetchMoviesCom(`${API_URL}movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}`)
        fetchMoviesNow(`${API_URL}movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}`)
    }, [])


    //fetch movies Popular
    const fetchMoviesPop = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setMoviesPop(result.results)
                setMainMovieImage(result.results)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

 //fetch movies coming
    const fetchMoviesCom = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setMoviesComing(result.results)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

//fetch movies Now play
    const fetchMoviesNow = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setMoviesNow(result.results)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

    return (
        <div className='container'>
            <Carousel autoplay>
             {MainMovieImage && MainMovieImage.map((movieimage, index)=> (
                        <React.Fragment key={index}>
                         <a href={`/movie/${movieimage.id}`}>
                             <div style={{height:400}}>
                                <MainImage 
                                image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${movieimage.backdrop_path}`}
                                title={movieimage.original_title}
                                text={movieimage.overview}
                                />
                             </div>
                        </a>
                        </React.Fragment>
                    ))}
            </Carousel>
            {Loading &&
                <Spin tip="Loading..." />}

                {/* body */}
        

                {/* Popular movies */}
                <div>
                   <a href='/movies/popular'>
                     <h1> Popular movies</h1>
                    </a>
                </div>
                <div className='movies'>
                {MoviesPop && MoviesPop.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                               
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                                movieOverview={movie.overview}
                                voteAverage={movie.vote_average}
                                releaseDate={movie.release_date}
                            />
                        </React.Fragment>
                    ))}
                {Loading &&
                    <Spin tip="Loading..." />}
                </div>

                {/* Upcoming movies */}
                <div>
                   <a href='/movies/upcoming'>
                     <h1> Up Comming movies</h1>
                    </a>
                </div>
                <div className='movies'>
                {MoviesComing && MoviesComing.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                               
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                                movieOverview={movie.overview}
                                voteAverage={movie.vote_average}
                                releaseDate={movie.release_date}
                            />
                        </React.Fragment>
                    ))}
                {Loading &&
                    <Spin tip="Loading..." />}
                </div>


                {/* Now Playing movies */}
                <div>
                   <a href='/movies/now_playing'>
                     <h1> Now Playing movies</h1>
                    </a>
                </div>
                <div className='movies'>
                {MoviesNow && MoviesNow.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                               
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                                movieOverview={movie.overview}
                                voteAverage={movie.vote_average}
                                releaseDate={movie.release_date}
                            />
                        </React.Fragment>
                    ))}
                {Loading &&
                   <Spin tip="Loading..." />}
                </div>
               
            </div>
    )
}

export default Home
