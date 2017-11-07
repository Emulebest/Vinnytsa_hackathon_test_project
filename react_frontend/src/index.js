import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux'

const reducer = (state = false, action) => {
    switch (action.type) {
        case "GOT_LOGGED":
            return true;
        case "GOT_UNLOGGED":
            return false;
        case "INITIAL_LOAD":
            return action.logged;
        default:
            return state;
    }
};

export const store = createStore(reducer);
store.subscribe(rerender);

function rerender() {
    ReactDOM.render(<App />, document.getElementById("root"));
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();