import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, resetCharacter } from '../../ducks/reducer.js';
import './Header.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        const menuItem = { paddingLeft:'20%', textAlign: 'left' };
        const link = { color: 'white' };
        return (
            <div className='Header'>
                <AppBar
                    title='DANDY'
                    titleStyle={{ marginLeft: '19%' }}
                    onLeftIconButtonClick={() => this.setState({ open: !this.state.open })}
                    style={{ position: 'fixed' }}
                >
                    <div className='header_links'>
                        <Link to='/about'><FlatButton label='About' style={link} /></Link>
                        {this.props.user.id ? <Link to='/account'><FlatButton label='My Account' style={link} /></Link> : null}
                        <Link to='/donate'><FlatButton label='Donate' style={link} /></Link>
                        <a href={this.props.user.id ? process.env.REACT_APP_LOGOUT : process.env.REACT_APP_LOGIN}><FlatButton label={this.props.user.id ? 'Logout' : 'Login'} style={link} /></a>
                    </div>
                </AppBar>
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <AppBar
                        title='Menu'
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                        onLeftIconButtonClick={() => this.setState({ open: !this.state.open })}
                        style={{ paddingRight: '25%' }}
                    />
                    <div className='menu_items'>
                        <br />
                        {this.props.user.id ?
                            <Link to='/home'>
                                <MenuItem style={menuItem} onClick={() => this.setState({ open: false })}>My Characters</MenuItem>
                            </Link>
                            : null}
                        {this.props.user.id ?
                            <Link to='/character/0'>
                                <MenuItem style={menuItem} onClick={() => {
                                    this.setState({ open: false });
                                    this.props.resetCharacter();
                                }}>New Character</MenuItem>
                            </Link>
                            : null}
                        <Link to='/races'>
                            <MenuItem style={menuItem}>Races</MenuItem>
                        </Link>
                        <Link to='/classes'>
                            <MenuItem style={menuItem}>Classes</MenuItem>
                        </Link>
                        <Link to='/weapons'>
                            <MenuItem style={menuItem}>Weapons</MenuItem>
                        </Link>
                        <Link to='/armor'>
                            <MenuItem style={menuItem}>Armor</MenuItem>
                        </Link>
                        <Link to='/equipment'>
                            <MenuItem style={menuItem}>Equipment</MenuItem>
                        </Link>
                        <Link to='/spells'>
                            <MenuItem style={menuItem}>Spells</MenuItem>
                        </Link>
                        <Link to='/monsters'>
                            <MenuItem style={menuItem}>Monsters</MenuItem>
                        </Link>
                    </div>
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

export default connect(mapStateToProps, { getUser, resetCharacter })(Header);
