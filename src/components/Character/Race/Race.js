import React, { Component } from 'react';
import './Race.css';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export default class Race extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.race,
            toggle: false
        }
    }
    componentDidMount() {
        this.setState({ value: this.props.race });
    }
    componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.race });
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
            <div className='Race' >
                <div className='race_menu'>
                    <DropDownMenu value={this.state.value} onChange={(event, index, value) => this.props.updateRace(value)} style={{ width: '25%' }} >
                        <MenuItem value={1} primaryText="Dwarf" />
                        <MenuItem value={2} primaryText="Elf" />
                        <MenuItem value={3} primaryText="Hafling" />
                        <MenuItem value={4} primaryText="Human" />
                        <MenuItem value={5} primaryText="Dragonborn" />
                        <MenuItem value={6} primaryText="Gnome" />
                        <MenuItem value={7} primaryText="Half-Elf" />
                        <MenuItem value={8} primaryText="Half-Orc" />
                        <MenuItem value={9} primaryText="Tiefling" />
                    </DropDownMenu>
                    <IconButton tooltip="Race Details" onClick={() => this.setState({ toggle: !this.state.toggle })}>
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