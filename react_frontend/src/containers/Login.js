import React, {Component} from 'react';
import axios from "axios"
import {GetRepo} from "./GetRepo";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {error: "", logged: false};
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    render() {
        return (
            <div>
                <input type="text" id="username" placeholder="username"/>
                <input type="text" id="password" placeholder="password"/>
                <input type="button" id="submit" onClick={this.handleButtonClick}/>
                {this.state.error}
                {this.state.logged ? <GetRepo/> : null}
            </div>
        )
    }

    async handleButtonClick() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        try {
            await axios.post("/api/login/", {
                username: username,
                password: password
            });
            this.setState({error: "", logged: true});
            localStorage.setItem("git_login", username);
            localStorage.setItem("git_pass", password)
        } catch(e) {
            this.setState({error: "Invalid credentials"})
        }
    }
}