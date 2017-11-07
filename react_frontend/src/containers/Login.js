import React, {Component} from "react"
import axios from "axios"
import {store} from "../index"
import "../sass/Login.css"
import "../sass/Review.css"

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {error: "", logged: false, username: ""};
        this.handleClickLogin = this.handleClickLogin.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this)
    }

    render() {
        if (this.state.logged !== true) {
            return (
                <div className="login-container">
                    <div className="inner-login">
                        <div>
                            <input type="text" id="username" placeholder="Username"/>
                        </div>
                        <div>
                            <input type="password" id="password" placeholder="Password"/>
                        </div>
                        <div>
                            <button className="btn btn-success" id="login" onClick={this.handleClickLogin}>Login</button>
                        </div>
                        <p>{this.state.error}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="center-login">
                    <h2>Welcome {this.state.username}</h2>
                    <button id="logout" className="btn btn-warning" onClick={this.handleClickLogout}>Wanna Logout?</button>
                </div>
            )
        }
    }

    async handleClickLogin(e) {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        try {
            const resp = await axios.post("/api/login/", {
                username: username,
                password: password
            });
            console.log(resp.data);
            this.setState({
                error: "",
                logged: true,
                username: username
            });
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            store.dispatch({
                type: "GOT_LOGGED"
            })
        } catch (e) {
            this.setState({
                error: "Wrong credentials",
                logged: false
            })
        }
    }

    handleClickLogout(e) {
        localStorage.clear();
        this.setState({
            logged: false
        });
        store.dispatch({
            type: "GOT_UNLOGGED"
        })
    }

    retrieveUser() {
        if (localStorage.getItem("username") && localStorage.getItem("password")) {
            this.setState({logged: true, username: localStorage.getItem("username")})
        }
    }

    componentWillMount() {
        this.retrieveUser()
    }
}