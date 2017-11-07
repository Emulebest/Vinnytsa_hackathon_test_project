import React, {Component} from "react"
import axios from "axios"

export class ShowReviewsUsername extends Component {
    constructor(props) {
        super(props);
        this.state = {reviews: []}
    }

    render() {
        return (
            <div>
                {this.state.reviews.map((item, index) => (
                    <div key={"review_" + index}>
                        <p><img src={item.user_pic}/>Username: {item.username}</p>
                        <p>{item.review}</p>
                        <p>{item.rating}</p>
                    </div>
                ))}
            </div>
        )
    }

    componentWillMount() {
        this.getReviewsUsername();
    }

    async getReviewsUsername() {
        const username = localStorage.getItem("username");
        const reviews = await axios.get("/api/user-reviews/?username=" + username);
        this.setState({
            reviews: reviews.data
        })
    }
}

export class ShowReviewsRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {reviews: []}
    }

    render() {
        return (
            <div>
                {this.state.reviews.map((item, index) => (
                    <div key={"review_" + index}>
                        <p><img src={item.user_pic}/>Username: {item.username}</p>
                        <p>{item.review}</p>
                        <p>{item.rating}</p>
                    </div>
                ))}
            </div>
        )
    }

    componentWillMount() {
        this.getReviewsRepo();
    }

    async getReviewsRepo() {
        const {repo, owner} = this.props;
        const reviews = await axios.get("/api/user-reviews/?repo=" + repo + "&owner=" + owner);
        this.setState({
            reviews: reviews.data
        })
    }
}