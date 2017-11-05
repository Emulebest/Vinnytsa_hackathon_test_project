import React, {Component} from 'react';
import axios from "axios"

export class GetRepo extends Component {
    constructor(props) {
        super(props);
        this.searchRepo = this.searchRepo.bind(this)
    }
    render() {
        return(
            <div>
                <input type="text" id="repo" placeholder="repo_name"/>
                <input type="text" id="owner" placeholder="owner_name"/>
                <input type="button" id="search_button" onClick={this.searchRepo}/>
            </div>
        )
    }

    async searchRepo() {
        const search_string = "/api/search/?q=" + document.getElementById("repo").value + "&owner=" + document.getElementById("owner").value;
        const repo = await axios.get(search_string);
        console.log(repo.data)
    }
}