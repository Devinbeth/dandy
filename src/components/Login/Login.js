import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }
    render() {
        return (
            <div className='Login'>
                <AppBar title='DANDY'
                        onLeftIconButtonClick={() => this.setState({ open: !this.state.open })}
                >
                    <a href={process.env.REACT_APP_LOGIN}><FlatButton label='LOGIN' style={{ color: 'white', marginTop: '15%' }} /></a>
                </AppBar>
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <AppBar 
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        onLeftIconButtonClick={() => this.setState({ open: !this.state.open })}
                    />
                    <br/>
                    <br/>
                    <MenuItem>RACES</MenuItem>
                    <MenuItem>CLASSES</MenuItem>
                    <MenuItem>WEAPONS</MenuItem>
                    <MenuItem>ARMOR</MenuItem>
                    <MenuItem>EQUIPMENT</MenuItem>
                    <MenuItem>SPELLS</MenuItem>
                    <MenuItem>MONSTERS</MenuItem>
                </Drawer>
            </div> 
        )
    }
}
