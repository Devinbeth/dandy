import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllArmor } from '../../ducks/reducer.js';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class AllArmor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getAllArmor();
    }

    componentWillReceiveProps(newProps) {
        this.setState({ spellList: newProps.allSpells });
    }

    render() {
        return (
            <div className='AllArmor'>
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allArmor: state.allArmor
    };
}

export default connect(mapStateToProps, { getAllArmor })(AllArmor);
