import React ,{useEffect,useState}from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'

function Account(props) {


    const [data, setdata] = useState([])
    const token = useSelector(state => state.token)
    useEffect(() => {
        fetchUser();
    },[token])

    const fetchUser = async () =>{
        try {
            const res = await axios.get('/user/all_infor',{
                headers:{Authorization:token}
            })
            data.push(res.data.user[0])
            console.log(data[0])
        } catch (err) {
           return err.response.data.msg
        }
    }

    const trans = props.trans
    return (
        <div className='account' style={{transform:`translateX(${trans}px)`}}>
            <h2>Account</h2>
            <h2></h2>
        </div>
    )
}

export default Account
