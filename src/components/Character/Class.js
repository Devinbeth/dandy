import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export default class Class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.class,
            toggle: false
        }
    }
    componentDidMount() {
        this.setState({ value: this.props.class });
    }
    componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.class });
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
        };
        return (
            <div className='Class' >
                <div className='class_menu'>
                    <SelectField
                        floatingLabelText='Class'
                        value={this.state.value}
                        onChange={(event, index, value) => this.props.updateClass(value)}
                        style={{ width: '160px', textAlign: 'left' }}
                    >
                        <MenuItem value={1} primaryText="Barbarian" />
                        <MenuItem value={2} primaryText="Bard" />
                        <MenuItem value={3} primaryText="Cleric" />
                        <MenuItem value={4} primaryText="Druid" />
                        <MenuItem value={5} primaryText="Fighter" />
                        <MenuItem value={6} primaryText="Monk" />
                        <MenuItem value={7} primaryText="Paladin" />
                        <MenuItem value={8} primaryText="Ranger" />
                        <MenuItem value={9} primaryText="Sorcerer" />
                        <MenuItem value={10} primaryText="Warlock" />
                        <MenuItem value={11} primaryText="Wizard" />
                    </SelectField>
                    <IconButton tooltip="Class Details" onClick={() => this.setState({ toggle: !this.state.toggle })}>
                        <ActionInfo />
                    </IconButton>
                </div>
                <Paper style={style} zDepth={4} >
                    Hello!
                    <RaisedButton label="Close" primary={true} onClick={() => this.setState({ toggle: !this.state.toggle })} />
                </Paper>
            </div>
        );
    }
}