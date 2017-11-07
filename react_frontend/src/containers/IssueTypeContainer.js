import React from "react";
import "../sass/IssueTypeContainer.css";

var people = [{
    id: 1,
    name: "Managing Director",
    people: [
        {
            id: 2,
            name: "Sales Director"
        }, {
            id: 3,
            name: "IT Director",
            people: [
                {
                    id: 4,
                    name: "Technical Lead",
                    people: [
                        {
                            id: 5,
                            name: "Software Developer"
                        },
                        {
                            id: 6,
                            name: "Support Technician"
                        }
                    ]
                }
            ]
        }, {
            id: 7,
            name: "HR Department",
            people: [
                {
                    id: 8,
                    name: "HR Officer",
                    people: [{
                        id: 9,
                        name: "HR Assistant 1"
                    }, {
                        id: 10,
                        name: "HR Assistant 2"
                    }]
                }
            ]
        }
    ]
}];
export default class Organisation extends React.Component {

    render() {

        let nodes = people.map(function (person) {
            return (
                <Node node={person} children={person.people}/>
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
        this.setState({show : true}); // если тру - тогда все открывается классно, но потом не закрывается

    }


    render() {

        let childnodes = null;
        if (this.props.children) {
            childnodes = this.props.children.map(function (childnode) {
                return (
                    <Node node={childnode} children={childnode.people}/>
                );
            });
        }

        return (
            <li onClick={this.handleClick} key={this.props.node.id}>
                {childnodes ? <span>+ </span> : null}
                {this.props.node.name}
                { childnodes && this.state.show ?
                    <ul className="org">{childnodes}</ul>
                    : null }
            </li>
        );

    }
}




