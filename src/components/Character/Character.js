import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getCharacter, saveCharacter } from '../../ducks/reducer.js';
import './Character.css';
import Header from '../Header/Header.js';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Toggle from 'material-ui/Toggle';

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
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            inspiration: 0,
            proficiency_bonus: 0,
            strength_saving_throw: false,
            dexterity_saving_throw: false,
            constitution_saving_throw: false,
            intelligence_saving_throw: false,
            wisdom_saving_throw: false,
            charisma_saving_throw: false,
            acrobatics: false,
            animal_handling: false,
            arcana: false,
            athletics: false,
            deception: false,
            history: false,
            insight: false,
            intimidation: false,
            investigation: false,
            medicine: false,
            nature: false,
            perception: false,
            performance: false,
            persuasion: false,
            religion: false,
            sleight_of_hand: false,
            stealth: false,
            survival: false
        }
        this.abilityModifiers = this.abilityModifiers.bind(this);
    }

    abilityModifiers(ability) {
        let num = Math.floor((ability - 10) / 2);
        let modifier = num > 0 ? `+${num}` : num;
        return modifier;
    }

    savingThrows(ability, saving_throw) {
        let num = Math.floor((ability - 10) / 2);
        if (saving_throw) {
            num += Number(this.state.proficiency_bonus);
        }
        let modifier = num > 0 ? `+${num}` : num;
        return modifier;
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
            charisma: newProps.character[0].charisma,
            inspiration: newProps.character[0].inspiration,
            proficiency_bonus: newProps.character[0].proficiency_bonus,
            strength_saving_throw: newProps.character[0].strength_saving_throw,
            dexterity_saving_throw: newProps.character[0].dexterity_saving_throw,
            constitution_saving_throw: newProps.character[0].constitution_saving_throw,
            intelligence_saving_throw: newProps.character[0].intelligence_saving_throw,
            wisdom_saving_throw: newProps.character[0].wisdom_saving_throw,
            charisma_saving_throw: newProps.character[0].charisma_saving_throw,
            acrobatics: newProps.character[0].acrobatics,
            animal_handling: newProps.character[0].animal_handling,
            arcana: newProps.character[0].arcana,
            athletics: newProps.character[0].athletics,
            deception: newProps.character[0].deception,
            history: newProps.character[0].history,
            insight: newProps.character[0].insight,
            intimidation: newProps.character[0].intimidation,
            investigation: newProps.character[0].investigation,
            medicine: newProps.character[0].medicine,
            nature: newProps.character[0].nature,
            perception: newProps.character[0].perception,
            performance: newProps.character[0].performance,
            persuasion: newProps.character[0].persuasion,
            religion: newProps.character[0].religion,
            sleight_of_hand: newProps.character[0].sleight_of_hand,
            stealth: newProps.character[0].stealth,
            survival: newProps.character[0].survival
        });
    }

    render() {
        return (
            <div className='Character'>
                <Header />
                <div className='sheet'>
                    <div className='character_info'>
                        <h1>DUNGEONS & DRAGONS</h1>
                        <img src={this.state.image} alt='' />
                        <TextField className='basic_info_text'
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                            floatingLabelText='Character Name'
                            style={{ width: '80%' }}
                        />
                    </div>
                    <div className='basic_info'>
                        <TextField className='basic_info_text'
                            value={this.state.race}
                            onChange={e => this.setState({ race: e.target.value })}
                            floatingLabelText='Race'
                            style={{ width: '15%' }}
                        />
                        <TextField className='basic_info_text'
                            value={this.state.class}
                            onChange={e => this.setState({ class: e.target.value })}
                            floatingLabelText='Class'
                            style={{ width: '15%' }}
                        />
                        <TextField className='basic_info_text'
                            value={this.state.level}
                            onChange={e => this.setState({ level: e.target.value })}
                            floatingLabelText='Level'
                            style={{ width: '15%' }}
                        />
                        <TextField className='basic_info_text'
                            value={this.state.experience_points}
                            onChange={e => this.setState({ experience_points: e.target.value })}
                            floatingLabelText='XP'
                            style={{ width: '15%' }}
                        />
                        <TextField className='basic_info_text'
                            value={this.state.background}
                            onChange={e => this.setState({ background: e.target.value })}
                            floatingLabelText='Background'
                            style={{ width: '15%' }}
                        />
                        <TextField className='basic_info_text'
                            value={this.state.alignment}
                            onChange={e => this.setState({ alignment: e.target.value })}
                            floatingLabelText='Alignment'
                            style={{ width: '15%' }}
                        />
                    </div>
                    <div className='modifiers'>
                        <TextField
                            value={this.state.strength}
                            onChange={e => this.setState({ strength: e.target.value })}
                            floatingLabelText='Strength'
                            style={{ width: '60%' }}
                        />
                        {this.abilityModifiers(this.state.strength)}
                        <TextField
                            value={this.state.dexterity}
                            onChange={e => this.setState({ dexterity: e.target.value })}
                            floatingLabelText='Dexterity'
                            style={{ width: '60%' }}
                        />
                        {this.abilityModifiers(this.state.dexterity)}
                        <TextField
                            value={this.state.constitution}
                            onChange={e => this.setState({ constitution: e.target.value })}
                            floatingLabelText='Constitution'
                            style={{ width: '60%' }}
                        />
                        {this.abilityModifiers(this.state.constitution)}
                        <TextField
                            value={this.state.intelligence}
                            onChange={e => this.setState({ intelligence: e.target.value })}
                            floatingLabelText='Intelligence'
                            style={{ width: '60%' }}
                        />
                        {this.abilityModifiers(this.state.intelligence)}
                        <TextField
                            value={this.state.wisdom}
                            onChange={e => this.setState({ wisdom: e.target.value })}
                            floatingLabelText='Wisdom'
                            style={{ width: '60%' }}
                        />
                        {this.abilityModifiers(this.state.wisdom)}
                        <TextField
                            value={this.state.charisma}
                            onChange={e => this.setState({ charisma: e.target.value })}
                            floatingLabelText='Charisma'
                            style={{ width: '60%' }}
                        />
                        {this.abilityModifiers(this.state.charisma)}
                    </div>
                    <div className='col2'>
                        <div className='inspiration'>
                            <TextField
                                value={this.state.inspiration}
                                onChange={e => this.setState({ inspiration: e.target.value })}
                                floatingLabelText='Inspiration'
                                style={{ width: '75%' }}
                            />
                        </div>
                        <div className='proficiency_bonus'>
                            <TextField
                                value={this.state.proficiency_bonus}
                                onChange={e => this.setState({ proficiency_bonus: e.target.value })}
                                floatingLabelText='Proficieny Bonus'
                                style={{ width: '75%' }}
                            />
                        </div>
                        <div className='saving_throws'>
                            <h3>SAVING THROWS</h3>
                            <Toggle
                                defaultToggled={this.state.strength_saving_throw}
                                label={`Strength: ${this.savingThrows(this.state.strength, this.state.strength_saving_throw)}`}
                                onToggle={() => this.setState({ strength_saving_throw: !this.state.strength_saving_throw })}
                            />
                            <Toggle
                                defaultToggled={this.state.dexterity_saving_throw}
                                label={`Dexterity: ${this.savingThrows(this.state.dexterity, this.state.dexterity_saving_throw)}`}
                                onToggle={() => this.setState({ dexterity_saving_throw: !this.state.dexterity_saving_throw })}
                            />
                            <Toggle
                                defaultToggled={this.state.constitution_saving_throw}
                                label={`Constitution: ${this.savingThrows(this.state.constitution, this.state.constitution_saving_throw)}`}
                                onToggle={() => this.setState({ constitution_saving_throw: !this.state.constitution_saving_throw })}
                            />
                            <Toggle
                                defaultToggled={this.state.wisdom_saving_throw}
                                label={`Wisdom: ${this.savingThrows(this.state.wisdom, this.state.wisdom_saving_throw)}`}
                                onToggle={() => this.setState({ wisdom_saving_throw: !this.state.wisdom_saving_throw })}
                            />
                            <Toggle
                                defaultToggled={this.state.intelligence_saving_throw}
                                label={`Intelligence: ${this.savingThrows(this.state.intelligence, this.state.intelligence_saving_throw)}`}
                                onToggle={() => this.setState({ intelligence_saving_throw: !this.state.intelligence_saving_throw })}
                            />
                            <Toggle
                                defaultToggled={this.state.charisma_saving_throw}
                                label={`Charisma: ${this.savingThrows(this.state.charisma, this.state.charisma_saving_throw)}`}
                                onToggle={() => this.setState({ charisma_saving_throw: !this.state.charisma_saving_throw })}
                            />
                        </div>
                        <div className='skills'>
                            <h3>SKILLS</h3>
                            <Toggle
                                defaultToggled={this.state.acrobatics}
                                label={`Acrobatics: ${this.savingThrows(this.state.dexterity, this.state.acrobatics)}`}
                                onToggle={() => this.setState({ acrobatics: !this.state.acrobatics })}
                            />
                            <Toggle
                                defaultToggled={this.state.animal_handling}
                                label={`Animal Handling: ${this.savingThrows(this.state.wisdom, this.state.animal_handling)}`}
                                onToggle={() => this.setState({ animal_handling: !this.state.animal_handling })}
                            />
                        </div>
                    </div>
                    <FloatingActionButton className='save' onClick={() => this.props.saveCharacter(this.props.match.params.id, this.state)}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
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
