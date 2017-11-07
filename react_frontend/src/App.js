import React, {Component} from "react";
import "./sass/App.scss";
import NavBar from "./containers/NavBar";
import Body from "./containers/Body";
import {BrowserRouter} from "react-router-dom";
import {store} from "./index"


class App extends Component {
    render() {
        return (
                <BrowserRouter>
                    <div>
                        <NavBar/>
                        <Body/>
                    </div>
                </BrowserRouter>
        );
    }

    componentWillMount() {
        this.initLoad();
    }

    initLoad() {
        if (localStorage.getItem("username")) {
            store.dispatch({
                type: "INITIAL_LOAD",
                logged: true
            })
        }
    }
}

export default App;
