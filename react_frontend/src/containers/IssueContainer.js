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

    handleClick(e) {
        e.stopPropagation();

        this.setState({show: !this.state.show});
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
                {childnodes.length !== 0 || this.props.issues ? <span>+ </span> : null}
                {this.props.node.name }
                { childnodes && this.state.show ?
                    <div>
                        <ul className="org">{childnodes}</ul>
                        {this.props.issues ? <ul>{this.props.issues.map(function (item) {
                            var labels= '';
                            for (let i = 0; i < item.labels.length; i++){
                                labels += item.labels[i].name + ', '
                            }
                            return (
                                <li><p>
                                    {"title: " + item.title}<br></br>
                                    {" labels: " + labels} <br></br>
                                    {" body: " + item.body}</p></li>
                            )
                        })}</ul> : null}
                    </div>
                    : null }
            </li>
        );

    }
}




