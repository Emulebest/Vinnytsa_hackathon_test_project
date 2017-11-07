import React from "react";
import "../sass/IssueContainer.css";


export default class IssueContainer extends React.Component {
    render() {
        let data = this.props.issues;
        let nodes = data.map(function (item) {
            return (
                <Node node={item} children={item.children} issues={item.issues}/>
            );
        });

        return (
            <div id="container">
                <ul className="org">
                    {nodes}
                </ul>
            </div>
        );
    }
}
class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(param, e) {
        console.log(param);
        this.setState({show: true});
    }


    render() {
        let childnodes = null;
        if (this.props.children) {
            childnodes = this.props.children.map(function (childnode) {
                return (
                    <Node node={childnode} children={childnode.children} issues={childnode.issues}/>
                );
            });
        }

        return (
            <li onClick={this.handleClick} key={this.props.node.id}>
                {childnodes.length != 0 || this.props.issues ? <span>+ </span> : null}
                {this.props.node.name }
                { childnodes && this.state.show ?
                    <div>
                        <ul className="org">{childnodes}</ul>
                        {this.props.issues ? <ul>{this.props.issues.map(function (item) {
                            return (
                                <li>{item.name + " " + item.labels + " " + item.text}</li>
                            )
                        })}</ul> : null}
                    </div>
                    : null }
            </li>
        );

    }
}




