import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Body from './components/LandingPage/Body'
import NavHeader from './components/LandingPage/Header'
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import {dispatchLogin,fetchUser,dispatchGetUser} from './redux/actions/authAction'
import {fetchAllUsers,dispatchGetAllUser} from './redux/actions/allUserAction'
import { Row} from 'antd';
import AdminPage from './AdminPage/AdminPage'


function App() {
//const 
const dispatch = useDispatch()
const token = useSelector(state => state.token)
const auth = useSelector(state => state.auth)
const {isLogged,isAdmin} = auth
const users = useSelector(state => state.users)
const updatePage = localStorage.getItem('updatePage')
const getToken = async()=>{
  dispatch(dispatchLogin())
  const res = await axios.post('/user/refresh_token',null)
  dispatch({type:'GET_TOKEN',payload: res.data.access_token})
}

const getUser = () =>{
  return fetchUser(token).then(res =>{
    dispatch(dispatchGetUser(res))
  })
}


//effect
useEffect(()=>{
  const firstLogin = localStorage.getItem('firstLogin')
  if(firstLogin){
    getToken()
  }

  if(token){
    getUser()
  }
  if(!isAdmin){
    fetchAllUsers(token).then(res =>{
      dispatch(dispatchGetAllUser(res))
    })
  }
},[isLogged,dispatch,token])


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

