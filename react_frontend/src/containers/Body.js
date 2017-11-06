import React from "react";
import { Switch, Route } from 'react-router-dom'
import {GetRepo} from "./GetRepo";
import IssueTypeContainer from "./IssueTypeContainer";

export default class Body extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={GetRepo}/>
                    <Route path="/search" component={GetRepo}/>
                    <Route path="/issues" component={IssueTypeContainer}/>
                </Switch>
            </div>

        )
    }
}
