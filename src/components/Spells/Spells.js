import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpells, removeSpell } from '../../ducks/reducer.js';
import './Spells.css';
import Box from '../Box/Box.js';
import AllSpells from '../AllSpells/AllSpells.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Info from 'material-ui/svg-icons/action/info';
import TextField from 'material-ui/TextField';

class Spells extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoToggle: false,
            spellNotes: ''
        }
        this.removeSpell = this.removeSpell.bind(this);
    }

    componentDidMount() {
        this.props.getSpells(this.props.character.id);
    }

    removeSpell(id) {
        this.props.removeSpell(id);
    }

    render() {
        return (
            <div className='Spells'>
                <div className='spell_table'>
                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>NAME</TableHeaderColumn>
                                <TableHeaderColumn>CASTING TIME</TableHeaderColumn>
                                <TableHeaderColumn>SAVE</TableHeaderColumn>
                                <TableHeaderColumn>DELETE</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody 
                            displayRowCheckbox={false}
                            showRowHover={true}
                            stripedRows={false}
                        >
                            {this.props.characterSpells.map((spell, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>
                                        {spell.name ? spell.name : 'No Spells'}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {spell.casting_time}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {spell.save}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton onClick={() => this.removeSpell(spell.cs_id)}>
                                            <Close />
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className='spell_notes'>
                    <TextField
                        id='text-field-controlled'
                        value={this.state.spellNotes}
                        onChange={(e) => this.setState({ spellNotes: e.target.value })}
                        floatingLabelText='Spell Notes'
                    />
                </div>
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
                <Box
                    toggle={this.state.infoToggle}
                    switch={() => this.setState({ infoToggle: false })}
                    top={'10%'}
                    bottom={'5%'}
                    right={'10%'}
                    left={'10%'}
                    title={'SPELLS'}
                >
                    <AllSpells switch={() => this.setState({ infoToggle: false })}/>
                </Box>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
        characterSpells: state.characterSpells,
    };
}

export default connect(mapStateToProps, { getSpells, removeSpell })(Spells);
