import React, {Component} from 'react';
import './sass/App.scss';
import {GetRepo} from "./containers/GetRepo";
import {Login} from "./containers/Login";
import {AddReview} from "./containers/AddReview"
import {ShowReviewsUsername, ShowReviewsRepo} from "./containers/ShowReviews"

class App extends Component {
    render() {
        return (
            <div className="App">
                <AddReview/>
            </div>
        );
    }
}

export default App;
