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
import IconMenu from 'material-ui/IconMenu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        const menuItem = { paddingLeft: '20%', textAlign: 'left' };
        const link = { color: 'white' };
        return (
            <div className='Header'>
                <AppBar
                    title='DANDY'
                    titleStyle={{ marginLeft: '19%' }}
                    onLeftIconButtonClick={() => this.setState({ open: !this.state.open })}
                    style={{ position: 'fixed' }}
                >
                    <div className='links'>
                        <Link to='/about'><FlatButton label='About' style={link} /></Link>
                        <Link to='/donate'><FlatButton label='Donate' style={link} /></Link>
                        {this.props.user.id ? <Link to='/account'><FlatButton label='My Account' style={link} /></Link> : null}
                        <a href={this.props.user.id ? process.env.REACT_APP_LOGOUT : process.env.REACT_APP_LOGIN}><FlatButton label={this.props.user.id ? 'Logout' : 'Login'} style={link} /></a>
                    </div>
                    <div className='ham'>
                        <IconMenu
                            iconButtonElement={
                                <IconButton><MoreVertIcon /></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                            <MenuItem primaryText="Refresh" />
                            <MenuItem primaryText="Help" />
                            <MenuItem primaryText="Sign out" />
                        </IconMenu>
                    </div>
                </AppBar>
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open: !this.state.open })}
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
                            <MenuItem style={menuItem} onClick={() => this.setState({ open: false })}>Races</MenuItem>
                        </Link>
                        <Link to='/classes'>
                            <MenuItem style={menuItem} onClick={() => this.setState({ open: false })}>Classes</MenuItem>
                        </Link>
                        <Link to='/weapons'>
                            <MenuItem style={menuItem} onClick={() => this.setState({ open: false })}>Weapons</MenuItem>
                        </Link>
                        <Link to='/armor'>
                            <MenuItem style={menuItem} onClick={() => this.setState({ open: false })}>Armor</MenuItem>
                        </Link>
                        <Link to='/equipment'>
                            <MenuItem style={menuItem} onClick={() => this.setState({ open: false })}>Equipment</MenuItem>
                        </Link>
                        <Link to='/spells'>
                            <MenuItem style={menuItem} onClick={() => this.setState({ open: false })}>Spells</MenuItem>
                        </Link>
                        <Link to='/monsters'>
                            <MenuItem style={menuItem} onClick={() => this.setState({ open: false })}>Monsters</MenuItem>
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
