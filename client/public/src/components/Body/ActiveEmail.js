import React,{useEffect}from 'react'
import {useParams,useHistory} from 'react-router-dom'
import axios from 'axios'
import Notfound from '../utils/Notfound'


function ActiveEmail() {
    const history = useHistory()
    const {activation_token} = useParams()
    useEffect(()=>{
            if(activation_token){
                const activationEmail = async()=>{
                    try {
                        await axios.post('/user/activation',{activation_token})
                        const success ={
                            title:'Successful activation!',
                            subTitle:'Login now?'
                        }
                        history.push(`/success/${success.title}/${success.subTitle}`)
                    } catch (error) {
                        
                    }
                }
                activationEmail()
        }
    })

            return (
                <div>
                    <Notfound/>
                </div>
            )
    
}

export default ActiveEmail
