import React, { Component } from 'react';
import axios from "axios"

export class Login extends Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    render() {
        return (
            <div>
                <input type="text" id="username"/>
                <input type="text" id="password"/>
                <input type="button" id="submit" onClick={this.handleButtonClick}/>
            </div>
        )
    }

    handleButtonClick() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        axios.post("/api/login/", {
            username: username,
            password: password
        }).then(response => {
            console.log(response)
        })
    }
}