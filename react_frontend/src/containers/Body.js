import React from "react";
import {Switch, Route} from 'react-router-dom'
import {GetRepo} from "./GetRepo";
import {Login} from "./Login";
import {AddReview} from "./AddReview";
import {Home} from "./Home";

export default class Body extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/search" component={GetRepo}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/review" component={AddReview}/>
                </Switch>
            </div>
        )
    }
}
