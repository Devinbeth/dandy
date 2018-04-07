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
            infoToggle: false,
            equipmentNotes: ''
        }
        this.removeArmor = this.removeArmor.bind(this);
    }

    componentDidMount() {
        this.props.getArmor(this.props.character.id);
    }

    removeArmor(id) {
        this.props.removeArmor(id, { character_id: this.props.character.id });
    }

    render() {
        return (
            <div className='Equipment'>
                <div className='equipment_table'>
                    <Table style={{ tableLayout: 'auto' }}>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>NAME</TableHeaderColumn>
                                <TableHeaderColumn>ARMOR CLASS</TableHeaderColumn>
                                <TableHeaderColumn>STEALTH</TableHeaderColumn>
                                <TableHeaderColumn>DELETE</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover={true}
                            stripedRows={false}
                        >
                            {this.props.characterArmor.map((armor, index) => (
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
                    top={'62px'}
                    bottom={'5%'}
                    right={'5%'}
                    left={'5%'}
                    title={'ARMOR'}
                >
                    <AllArmor switch={() => this.setState({ infoToggle: false })}/>
                </Box>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
        characterArmor: state.characterArmor,
        allArmor: state.allArmor
    };
}

export default connect(mapStateToProps, { getArmor, removeArmor })(Equipment);
