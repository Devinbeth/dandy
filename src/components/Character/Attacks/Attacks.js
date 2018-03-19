import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeapons } from '../../../ducks/reducer.js';
import './Attack.css';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class Attacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weapons: [{}],
            value: 1
        }
    }

    weaponsList() {
        return (
            <div>
                <Table
                    fixedHeader={true}
                    fixedFooter={true}
                >
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn tooltip='Name'>Weapon Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Bonus'>Attack Bonus</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Damage'>Damage</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                        stripedRows={false}
                    >
                        {this.state.weapons.map((weapon, index) => (
                            <TableRow key={index}>
                                <TableRowColumn><FlatButton>{weapon.name}</FlatButton></TableRowColumn>
                                <TableRowColumn><TextField/></TableRowColumn>
                                <TableRowColumn>{weapon.damage}</TableRowColumn>
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

    componentWillReceiveProps(newProps) {
        this.setState({ weapons: newProps.character_weapons });
    }
    render() {
        return (
            <div className='Attack' >
                {this.weaponsList()}
                {/* <h5>ADD WEAPON</h5>
                <DropDownMenu value={this.state.value} onChange={(event, index, value) => this.setState({ value })} >
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
                <br />
                <RaisedButton label='ADD WEAPON' primary={true} className='attack_button' /> */}
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

export default connect(mapStateToProps, { getWeapons })(Attacks);
