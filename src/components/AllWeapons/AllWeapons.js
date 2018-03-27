import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllWeapons, saveWeapon } from '../../ducks/reducer.js';
import './AllWeapons.css';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Save from 'material-ui/svg-icons/content/save';

class AllWeapons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weaponsList: this.props.allWeapons,
            category: '',
            class: '',
            selectedWeapon: []
        }
        this.saveWeapon = this.saveWeapon.bind(this);
        this.filteredWeapons = this.filteredWeapons.bind(this);
    }

    componentDidMount() {
        this.props.getAllWeapons();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ weaponsList: newProps.allWeapons });
    }

    saveWeapon() {
        if (!this.props.characterWeapons.find((e) => e.id === this.state.weaponsList[this.state.selectedWeapon[0]].id)) {
            this.props.saveWeapon({character_id: this.props.character.id, weapon_id: this.state.weaponsList[this.state.selectedWeapon[0]].id});
        }
        this.setState({ weaponsList: this.props.allWeapons, category: '', class: '', selectedWeapon: [] });
    }

    filteredWeapons(value) {
        let filteredList = this.props.allWeapons.filter((weapon, index) => {
            return weapon.category.includes(value) || weapon.classes.includes(value);
        });
        this.setState({ weaponsList: filteredList });
    }

    render() {
        return (
            <div className='AllWeapons'>
                <div className='weapon_filters'>
                    <h4>Filter Weapons: </h4>
                    <SelectField
                        floatingLabelText='Category'
                        value={this.state.category}
                        onChange={(event, index, value) => {
                            this.setState({ category: value });
                            this.filteredWeapons(value)
                        }}
                        style={{ width: '230px', textAlign: 'left' }}
                    >
                        <MenuItem value={'Simple Melee'} primaryText='Simple Melee Weapon' />
                        <MenuItem value={'Simple Ranged'} primaryText='Simple Ranged Weapon' />
                        <MenuItem value={'Martial Melee'} primaryText='Martial Melee Weapon' />
                        <MenuItem value={'Martial Ranged'} primaryText='Martial Ranged Weapon' />
                    </SelectField>
                    <SelectField
                        floatingLabelText='Class'
                        value={this.state.class}
                        onChange={(event, index, value) => {
                            this.setState({ class: value });
                            this.filteredWeapons(value);
                        }}
                        style={{ width: '140px', textAlign: 'left' }}
                    >
                        <MenuItem value={'Barbarian'} primaryText='Barbarian' />
                        <MenuItem value={'Bard'} primaryText='Bard' />
                        <MenuItem value={'Cleric'} primaryText='Cleric' />
                        <MenuItem value={'Druid'} primaryText='Druid' />
                        <MenuItem value={'Fighter'} primaryText='Fighter' />
                        <MenuItem value={'Monk'} primaryText='Monk' />
                        <MenuItem value={'Paladin'} primaryText='Paladin' />
                        <MenuItem value={'Ranger'} primaryText='Ranger' />
                        <MenuItem value={'Sorcerer'} primaryText='Sorcerer' />
                        <MenuItem value={'Warlock'} primaryText='Warlock' />
                        <MenuItem value={'Wizard'} primaryText='Wizard' />
                    </SelectField>
                    <RaisedButton
                        label='Reset Filter'
                        primary={true}
                        onClick={() => this.setState({ weaponsList: this.props.allWeapons, category: '', class: '' })}
                    />
                </div>
                <div className='weapons_table'>
                    <Table
                        style={{ tableLayout: 'auto', zIndex: 1 }}
                        onRowSelection={(selectedRows) => this.setState({ selectedWeapon: selectedRows })}
                    >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={true}
                        >
                            <TableRow>
                                <TableHeaderColumn>CATERGORY</TableHeaderColumn>
                                <TableHeaderColumn>NAME</TableHeaderColumn>
                                <TableHeaderColumn>COST</TableHeaderColumn>
                                <TableHeaderColumn>DAMAGE</TableHeaderColumn>
                                <TableHeaderColumn>WEIGHT</TableHeaderColumn>
                                <TableHeaderColumn>PROPERTIES</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={true}
                            showRowHover={true}
                            stripedRows={false}
                        >
                            {this.state.weaponsList.map((weapon, index) => (
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
                    {this.props.character.id ?
                        <FloatingActionButton
                            className='save'
                            label='Add Weapon'
                            children={<Save />}
                            onClick={() => {
                                this.saveWeapon();
                                this.props.switch();
                            }}
                        />
                        : null}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allWeapons: state.allWeapons,
        character: state.character,
        characterWeapons: state.characterWeapons
    };
}

export default connect(mapStateToProps, { getAllWeapons, saveWeapon })(AllWeapons);
