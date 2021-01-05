import React from 'react'
import { Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux'

// pages for this product
import LoginPage from "../Body/View/Login"; 
import Register from '../Body/View/Register';
import ActiveEmail from '../Body/View/ActiveEmail';
import ForgotPw from '../Body/View/ForgotPw';
import ResetPassword from '../Body/View/ResetPassword'
import Notfound from '../utils/Notfound'
import Profile from '../Body/View/Profile'
import Home from '../Body/View/Home'
import Successfully from '../utils/Successfully'
import MovieDetail from '../Body/View/MovieDetail'





function Body() {
    //const
    const auth = useSelector(state => state.auth)
    const {isLogged} = auth

    //render
    return (
        <div className='body'>
            <section>
                <Switch>

                    {/* must login first */}
                    <Route exact path="/login" component={isLogged? Notfound : LoginPage}/>
                    <Route exact path="/register" component={isLogged? Notfound: Register}/>
                    <Route exact path="/forgot" component={isLogged? Notfound:ForgotPw}/>
                    <Route exact path="/user/reset/:token" component={isLogged? Notfound:ResetPassword}/>
                    <Route exact path="/profile" component={isLogged? Profile : Notfound}/>

                    {/* notification */}
                    <Route exact path="/success/:title/:subTitle" component={Successfully}/>

                    {/* no need to login */}
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/user/activation/:activation_token" component={ActiveEmail}/>
                    <Route exact path="/movie/:movieId" component={MovieDetail}/>

                </Switch>
            </section>
      </div>
    )
}

export default Body
