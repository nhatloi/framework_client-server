import React from 'react'
import { Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux'

// pages for this product
import LoginPage from "../auth/Login"; 
import Register from '../auth/Register';
import ActiveEmail from '../auth/ActiveEmail';
import ForgotPw from '../auth/ForgotPw';
import ResetPassword from '../auth/ResetPassword'
import Notfound from '../utils/Notfound'
import Profile from '../Body/View/Profile'
import Home from '../Body/View/News/Home'
import Successfully from '../utils/Successfully'
import MovieDetail from '../Body/View/News/MovieDetail'
import Test from '../Body/View/Test'
import FreeMovies from '../Body/View/FreeMovies/FreeMovies'
import WhatMovie from '../Body/View/FreeMovies/WhatMovie'





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
                    <Route exact path="/test" component={Test}/>
                    <Route exact path="/freemovies/:category" component={FreeMovies}/>
                    <Route exact path="/whatmovie/:nameMovie" component={WhatMovie}/>



                </Switch>
            </section>
      </div>
    )
}

export default Body
