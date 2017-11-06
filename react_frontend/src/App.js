import React, {Component} from "react";
import "./sass/App.scss";
import Head from "./containers/Head";
import Body from "./containers/Body";
import {BrowserRouter} from "react-router-dom";


class App extends Component {
    render() {
        return (
                <BrowserRouter>
                    <div>
                        <Head/>
                        <Body/>
                    </div>
                </BrowserRouter>
        );
    }
}

export default App;
