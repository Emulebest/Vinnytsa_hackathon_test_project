import React, {Component} from 'react';
import './sass/App.scss';
import {GetRepo} from "./containers/GetRepo";

class App extends Component {
    render() {
        return (
            <div className="App">
                <GetRepo/>
            </div>
        );
    }
}

export default App;
