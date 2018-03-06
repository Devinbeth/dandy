import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div className='Home'>  
                <h1>Home</h1>
                <a href={ process.env.REACT_APP_LOGOUT }><div>Logout</div></a>
            </div> 
        )
    }
}
