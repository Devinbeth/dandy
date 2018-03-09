import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer.js';
import AppBar from 'material-ui/AppBar';

class Header extends Component {

    componentDidMount() {
        this.props.getUser();
    }

    render() {

        return (
            <div className='Home'>
                <AppBar title='DANDY'
                    iconElementRight={<a href={process.env.REACT_APP_LOGOUT}><div className='log'>Logout</div></a>}
                />
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
