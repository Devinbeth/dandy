import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getCharacter, saveCharacter } from '../../ducks/reducer.js';
import './Character.css';
import Header from '../Header/Header.js';
import logo from '../../assets/D&D_5E_Logo.png';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';

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
            survival: false,
            armor_class: 0,
            initiative: 0,
            speed: 0,
            max_hit_points: 0,
            current_hit_points: 0,
            death_save_successes: 0,
            death_save_failures: 0,
            temp_hit_points: 0,
            total_hit_dice: '',
            current_hit_dice: 0,
            personality_traits: '',
            ideals: '',
            bonds: '',
            flaws: '',
            platinum: 0,
            gold: 0,
            electrum: 0,
            silver: 0,
            copper: 0
        }
        this.abilityModifiers = this.abilityModifiers.bind(this);
        this.modifiers = this.modifiers.bind(this);
    }

    abilityModifiers(ability) {
        let num = Math.floor((ability - 10) / 2);
        let modifier = num > 0 ? `+${num}` : num;
        return modifier;
    }

    modifiers(ability, saving_throw) {
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
            survival: newProps.character[0].survival,
            armor_class: newProps.character[0].armor_class,
            initiative: newProps.character[0].initiative,
            speed: newProps.character[0].speed,
            max_hit_points: newProps.character[0].max_hit_points,
            current_hit_points: newProps.character[0].current_hit_points,
            temp_hit_points: newProps.character[0].temp_hit_points,
            total_hit_dice: newProps.character[0].total_hit_dice,
            current_hit_dice: newProps.character[0].current_hit_dice,
            personality_traits: newProps.character[0].personality_traits,
            ideals: newProps.character[0].ideals,
            bonds: newProps.character[0].bonds,
            flaws: newProps.character[0].flaws,
            platinum: newProps.character[0].platinum,
            gold: newProps.character[0].gold,
            electrum: newProps.character[0].electrum,
            silver: newProps.character[0].silver,
            copper: newProps.character[0].copper
        });
    }

    render() {
        return (
            <div className='Character'>
                <Header />
                <div className='sheet'>
                    <div className='character_name'>
                        <img className='logo' src={logo} alt='' />
                        <TextField className='basic_info_text'
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                            floatingLabelText='Character Name'
                            style={{ width: '75%' }}
                        />
                    </div>
                    <div className='basic_info'>
                        <div className='char_image'>
                            <img className='character_image' src={this.state.image} alt='' />
                        </div>
                        <div className='basic_info_bin'>
                            <TextField className='basic_info_text'
                                value={this.state.race}
                                onChange={e => this.setState({ race: e.target.value })}
                                floatingLabelText='Race'
                                style={{ width: '25%' }}
                            />
                            <TextField className='basic_info_text'
                                value={this.state.class}
                                onChange={e => this.setState({ class: e.target.value })}
                                floatingLabelText='Class'
                                style={{ width: '25%' }}
                            />
                            <TextField className='basic_info_text'
                                value={this.state.level}
                                onChange={e => this.setState({ level: e.target.value })}
                                floatingLabelText='Level'
                                style={{ width: '25%' }}
                            />
                            <TextField className='basic_info_text'
                                value={this.state.experience_points}
                                onChange={e => this.setState({ experience_points: e.target.value })}
                                floatingLabelText='XP'
                                style={{ width: '25%' }}
                            />
                            <TextField className='basic_info_text'
                                value={this.state.background}
                                onChange={e => this.setState({ background: e.target.value })}
                                floatingLabelText='Background'
                                style={{ width: '25%' }}
                            />
                            <TextField className='basic_info_text'
                                value={this.state.alignment}
                                onChange={e => this.setState({ alignment: e.target.value })}
                                floatingLabelText='Alignment'
                                style={{ width: '25%' }}
                            />
                        </div>
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
                                label={`Strength: ${this.modifiers(this.state.strength, this.state.strength_saving_throw)}`}
                                onToggle={() => this.setState({ strength_saving_throw: !this.state.strength_saving_throw })}
                            />
                            <Toggle
                                defaultToggled={this.state.dexterity_saving_throw}
                                label={`Dexterity: ${this.modifiers(this.state.dexterity, this.state.dexterity_saving_throw)}`}
                                onToggle={() => this.setState({ dexterity_saving_throw: !this.state.dexterity_saving_throw })}
                            />
                            <Toggle
                                defaultToggled={this.state.constitution_saving_throw}
                                label={`Constitution: ${this.modifiers(this.state.constitution, this.state.constitution_saving_throw)}`}
                                onToggle={() => this.setState({ constitution_saving_throw: !this.state.constitution_saving_throw })}
                            />
                            <Toggle
                                defaultToggled={this.state.wisdom_saving_throw}
                                label={`Wisdom: ${this.modifiers(this.state.wisdom, this.state.wisdom_saving_throw)}`}
                                onToggle={() => this.setState({ wisdom_saving_throw: !this.state.wisdom_saving_throw })}
                            />
                            <Toggle
                                defaultToggled={this.state.intelligence_saving_throw}
                                label={`Intelligence: ${this.modifiers(this.state.intelligence, this.state.intelligence_saving_throw)}`}
                                onToggle={() => this.setState({ intelligence_saving_throw: !this.state.intelligence_saving_throw })}
                            />
                            <Toggle
                                defaultToggled={this.state.charisma_saving_throw}
                                label={`Charisma: ${this.modifiers(this.state.charisma, this.state.charisma_saving_throw)}`}
                                onToggle={() => this.setState({ charisma_saving_throw: !this.state.charisma_saving_throw })}
                            />
                        </div>
                        <div className='skills'>
                            <h3>SKILLS</h3>
                            <Toggle
                                defaultToggled={this.state.acrobatics}
                                label={`Acrobatics: ${this.modifiers(this.state.dexterity, this.state.acrobatics)}`}
                                onToggle={() => this.setState({ acrobatics: !this.state.acrobatics })}
                            />
                            <Toggle
                                defaultToggled={this.state.animal_handling}
                                label={`Animal Handling: ${this.modifiers(this.state.wisdom, this.state.animal_handling)}`}
                                onToggle={() => this.setState({ animal_handling: !this.state.animal_handling })}
                            />
                            <Toggle
                                defaultToggled={this.state.arcana}
                                label={`Arcana: ${this.modifiers(this.state.intelligence, this.state.arcana)}`}
                                onToggle={() => this.setState({ arcana: !this.state.arcana })}
                            />
                            <Toggle
                                defaultToggled={this.state.athletics}
                                label={`Athletics: ${this.modifiers(this.state.strength, this.state.athletics)}`}
                                onToggle={() => this.setState({ athletics: !this.state.athletics })}
                            />
                            <Toggle
                                defaultToggled={this.state.deception}
                                label={`Deception: ${this.modifiers(this.state.charisma, this.state.deception)}`}
                                onToggle={() => this.setState({ deception: !this.state.deception })}
                            />
                            <Toggle
                                defaultToggled={this.state.history}
                                label={`History: ${this.modifiers(this.state.intelligence, this.state.history)}`}
                                onToggle={() => this.setState({ history: !this.state.history })}
                            />
                            <Toggle
                                defaultToggled={this.state.insight}
                                label={`Insight: ${this.modifiers(this.state.wisdom, this.state.insight)}`}
                                onToggle={() => this.setState({ insight: !this.state.insight })}
                            />
                            <Toggle
                                defaultToggled={this.state.intimidation}
                                label={`Intimidation: ${this.modifiers(this.state.charisma, this.state.intimidation)}`}
                                onToggle={() => this.setState({ intimidation: !this.state.intimidation })}
                            />
                            <Toggle
                                defaultToggled={this.state.investigation}
                                label={`Investigation: ${this.modifiers(this.state.intelligence, this.state.investigation)}`}
                                onToggle={() => this.setState({ investigation: !this.state.investigation })}
                            />
                            <Toggle
                                defaultToggled={this.state.medicine}
                                label={`Medicine: ${this.modifiers(this.state.wisdom, this.state.medicine)}`}
                                onToggle={() => this.setState({ medicine: !this.state.medicine })}
                            />
                            <Toggle
                                defaultToggled={this.state.nature}
                                label={`Nature: ${this.modifiers(this.state.intelligence, this.state.nature)}`}
                                onToggle={() => this.setState({ nature: !this.state.nature })}
                            />
                            <Toggle
                                defaultToggled={this.state.perception}
                                label={`Perception: ${this.modifiers(this.state.wisdom, this.state.perception)}`}
                                onToggle={() => this.setState({ perception: !this.state.perception })}
                            />
                            <Toggle
                                defaultToggled={this.state.performance}
                                label={`Performance: ${this.modifiers(this.state.charisma, this.state.performance)}`}
                                onToggle={() => this.setState({ performance: !this.state.performance })}
                            />
                            <Toggle
                                defaultToggled={this.state.persuasion}
                                label={`Persuasion: ${this.modifiers(this.state.charisma, this.state.persuasion)}`}
                                onToggle={() => this.setState({ persuasion: !this.state.persuasion })}
                            />
                            <Toggle
                                defaultToggled={this.state.religion}
                                label={`Religion: ${this.modifiers(this.state.intelligence, this.state.religion)}`}
                                onToggle={() => this.setState({ religion: !this.state.religion })}
                            />
                            <Toggle
                                defaultToggled={this.state.sleight_of_hand}
                                label={`Sleight of Hand: ${this.modifiers(this.state.dexterity, this.state.sleight_of_hand)}`}
                                onToggle={() => this.setState({ sleight_of_hand: !this.state.sleight_of_hand })}
                            />
                            <Toggle
                                defaultToggled={this.state.stealth}
                                label={`Stealth: ${this.modifiers(this.state.dexterity, this.state.stealth)}`}
                                onToggle={() => this.setState({ stealth: !this.state.stealth })}
                            />
                            <Toggle
                                defaultToggled={this.state.survival}
                                label={`Survival: ${this.modifiers(this.state.wisdom, this.state.survival)}`}
                                onToggle={() => this.setState({ survival: !this.state.survival })}
                            />
                        </div>
                    </div>
                    <div className='col3'>
                        <TextField className='col3_info'
                            value={this.state.armor_class}
                            onChange={e => this.setState({ armor_class: e.target.value })}
                            floatingLabelText='Armor Class'
                            style={{ width: '25%' }}
                        />
                        <TextField className='col3_info'
                            value={this.state.initiative}
                            onChange={e => this.setState({ initiative: e.target.value })}
                            floatingLabelText='Initiative'
                            style={{ width: '25%' }}
                        />
                        <TextField className='col3_info'
                            value={this.state.speed}
                            onChange={e => this.setState({ speed: e.target.value })}
                            floatingLabelText='Speed'
                            style={{ width: '25%' }}
                        />
                        <TextField className='col3_info'
                            value={this.state.max_hit_points}
                            onChange={e => this.setState({ max_hit_points: e.target.value })}
                            floatingLabelText='Max HP'
                            style={{ width: '25%' }}
                        />
                        <TextField className='col3_info'
                            value={this.state.current_hit_points}
                            onChange={e => this.setState({ current_hit_points: e.target.value })}
                            floatingLabelText='Current HP'
                            style={{ width: '25%' }}
                        />
                        <TextField className='col3_info'
                            value={this.state.temp_hit_points}
                            onChange={e => this.setState({ temp_hit_points: e.target.value })}
                            floatingLabelText='Temporary HP'
                            style={{ width: '30%' }}
                        />
                        <TextField className='col3_info'
                            value={this.state.total_hit_dice}
                            onChange={e => this.setState({ total_hit_dice: e.target.value })}
                            floatingLabelText='Total Hit Dice'
                            style={{ width: '30%' }}
                        />
                        <TextField className='col3_info'
                            value={this.state.current_hit_dice}
                            onChange={e => this.setState({ current_hit_dice: e.target.value })}
                            floatingLabelText='Current Hit Dice'
                            style={{ width: '40%' }}
                        />
                        <h3>DEATH SAVES</h3>
                        <Checkbox/>
                        <Checkbox/>
                        <Checkbox
                            label="Successes"
                        />
                        <Checkbox/>
                        <Checkbox/>
                        <Checkbox
                            label="Failures"
                        />
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
