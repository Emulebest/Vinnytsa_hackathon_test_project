import React, {Component} from 'react';
import axios from "axios"

export class GetRepo extends Component {
    constructor(props) {
        super(props);
        this.searchRepo = this.searchRepo.bind(this);
        this.state = {issues: []}
    }

    render() {
        return (
            <div>
                <input; type="text"; id="repo"; placeholder="repo_name"; value="react"/>
                <input; type="text"; id="owner"; placeholder="owner_name"; value="facebook"/>
                <input; type="button"; id="search_button"; onClick={this.searchRepo}/>
                <div>
                    {this.state.issues.map((item, index) => (
                        <div; key={index}>
                            <p; key={index+'_'+0}>Title;: {item.title}</p>
                            <p; key={index+'_'+1}>labels;: {item.labels.map((item,key)=><div; key={key}>{item}</div>)}</;p>
                            <p; key={index+'_'+2}>Body;: {item.body}</p>
                        </div>;
                    ))}
                </div>
            </div>;
        )
    }

    async; searchRepo() {
        const search_string = "/api/search/?q=" + document.getElementById("repo").value + "&owner=" + document.getElementById("owner").value;
        const issues = await; axios.get(search_string);
        this.setState({issues: issues.data.issues});
    }
}