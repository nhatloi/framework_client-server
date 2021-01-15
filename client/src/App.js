import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Body from './components/LandingPage/Body'
import NavHeader from './components/LandingPage/Header'
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import {dispatchLogin,fetchUser,dispatchGetUser} from './redux/actions/authAction'
import { Row} from 'antd';
import AdminPage from './AdminPage/AdminPage'


function App() {
//const 
const dispatch = useDispatch()
const token = useSelector(state => state.token)
const auth = useSelector(state => state.auth)
const {isLogged,isAdmin} = auth


//effect
useEffect(()=>{
  const firstLogin = localStorage.getItem('firstLogin')
  if(firstLogin){
    const getToken = async()=>{
      const res = await axios.post('/user/refresh_token',null)
      dispatch({type:'GET_TOKEN',payload: res.data.access_token})
    }
    getToken()
  }
},[isLogged,dispatch])

useEffect(()=>{
  if(token){
    const getUser = () =>{
      dispatch(dispatchLogin())

      return fetchUser(token).then(res =>{
        dispatch(dispatchGetUser(res))
      })
    }
    getUser()
  }
},[token,dispatch])

//render
  return (
    <div>
      {isAdmin?<AdminPage/>
        :<Router>

              <Row className='body'>
                <Body/>
              </Row>

          <NavHeader/>
        </Router>
}
    </div>
    
    
  )
}

export default App

