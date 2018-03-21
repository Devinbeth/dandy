import React, { Component } from 'react';
import Box from '../Box/Box.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';

export default class Background extends Component {
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
                    value={this.state.value}
                    onChange={(event, index, value) => this.props.updateBackground(value)}
                    style={{ width: '220px', textAlign: 'left' }}
                >
                    <MenuItem value={'Acolyte'} primaryText='Acolyte' />
                    <MenuItem value={'Criminal'} primaryText='Criminal' />
                    <MenuItem value={'Spy'} primaryText='Spy' />
                    <MenuItem value={'Folk Hero'} primaryText='Folk Hero' />
                    <MenuItem value={'Haunted One'} primaryText='Haunted One' />
                    <MenuItem value={'Noble'} primaryText='Noble' />
                    <MenuItem value={'Sage'} primaryText='Sage' />
                    <MenuItem value={'Soldier'} primaryText='Soldier' />
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