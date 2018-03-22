import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getCharacter, saveCharacter, createCharacter, resetCharacter } from '../../ducks/reducer.js';
import './Character.css';
import Header from '../Header/Header.js';
import Race from './Race.js';
import Class from './Class.js';
import Alignment from './Alignment.js';
import Background from './Background.js';
import Weapons from '../Weapons/Weapons.js';
import logo from '../../assets/D&D_5E_Logo.png';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkbox from 'material-ui/Checkbox';
import Save from 'material-ui/svg-icons/content/save';
import Undo from 'material-ui/svg-icons/content/undo';

class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: Number(this.props.match.params.id),
            name: '',
            image: '',
            race: '',
            class: '',
            level: 0,
            xp: 0,
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
            languages: '',
            other_proficiencies: '',
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
            copper: 0,
            features: '',
            traits: ''
        }
        this.save = this.save.bind(this);
        this.updateRace = this.updateRace.bind(this);
        this.updateClass = this.updateClass.bind(this);
        this.updateAlignment = this.updateAlignment.bind(this);
        this.updateBackground = this.updateBackground.bind(this);
        this.abilityModifiers = this.abilityModifiers.bind(this);
        this.modifiers = this.modifiers.bind(this);
        this.passiveWisdom = this.passiveWisdom.bind(this);
        this.deathSaveSuccesses = this.deathSaveSuccesses.bind(this);
        this.deathSaveFailures = this.deathSaveFailures.bind(this);
    }
    
    componentDidMount() {
        if (Number(this.props.match.params.id)) {
            this.props.getCharacter(this.props.match.params.id);
        }
        else {
            this.props.resetCharacter();
        }
    }

    save() {
        if (Number(this.props.match.params.id)) {
            this.props.saveCharacter(this.props.match.params.id, this.state);
        }
        else {
            console.log(this.state);
            this.props.createCharacter(this.state);
        }
    }

    updateRace(newRace) {
        this.setState({ race: newRace });
    }

    updateClass(newClass) {
        this.setState({ class: newClass });
    }

    updateAlignment(newAlignment) {
        this.setState({ alignment: newAlignment });
    }

    updateBackground(newBackground) {
        this.setState({ background: newBackground });
    }

    abilityModifiers(ability) {
        if (isNaN(ability)) {
            return;
        }
        let num = Math.floor((ability - 10) / 2);
        let modifier = num > 0 ? `+${num}` : num;
        return modifier;
    }

    modifiers(ability, bool) {
        if (isNaN(ability)) {
            return 0;
        }
        let num = Math.floor((ability - 10) / 2);
        if (bool) {
            num += Number(this.state.proficiency_bonus);
        }
        let modifier = num > 0 ? `+${num}` : num;
        return modifier;
    }

    passiveWisdom() {
        return 10 + Number(this.modifiers(this.state.wisdom, this.state.perception));
    }

    deathSaveSuccesses(checked) {
        if (checked) {
            this.setState({ death_save_successes: this.state.death_save_successes + 1 });
        }
        else {
            this.setState({ death_save_successes: this.state.death_save_successes - 1 });
        }
    }

    deathSaveFailures(checked) {
        if (checked) {
            this.setState({ death_save_failures: this.state.death_save_failures + 1 });
        }
        else {
            this.setState({ death_save_failures: this.state.death_save_failures - 1 });
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.character.id !== this.state.id) {
            this.props.history.push(`/character/${newProps.character.id}`);
        }
        this.setState({
            id: newProps.character.id,
            name: newProps.character.name,
            image: newProps.character.image,
            race: newProps.character.race,
            class: newProps.character.class,
            level: newProps.character.level,
            xp: newProps.character.xp,
            background: newProps.character.background,
            alignment: newProps.character.alignment,
            strength: newProps.character.strength,
            dexterity: newProps.character.dexterity,
            constitution: newProps.character.constitution,
            intelligence: newProps.character.intelligence,
            wisdom: newProps.character.wisdom,
            charisma: newProps.character.charisma,
            inspiration: newProps.character.inspiration,
            proficiency_bonus: newProps.character.proficiency_bonus,
            strength_saving_throw: newProps.character.strength_saving_throw,
            dexterity_saving_throw: newProps.character.dexterity_saving_throw,
            constitution_saving_throw: newProps.character.constitution_saving_throw,
            intelligence_saving_throw: newProps.character.intelligence_saving_throw,
            wisdom_saving_throw: newProps.character.wisdom_saving_throw,
            charisma_saving_throw: newProps.character.charisma_saving_throw,
            acrobatics: newProps.character.acrobatics,
            animal_handling: newProps.character.animal_handling,
            arcana: newProps.character.arcana,
            athletics: newProps.character.athletics,
            deception: newProps.character.deception,
            history: newProps.character.history,
            insight: newProps.character.insight,
            intimidation: newProps.character.intimidation,
            investigation: newProps.character.investigation,
            medicine: newProps.character.medicine,
            nature: newProps.character.nature,
            perception: newProps.character.perception,
            performance: newProps.character.performance,
            persuasion: newProps.character.persuasion,
            religion: newProps.character.religion,
            sleight_of_hand: newProps.character.sleight_of_hand,
            stealth: newProps.character.stealth,
            survival: newProps.character.survival,
            languages: newProps.character.languages,
            other_proficiencies: newProps.character.other_proficiencies,
            armor_class: newProps.character.armor_class,
            initiative: newProps.character.initiative,
            speed: newProps.character.speed,
            max_hit_points: newProps.character.max_hit_points,
            current_hit_points: newProps.character.current_hit_points,
            temp_hit_points: newProps.character.temp_hit_points,
            total_hit_dice: newProps.character.total_hit_dice,
            current_hit_dice: newProps.character.current_hit_dice,
            death_save_successes: newProps.character.death_save_successes,
            death_save_failures: newProps.character.death_save_failures,
            personality_traits: newProps.character.personality_traits,
            ideals: newProps.character.ideals,
            bonds: newProps.character.bonds,
            flaws: newProps.character.flaws,
            platinum: newProps.character.platinum,
            gold: newProps.character.gold,
            electrum: newProps.character.electrum,
            silver: newProps.character.silver,
            copper: newProps.character.copper,
            features: newProps.character.features,
            traits: newProps.character.traits
        });
    }

    render() {
        return (
            <div className='Character'>
                <Header />
                <div className='sheet'>
                    <div className=' box character_name'>
                        <img className='logo' src={logo} alt='' />
                        <TextField className='basic_info_text'
                            id='text-field-controlled'
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                            floatingLabelText='Character Name'
                            style={{ width: '75%' }}
                        />
                    </div>
                    <div className='box basic_info'>
                        <img className='character_image' src={this.state.image} alt='' />
                        <div className='race'>
                            <Race race={this.state.race} updateRace={this.updateRace} />
                        </div>
                        <div className='class'>
                            <Class class={this.state.class} updateClass={this.updateClass} />
                        </div>
                        <TextField
                            className='level'
                            id='text-field-controlled'
                            value={this.state.level ? this.state.level : undefined}
                            onChange={(e) => this.setState({ level: e.target.value })}
                            floatingLabelText='Level'
                            type='number'
                            style={{ width: '90%' }}
                        />
                        <TextField
                            className='xp'
                            id='text-field-controlled'
                            value={this.state.xp}
                            onChange={(e) => this.setState({ xp: e.target.value })}
                            floatingLabelText='XP'
                            type='number'
                            style={{ width: '90%' }}
                        />
                        <div className='background'>
                            <Background background={this.state.background} updateBackground={this.updateBackground} />
                        </div>
                        <div className='alignment'>
                            <Alignment alignment={this.state.alignment} updateAlignment={this.updateAlignment} />
                        </div>
                    </div>
                    <div className='box abilities strength'>
                        <h5>STRENGTH</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.strength ? this.state.strength : undefined}
                            onChange={(e) => this.setState({ strength: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.state.strength)}
                    </div>
                    <div className='box abilities dexterity'>
                        <h5>DEXTERITY</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.dexterity ? this.state.dexterity : undefined}
                            onChange={(e) => this.setState({ dexterity: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.state.dexterity)}
                    </div>
                    <div className='box abilities constitution'>
                        <h5>CONSTITUTION
                        </h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.constitution ? this.state.constitution : undefined}
                            onChange={(e) => this.setState({ constitution: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.state.constitution)}
                    </div>
                    <div className='box abilities intelligence'>
                        <h5>INTELLIGENCE</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.intelligence ? this.state.intelligence : undefined}
                            onChange={(e) => this.setState({ intelligence: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.state.intelligence)}
                    </div>
                    <div className='box abilities wisdom'>
                        <h5>WISDOM</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.wisdom ? this.state.wisdom : undefined}
                            onChange={(e) => this.setState({ wisdom: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.state.wisdom)}
                    </div>
                    <div className='box abilities charisma'>
                        <h5>CHARISMA</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.charisma ? this.state.charisma : undefined}
                            onChange={(e) => this.setState({ charisma: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.state.charisma)}
                    </div>
                    <div className='box inspiration'>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.inspiration}
                            onChange={(e) => this.setState({ inspiration: e.target.value })}
                            floatingLabelText='Inspiration'
                            type='number'
                            style={{ width: '60%' }}
                        />
                    </div>
                    <div className='box proficiency'>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.proficiency_bonus ? this.state.proficiency_bonus : undefined}
                            onChange={(e) => this.setState({ proficiency_bonus: e.target.value })}
                            floatingLabelText='Proficieny Bonus'
                            type='number'
                            style={{ width: '60%' }}
                        />
                    </div>
                    <div className='box saving_throws'>
                        <Checkbox
                            label={` ${this.modifiers(this.state.strength, this.state.strength_saving_throw)}  Strength`}
                            checked={this.state.strength_saving_throw}
                            onCheck={() => this.setState({ strength_saving_throw: !this.state.strength_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.dexterity, this.state.dexterity_saving_throw)}  Dexterity`}
                            checked={this.state.dexterity_saving_throw}
                            onCheck={() => this.setState({ dexterity_saving_throw: !this.state.dexterity_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.constitution, this.state.constitution_saving_throw)}  Constitution`}
                            checked={this.state.constitution_saving_throw}
                            onCheck={() => this.setState({ constitution_saving_throw: !this.state.constitution_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.wisdom, this.state.wisdom_saving_throw)}  Wisdom`}
                            checked={this.state.wisdom_saving_throw}
                            onCheck={() => this.setState({ wisdom_saving_throw: !this.state.wisdom_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.intelligence, this.state.intelligence_saving_throw)}  Intelligence`}
                            checked={this.state.intelligence_saving_throw}
                            onCheck={() => this.setState({ intelligence_saving_throw: !this.state.intelligence_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.charisma, this.state.charisma_saving_throw)}  Charisma`}
                            checked={this.state.charisma_saving_throw}
                            onCheck={() => this.setState({ charisma_saving_throw: !this.state.charisma_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <h5>SAVING THROWS</h5>
                    </div>
                    <div className='box skills'>
                        <Checkbox
                            label={` ${this.modifiers(this.state.dexterity, this.state.acrobatics)}  Acrobatics (Dex)`}
                            checked={this.state.acrobatics}
                            onCheck={() => this.setState({ acrobatics: !this.state.acrobatics })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.wisdom, this.state.animal_handling)}  Animal Handling (Wis)`}
                            checked={this.state.animal_handling}
                            onCheck={() => this.setState({ animal_handling: !this.state.animal_handling })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.intelligence, this.state.arcana)}  Arcana (Int)`}
                            checked={this.state.arcana}
                            onCheck={() => this.setState({ arcana: !this.state.arcana })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.strength, this.state.athletics)}  Athletics (Str)`}
                            checked={this.state.athletics}
                            onCheck={() => this.setState({ athletics: !this.state.athletics })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.charisma, this.state.deception)}  Deception (Cha)`}
                            checked={this.state.deception}
                            onCheck={() => this.setState({ deception: !this.state.deception })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.intelligence, this.state.history)}  History (Int)`}
                            checked={this.state.history}
                            onCheck={() => this.setState({ history: !this.state.history })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.wisdom, this.state.insight)}  Insight (Wis)`}
                            checked={this.state.insight}
                            onCheck={() => this.setState({ insight: !this.state.insight })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.charisma, this.state.intimidation)}  Intimidation (Cha)`}
                            checked={this.state.intimidation}
                            onCheck={() => this.setState({ intimidation: !this.state.intimidation })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.intelligence, this.state.investigation)}  Investigation (Int)`}
                            checked={this.state.investigation}
                            onCheck={() => this.setState({ investigation: !this.state.investigation })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.wisdom, this.state.medicine)}  Medicine (Wis)`}
                            checked={this.state.medicine}
                            onCheck={() => this.setState({ medicine: !this.state.medicine })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.intelligence, this.state.nature)}  Nature (Int)`}
                            checked={this.state.nature}
                            onCheck={() => this.setState({ nature: !this.state.nature })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.wisdom, this.state.perception)}  Perception (Wis)`}
                            checked={this.state.perception}
                            onCheck={() => this.setState({ perception: !this.state.perception })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.charisma, this.state.performance)}  Performance (Cha)`}
                            checked={this.state.performance}
                            onCheck={() => this.setState({ performance: !this.state.performance })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.charisma, this.state.persuasion)}  Persuasion (Cha)`}
                            checked={this.state.persuasion}
                            onCheck={() => this.setState({ persuasion: !this.state.persuasion })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.intelligence, this.state.religion)}  Religion (Int)`}
                            checked={this.state.religion}
                            onCheck={() => this.setState({ religion: !this.state.religion })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.dexterity, this.state.sleight_of_hand)}  Sleight of Hand (Dex)`}
                            checked={this.state.sleight_of_hand}
                            onCheck={() => this.setState({ sleight_of_hand: !this.state.sleight_of_hand })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.dexterity, this.state.stealth)}  Stealth (Dex)`}
                            checked={this.state.stealth}
                            onCheck={() => this.setState({ stealth: !this.state.stealth })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.state.wisdom, this.state.survival)}  Survival (Wis)`}
                            checked={this.state.survival}
                            onCheck={() => this.setState({ survival: !this.state.survival })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <h5>SKILLS</h5>
                    </div>
                    <div className='box passive_wisdom'>
                        <h5>PASSIVE WISDOM (PERCEPTION): {this.passiveWisdom()}</h5>
                    </div>
                    <div className='box other_prof_languages'>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.languages}
                            onChange={(e) => this.setState({ languages: e.target.value })}
                            hintText='Languages'
                            floatingLabelText='Languages'
                            multiLine={true}
                            rows={2}
                        />
                        <TextField
                            id='text-field-controlled'
                            value={this.state.other_proficiencies}
                            onChange={(e) => this.setState({ other_proficiencies: e.target.value })}
                            hintText='Other Proficiencies'
                            floatingLabelText='Other Proficiencies'
                            multiLine={true}
                            rows={2}
                        />
                        <h5>OTHER PROFICIENCIES & LANGUAGES</h5>
                    </div>
                    <div className='box ac_hp'>
                        <TextField className='ac_hp_info'
                            id='text-field-controlled'
                            value={this.state.armor_class ? this.state.armor_class : undefined}
                            onChange={(e) => this.setState({ armor_class: e.target.value })}
                            floatingLabelText='Armor Class'
                            type='number'
                            style={{ width: '25%' }}
                        />
                        <TextField className='ac_hp_info'
                            id='text-field-controlled'
                            value={this.state.initiative ? this.state.initiative : undefined}
                            onChange={(e) => this.setState({ initiative: e.target.value })}
                            floatingLabelText='Initiative'
                            type='number'
                            style={{ width: '25%' }}
                        />
                        <TextField className='ac_hp_info'
                            id='text-field-controlled'
                            value={this.state.speed ? this.state.speed : undefined}
                            onChange={(e) => this.setState({ speed: e.target.value })}
                            floatingLabelText='Speed'
                            type='number'
                            style={{ width: '25%' }}
                        />
                        <TextField className='ac_hp_info'
                            id='text-field-controlled'
                            value={this.state.max_hit_points ? this.state.max_hit_points : undefined}
                            onChange={(e) => this.setState({ max_hit_points: e.target.value })}
                            floatingLabelText='Max HP'
                            type='number'
                            style={{ width: '25%' }}
                        />
                        <TextField className='ac_hp_info'
                            id='text-field-controlled'
                            value={this.state.current_hit_points ? this.state.current_hit_points : undefined}
                            onChange={(e) => this.setState({ current_hit_points: e.target.value })}
                            floatingLabelText='Current HP'
                            type='number'
                            style={{ width: '25%' }}
                        />
                        <TextField className='ac_hp_info'
                            id='text-field-controlled'
                            value={this.state.temp_hit_points}
                            onChange={(e) => this.setState({ temp_hit_points: e.target.value })}
                            floatingLabelText='Temporary HP'
                            type='number'
                            style={{ width: '30%' }}
                        />
                        <TextField
                            className='ac_hp_info'
                            id='text-field-controlled'
                            value={this.state.total_hit_dice}
                            onChange={(e) => this.setState({ total_hit_dice: e.target.value })}
                            floatingLabelText='Total Hit Dice'
                            style={{ width: '30%' }}
                        />
                        <TextField
                            className='ac_hp_info'
                            id='text-field-controlled'
                            value={this.state.current_hit_dice ? this.state.current_hit_dice : undefined}
                            onChange={(e) => this.setState({ current_hit_dice: e.target.value })}
                            floatingLabelText='Current Hit Dice'
                            type='number'
                            style={{ width: '40%' }}
                        />
                    </div>
                    <div className='box death_saves'>
                        <div className='successes'>
                            <Checkbox
                                className='saves'
                                checked={this.state.death_save_successes >= 1 ? true : false}
                                onCheck={(event, isInputChecked) => this.deathSaveSuccesses(isInputChecked)}
                                style={{ float: 'left', width: '1%' }}
                            />
                            <Checkbox
                                className='saves'
                                checked={this.state.death_save_successes >= 2 ? true : false}
                                onCheck={(event, isInputChecked) => this.deathSaveSuccesses(isInputChecked)}
                                style={{ float: 'left', width: '1%' }}
                            />
                            <Checkbox
                                className='saves'
                                checked={this.state.death_save_successes === 3 ? true : false}
                                onCheck={(event, isInputChecked) => this.deathSaveSuccesses(isInputChecked)}
                                style={{ float: 'left', width: '1%' }}
                                label='Successes'
                            />
                        </div>
                        <div className='failures'>
                            <Checkbox
                                className='saves'
                                checked={this.state.death_save_failures >= 1 ? true : false}
                                onCheck={(event, isInputChecked) => this.deathSaveFailures(isInputChecked)}
                                style={{ float: 'left', width: '1%' }}
                            />
                            <Checkbox
                                className='saves'
                                checked={this.state.death_save_failures >= 2 ? true : false}
                                onCheck={(event, isInputChecked) => this.deathSaveFailures(isInputChecked)}
                                style={{ float: 'left', width: '1%' }}
                            />
                            <Checkbox
                                className='saves'
                                checked={this.state.death_save_failures === 3 ? true : false}
                                onCheck={(event, isInputChecked) => this.deathSaveFailures(isInputChecked)}
                                style={{ float: 'left', width: '1%' }}
                                label='Failures'
                            />
                        </div>
                        <div>
                            <h5>DEATH SAVES</h5>
                        </div>
                    </div>
                    <div className='box weapons'>
                        <Weapons id={this.props.match.params.id} />
                    </div>
                    <div className='box equipment'>
                        <div className='money'>
                            <TextField
                                id='text-field-controlled'
                                value={this.state.copper}
                                onChange={(e) => this.setState({ copper: e.target.value })}
                                floatingLabelText='CP'
                                type='number'
                                style={{ width: '30%' }}
                            />
                            <TextField
                                id='text-field-controlled'
                                value={this.state.silver}
                                onChange={(e) => this.setState({ silver: e.target.value })}
                                floatingLabelText='SP'
                                type='number'
                                style={{ width: '30%' }}
                            />
                            <TextField
                                id='text-field-controlled'
                                value={this.state.electrum}
                                onChange={(e) => this.setState({ electrum: e.target.value })}
                                floatingLabelText='EP'
                                type='number'
                                style={{ width: '30%' }}
                            />
                            <TextField
                                id='text-field-controlled'
                                value={this.state.gold}
                                onChange={(e) => this.setState({ gold: e.target.value })}
                                floatingLabelText='GP'
                                type='number'
                                style={{ width: '30%' }}
                            />
                            <TextField
                                id='text-field-controlled'
                                value={this.state.platinum}
                                onChange={(e) => this.setState({ platinum: e.target.value })}
                                floatingLabelText='PP'
                                type='number'
                                style={{ width: '30%' }}
                            />
                        </div>
                        <h5>EQUIPMENT</h5>
                    </div>
                    <div className='box traits personality'>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.personality_traits}
                            onChange={(e) => this.setState({ personality_traits: e.target.value })}
                            hintText='Personality Traits'
                            floatingLabelText='Personality Traits'
                            multiLine={true}
                            rows={2}
                        />
                        <h5>PERSONALITY TRAITS</h5>
                    </div>
                    <div className='box traits ideals'>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.ideals}
                            onChange={(e) => this.setState({ ideals: e.target.value })}
                            hintText='Ideals'
                            floatingLabelText='Ideals'
                            multiLine={true}
                            rows={2}
                        />
                        <h5>IDEALS</h5>
                    </div>
                    <div className='box traits bonds'>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.bonds}
                            onChange={(e) => this.setState({ bonds: e.target.value })}
                            hintText='Bonds'
                            floatingLabelText='Bonds'
                            multiLine={true}
                            rows={2}
                        />
                        <h5>BONDS</h5>
                    </div>
                    <div className='box traits flaws'>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.flaws}
                            onChange={(e) => this.setState({ flaws: e.target.value })}
                            hintText='Flaws'
                            floatingLabelText='Flaws'
                            multiLine={true}
                            rows={2}
                        />
                        <h5>FLAWS</h5>
                    </div>
                    <div className='box spells'>
                        <h5>SPELLS</h5>
                    </div>
                    <div className='box feature_traits'>
                        <TextField
                            id='text-field-controlled'
                            value={this.state.features}
                            onChange={(e) => this.setState({ features: e.target.value })}
                            hintText='Features'
                            floatingLabelText='Features'
                            multiLine={true}
                            rows={2}
                        />
                        <TextField
                            id='text-field-controlled'
                            value={this.state.traits}
                            onChange={(e) => this.setState({ traits: e.target.value })}
                            hintText='Traits'
                            floatingLabelText='Traits'
                            multiLine={true}
                            rows={2}
                        />
                        <h5>FEATURES & TRAITS</h5>
                    </div>
                    <FloatingActionButton className='undo' children={<Undo />} onClick={() => this.componentDidMount()} secondary={true} />
                    <FloatingActionButton className='save' children={<Save />} onClick={() => this.save()} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
        character_weapons: state.character_weapons
    };
}

export default connect(mapStateToProps, { getUser, getCharacter, saveCharacter, createCharacter, resetCharacter })(Character);
