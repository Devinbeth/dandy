import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpells, saveSpell, removeSpell, getAllSpells } from '../../ducks/reducer.js';
import './Spells.css';
import Box from '../Box/Box.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Info from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';

class Spells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spells: [{}],
            filteredSpells:[{}],
            category: 1,
            newSpell: 0,
            school: '',
            class: '',
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
        this.props.getAllSpells();
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
                    switch={() => this.setState({ infoToggle: false })}
                    top={'10%'}
                    bottom={'5%'}
                    right={'10%'}
                    left={'10%'}
                    title={'ALL SPELLS'}
                >
                    <div>
                        <SelectField
                            floatingLabelText='School'
                            value={this.state.school}
                            onChange={(event, index, value) => this.setState({ school: value })}
                            style={{ width: '230px', textAlign: 'left' }}
                        >
                            <MenuItem value={1} primaryText='Select' />
                            <MenuItem value={'Abjuration'} primaryText='Abjuration' />
                            <MenuItem value={'Conjuration'} primaryText='Conjuration' />
                            <MenuItem value={'Divination'} primaryText='Divination' />
                            <MenuItem value={'Enchantment'} primaryText='Enchantment' />
                            <MenuItem value={'Illusion'} primaryText='Illusion' />
                            <MenuItem value={'Necromancy'} primaryText='Necromancy' />
                            <MenuItem value={'Transmutation'} primaryText='Transmutation' />
                        </SelectField>
                        <SelectField
                            floatingLabelText='Class'
                            value={this.state.class}
                            onChange={(event, index, value) => this.setState({ class: value })}
                            style={{ width: '230px', textAlign: 'left' }}
                        >
                            <MenuItem value={1} primaryText='Select' />
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
                        {console.log(this.props.allSpells)}
                        {this.state.filteredSpells.map((spell, index) => (
                            <div key={index + spell.id + spell.name}>
                                <h3>{spell.name}</h3>
                                <Table>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn tooltip='Cost'>LEVEL</TableHeaderColumn>
                                            <TableHeaderColumn tooltip='Damage'>COMPONENTS</TableHeaderColumn>
                                            <TableHeaderColumn tooltip='Properties'>CASTING TIME</TableHeaderColumn>
                                            <TableHeaderColumn tooltip='Weight'>DURATION</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false} style={{ tableLayout: 'auto' }}>
                                        <TableRow key={index}>
                                            <TableRowColumn>{spell.level}</TableRowColumn>
                                            <TableRowColumn>{spell.components}</TableRowColumn>
                                            <TableRowColumn>{spell.casting_time}</TableRowColumn>
                                            <TableRowColumn>{spell.duration}</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn tooltip='Weight'>RANGE</TableHeaderColumn>
                                            <TableHeaderColumn tooltip='Weight'>SAVE</TableHeaderColumn>
                                            <TableHeaderColumn tooltip='Weight'>SCHOOL</TableHeaderColumn>
                                            <TableHeaderColumn tooltip='Weight'>CLASSES</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false} style={{ tableLayout: 'auto' }}>
                                        <TableRow key={index}>
                                            <TableRowColumn>{spell.range}</TableRowColumn>
                                            <TableRowColumn>{spell.save}</TableRowColumn>
                                            <TableRowColumn>{spell.school}</TableRowColumn>
                                            <TableRowColumn>{spell.classes}</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className='spell_descriptions'>
                                    <p>{spell.description}</p>
                                    <h4>At Higher Levels: </h4>
                                    <p>{spell.higher_levels}</p>
                                    <h4>Material: </h4>
                                    <p>{spell.material}</p>
                                </div>
                                <Divider />
                                <br />
                                <br />
                            </div>
                        ))}
                    </div>
                </Box>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
        character_spells: state.character_spells,
        allSpells: state.allSpells
    };
}

export default connect(mapStateToProps, { getSpells, saveSpell, removeSpell, getAllSpells })(Spells);
