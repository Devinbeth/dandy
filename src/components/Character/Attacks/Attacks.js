import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeapons, saveWeapon, removeWeapon, editWeapon } from '../../../ducks/reducer.js';
import './Attack.css';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';

class Attacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weapons: [{}],
            category: 1,
            newWeapon: 1,
            attack_bonus: 0
        }
        this.addWeapon = this.addWeapon.bind(this);
        this.editWeapon = this.editWeapon.bind(this);
        this.removeWeapon = this.removeWeapon.bind(this);
        this.weaponDropDown = this.weaponDropDown.bind(this);
    }

    addWeapon() {
        this.props.saveWeapon({ character_id: this.props.id, weapon_id: this.state.newWeapon });
    }

    editWeapon(id, attack_bonus) {
        this.props.editWeapon(id, { character_id: this.props.id, attack_bonus: attack_bonus })
    }

    removeWeapon(id) {
        this.props.removeWeapon(id);
    }

    weaponDropDown() {
        switch (this.state.category) {
            case 1:
                return (
                    <DropDownMenu value={1}>
                        <MenuItem value={1} primaryText='Select' />
                    </DropDownMenu>
                );
            case 2:
                return (
                    <DropDownMenu value={this.state.newWeapon} onChange={(event, index, value) => this.setState({ newWeapon: value })}>
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
                    </DropDownMenu>
                );
            case 3:
                return (
                    <DropDownMenu value={this.state.newWeapon} onChange={(event, index, value) => this.setState({ newWeapon: value })}>
                        <MenuItem value={12} primaryText='Crossbow, light' />
                        <MenuItem value={13} primaryText='Dart' />
                        <MenuItem value={14} primaryText='Shortbow' />
                        <MenuItem value={15} primaryText='Sling' />
                    </DropDownMenu>
                );
            case 4:
                return (
                    <DropDownMenu value={this.state.newWeapon} onChange={(event, index, value) => this.setState({ newWeapon: value })}>
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
                    </DropDownMenu>
                );
            case 5:
                return (
                    <DropDownMenu value={this.state.newWeapon} onChange={(event, index, value) => this.setState({ newWeapon: value })}>
                        <MenuItem value={34} primaryText='Blowgun' />
                        <MenuItem value={35} primaryText='Crossbow, hand' />
                        <MenuItem value={36} primaryText='Crossbow, heavy' />
                        <MenuItem value={37} primaryText='Longbow' />
                        <MenuItem value={38} primaryText='Net' />
                    </DropDownMenu>
                );
            default:
                return;
        }
    }

    weaponsList() {
        return (
            <div>
                <Table fixedHeader={true} fixedFooter={true}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn tooltip='Name'>NAME</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Bonus'>ATK BONUS</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Damage'>DAMAGE</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Damage'>SAVE/DELETE</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
                        {this.state.weapons.map((weapon, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{ width: '30%', textAlign: 'center', margin: 0, padding: '2%' }}>
                                    <FlatButton>{weapon.name}</FlatButton>
                                </TableRowColumn>
                                <TableRowColumn style={{ width: '10%', textAlign: 'center', margin: 0, padding: '2%' }}>
                                    <TextField
                                        id='text-field-controlled'
                                        value={weapon.attack_bonus ? weapon.attack_bonus : undefined}
                                        onChange={(e) => {
                                            let updatedWeapons = Object.assign([], this.state.weapons);
                                            console.log(this.state.weapons.indexOf(weapon))
                                            updatedWeapons[this.state.weapons.indexOf(weapon)].attack_bonus = Number(e.target.value);
                                            console.log(updatedWeapons);
                                            this.setState({ weapons: updatedWeapons })
                                        }}
                                        inputStyle={{ textAlign: 'center' }}
                                    />
                                </TableRowColumn>
                                <TableRowColumn style={{ width: '35%', textAlign: 'center', margin: 0, padding: '2%' }}>
                                    {weapon.damage}
                                </TableRowColumn>
                                <TableRowColumn style={{ width: '20%', alignItems: 'left', margin: 0, padding: '2%' }}>
                                    <IconButton onClick={() => this.editWeapon(weapon.id, weapon.attack_bonus)} style={{ margin: 0, padding: 0 }}>
                                        <Check />
                                    </IconButton>
                                    <IconButton onClick={() => this.removeWeapon(weapon.id)} style={{ margin: 0, padding: 0 }}>
                                        <Close />
                                    </IconButton>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    componentDidMount() {
        this.props.getWeapons(this.props.id);
    }

    componentDidUpdate(newProps) {
        this.setState({ weapons: newProps.character_weapons });
    }
    render() {
        return (
            <div className='Attack' >
                {this.weaponsList()}
                <h5>New Weapon</h5>
                <div className='newWeapon'>
                    <DropDownMenu
                        style={{ margin: 0 }}
                        value={this.state.category}
                        onChange={(event, index, value) => this.setState({ category: value })}
                    >
                        <MenuItem value={1} primaryText='Select' />
                        <MenuItem value={2} primaryText='Simple Melee' />
                        <MenuItem value={3} primaryText='Simple Ranged' />
                        <MenuItem value={4} primaryText='Martial Melee' />
                        <MenuItem value={5} primaryText='Martial Melee' />
                    </DropDownMenu>
                    {this.weaponDropDown()}
                </div>
                <br />
                <RaisedButton label='Add Weapon' primary={true} onClick={() => this.addWeapon()} />
                <h5>ATTACKS & SPELLCASTING</h5>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character_weapons: state.character_weapons
    };
}

export default connect(mapStateToProps, { getWeapons, saveWeapon, removeWeapon, editWeapon })(Attacks);
