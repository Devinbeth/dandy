import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer.js';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

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
                    iconElementRight={<a href={process.env.REACT_APP_LOGOUT}><div className='log'>LOGOUT</div></a>}
                    style={{ position: 'fixed'}}
                />
                <Drawer open={this.state.open}>
                    <AppBar 
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        onLeftIconButtonClick={() => this.setState({ open: !this.state.open })}
                    />
                    <br/>
                    <br/>
                    <Link to='/home' ><MenuItem>MY CHARACTERS</MenuItem></Link>
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
