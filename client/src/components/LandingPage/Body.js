import React from 'react'
import { Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux'

// pages for this product
import LoginPage from "../Body/Login"; 
import Register from '../Body/Register';
import ActiveEmail from '../Body/ActiveEmail';
import ForgotPw from '../Body/ForgotPw';
import ResetPassword from '../Body/ResetPassword'
import Notfound from '../utils/Notfound'
import Profile from '../Body/Profile'
import Successfully from '../utils/Successfully'




function Body() {
    //const
    const auth = useSelector(state => state.auth)
    const {isLogged} = auth

    //render
    return (
        <div className='body'>
            <section className='page'>
                <Switch>
                    <Route exact path="/login" component={isLogged? Notfound : LoginPage}/>
                    <Route exact path="/register" component={isLogged? Notfound: Register}/>
                    <Route exact path="/user/activation/:activation_token" component={ActiveEmail}/>
                    <Route exact path="/forgot" component={isLogged? Notfound:ForgotPw}/>
                    <Route exact path="/user/reset/:token" component={isLogged? Notfound:ResetPassword}/>
                    <Route exact path="/profile" component={isLogged? Profile : Notfound}/>
                    <Route exact path="/success/:title/:subTitle" component={Successfully}/>
                </Switch>
            </section>
      </div>
    )
}

export default Body
