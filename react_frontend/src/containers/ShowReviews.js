import React, {Component} from "react"
import axios from "axios"

export class ShowReviewsUsername extends Component {
    constructor(props) {
        super(props);
        this.state = {reviews: []}
    }

    render() {

    }

    componentWillMount() {

    }

    async getReviewsUsername() {
        const username = localStorage.getItem("username");
        const reviews = await axios.get("/api/user-reviews/?username=" + username);
        this.setState({
            reviews: reviews.data
        })
    }
}