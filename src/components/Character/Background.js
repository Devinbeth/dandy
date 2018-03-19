import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Close from 'material-ui/svg-icons/navigation/close';
import Paper from 'material-ui/Paper';

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
        const style = {
            background: 'white',
            textAlign: 'center',
            position: 'fixed',
            top: '10%',
            bottom: '10%',
            left: '10%',
            right: '10%',
            visibility: `${this.state.toggle ? 'visible' : 'hidden'}`,
            zIndex: 5,
            overflow: 'scroll',
            padding: '2% 7%'
        };
        return (
            <div className='Alignment' >
                <div className='class_menu'>
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
                </div>
                <Paper style={style} zDepth={4} >
                    Hello!
                    <IconButton tooltip='Close' onClick={() => this.setState({ toggle: !this.state.toggle })} style={{ position: 'fixed', top: '10%', right: '10%' }}>
                        <Close />
                    </IconButton>
                </Paper>
            </div>
        );
    }
}