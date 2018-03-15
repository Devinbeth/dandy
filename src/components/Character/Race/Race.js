import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default function Race(props) {
    return (
        <div className='Race' >
            {console.log(props.race)}
            <DropDownMenu value={props.race} onChange={(event, index, value) => props.updateRace(value)} style={{ width: '25%' }}>
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
            <FloatingActionButton mini={true} />
        </div>
    );
}