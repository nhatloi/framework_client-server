import React,{useState,useEffect}from 'react'
import {Button,Select} from 'antd'
import axios from 'axios'


const {Option} = Select

function BookTicketbyMovie(props) {

    const [screenings, setscreenings] = useState([])
    const [theaters, settheaters] = useState([]) 
    const [day, setday] = useState([])
    const id = props.match.params.id

    useEffect(() => {
        fetchData();
    },[id])

    const fetchData = async () =>{
        try {
            const res = await axios.get(`/theater/screening/get_byidmovie/${id}`)
            setscreenings(res.data)
        } catch (err) {
           return;
        }
    }

    const handleView = async (e) =>{
        try {
            const res = await axios.post('/theater/screening/get_Movieview/',{Movie_id:id,Theater_id:e})
    
        } catch (err) {
           return;
        }
    }


return (
        <div>
            <div>
                {screenings && screenings.map((screening, index) => (
                                            <div >
                                                <p>{screening.theater_RoomId.theaterId.name}</p>
                                            </div>
                                                ))}
            </div>    
            
        </div>
    )
}

export default BookTicketbyMovie
