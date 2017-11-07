import React, {Component} from "react"
import axios from "axios"

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {error: "", logged: false, username: ""};
        this.handleClickLogin = this.handleClickLogin.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this)
    }

    render() {
        if (this.state.logged !== true){
            return (
                <div>
                    <input type="text" id="username" placeholder="Username"/>
                    <input type="text" id="password" placeholder="Password"/>
                    <input type="button" id="login" value="Login" onClick={this.handleClickLogin}/>
                    <p>{this.state.error}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Hello {this.state.username}</h3>
                    <input type="button" id="logout" value="Logout" onClick={this.handleClickLogout}/>
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
            localStorage.setItem("password", password)
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