import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default function Race(props) {
    return (
        <div className='Race' >
            <FlatButton>
            <DropDownMenu value={props.race} onChange={(event, index, value) => this.set} >
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
            </FlatButton>
        </div>
    );
}