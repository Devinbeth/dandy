import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpells, saveSpell, removeSpell } from '../../ducks/reducer.js';
import './Spells.css';
import Box from '../Box/Box.js';
import AllSpells from '../AllSpells/AllSpells.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Info from 'material-ui/svg-icons/action/info';

class Spells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spells: [{}],
            category: 1,
            newSpell: 0,
            newToggle: false,
            infoToggle: false,
            spellToggle: false
        }
        this.abilityModifiers = this.abilityModifiers.bind(this);
        this.addSpell = this.addSpell.bind(this);
        this.removeSpell = this.removeSpell.bind(this);
        this.spellDropDown = this.spellDropDown.bind(this);
        this.spellList = this.spellList.bind(this);
    }

    componentDidMount() {
        this.props.getSpells(this.props.id);
    }

    componentWillReceiveProps(newProps) {
        this.setState({ spells: newProps.character_spells });
    }

    abilityModifiers(ability) {
        if (isNaN(ability)) {
            return 0;
        }
        return Math.floor((ability - 10) / 2);
    }

    addSpell() {
        this.props.saveSpell({
            character_id: this.props.id,
            spell_id: this.state.newSpell,
        });
        this.setState({
            category: 1,
            newSpell: 0,
            newToggle: false
        });
    }

    removeSpell(id) {
        this.props.removeSpell(id);
    }

    spellDropDown() {
        switch (this.state.category) {
            case 1:
                return;
            case 2:
                return (
                    <SelectField
                        floatingLabelText='Spell'
                        value={this.state.newSpell}
                        onChange={(event, index, value) => this.setState({ newSpell: value })}
                        style={{ width: '230px', textAlign: 'left' }}
                    >
                        <MenuItem value={1} primaryText='Club' />
                    </SelectField>
                );
            default:
                return;
        }
    }

    spellList() {
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
                    {this.state.spells.map((spell, index) => (
                        <TableRow key={index}>
                            <TableRowColumn style={{ width: '30%', textAlign: 'left', margin: 0, padding: '2%' }}>
                                <FlatButton
                                    label={spell.name ? spell.name : 'No Spells'}
                                    onClick={() => {
                                        this.setState({ infoToggle: true });
                                        this.weaponInfoBox(spell.spell_id);
                                    }}
                                />
                            </TableRowColumn>
                            <TableRowColumn style={{ width: '20%', alignItems: 'left', margin: 0, padding: '2%' }}>
                                <IconButton onClick={() => this.removeSpell(spell.id)} style={{ margin: 0, padding: 0 }}>
                                    <Close />
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    filteredSpells(value) {
        console.log(this.state.spellList);
        let filteredList = this.state.spellList.filter((spell, index) => {
            return spell.school.includes(value) || spell.classes.includes(value) || spell.level === value;
        });
        this.setState({ spellList: filteredList });
    }

    render() {
        return (
            <div className='Spells'>
                <div className='spell_table'>
                    {this.spellList()}
                </div>
                <div className='add_spell'>
                    <RaisedButton label='Add Spell' primary={true} onClick={() => this.setState({ newToggle: !this.state.newToggle })} />
                    <div className='all_spells'>
                        <h5>SPELLS</h5>
                        <IconButton
                            tooltip='All SPELLS'
                            onClick={() => this.setState({ infoToggle: !this.state.infoToggle })}
                            style={{ margin: '0' }}
                        >
                            <Info />
                        </IconButton>
                    </div>
                </div>
                <Box
                    toggle={this.state.newToggle}
                    switch={() => this.setState({ category: 1, newSpell: 0, newToggle: false })}
                    top={'15%'}
                    bottom={'15%'}
                    right={'34%'}
                    left={'34%'}
                    title={'ADD NEW SPELL'}
                >
                    <div className='new_spell'>
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
                        {this.spellDropDown()}
                        <br />
                        {this.state.newSpell ? <RaisedButton label='Add Spell' primary={true} onClick={() => this.addSpell()} style={{ marginTop: '10%' }} /> : null}
                    </div>
                </Box>
                <Box
                    toggle={this.state.infoToggle}
                    switch={() => this.setState({ infoToggle: false, spellList: this.props.allSpells, school: '', class: '', level: '' })}
                    top={'10%'}
                    bottom={'5%'}
                    right={'10%'}
                    left={'10%'}
                    title={'SPELLS'}
                >
                    <AllSpells />
                </Box>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
        character_spells: state.character_spells,
    };
}

export default connect(mapStateToProps, { getSpells, saveSpell, removeSpell })(Spells);
