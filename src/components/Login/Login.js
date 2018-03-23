import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllWeapons, getAllArmor, getAllSpells } from '../../ducks/reducer.js';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        this.props.getAllWeapons();
        this.props.getAllArmor();
        this.props.getAllSpells();
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

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, { getAllWeapons, getAllArmor, getAllSpells })(Login);
