import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeapons, saveWeapon, removeWeapon, getAllWeapons } from '../../ducks/reducer.js';
import './Weapons.css';
import Box from '../Box/Box.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Info from 'material-ui/svg-icons/action/info';

class Weapons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weapons: [{}],
            category: 1,
            newWeapon: 0,
            proficient: false,
            strDex: '',
            attack_bonus: 0,
            newToggle: false,
            infoToggle: false,
            weaponToggle: false
        }
        this.abilityModifiers = this.abilityModifiers.bind(this);
        this.addWeapon = this.addWeapon.bind(this);
        this.removeWeapon = this.removeWeapon.bind(this);
        this.weaponDropDown = this.weaponDropDown.bind(this);
        this.weaponsList = this.weaponsList.bind(this);
    }

    componentDidMount() {
        this.props.getWeapons(this.props.id);
        this.props.getAllWeapons();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ weapons: newProps.character_weapons });
    }

    abilityModifiers(ability) {
        if (isNaN(ability)) {
            return 0;
        }
        return Math.floor((ability - 10) / 2);
    }

    addWeapon() {
        this.props.saveWeapon({
            character_id: this.props.id,
            weapon_id: this.state.newWeapon,
            attack_bonus: this.state.attack_bonus,
            proficient: this.state.proficient,
            strdex: this.state.strDex
        });
        this.setState({
            category: 1,
            newWeapon: 0,
            proficient: false,
            strDex: '',
            attack_bonus: 0,
            newToggle: false
        });
    }

    removeWeapon(id) {
        this.props.removeWeapon(id);
    }

    weaponDropDown() {
        switch (this.state.category) {
            case 1:
                return;
            case 2:
                return (
                    <SelectField
                        floatingLabelText='Simple Melee Weapons'
                        value={this.state.newWeapon}
                        onChange={(event, index, value) => this.setState({ newWeapon: value })}
                        style={{ width: '230px', textAlign: 'left' }}
                    >
                        <MenuItem value={1} primaryText='Club' />
                        <MenuItem value={2} primaryText='Dagger' />
                        <MenuItem value={3} primaryText='Greatclub' />
                        <MenuItem value={4} primaryText='Handaxe' />
                        <MenuItem value={5} primaryText='Javelin' />
                        <MenuItem value={6} primaryText='Light Hammer' />
                        <MenuItem value={7} primaryText='Mace' />
                        <MenuItem value={8} primaryText='Quaterstaff' />
                        <MenuItem value={9} primaryText='Sickle' />
                        <MenuItem value={10} primaryText='Spear' />
                        <MenuItem value={11} primaryText='Unarmed Strike' />
                    </SelectField>
                );
            case 3:
                return (
                    <SelectField
                        floatingLabelText='Simple Ranged Weapons'
                        value={this.state.newWeapon}
                        onChange={(event, index, value) => this.setState({ newWeapon: value })}
                        style={{ width: '230px', textAlign: 'left' }}
                    >
                        <MenuItem value={12} primaryText='Crossbow, light' />
                        <MenuItem value={13} primaryText='Dart' />
                        <MenuItem value={14} primaryText='Shortbow' />
                        <MenuItem value={15} primaryText='Sling' />
                    </SelectField>
                );
            case 4:
                return (
                    <SelectField
                        floatingLabelText='Martial Melee Weapons'
                        value={this.state.newWeapon}
                        onChange={(event, index, value) => this.setState({ newWeapon: value })}
                        style={{ width: '230px', textAlign: 'left' }}
                    >
                        <MenuItem value={16} primaryText='Battleaxe' />
                        <MenuItem value={17} primaryText='Flail' />
                        <MenuItem value={18} primaryText='Glaive' />
                        <MenuItem value={19} primaryText='Greataxe' />
                        <MenuItem value={20} primaryText='Greatsword' />
                        <MenuItem value={21} primaryText='Halberd' />
                        <MenuItem value={22} primaryText='Lance' />
                        <MenuItem value={23} primaryText='Longsword' />
                        <MenuItem value={24} primaryText='Maul' />
                        <MenuItem value={25} primaryText='Morningstar' />
                        <MenuItem value={26} primaryText='Pike' />
                        <MenuItem value={27} primaryText='Rapier' />
                        <MenuItem value={28} primaryText='Schimitar' />
                        <MenuItem value={29} primaryText='Shortsword' />
                        <MenuItem value={30} primaryText='Trident' />
                        <MenuItem value={31} primaryText='War Pick' />
                        <MenuItem value={32} primaryText='Warhammer' />
                        <MenuItem value={33} primaryText='Whip' />
                    </SelectField>
                );
            case 5:
                return (
                    <SelectField
                        floatingLabelText='Martial Ranged Weapons'
                        value={this.state.newWeapon}
                        onChange={(event, index, value) => this.setState({ newWeapon: value })}
                        style={{ width: '230px', textAlign: 'left' }}
                    >
                        <MenuItem value={34} primaryText='Blowgun' />
                        <MenuItem value={35} primaryText='Crossbow, hand' />
                        <MenuItem value={36} primaryText='Crossbow, heavy' />
                        <MenuItem value={37} primaryText='Longbow' />
                        <MenuItem value={38} primaryText='Net' />
                    </SelectField>
                );
            default:
                return;
        }
    }

    weaponsList() {
        return (
            <Table fixedHeader={true} fixedFooter={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn tooltip='Name'>NAME</TableHeaderColumn>
                        <TableHeaderColumn tooltip='Bonus'>ATK BONUS</TableHeaderColumn>
                        <TableHeaderColumn tooltip='Damage'>DAMAGE</TableHeaderColumn>
                        <TableHeaderColumn tooltip='Save/Delete'>DELETE</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
                    {this.state.weapons.map((weapon, index) => (
                        <TableRow key={index}>
                            <TableRowColumn style={{ width: '30%', textAlign: 'left', margin: 0, padding: '2%' }}>
                                <FlatButton
                                    label={weapon.name ? weapon.name : 'No Weapons'}
                                    onClick={() => {
                                        this.setState({ infoToggle: true });
                                        this.weaponInfoBox(weapon.weapon_id);
                                    }}
                                />
                            </TableRowColumn>
                            <TableRowColumn style={{ width: '10%', alignContent: 'left', margin: 0, padding: '2%' }}>
                                {weapon.attack_bonus}
                            </TableRowColumn>
                            <TableRowColumn style={{ width: '35%', textAlign: 'center', margin: 0, padding: '2%' }}>
                                {`${weapon.damage} + ${weapon.strdex === 'Strength' ? this.abilityModifiers(this.props.character.strength) : this.abilityModifiers(this.props.character.dexterity)}`}
                            </TableRowColumn>
                            <TableRowColumn style={{ width: '20%', alignItems: 'left', margin: 0, padding: '2%' }}>
                                <IconButton onClick={() => this.removeWeapon(weapon.id)} style={{ margin: 0, padding: 0 }}>
                                    <Close />
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    render() {
        return (
            <div className='Weapons'>
                <div className='weapon_table'>
                    {this.weaponsList()}
                </div>
                <div className='add_weapon'>
                    <RaisedButton label='Add Weapon' primary={true} onClick={() => this.setState({ newToggle: !this.state.newToggle })} />
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
                </div>
                <Box
                    toggle={this.state.newToggle}
                    switch={() => this.setState({ category: 1, newWeapon: 0, proficient: false, strDex: '', attack_bonus: 0, newToggle: false })}
                    top={'15%'}
                    bottom={'15%'}
                    right={'34%'}
                    left={'34%'}
                    title={'ADD NEW WEAPON'}
                >
                    <div className='new_weapon'>
                        <SelectField
                            floatingLabelText='Category'
                            value={this.state.category}
                            onChange={(event, index, value) => this.setState({ category: value })}
                            style={{ width: '230px', textAlign: 'left' }}
                        >
                            <MenuItem value={1} primaryText='Select' />
                            <MenuItem value={2} primaryText='Simple Melee Weapon' />
                            <MenuItem value={3} primaryText='Simple Ranged Weapon' />
                            <MenuItem value={4} primaryText='Martial Melee Weapon' />
                            <MenuItem value={5} primaryText='Martial Ranged Weapon' />
                        </SelectField>
                        {this.weaponDropDown()}
                        {this.state.newWeapon ? (
                            <div>
                                <SelectField
                                    floatingLabelText='Proficient?'
                                    value={this.state.proficient}
                                    onChange={(event, index, value) => this.setState({
                                        proficient: value,
                                        attack_bonus: this.state.attack_bonus + (value ? this.props.character.proficiency_bonus : 0)
                                    })}
                                    style={{ width: '230px', textAlign: 'left' }}
                                >
                                    <MenuItem value={false} primaryText='No' />
                                    <MenuItem value={true} primaryText='Yes' />
                                </SelectField>
                                <SelectField
                                    floatingLabelText='Use Strength or Dexterity?'
                                    value={this.state.strDex}
                                    onChange={(event, index, value) => this.setState({
                                        strDex: value,
                                        attack_bonus: this.state.attack_bonus + (value === 'Strength' ? this.abilityModifiers(this.props.character.strength) : this.abilityModifiers(this.props.character.dexterity))
                                    })}
                                    style={{ width: '230px', textAlign: 'left' }}
                                >
                                    <MenuItem value='Strength' primaryText='Strength' />
                                    <MenuItem value='Dexterity' primaryText='Dexterity' />
                                </SelectField>
                            </div>
                        ) : null}
                        <br />
                        {this.state.newWeapon ? <RaisedButton label='Add Weapon' primary={true} onClick={() => this.addWeapon()} style={{ marginTop: '10%'}}/> : null}
                    </div>
                </Box>
                <Box
                    toggle={this.state.infoToggle}
                    switch={() => this.setState({ infoToggle: false })}
                    top={'10%'}
                    bottom={'5%'}
                    right={'10%'}
                    left={'10%'}
                    title={'ALL WEAPONS'}
                >
                    <Table fixedHeader={true} fixedFooter={true} style={{ tableLayout: 'auto'}}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ tableLayout: 'auto'}}>
                            <TableRow>
                                <TableHeaderColumn tooltip='Category'>CATERGORY</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Name'>NAME</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Cost'>COST</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Damage'>DAMAGE</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Weight'>WEIGHT</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Properties'>PROPERTIES</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
                            {this.props.allWeapons.map((weapon, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>{weapon.category}</TableRowColumn>
                                    <TableRowColumn>{weapon.name}</TableRowColumn>
                                    <TableRowColumn>{weapon.cost}</TableRowColumn>
                                    <TableRowColumn>{weapon.damage}</TableRowColumn>
                                    <TableRowColumn>{weapon.weight}</TableRowColumn>
                                    <TableRowColumn>{weapon.properties}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
        character_weapons: state.character_weapons,
        allWeapons: state.allWeapons
    };
}

export default connect(mapStateToProps, { getWeapons, saveWeapon, removeWeapon, getAllWeapons })(Weapons);
