import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Body from './components/LandingPage/Body'
import NavHeader from './components/LandingPage/Header'
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import {fetchUser,dispatchGetUser,dispatchLogin} from './redux/actions/authAction'
import {fetchAllUsers,dispatchGetAllUser} from './redux/actions/allUserAction'
import { Row} from 'antd';
import AdminPage from './AdminPage/AdminPage'


function App() {
//const 
const dispatch = useDispatch()
const token = useSelector(state => state.token)
const auth = useSelector(state => state.auth)
const {isLogged,isAdmin} = auth


const getToken = async()=>{
  const res = await axios.post('/user/refresh_token',null)
  dispatch({type:'GET_TOKEN',payload: res.data.access_token})
}

const getUser = async() =>{
  return fetchUser(token).then(res =>{
    dispatch(dispatchGetUser(res))
  })
}


//effect
useEffect(()=>{
  const firstLogin = localStorage.getItem('firstLogin')
  if(firstLogin){
    getToken()
    dispatch(dispatchLogin())
  }
},[isLogged])

useEffect(()=>{
  if(token) getUser()
},[token])

useEffect(()=>{
  if(isAdmin){
    fetchAllUsers(token,auth).then(res =>{
      dispatch(dispatchGetAllUser(res))
    })
  }
},[isAdmin])


//render
  return (
    <div>
      <Router>
        {
          isAdmin?<AdminPage/>
          :
          <div>
            <Row className='body'>
              <Body/>
            </Row>
            <NavHeader/>
          </div>
        }
      </Router>
    </div>
    
    
  )
}

export default App

