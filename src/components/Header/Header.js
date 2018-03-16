import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer.js';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }
    componentDidMount() {
        this.props.getUser();
    }

    render() {

        return (
            <div className='Home'>
                <AppBar 
                    title='DANDY'
                    onLeftIconButtonClick={() => this.setState({ open: !this.state.open })}
                    iconElementRight={<a href={process.env.REACT_APP_LOGOUT}><div className='log'>Logout</div></a>}
                />
                <Drawer open={this.state.open}>
                    <AppBar 
                        onLeftIconButtonClick={() => this.setState({ open: !this.state.open })}
                    />
                    <MenuItem>MY CHARACTERS</MenuItem>
                    <MenuItem>NEW CHARACTER</MenuItem>
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
        user: state.user,
    };
}

export default connect(mapStateToProps, { getUser })(Header);
