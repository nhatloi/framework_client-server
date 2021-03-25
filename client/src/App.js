import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import BodyUser from './components/UserPage/LandingPage/Body'
import NavHeader from './components/UserPage/LandingPage/Header'

import {BrowserRouter as Router,useHistory} from 'react-router-dom'
import axios from 'axios'
import {fetchUser,dispatchGetUser,dispatchLogin} from './redux/actions/authAction'
import {fetchAllUsers,dispatchGetAllUser} from './redux/actions/allUserAction'
import AdminPage from './components/AdminPage/AdminPage'


function App() {
//const 
const dispatch = useDispatch()
const history = useHistory()
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
          isAdmin?<div className="body-admin">
          <div>
            <AdminPage/>
          </div>
        </div>
          :
          <div>
            <div className='body'>
              <BodyUser/>
            </div>
            <NavHeader/>
          </div>
        }
      </Router>
    </div>
  )
}

export default App

