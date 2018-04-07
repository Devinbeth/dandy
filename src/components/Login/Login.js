import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllWeapons, getAllArmor, getAllSpells, getAlignment } from '../../ducks/reducer.js';
import './Login.css';
import Header from '../Header/Header.js';

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
        this.props.getAlignment();
    }

    render() {
        return (
            <div className='Login'>
                <Header />
                <div className='image'>
                </div>
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, { getAllWeapons, getAllArmor, getAllSpells, getAlignment })(Login);
