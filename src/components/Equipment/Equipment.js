import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArmor, saveArmor, removeArmor, getAllArmor } from '../../ducks/reducer.js';
import './Equipment.css';
import Box from '../Box/Box.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import Info from 'material-ui/svg-icons/action/info';

class Equipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            armor: [{}],
            category: 1,
            newArmor: 0,
            newToggle: false,
            infoToggle: false,
            armorToggle: false
        }
        this.addArmor = this.addArmor.bind(this);
        this.removeArmor = this.removeArmor.bind(this);
        this.armorDropDown = this.armorDropDown.bind(this);
        this.armorList = this.armorList.bind(this);
    }

    componentDidMount() {
        this.props.getArmor(this.props.id);
        this.props.getAllArmor();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ armor: newProps.character_armor });
    }

    addArmor() {
        this.props.saveArmor({ character_id: this.props.id, armor_id: this.state.newArmor });
        this.setState({ category: 1, newArmor: 0, newToggle: false });
    }

    removeArmor(id) {
        this.props.removeArmor(id);
    }

    armorDropDown() {
        switch (this.state.category) {
            case 1:
                return;
            case 2:
                return (
                    <SelectField
                        floatingLabelText='Light Armor'
                        value={this.state.newArmor}
                        onChange={(event, index, value) => this.setState({ newArmor: value })}
                        style={{ width: '230px', textAlign: 'left' }}
                    >
                        <MenuItem value={1} primaryText='Padded' />
                        <MenuItem value={2} primaryText='Leather' />
                        <MenuItem value={3} primaryText='Studded leather' />
                    </SelectField>
                );
            case 3:
                return (
                    <SelectField
                        floatingLabelText='Medium Armor'
                        value={this.state.newArmor}
                        onChange={(event, index, value) => this.setState({ newArmor: value })}
                        style={{ width: '230px', textAlign: 'left' }}
                    >
                        <MenuItem value={4} primaryText='Hide' />
                        <MenuItem value={5} primaryText='Chain Shirt' />
                        <MenuItem value={6} primaryText='Scale Mail' />
                        <MenuItem value={7} primaryText='Breastplate' />
                        <MenuItem value={8} primaryText='Half Plate' />
                    </SelectField>
                );
            case 4:
                return (
                    <SelectField
                        floatingLabelText='Heavy Armor'
                        value={this.state.newArmor}
                        onChange={(event, index, value) => this.setState({ newArmor: value })}
                        style={{ width: '230px', textAlign: 'left' }}
                    >
                        <MenuItem value={9} primaryText='Ring Mail' />
                        <MenuItem value={10} primaryText='Chain Mail' />
                        <MenuItem value={11} primaryText='Splint' />
                        <MenuItem value={12} primaryText='Plate' />
                    </SelectField>
                );
            case 5:
                return (
                    <SelectField
                        floatingLabelText='Shield'
                        value={this.state.newArmor}
                        onChange={(event, index, value) => this.setState({ newArmor: value })}
                        style={{ width: '230px', textAlign: 'left' }}
                    >
                        <MenuItem value={13} primaryText='Shield' />
                    </SelectField>
                );
            default:
                return;
        }
    }

    armorList() {
        return (
            <Table fixedHeader={true} fixedFooter={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn tooltip='Name'>NAME</TableHeaderColumn>
                        <TableHeaderColumn tooltip='AC'>ARMOR CLASS</TableHeaderColumn>
                        <TableHeaderColumn tooltip='Stealth'>STEALTH</TableHeaderColumn>
                        <TableHeaderColumn tooltip='Save/Delete'>DELETE</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
                    {this.state.armor.map((armor, index) => (
                        <TableRow key={index}>
                            <TableRowColumn style={{ width: '30%', textAlign: 'left', margin: 0, padding: '2%' }}>
                                <FlatButton
                                    label={armor.name ? armor.name : 'No Armor'}
                                    onClick={() => {
                                        this.setState({ infoToggle: true });
                                        this.armorInfoBox(armor.armor_id);
                                    }}
                                />
                            </TableRowColumn>
                            <TableRowColumn style={{ width: '10%', alignContent: 'left', margin: 0, padding: '2%' }}>
                                {armor.ac}
                            </TableRowColumn>
                            <TableRowColumn style={{ width: '35%', textAlign: 'center', margin: 0, padding: '2%' }}>
                                {armor.stealth}
                            </TableRowColumn>
                            <TableRowColumn style={{ width: '20%', alignItems: 'left', margin: 0, padding: '2%' }}>
                                <IconButton onClick={() => this.removeArmor(armor.id)} style={{ margin: 0, padding: 0 }}>
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
            <div className='Equipment'>
                <div className='equipment_table'>
                    {this.armorList()}
                </div>
                <div className='add_equipment'>
                    <RaisedButton label='Add Equipment' primary={true} onClick={() => this.setState({ newToggle: !this.state.newToggle })} />
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
                </div>
                <Box
                    toggle={this.state.newToggle}
                    switch={() => this.setState({ category: 1, newArmor: 0, newToggle: false })}
                    top={'15%'}
                    bottom={'15%'}
                    right={'34%'}
                    left={'34%'}
                    title={'ADD NEW ARMOR'}
                >
                    <div className='new_armor'>
                        <SelectField
                            floatingLabelText='Category'
                            value={this.state.category}
                            onChange={(event, index, value) => this.setState({ category: value })}
                            style={{ width: '230px', textAlign: 'left' }}
                        >
                            <MenuItem value={1} primaryText='Select' />
                            <MenuItem value={2} primaryText='Light Armor' />
                            <MenuItem value={3} primaryText='Medium Armor' />
                            <MenuItem value={4} primaryText='Heavy Armor' />
                            <MenuItem value={5} primaryText='Shield' />
                        </SelectField>
                        {this.armorDropDown()}
                        {this.state.newArmor ? <RaisedButton label='Add Armor' primary={true} onClick={() => this.addArmor()} style={{ marginTop: '10%'}}/> : null}
                    </div>
                </Box>
                <Box
                    toggle={this.state.infoToggle}
                    switch={() => this.setState({ infoToggle: false })}
                    top={'10%'}
                    bottom={'5%'}
                    right={'10%'}
                    left={'10%'}
                    title={'ALL ARMOR'}
                >
                    <Table fixedHeader={true} fixedFooter={true} style={{ tableLayout: 'auto' }}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ tableLayout: 'auto' }}>
                            <TableRow>
                                <TableHeaderColumn tooltip='Category'>CATERGORY</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Name'>NAME</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Cost'>COST</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Armor Class'>AC</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Strength'>STRENGTH</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Stealth'>STEALTH</TableHeaderColumn>
                                <TableHeaderColumn tooltip='Weight'>WEIGHT</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={false}>
                            {this.props.allArmor.map((armor, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>{armor.category}</TableRowColumn>
                                    <TableRowColumn>{armor.name}</TableRowColumn>
                                    <TableRowColumn>{armor.cost}</TableRowColumn>
                                    <TableRowColumn>{armor.ac}</TableRowColumn>
                                    <TableRowColumn>{armor.strength}</TableRowColumn>
                                    <TableRowColumn>{armor.stealth}</TableRowColumn>
                                    <TableRowColumn>{armor.weight}</TableRowColumn>
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
        character_armor: state.character_armor,
        allArmor: state.allArmor
    };
}

export default connect(mapStateToProps, { getArmor, saveArmor, removeArmor, getAllArmor })(Equipment);
