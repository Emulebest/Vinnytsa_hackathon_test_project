import React from "react";
import {Link} from "react-router-dom";
import "../sass/NavBar.css";

export default class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {logged: false}
    }

    render() {
        return (
            <div>
                <ul className="navbar">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/search'>Find</Link></li>
                    {!this.state.logged ? <li><Link to='/login'>Login</Link></li> : null}
                    <li><Link to='/review'>Add Review</Link></li>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            console.log("I am on");
            window.addEventListener('storage', () => {
                console.log("It works");
                if (localStorage.getItem("username")) {
                    this.setState({
                        logged: true,
                    })
                } else {
                    this.setState({
                        logged: false
                    })
                }
            })
        }
    }
}
