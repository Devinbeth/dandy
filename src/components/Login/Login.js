import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllWeapons, getAllArmor, getAllSpells } from '../../ducks/reducer.js';
import './Login.css';

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

            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, { getAllWeapons, getAllArmor, getAllSpells })(Login);
