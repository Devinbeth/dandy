import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeapons, removeWeapon } from '../../ducks/reducer.js';
import './Weapons.css';
import Box from '../Box/Box.js';
import AllWeapons from '../AllWeapons/AllWeapons.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Info from 'material-ui/svg-icons/action/info';
import TextField from 'material-ui/TextField';

class Weapons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoToggle: false,
            weaponNotes: ''
        }
        this.attackBonus = this.attackBonus.bind(this);
        this.proficiency = this.proficiency.bind(this);
        this.abilityModifier = this.abilityModifier.bind(this);
        this.removeWeapon = this.removeWeapon.bind(this);
    }

    componentDidMount() {
        this.props.getWeapons(this.props.character.id);
    }

    attackBonus(weapon) {
        let dex = this.abilityModifier(this.props.character.dexterity);
        let str = this.abilityModifier(this.props.character.strength);
        if (weapon.properties.includes('Finesse')) {
            return dex > str ? dex : str;
        }
        else if (weapon.category.includes('Ranged')) {
            return dex;
        }
        else {
            return str;
        }
    }

    proficiency(weapon) {
        let prof = 0;
        if (weapon.classes.includes(this.props.character.class)) {
            prof = this.props.character.proficiency_bonus;
        }
        return prof;
    }

    abilityModifier(ability) {
        if (isNaN(ability)) {
            return 0;
        }
        return Math.floor((ability - 10) / 2);
    }

    removeWeapon(id) {
        this.props.removeWeapon(id);
    }

    render() {
        return (
            <div className='Weapons'>
                <div className='weapon_table'>
                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>NAME</TableHeaderColumn>
                                <TableHeaderColumn>ATK BONUS</TableHeaderColumn>
                                <TableHeaderColumn>DAMAGE</TableHeaderColumn>
                                <TableHeaderColumn>DELETE</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover={true}
                            stripedRows={false}
                        >
                            {this.props.characterWeapons.map((weapon, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>
                                        {weapon.name ? weapon.name : 'No Weapons'}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {weapon.name ? `+${this.attackBonus(weapon) + this.proficiency(weapon)}` : null}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {weapon.name ? `${weapon.damage.slice(0, 3)}+${this.attackBonus(weapon)}` : null}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton onClick={() => this.removeWeapon(weapon.id)}>
                                            <Close />
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className='weapon_notes'>
                    <TextField
                        id='text-field-controlled'
                        value={this.state.weaponNotes}
                        onChange={(e) => this.setState({ weaponNotes: e.target.value })}
                        floatingLabelText='Weapon Notes'
                    />
                </div>
                <div className='all_weapons'>
                    <h5>WEAPONS</h5>
                    <IconButton
                        tooltip='All Weapons'
                        onClick={() => this.setState({ infoToggle: !this.state.infoToggle })}
                        style={{ margin: '0' }}
                    >
                        <Info />
                    </IconButton>
                </div>
                <Box
                    toggle={this.state.infoToggle}
                    switch={() => this.setState({ infoToggle: false })}
                    top={'10%'}
                    bottom={'5%'}
                    right={'10%'}
                    left={'10%'}
                    title={'WEAPONS'}
                >
                    <AllWeapons switch={() => this.setState({ infoToggle: false })}/>
                </Box>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
        characterWeapons: state.characterWeapons,
    };
}

export default connect(mapStateToProps, { getWeapons, removeWeapon })(Weapons);
