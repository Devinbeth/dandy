import React, { Component } from 'react';
import './Login.css';
import AppBar from 'material-ui/AppBar';

export default class Login extends Component {
    render() {
        return (
            <div className='Login'>
                <AppBar title='Dandy'
                        showMenuIconButton={false}
                        iconElementRight={<a href={ process.env.REACT_APP_LOGIN }><div className='log'>Login</div></a>}
                />
            </div> 
        )
    }
}
