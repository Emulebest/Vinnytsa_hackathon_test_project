import React, {Component} from 'react';
import axios from "axios"
import IssueContainer from "./IssueContainer";
import "../sass/GetRepo.css";


export class GetRepo extends Component {
    constructor(props) {
        super(props);
        this.searchRepo = this.searchRepo.bind(this);
        this.state = {issues: [], error: ""}
    }

    render() {
        return (
            <div id="container-form-search">
                <h3>Please fill in the form to search repository issues</h3>
            <div id="input-container">
                <input type="text" id="repo" placeholder="Repository name" />
                <br/>
                <input type="text" id="owner" placeholder="Owner name" />
                <br/>
                <input type="button" id="search_button" onClick={this.searchRepo} value="Search repo"/>
                {this.state.error !== "" ? <p>{this.state.error}</p> : null}
            </div>
                <div>
                    <IssueContainer issues={this.state.issues}/>
                </div>
            </div>
        )
    }

    async searchRepo() {
        const search_string = "/api/search/?q=" + document.getElementById("repo").value + "&owner=" + document.getElementById("owner").value;
        const issues = await axios.get(search_string);
        if (issues.data.error !== undefined) {
            this.setState({
                "error": "Limit exceeded"
            });
            return
        }
        console.log(typeof issues.data.issues);
        console.log(issues.data.issues);
        this.setState({issues: issues.data.issues});
    }
}