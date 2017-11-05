import React, {Component} from 'react';
import axios from "axios"

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {error: "", logged: false};
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    render() {
        return (
            <div>
                <input type="text" id="username"/>
                <input type="text" id="password"/>
                <input type="button" id="submit" onClick={this.handleButtonClick}/>
                {this.state.error}
                {this.state.logged ? <FindRepo/> : null}
            </div>
        )
    }

    async handleButtonClick() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        try {
            const login_response = await axios.post("/api/login/", {
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