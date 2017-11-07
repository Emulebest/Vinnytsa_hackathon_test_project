import React from "react";
import {Link} from "react-router-dom";
import "../sass/NavBar.css";

export default class Head extends React.Component{
    render(){
        return(
            <div>
                <ul className="navbar">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/search'>Find</Link></li>
                    <li><Link to='/issues'>Issues</Link></li>
                </ul>
            </div>
        )
    }
}
