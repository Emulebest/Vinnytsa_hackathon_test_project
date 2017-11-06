import React, {Component} from "react"
import axios from "axios"

export class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {user_pic: "", error: "", loading: true, send_status: ""};
        this.sendReview = this.sendReview.bind(this)
    }

    render() {
        if (this.state.loading === true) {
            return (
                <div>
                    Loading
                </div>
            )
        }
        if (this.state.error === "") {
            return (
                <div>
                    <p>Hi logged</p>
                    <input type="text" id="review_text" placeholder="Your review text"/>
                    <input type="number" id="rating"/>
                    <input type="button" id="send_review_button" value="Send review" onClick={this.sendReview}/>
                    <p>{this.state.send_status}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Hi not logged</p>
                </div>
            )
        }
    }

    async getUser() {
        try {
            const username = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            const resp = await axios.post("/api/login/", {
                username: username,
                password: password
            });
            console.log(resp.data);
            this.setState({
                user_pic: resp.data.user.avatar_url,
                loading: false
            })
        } catch (e) {
            this.setState({
                error: "Please login",
                loading: false
            })
        }
    }

    async sendReview() {
        const review_text = document.getElementById("review_text").value;
        const rating = document.getElementById("rating").value;
        console.log(this.state.user_pic);
        try {
            const resp = await axios.post("/api/create-review/", {
                username: localStorage.getItem("username"),
                //repo_name: this.props.repo_name,
                //owner_name: this.props.owner_name
                repo_name: "Hack-a-thon_Test",
                owner_name: "Emulebest",
                review: review_text,
                rating: rating,
                user_pic: this.state.user_pic
            });
            this.setState({
                send_status: "Review Delivered"
            })
        } catch (e) {
            this.setState({
                send_status: "Not delivered"
            })
        }
    }

    componentDidMount() {
        this.getUser();
    }
}