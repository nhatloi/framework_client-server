import React,{useState,useEffect}from 'react'
import axios from 'axios'
import './BookTicket.css'





function BookTicket() {

    const [playNow, setplayNow] = useState([])
    const [theater, settheater] = useState([])


    useEffect(() => {
        fetchData();
        theater_eff();
    },[])

    const theater_eff = async() =>{
        try{
            const res = await axios.get('/theater/get_alltheater')
            settheater(res.data.theater)
        }catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () =>{
        try {
            const res = await axios.get('/movie/getcomingsoon')
            setplayNow(res.data.movie)
        } catch (err) {
           return;
        }
    }

    return (
        <div className="container">
           <h2>Book Ticket</h2>
            <div className="view-movie">
                {playNow && playNow.map((movie, index) => (
                                    <div className='card-movie'>
                                        <label>{movie.episode}</label>
                                            <a href={`/intheaters/detail/${movie.title}`}>
                                                <img alt ='poster' src={movie.poster_path}/>
                                                <div className='movie-infor'>
                                                    {movie.title}<p/>
                                                    Khởi chiếu: {new Date(movie.release_date).toLocaleDateString()}
                                                    </div>
                                            </a>
                                    </div>       
                ))}
            </div>
            <div className="view-theater">
                
                {theater && theater.map((item, index) => (
                                    <div className="card-theater">
                                        <h2>{item.name}</h2>
                                        Address :{item.address}
                                    </div>     
                                   
                ))}
            </div>
            <div className="view-screening">
                    sadf
            </div>
        </div>
    )
}

export default BookTicket
