import React from "react";
import "../sass/IssueTypeContainer.css";
/*
export default class IssueTypeContainer extends React.Component{
    render(){
        return (
            <div id="container">
            <ul>
                <li>Resolution<span id="res-span">15</span></li>
                <li>Component<span id="comp-span">20</span></li>
                <li>Bug<span id="bug-span">5</span></li>
                <li>Browser<span id="brow-span">10</span></li>
            </ul>
            </div>
        )
    }
}*/

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
        // loop through the persons array and create a new component for each, passing the current person (id and name) and it's children (person.people) as props

        let nodes = people.map(function(person) {
            return (
                <Node node={person} children={person.people} />
            );
        });

        return (
            <div>
                <ul className="org">
                    {nodes}
                </ul>
            </div>
        );
    }
}
class Node extends React.Component {
    constructor(props){
        super(props);
        this.state = {show : false};
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(e){
        console.log("clicked");
        this.setState({show : true}); // если тру - тогда все открывается классно, но потом не закрывается
    }


    render() {

        let childnodes = null;

        // the Node component calls itself if there are children
        if(this.props.children) {
            childnodes = this.props.children.map(function(childnode) {
                return (
                    <Node  node={childnode} children={childnode.people} />
                );
            });
        }

        // return our list element
        // display children if there are any
        return (
            <li onClick={this.handleClick} key={this.props.node.id}>
                {childnodes ? <p>+</p> : null}
                {this.props.node.name}
                { childnodes && this.state.show ?
                    <ul>{childnodes}</ul>
                    : null }
            </li>
        );
    }
}



