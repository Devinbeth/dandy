import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCharacter } from '../../ducks/reducer.js';
import Box from '../Box/Box.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.background,
            toggle: false
        }
    }
    componentDidMount() {
        this.setState({ value: this.props.background });
    }
    componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.background });
    }
    render() {
        return (
            <div className='Background' >
                <SelectField
                    floatingLabelText='Background'
                    value={this.props.character.background}
                    onChange={(event, index, value) => this.props.updateBackground(value)}
                    style={{ width: '60%', textAlign: 'left' }}
                >
                    <MenuItem value={'Acolyte'} primaryText='Acolyte' />
                    <MenuItem value={'Charlatan'} primaryText='Charlatan' />
                    <MenuItem value={'Criminal'} primaryText='Criminal' />
                    <MenuItem value={'Entertainer'} primaryText='Entertainer' />
                    <MenuItem value={'Folk Hero'} primaryText='Folk Hero' />
                    <MenuItem value={'Guild Artisan'} primaryText='Guild Artisan' />
                    <MenuItem value={'Hermit'} primaryText='Hermit' />
                    <MenuItem value={'Noble'} primaryText='Noble' />
                    <MenuItem value={'Outlander'} primaryText='Outlander' />
                    <MenuItem value={'Sage'} primaryText='Sage' />
                    <MenuItem value={'Sailor'} primaryText='Sailor' />
                    <MenuItem value={'Soldier'} primaryText='Soldier' />
                    <MenuItem value={'Urchin'} primaryText='Urchin' />
                </SelectField>
                <IconButton tooltip='Background Details' onClick={() => this.setState({ toggle: !this.state.toggle })}>
                    <ActionInfo />
                </IconButton>
                <Box 
                    toggle={this.state.toggle}
                    switch={() => this.setState({ toggle: !this.state.toggle })}
                    top={'15%'}
                    bottom={'5%'}
                    right={'20%'}
                    left={'20%'}
                    title={'BACKGROUND'}
                >
                    <div>
                        Background Info
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

export default connect(mapStateToProps, { updateCharacter })(Background);
