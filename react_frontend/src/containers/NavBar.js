import React from "react";
import {Link} from "react-router-dom";
import "../sass/NavBar.css";
import {store} from "../index"

export default class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {logged: false};
        this.logout = this.logout.bind(this)
    }

    render() {
        return (
            <div>
                <ul className="navbar">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/search'>Find</Link></li>
                    {!store.getState() ? <li><Link to='/login'>Login</Link></li> : <li onClick={this.logout}>Logout</li>}
                    <li><Link to='/review'>Add Review</Link></li>
                </ul>
            </div>
        )
    }

    logout() {
        localStorage.clear();
        this.setState({
            logged: false
        });
        store.dispatch({
            type: "GOT_UNLOGGED"
        })
    }
}
