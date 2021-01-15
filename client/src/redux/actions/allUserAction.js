import ACTIONS from './index'
import axios from 'axios'


export const fetchAllUser = async(token) =>{
    const res = await axios.get('/user/infor',{
        headers:{Authorization:token}
    })
    return res
}


export const dispatchGetAllUser = (res) =>{
    return {
        type: ACTIONS.GET_USER,
        payload:{
            user : res.data,
            isAdmin: res.data.role === 1? true:false
        }
    }
}

