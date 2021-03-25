import React from 'react'
import '../AdminPage.css'
import { Route, Switch } from "react-router-dom";
import Account from '../Body/Account'
import Movie from '../Body/Movie'
import Theaters from '../Body/Theaters'
import News from '../Body/News'
import Theater_room from '../Body/Theater_room'
import Screening from '../Body/Screening'
import Tickets from '../Body/Tickets'
import Advertisement from '../Body/Advertisement'
import AddNew from '../Body/AddNew'
import AddNewMovie from '../Body/commons/AddNewMovie'

function Body() {
    return (
        <div>
            <section>
                <Switch>
                    {/* must login first */}
                    <Route exact path="/account" component={Account}/>
                    <Route exact path="/movies" component={Movie}/>
                    <Route exact path="/theaters" component={Theaters}/>
                    <Route exact path="/theaters-room" component={Theater_room}/>
                    <Route exact path="/screening" component={Screening}/>
                    <Route exact path="/tickets" component={Tickets}/>
                    <Route exact path="/news" component={News}/>
                    <Route exact path="/" component={Account}/>
                </Switch>
            </section>
        </div>
    )
}

export default Body
