import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getCharacter, saveCharacter } from '../../ducks/reducer.js';
import './Character.css';
import Header from '../Header/Header.js';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Character extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            race: '',
            class: '',
            level: '',
            experience_points: '',
            background: '',
            alignment: '',
            strength: '',
            dexterity: '',
            constitution: '',
            intelligence: '',
            wisdom: '',
            charisma: ''
        }
    }

    componentDidMount() {
        this.props.getCharacter(this.props.match.params.id);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            name: newProps.character[0].name,
            image: newProps.character[0].image,
            race: newProps.character[0].race,
            class: newProps.character[0].class,
            level: newProps.character[0].level,
            experience_points: newProps.character[0].experience_points,
            background: newProps.character[0].background,
            alignment: newProps.character[0].alignment,
            strength: newProps.character[0].strength,
            dexterity: newProps.character[0].dexterity,
            constitution: newProps.character[0].constitution,
            intelligence: newProps.character[0].intelligence,
            wisdom: newProps.character[0].wisdom,
            charisma: newProps.character[0].charisma
        });
    }

    render() {
        return (
            <div className='Character'>
                <Header />
                <div className='basic_info'>
                    <img src={this.state.image} alt='' />
                    <TextField className='basic_info_text'
                        value={this.state.name}
                        onChange={e => this.setState({name: e.target.value})}
                        floatingLabelText='Character Name'
                    /><br />
                    <DropDownMenu value={this.state.race} onChange={(e) => this.setState({race: e.target.value})}>
                        <MenuItem value='Dwarf' primaryText='Dwarf' />
                        <MenuItem value='Elf' primaryText='Elf' />
                        <MenuItem value='Hafling' primaryText='Hafling' />
                        <MenuItem value='Human' primaryText='Human' />
                        <MenuItem value='Dragonborn' primaryText='Dragonborn' />
                        <MenuItem value='Gnome' primaryText='Gnome' />
                        <MenuItem value='Half-Elf' primaryText='Half-Elf' />
                        <MenuItem value='Half-Orc' primaryText='Half-Orc' />
                        <MenuItem value='Tiefling' primaryText='Tiefling' />
                    </DropDownMenu><br />
                    <TextField className='basic_info_text'
                        value={this.state.class}
                        onChange={e => this.setState({class: e.target.value})}
                        floatingLabelText='Class'
                    /><br />
                    <TextField className='basic_info_text'
                        value={this.state.level}
                        onChange={e => this.setState({level: e.target.value})}
                        floatingLabelText='Level'
                    /><br />
                    <TextField className='basic_info_text'
                        value={this.state.experience_points}
                        onChange={e => this.setState({experience_points: e.target.value})}
                        floatingLabelText='Experience Points'
                    /><br />
                    <TextField className='basic_info_text'
                        value={this.state.background}
                        onChange={e => this.setState({background: e.target.value})}
                        floatingLabelText='Background'
                    /><br />
                    <TextField className='basic_info_text'
                        value={this.state.alignment}
                        onChange={e => this.setState({alignment: e.target.value})}
                        floatingLabelText='Alignment'
                    />
                </div>
                <TextField
                    value={this.state.strength}
                    onChange={e => this.setState({strength: e.target.value})}
                    floatingLabelText='Strength'
                /><br />
                <TextField
                    value={this.state.dexterity}
                    onChange={e => this.setState({dexterity: e.target.value})}
                    floatingLabelText='Dexterity'
                /><br />
                <TextField
                    value={this.state.constitution}
                    onChange={e => this.setState({constitution: e.target.value})}
                    floatingLabelText='Constitution'
                /><br />
                <TextField
                    value={this.state.intelligence}
                    onChange={e => this.setState({intelligence: e.target.value})}
                    floatingLabelText='Intelligence'
                /><br />
                <TextField
                    value={this.state.wisdom}
                    onChange={e => this.setState({wisdom: e.target.value})}
                    floatingLabelText='Wisdom'
                /><br />
                <TextField
                    value={this.state.charisma}
                    onChange={e => this.setState({charisma: e.target.value})}
                    floatingLabelText='Charisma'
                /><br />
                <FloatingActionButton className='save' onClick={() => this.props.saveCharacter(this.props.match.params.id, this.state)}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        character: state.character
    };
}

export default connect(mapStateToProps, { getUser, getCharacter, saveCharacter })(Character);
