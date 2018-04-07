import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCharacter } from '../../ducks/reducer.js';
import Box from '../Box/Box.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.class,
            toggle: false
        }
    }

    render() {
        return (
            <div className='Class' >
                <SelectField
                    floatingLabelText='Class'
                    value={this.props.character.class}
                    onChange={(event, index, value) => this.props.updateCharacter({ class: value })}
                    style={{ width: '140px', textAlign: 'left' }}
                >
                    <MenuItem value={'Barbarian'} primaryText='Barbarian' />
                    <MenuItem value={'Bard'} primaryText='Bard' />
                    <MenuItem value={'Cleric'} primaryText='Cleric' />
                    <MenuItem value={'Druid'} primaryText='Druid' />
                    <MenuItem value={'Fighter'} primaryText='Fighter' />
                    <MenuItem value={'Monk'} primaryText='Monk' />
                    <MenuItem value={'Paladin'} primaryText='Paladin' />
                    <MenuItem value={'Ranger'} primaryText='Ranger' />
                    <MenuItem value={'Sorcerer'} primaryText='Sorcerer' />
                    <MenuItem value={'Warlock'} primaryText='Warlock' />
                    <MenuItem value={'Wizard'} primaryText='Wizard' />
                </SelectField>
                <IconButton tooltip='Class Details' onClick={() => this.setState({ toggle: !this.state.toggle })}>
                    <ActionInfo />
                </IconButton>
                <Box
                    toggle={this.state.toggle}
                    switch={() => this.setState({ toggle: !this.state.toggle })}
                    top={'15%'}
                    bottom={'5%'}
                    right={'20%'}
                    left={'20%'}
                    title={'CLASS'}
                >
                    <div>
                        Class Info
                    </div>
                </Box>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
    };
}

export default connect(mapStateToProps, { updateCharacter })(Class);
