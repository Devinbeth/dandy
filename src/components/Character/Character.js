import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getCharacter } from '../../ducks/reducer.js';
import Header from '../Header/Header.js';
import TextField from 'material-ui/TextField';

class Character extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputName: null
        }
    }

    componentDidMount() {
        this.props.getCharacter(this.props.match.params.id);
    }

    componentWillReceiveProps(newProps) {
        this.setState({inputName: newProps.character[0].name});
    }

    render() {
        console.log(this.props.character);
        return (
            <div className='Home'>
                <Header />
                <TextField
                    value={this.state.inputName}
                    onChange={e => this.setState({inputName: e.target.value})}
                    floatingLabelText="Character Name"
                /><br />
                {JSON.stringify(this.props.character)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        character: state.character
    };
}

export default connect(mapStateToProps, { getUser, getCharacter })(Character);
