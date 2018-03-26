import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArmor, removeArmor } from '../../ducks/reducer.js';
import './Equipment.css';
import Box from '../Box/Box.js';
import AllArmor from '../AllArmor/AllArmor.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Info from 'material-ui/svg-icons/action/info';
import TextField from 'material-ui/TextField';

class Equipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            armor: [{}],
            infoToggle: false,
            equipmentNotes: ''
        }
        this.removeArmor = this.removeArmor.bind(this);
    }

    componentDidMount() {
        this.props.getArmor(this.props.id);
    }

    componentWillReceiveProps(newProps) {
        this.setState({ armor: newProps.character_armor });
    }

    removeArmor(id) {
        this.props.removeArmor(id);
    }

    render() {
        return (
            <div className='Equipment'>
                <div className='equipment_table'>
                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn tooltip='Name'>NAME</TableHeaderColumn>
                                <TableHeaderColumn tooltip='AC'>ARMOR CLASS</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Stealth'>STEALTH</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Save/Delete'>DELETE</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover={true}
                            stripedRows={false}
                        >
                            {this.state.armor.map((armor, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>
                                        {armor.name ? armor.name : 'No Armor'}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {armor.ac}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {armor.stealth}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton onClick={() => this.removeArmor(armor.ca_id)}>
                                            <Close />
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className='equipment_notes'>
                    <TextField
                        id='text-field-controlled'
                        value={this.state.equipmentNotes}
                        onChange={(e) => this.setState({ equipmentNotes: e.target.value })}
                        floatingLabelText='Equipment Notes'
                    />
                </div>
                <div className='all_equipment'>
                    <h5>EQUIPMENT</h5>
                    <IconButton
                        tooltip='All Equipment'
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
                    title={'ARMOR'}
                >
                    <AllArmor 
                        characterId={this.props.id}
                        characterArmor={this.state.armor}
                        switch={() => this.setState({ infoToggle: false })}
                    />
                </Box>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
        character_armor: state.character_armor,
        allArmor: state.allArmor
    };
}

export default connect(mapStateToProps, { getArmor, removeArmor })(Equipment);
