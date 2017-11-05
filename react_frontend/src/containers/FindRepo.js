import React, {Component} from 'react';
import axios from "axios"

export class FindRepo extends Component {
    render() {
        return (
            <div>
                <input type="text" id="find_field"/>
                <input type="button" id="find_button"/>
            </div>
        )
    }

    searchRepo() {
        axios.post("/api")
    }
}