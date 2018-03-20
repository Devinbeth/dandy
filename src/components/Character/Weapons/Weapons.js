import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeapons, saveWeapon, removeWeapon, editWeapon } from '../../../ducks/reducer.js';
import './Weapons.css';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';
import Paper from 'material-ui/Paper';

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
            toggle: false
        }
        this.abilityModifiers = this.abilityModifiers.bind(this);
        this.addWeapon = this.addWeapon.bind(this);
        this.editWeapon = this.editWeapon.bind(this);
        this.removeWeapon = this.removeWeapon.bind(this);
        this.weaponDropDown = this.weaponDropDown.bind(this);
    }

    componentDidMount() {
        this.props.getWeapons(this.props.id);
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
        console.log(this.state.attack_bonus);
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
            toggle: false
        });
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
                return;
            case 2:
                return (
                    <SelectField
                        floatingLabelText='Weapon'
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
                        floatingLabelText='Weapon'
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
                        floatingLabelText='Weapon'
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
                        floatingLabelText='Weapon'
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
            <div>
                <Table fixedHeader={true} fixedFooter={true}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn tooltip='Name'>NAME</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Bonus'>ATK BONUS</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Damage'>DAMAGE</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Save/Delete'>SAVE/DELETE</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
                        {this.state.weapons.map((weapon, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={{ width: '30%', textAlign: 'left', margin: 0, padding: '2%' }}>
                                    <FlatButton>{weapon.name}</FlatButton>
                                </TableRowColumn>
                                <TableRowColumn style={{ width: '10%', alignContent: 'left', margin: 0, padding: '2%' }}>
                                    {weapon.attack_bonus}
                                </TableRowColumn>
                                <TableRowColumn style={{ width: '35%', textAlign: 'center', margin: 0, padding: '2%' }}>
                                    {`${weapon.damage} + ${weapon.strdex === 'Strength' ? this.abilityModifiers(this.props.character[0].strength) : this.abilityModifiers(this.props.character[0].dexterity)}`}
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

    render() {
        return (
            <div className='Attack' >
                {this.weaponsList()}
                <br/>
                <RaisedButton label='Add Weapon' primary={true} onClick={() => this.setState({ toggle: !this.state.toggle })} />
                <Paper
                    zDepth={5}
                    style={{
                        background: 'white',
                        textAlign: 'center',
                        position: 'fixed',
                        top: '15%',
                        bottom: '15%',
                        left: '35%',
                        right: '35%',
                        visibility: `${this.state.toggle ? 'visible' : 'hidden'}`,
                        zIndex: 5,
                        overflow: 'scroll',
                        padding: '2% 7%'
                    }}
                >
                    <IconButton
                        tooltip='Close'
                        style={{ position: 'fixed', top: '16%', right: '36%' }}
                        onClick={() => this.setState({
                            category: 1,
                            newWeapon: 0,
                            proficient: false,
                            strDex: '',
                            attack_bonus: 0,
                            toggle: false
                        })}
                    >
                        <Close />
                    </IconButton>
                    <h4>ADD A NEW WEAPON</h4>
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
                                    attack_bonus: this.state.attack_bonus + (value ? this.props.character[0].proficiency_bonus : 0)
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
                                    attack_bonus: this.state.attack_bonus + (value === 'Strength' ? this.abilityModifiers(this.props.character[0].strength) : this.abilityModifiers(this.props.character[0].dexterity))
                                })}
                                style={{ width: '230px', textAlign: 'left' }}
                            >
                                <MenuItem value='Strength' primaryText='Strength' />
                                <MenuItem value='Dexterity' primaryText='Dexterity' />
                            </SelectField>
                        </div>
                    ) : null}
                    {this.state.newWeapon ? <RaisedButton label='Add Weapon' primary={true} onClick={() => this.addWeapon()} /> : null}
                </Paper>
                <h5>WEAPONS</h5>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
        character_weapons: state.character_weapons
    };
}

export default connect(mapStateToProps, { getWeapons, saveWeapon, removeWeapon, editWeapon })(Weapons);
