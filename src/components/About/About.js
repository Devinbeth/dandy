import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer.js';
import Header from '../Header/Header.js';
import TextField from 'material-ui/TextField';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            firstName: '',
            lastName: '',
        };
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <div className='About'>
                <Header />
                <TextField 
                    className='basic_info_text'
                    id='text-field-controlled'
                    value={this.state.firstName}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    floatingLabelText='Name'
                />
                <TextField 
                    className='basic_info_text'
                    id='text-field-controlled'
                    value={this.state.lastName}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    floatingLabelText='Name'
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getUser })(About);
