import React, {Component} from "react"
import axios from "axios"
import {ShowReviewsRepo, ShowReviewsUsername} from "./ShowReviews"
import "../sass/Review.css"
import ReactLoading from 'react-loading';

export class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {user_pic: "", error: "", loading: true, send_status: "", my_reviews: false, all_reviews: false};
        this.sendReview = this.sendReview.bind(this);
        this.showAllReviews = this.showAllReviews.bind(this);
        this.showMyReviews = this.showMyReviews.bind(this);
    }

    render() {
        if (this.state.loading === true) {
            return (
                <article>
                    <ReactLoading type="spin" color="#444"/>
                </article>
            )
        }
        if (this.state.error === "") {
            return (
                <div className="review-container">
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="repo_name">Repository</label>
                            <input className="form-control" type="text" id="repo_name" placeholder="react"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="owner_name">Owner of the repo</label>
                            <input className="form-control" type="text" id="owner_name" placeholder="facebook"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <input className="form-control" type="number" id="rating" min="0" placeholder="3"/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-default" id="send_review_button"
                                    onClick={this.sendReview}>Send review
                            </button>
                        </div>
                    </form>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="review_text">Review</label>
                        <textarea className="form-control" type="text" id="review_text"
                                  placeholder="Your review text"/>
                    </div>
                    <p>{this.state.send_status}</p>
                    <button className="btn btn-default" onClick={this.showMyReviews}>Get all your reviews</button>
                    <button className="btn btn-default" onClick={this.showAllReviews}>Get all reviews for this
                        repository
                    </button>
                    {this.state.my_reviews ? <ShowReviewsUsername/> : null}
                    {this.state.all_reviews ? <ShowReviewsRepo repo={document.getElementById("repo_name").value}
                                                               owner={document.getElementById("owner_name").value}/> : null}
                </div>
            )
        } else {
            return (
                <div className="center-login">
                    <h1>Please login!</h1>
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
        const repo_name = document.getElementById("repo_name").value;
        const owner_name = document.getElementById("owner_name").value;
        console.log(this.state.user_pic);
        try {
            await axios.post("/api/create-review/", {
                username: localStorage.getItem("username"),
                //repo_name: this.props.repo_name,
                //owner_name: this.props.owner_name
                repo_name: repo_name,
                owner_name: owner_name,
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

    showMyReviews() {
        if (this.state.my_reviews) {
            this.setState({
                my_reviews: false,
                all_reviews: false
            })
        } else {
            this.setState({
                my_reviews: true,
                all_reviews: false
            })
        }
    }

    showAllReviews() {
        if (this.state.all_reviews) {
            this.setState({
                all_reviews: false,
                my_reviews: false
            })
        } else {
            this.setState({
                all_reviews: true,
                my_reviews: false
            })
        }
    }
}