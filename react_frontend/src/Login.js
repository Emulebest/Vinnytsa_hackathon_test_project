import React, { Component } from 'react';
import axios from "axios"

export class Login extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }

    componentDidMount() {
        axios.get("/api/hello").then(response => {
            console.log(response.data)
        })
    }
}