import React, {Component} from 'react';
import axios from "axios"
import {AddReview} from "./AddReview";

export class GetRepo extends Component {
    constructor(props) {
        super(props);
        this.searchRepo = this.searchRepo.bind(this);
        this.state = {issues: [], error: ""}
    }

    render() {
        return (
            <div>
                <input type="text" id="repo" placeholder="repo_name" value="react"/>
                <input type="text" id="owner" placeholder="owner_name" value="facebook"/>
                <input type="button" id="search_button" onClick={this.searchRepo}/>
                {this.state.error !== "" ? <p>{this.state.error}</p> : null}
                <div>
                    {this.state.issues.map((item, index) => (
                        <div key={index}>
                            <p key={index+'_'+0}>Title: {item.title}</p>
                        </div>
                    ))}
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