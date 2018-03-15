import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeapons } from '../../../ducks/reducer.js';
import './Attack.css';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class Attacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weapons: [{}],
            value: 1
        }
    }

    weaponsList() {
        let formattedWeaponsList = this.state.weapons.map((weapon, index) => {
            return (
                <div className='weapons_list' key={weapon.id + index}>
                    {weapon.name}
                    <TextField className='weapons'
                        value={weapon.attack_bonus}
                        onChange={(e) => {
                            let newWeapons = Object.assign([], this.state.weapons);
                            newWeapons[index].attack_bonus = e.target.value;
                            this.setState({ weapons: newWeapons })
                        }}
                        floatingLabelText='Attack Bonus'
                        style={{ width: '30%' }}
                    />
                    {weapon.damage}
                </div>
            );
        });
        return formattedWeaponsList;
    }

    componentDidMount() {
        this.props.getWeapons(this.props.id);
    }

    componentWillReceiveProps(newProps) {
        this.setState({weapons: newProps.character_weapons});
    }
    render() {
        return (
            <div className='Attack' >
                {this.weaponsList()}
                <h3>ADD WEAPON</h3>
                <DropDownMenu value={this.state.value} onChange={(event, index, value) => this.setState({value})} >
                    <MenuItem value={1} primaryText="Club" />
                    <MenuItem value={2} primaryText="Dagger" />
                    <MenuItem value={3} primaryText="Greatclub" />
                    <MenuItem value={4} primaryText="Handaxe" />
                    <MenuItem value={5} primaryText="Javelin" />
                    <MenuItem value={6} primaryText="Light Hammer" />
                    <MenuItem value={7} primaryText="Mace" />
                    <MenuItem value={8} primaryText="Quaterstaff" />
                    <MenuItem value={9} primaryText="Sickle" />
                    <MenuItem value={10} primaryText="Spear" />
                    <MenuItem value={11} primaryText="Unarmed Strike" />
                </DropDownMenu>
                <br/>
                <RaisedButton label="ADD WEAPON" primary={true} className='attack_button' />
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
