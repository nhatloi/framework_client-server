import React from 'react'
import { Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux'

// pages for this product
import Register from '../../auth/Register';
import ActiveEmail from '../../auth/ActiveEmail';
import ForgotPw from '../../auth/ForgotPw';
import ResetPassword from '../../auth/ResetPassword'
import Notfound from '../../utils/Notfound'
import Profile from '../View/Profile'
import Successfully from '../../utils/Successfully'
import Test from '../View/Test'
import InTheatersPage from '../View/InTheater/InTheatersPage'
import InTheatersDetail from '../View/InTheater/InTheatersDetail'
import News from '../View/News/NewsPage'
import Home from '../View/Home'
import Header from './Header'
function Body() {
    //const
    const auth = useSelector(state => state.auth)
    const {isLogged} = auth

    //render
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <section>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        {/* must login first */}
                        <Route exact path="/register" component={isLogged? Notfound: Register}/>
                        <Route exact path="/forgot" component={isLogged? Notfound:ForgotPw}/>
                        <Route exact path="/user/reset/:token" component={isLogged? Notfound:ResetPassword}/>
                        <Route exact path="/profile" component={isLogged? Profile : Notfound}/>
                        <Route exact path="/favorite" component={isLogged? Profile : Notfound}/>

                        {/* notification */}
                        <Route exact path="/success/:title/:subTitle" component={Successfully}/>

                        {/* no need to login */}
                        <Route exact path="/user/activation/:activation_token" component={ActiveEmail}/>
                        <Route exact path="/test" component={Test}/>
                        <Route exact path="/intheaters/:query" component={InTheatersPage}/>
                        <Route exact path="/intheaters/detail/:nameMovie" component={InTheatersDetail}/>

                        {/* News */}
                        <Route exact path="/news" component={News}/>
                        
                    </Switch>
                </section>
            </div>
      </div>
    )
}

export default Body
