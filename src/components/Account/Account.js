import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, saveUser } from '../../ducks/reducer.js';
import './Account.css';
import Header from '../Header/Header.js';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Save from 'material-ui/svg-icons/content/save';
import Undo from 'material-ui/svg-icons/content/undo';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            firstName: '',
            lastName: '',
            birthday: null
        };
        this.save = this.save.bind(this);
    }

    save() {
        this.props.saveUser({ first_name: this.state.firstName, last_name: this.state.lastName, birthday: this.state.birthday });
    }

    componentDidMount() {
        this.props.getUser();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ firstName: newProps.user.first_name, lastName: newProps.user.last_name, birthday: newProps.user.birthday });
    }

    render() {
        return (
            <div className='Account'>
                <Header />
                <div className='user'>
                    <TextField
                        className='basic_info_text'
                        id='text-field-controlled'
                        value={this.props.user.email}
                        disabled={true}
                        floatingLabelText='Email'
                    />
                    <TextField
                        className='basic_info_text'
                        id='text-field-controlled'
                        value={this.state.firstName}
                        onChange={(e) => this.setState({ firstName: e.target.value })}
                        floatingLabelText='First Name'
                    />
                    <TextField
                        className='basic_info_text'
                        id='text-field-controlled'
                        value={this.state.lastName}
                        onChange={(e) => this.setState({ lastName: e.target.value })}
                        floatingLabelText='Last Name'
                    />
                    <br />
                    <DatePicker
                        floatingLabelText='Birthday'
                        locale='en-US'
                        value={this.state.birthday}
                        onChange={(event, date) => this.setState({ birthday: date })}
                    />
                </div>
                <FloatingActionButton className='undo' children={<Undo />} onClick={() => this.componentDidMount()} secondary={true} />
                <FloatingActionButton className='save' children={<Save />} onClick={() => this.save()} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getUser, saveUser })(Account);
