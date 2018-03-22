import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, resetCharacter } from '../../ducks/reducer.js';
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
            <div className='Header'>
                <AppBar
                    title='DANDY'
                    onLeftIconButtonClick={() => this.setState({ open: !this.state.open })}
                    iconElementRight={<a href={process.env.REACT_APP_LOGOUT}><div className='log'>LOGOUT</div></a>}
                    style={{ position: 'fixed' }}
                />
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
                    <br />
                    <br />
                    <Link to='/home'><MenuItem  style={{ padding: '2% 0' }} onClick={() => this.setState({ open: false })}>My Characters</MenuItem></Link>
                    <Link to='/character/0'><MenuItem style={{ padding: '2% 0' }} onClick={() => {
                        this.setState({ open: false });
                        this.props.resetCharacter();
                    }}>New Character</MenuItem></Link>
                    <MenuItem style={{ padding: '2% 0' }}>Races</MenuItem>
                    <MenuItem style={{ padding: '2% 0' }}>Classes</MenuItem>
                    <MenuItem style={{ padding: '2% 0' }}>Weapons</MenuItem>
                    <MenuItem style={{ padding: '2% 0' }}>Armor</MenuItem>
                    <MenuItem style={{ padding: '2% 0' }}>Equipment</MenuItem>
                    <MenuItem style={{ padding: '2% 0' }}>Spells</MenuItem>
                    <MenuItem style={{ padding: '2% 0' }}>Monsters</MenuItem>
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
