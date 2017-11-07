import React, {Component} from "react"

export class Home extends Component {
    render() {
        let styles = {"text-align" : "center", "marginTop" : "50px"}
        return (
            <div style={styles}>
                <h1>You are visiting our GitHub Issue Helper</h1>
                <img height="400" width="700" src="./github-cat.png"/>
            </div>
        )
    }
}