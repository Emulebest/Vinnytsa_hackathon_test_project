import React, {Component} from 'react';
import axios from "axios"
import IssueContainer from "./IssueContainer";
import "../sass/GetRepo.css";
/*
var data = [{
    id: 1,
    name: "Bug",
    issues: [{name : "bug", labels : "1", text : "bug text"}, {name : "bug", labels : "2", text : "bug text"}],
    children: [
        {
            id: 3,
            name: "Component",
            issues: [{name : "bug component", labels : "1", text : "bug component text"}, {name : "bug component", labels : "2", text : "b text"}],
            children: [
                {
                    id: 4,
                    name: "Lalala",
                    children : [],
                    issues: [{name : "bug ", labels : "1", text : "bug component text"}, {name : "bug component", labels : "2", text : "b text"}]
                }
            ]
        }
    ]
}];*/

export class GetRepo extends Component {
    constructor(props) {
        super(props);
        this.searchRepo = this.searchRepo.bind(this);
        this.state = {issues: [], error: ""}
    }

    render() {
        return (
            <div>
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