import React, {Component} from 'react';
import './sass/App.scss';
import {GetRepo} from "./containers/GetRepo";
import Organisation from "./containers/IssueTypeContainer";

class App extends Component {
    render() {
        return (
            /*<div className="App">
                <GetRepo/>
            </div> */
            <div className="App">
                <Organisation/>
            </div>
        );
    }
}

export default App;
