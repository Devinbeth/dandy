import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCharacter } from '../../ducks/reducer.js';
import Box from '../Box/Box.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Race extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }

    render() {
        return (
            <div className='Race' >
                <SelectField
                    floatingLabelText='Race'
                    value={this.props.character.race}
                    onChange={(event, index, value) => this.props.updateCharacter({ race: value })}
                    style={{ width: '140px', textAlign: 'left' }}
                >
                    <MenuItem value={'Dwarf'} primaryText='Dwarf' />
                    <MenuItem value={'Elf'} primaryText='Elf' />
                    <MenuItem value={'Hafling'} primaryText='Hafling' />
                    <MenuItem value={'Human'} primaryText='Human' />
                    <MenuItem value={'Dragonborn'} primaryText='Dragonborn' />
                    <MenuItem value={'Gnome'} primaryText='Gnome' />
                    <MenuItem value={'Half-Elf'} primaryText='Half-Elf' />
                    <MenuItem value={'Half-Orc'} primaryText='Half-Orc' />
                    <MenuItem value={'Tiefling'} primaryText='Tiefling' />
                </SelectField>
                <IconButton
                    tooltip='Race Details'
                    onClick={() => this.setState({ toggle: !this.state.toggle })}
                    style={{ margin: '0' }}
                >
                    <ActionInfo />
                </IconButton>
                <Box
                    toggle={this.state.toggle}
                    switch={() => this.setState({ toggle: !this.state.toggle })}
                    top={'15%'}
                    bottom={'5%'}
                    right={'20%'}
                    left={'20%'}
                    title={'RACE'}
                >
                    <div>
                        Race Info
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

export default connect(mapStateToProps, { updateCharacter })(Race);
