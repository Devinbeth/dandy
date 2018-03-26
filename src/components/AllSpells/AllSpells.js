import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSpells, saveSpell } from '../../ducks/reducer.js';
import './AllSpells.css';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AllSpells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spellList: this.props.allSpells,
            school: '',
            class: '',
            level: '',
        }
        this.saveSpell = this.saveSpell.bind(this);
        this.filteredSpells = this.filteredSpells.bind(this);
    }

    componentDidMount() {
        this.props.getAllSpells();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ spellList: newProps.allSpells });
    }

    saveSpell(spell) {
        this.props.saveSpell(spell);
    }

    filteredSpells(value) {
        let filteredList = this.state.spellList.filter((spell, index) => {
            return spell.school.includes(value) || spell.classes.includes(value) || spell.level === value;
        });
        this.setState({ spellList: filteredList });
    }

    render() {
        return (
            <div className='AllSpells'>
                <div className='spell_filters'>
                    <h4>Filter Spells: </h4>
                    <SelectField
                        floatingLabelText='School'
                        value={this.state.school}
                        onChange={(event, index, value) => {
                            this.setState({ school: value });
                            this.filteredSpells(value)
                        }}
                        style={{ width: '160px', textAlign: 'left' }}
                    >
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
                        onChange={(event, index, value) => {
                            this.setState({ class: value });
                            this.filteredSpells(value);
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
                    <TextField
                        id='text-field-controlled'
                        value={this.state.level}
                        floatingLabelText='Level'
                        onChange={(e) => {
                            this.setState({ level: e.target.value });
                            this.filteredSpells(e.target.value);
                        }}
                        style={{ width: '100px' }}
                    />
                    <RaisedButton 
                        label='Reset Filter'
                        primary={true}
                        onClick={() => this.setState({ spellList: this.props.allSpells, school: '', class: '', level: '' })}
                    />
                </div>
                {this.state.spellList.map((spell, index) => (
                    <div className='spell_list' key={index + spell.id + spell.name}>
                        <br />
                        <h3>{spell.name}</h3>
                        <Table>
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                            >
                                <TableRow>
                                    <TableHeaderColumn tooltip='LEVEL'>LEVEL</TableHeaderColumn>
                                    <TableHeaderColumn tooltip='COMPONENTS'>COMPONENTS</TableHeaderColumn>
                                    <TableHeaderColumn tooltip='CASTING TIME'>CASTING TIME</TableHeaderColumn>
                                    <TableHeaderColumn tooltip='DURATION'>DURATION</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                showRowHover={true}
                                stripedRows={false}
                            >
                                <TableRow key={index}>
                                    <TableRowColumn>{spell.level}</TableRowColumn>
                                    <TableRowColumn>{spell.components}</TableRowColumn>
                                    <TableRowColumn>{spell.casting_time}</TableRowColumn>
                                    <TableRowColumn>{spell.duration}</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table>
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                            >
                                <TableRow>
                                    <TableHeaderColumn tooltip='RANGE'>RANGE</TableHeaderColumn>
                                    <TableHeaderColumn tooltip='SAVE'>SAVE</TableHeaderColumn>
                                    <TableHeaderColumn tooltip='SCHOOL'>SCHOOL</TableHeaderColumn>
                                    <TableHeaderColumn tooltip='CLASSES'>CLASSES</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                showRowHover={true}
                                stripedRows={false}
                            >
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
                            {this.props.id && !this.props.characterSpells.find((e) => e.id === spell.id) ? 
                                <RaisedButton
                                    label='Add Spell'
                                    primary={true}
                                    onClick={() => {
                                        this.saveSpell({character_id: this.props.id, spell_id: spell.id});
                                        this.props.switch();
                                        this.setState({ school: '', class: '', level: '' })
                                    }}
                                />
                            : null}
                        </div>
                        
                        <br />
                        <br />
                    </div>
                ))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allSpells: state.allSpells
    };
}

export default connect(mapStateToProps, { getAllSpells, saveSpell })(AllSpells);
