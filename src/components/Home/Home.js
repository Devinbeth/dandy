import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getCharacters } from '../../ducks/reducer.js';
import './Home.css';
import AppBar from 'material-ui/AppBar';

class Home extends Component {
    
    componentDidMount() {
        this.props.getUser();
        this.props.getCharacters();
    }

    render() {
        return (
            <div className='Home'>  
                <AppBar title='Dandy' 
                        iconElementRight={<a href={ process.env.REACT_APP_LOGOUT }><div className='log'>Logout</div></a>}
                />
                {this.props.user.email}
                {JSON.stringify(this.props.characters)}
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        characters: state.characters
    };
}

export default connect(mapStateToProps, { getUser, getCharacters })(Home);
