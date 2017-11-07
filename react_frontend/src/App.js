import React, {Component} from "react";
import "./sass/App.scss";
import NavBar from "./containers/NavBar";
import Body from "./containers/Body";
import {BrowserRouter} from "react-router-dom";


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
}

export default App;
