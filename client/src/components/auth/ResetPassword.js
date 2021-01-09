import React ,{useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {Ismatch,Islengt} from '../utils/functionCheck'

const initialState = {
    password : '',
    cf_password : '',
    err : '',
    success : ''
}

function ResetPassword() {
    const {token} = useParams()
    const [data, setdata] = useState(initialState)
    
    const {password,cf_password,err,success} = data

    const handleChangeInput = e =>{
        const {name,value} = e.target
        setdata({...data,[name] : value,err:'',success:''})
    }


    const handleChangePassowrd = async() =>{
        if(!Ismatch(password,cf_password))
            return setdata({...data,err:'Confirm password and password is not match!',success:''})

        if(!Islengt(password))
            return setdata({...data,err:'Password must be longer than 6 characters!',success:''})
        
        try {
            const res = await axios.post('/user/reset',{password},{
                headers:{Authorization:token}
            })
            return setdata({...data,err:'',success:res.data.msg})

        } catch (err) {
            err.response.data.msg && setdata({...data,err:err.response.data.msg,success:''})
        }
    }


    //render
    return (
        <div className='fg_pass'>
            <h2>Reset Password</h2>
            <div className='fg_row'>
                New Password:
                <input type='password' name='password' id='password' placeholder='New Password'
                value={password}
                onChange={handleChangeInput}>
                </input>
                <p/>
                Confirm Password:
                <input type='password' name='cf_password' id='cf_password' placeholder='Confirm Password'
                value={cf_password}
                onChange={handleChangeInput}>
                </input>

                <p>{err && err}</p>
                <p>{success && success}</p>
                <button onClick={handleChangePassowrd}>Change Password</button>
            </div>
        </div>
    )
}

export default ResetPassword
