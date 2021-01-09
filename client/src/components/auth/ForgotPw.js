import axios from 'axios'
import React,{useState} from 'react'
import {} from '../..'
import {IsEmail} from '../utils/functionCheck'

const initialState ={
    email:'',
    err:'',
    success:'',
}

function ForgotPw() {

    const [data, setdata] = useState(initialState)

    const {email,err,success} = data


    const handleChangeInput = e =>{
        const {name,value} = e.target
        setdata({...data,[name] : value,err:'',success:''})
    }

    const handleForgot = async() =>{
        if(!IsEmail(email))
            return setdata({...data,err:'Invalid Email!',success:''})
        
        try {
            const res = await axios.post('/user/forgot',{email})
            return setdata({...data,err:'',success:res.data.msg})

        } catch (err) {
            err.response.data.msg && setdata({...data,err:err.response.data.msg,success:''})
        }
    }

    return (
        <div className='fg_pass'>
            <h2>Forgot Your Password?</h2>
            <div className='fg_row'>
                Your Email:
                <input type='email' name='email' id='email' placeholder='Your Email'
                value={email}
                onChange={handleChangeInput}></input>
                <p>{err && err}</p>
                <p>{success && success}</p>
                <button onClick={handleForgot}> Send verify to your email</button>
            </div>
        </div>
    )
}


export default ForgotPw
