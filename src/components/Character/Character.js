import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCharacter, updateCharacter, saveCharacter, createCharacter, resetCharacter, getWeapons, getArmor, getSpells, getAllWeapons, getAllArmor, getAllSpells, getAlignment } from '../../ducks/reducer.js';
import './Character.css';
import Header from '../Header/Header.js';
import Race from './Race.js';
import Class from './Class.js';
import Alignment from '../Alignment/Alignment.js';
import Background from './Background.js';
import Weapons from '../Weapons/Weapons.js';
import Equipment from '../Equipment/Equipment.js';
import Spells from '../Spells/Spells.js';
import logo from '../../assets/svg_logos/dark_logo_transparent.svg';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Save from 'material-ui/svg-icons/content/save';
import Undo from 'material-ui/svg-icons/content/undo';

class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acBox: false,
            initiativeBox: false,
            speedBox: false,
            maxHpBox: false,
            currentHpBox: false,
            tempHpBox: false
        }
        this.save = this.save.bind(this);
        this.proficiencyBonus = this.proficiencyBonus.bind(this);
        this.abilityModifiers = this.abilityModifiers.bind(this);
        this.modifiers = this.modifiers.bind(this);
        this.deathSaveSuccesses = this.deathSaveSuccesses.bind(this);
        this.deathSaveFailures = this.deathSaveFailures.bind(this);
    }

    componentDidMount() {
        if (Number(this.props.match.params.id)) {
            this.props.getCharacter(this.props.match.params.id);
            this.props.getWeapons(this.props.match.params.id);
            this.props.getArmor(this.props.match.params.id);
            this.props.getSpells(this.props.match.params.id);
            this.props.getAllWeapons();
            this.props.getAllArmor();
            this.props.getAllSpells();
            this.props.getAlignment();
        }
        else {
            this.props.resetCharacter();
        }
    }

    save() {
        if (Number(this.props.match.params.id)) {
            this.props.saveCharacter(this.props.match.params.id, this.props.character);
        }
        else {
            this.props.createCharacter(this.props.character);
        }
    }

    proficiencyBonus(level) {
        if (level < 5) {
            this.props.updateCharacter({ proficiency_bonus: 2 })
        }
        else if (level < 9) {
            this.props.updateCharacter({ proficiency_bonus: 3 })
        }
        else if (level < 13) {
            this.props.updateCharacter({ proficiency_bonus: 4 })
        }
        else if (level < 17) {
            this.props.updateCharacter({ proficiency_bonus: 5 })
        }
        else if (level < 20) {
            this.props.updateCharacter({ proficiency_bonus: 6 })
        }
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
            num += Number(this.props.character.proficiency_bonus);
        }
        let modifier = num > 0 ? `+${num}` : num;
        return modifier;
    }

    deathSaveSuccesses(checked) {
        if (checked) {
            this.props.updateCharacter({ death_save_successes: this.props.character.death_save_successes + 1 });
        }
        else {
            this.props.updateCharacter({ death_save_successes: this.props.character.death_save_successes - 1 });
        }
    }

    deathSaveFailures(checked) {
        if (checked) {
            this.props.updateCharacter({ death_save_failures: this.props.character.death_save_failures + 1 });
        }
        else {
            this.props.updateCharacter({ death_save_failures: this.props.character.death_save_failures - 1 });
        }
    }

    render() {
        return (
            <div className='Character'>
                <Header title={this.props.character.name ? this.props.character.name : null}/>
                <div className='character_sheet'>
                    <div className=' box character_name'>
                        <div><img className='logo' src={logo} alt='' /></div>
                        <div>
                            <TextField
                                className='basic_info_text'
                                id='text-field-controlled'
                                value={this.props.character.name}
                                onChange={(e) => this.props.updateCharacter({ name: e.target.value })}
                                floatingLabelText='Character Name'
                                style={{ width: '75%' }}
                            />
                        </div>
                    </div>
                    <div className='box basic_info'>
                        <div className='race'>
                            <Race />
                        </div>
                        <div className='class'>
                            <Class />
                        </div>
                        <TextField
                            className='level'
                            id='text-field-controlled'
                            value={this.props.character.level ? this.props.character.level : ''}
                            onChange={(e) => {
                                this.props.updateCharacter({ level: Number(e.target.value) });
                                this.proficiencyBonus(Number(e.target.value));
                            }}
                            floatingLabelText='Level'
                            type='number'
                            style={{ width: '90%' }}
                        />
                        <TextField
                            className='xp'
                            id='text-field-controlled'
                            value={this.props.character.xp ? this.props.character.xp : ''}
                            onChange={(e) => this.props.updateCharacter({ xp: Number(e.target.value) })}
                            floatingLabelText='XP'
                            type='number'
                            style={{ width: '90%' }}
                        />
                        <div className='background'>
                            <Background />
                        </div>
                        <div className='alignment'>
                            <Alignment />
                        </div>
                    </div>
                    <div className='box abilities strength'>
                        <h5>STRENGTH</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.strength ? this.props.character.strength : ''}
                            onChange={(e) => this.props.updateCharacter({ strength: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.props.character.strength)}
                    </div>
                    <div className='box abilities dexterity'>
                        <h5>DEXTERITY</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.dexterity ? this.props.character.dexterity : ''}
                            onChange={(e) => this.props.updateCharacter({ dexterity: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.props.character.dexterity)}
                    </div>
                    <div className='box abilities constitution'>
                        <h5>CONSTITUTION
                            </h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.constitution ? this.props.character.constitution : ''}
                            onChange={(e) => this.props.updateCharacter({ constitution: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.props.character.constitution)}
                    </div>
                    <div className='box abilities intelligence'>
                        <h5>INTELLIGENCE</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.intelligence ? this.props.character.intelligence : ''}
                            onChange={(e) => this.props.updateCharacter({ intelligence: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.props.character.intelligence)}
                    </div>
                    <div className='box abilities wisdom'>
                        <h5>WISDOM</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.wisdom ? this.props.character.wisdom : ''}
                            onChange={(e) => this.props.updateCharacter({ wisdom: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.props.character.wisdom)}
                    </div>
                    <div className='box abilities charisma'>
                        <h5>CHARISMA</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.charisma ? this.props.character.charisma : ''}
                            onChange={(e) => this.props.updateCharacter({ charisma: Number(e.target.value) })}
                            style={{ width: '75%' }}
                            inputStyle={{ textAlign: 'center' }}
                        /><br />
                        {this.abilityModifiers(this.props.character.charisma)}
                    </div>
                    <div className='box skills'>
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.dexterity, this.props.character.acrobatics)}  Acrobatics (Dex)`}
                            checked={this.props.character.acrobatics}
                            onCheck={() => this.props.updateCharacter({ acrobatics: !this.props.character.acrobatics })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.wisdom, this.props.character.animal_handling)}  Animal Handling (Wis)`}
                            checked={this.props.character.animal_handling}
                            onCheck={() => this.props.updateCharacter({ animal_handling: !this.props.character.animal_handling })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.intelligence, this.props.character.arcana)}  Arcana (Int)`}
                            checked={this.props.character.arcana}
                            onCheck={() => this.props.updateCharacter({ arcana: !this.props.character.arcana })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.strength, this.props.character.athletics)}  Athletics (Str)`}
                            checked={this.props.character.athletics}
                            onCheck={() => this.props.updateCharacter({ athletics: !this.props.character.athletics })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.charisma, this.props.character.deception)}  Deception (Cha)`}
                            checked={this.props.character.deception}
                            onCheck={() => this.props.updateCharacter({ deception: !this.props.character.deception })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.intelligence, this.props.character.history)}  History (Int)`}
                            checked={this.props.character.history}
                            onCheck={() => this.props.updateCharacter({ history: !this.props.character.history })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.wisdom, this.props.character.insight)}  Insight (Wis)`}
                            checked={this.props.character.insight}
                            onCheck={() => this.props.updateCharacter({ insight: !this.props.character.insight })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.charisma, this.props.character.intimidation)}  Intimidation (Cha)`}
                            checked={this.props.character.intimidation}
                            onCheck={() => this.props.updateCharacter({ intimidation: !this.props.character.intimidation })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.intelligence, this.props.character.investigation)}  Investigation (Int)`}
                            checked={this.props.character.investigation}
                            onCheck={() => this.props.updateCharacter({ investigation: !this.props.character.investigation })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.wisdom, this.props.character.medicine)}  Medicine (Wis)`}
                            checked={this.props.character.medicine}
                            onCheck={() => this.props.updateCharacter({ medicine: !this.props.character.medicine })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.intelligence, this.props.character.nature)}  Nature (Int)`}
                            checked={this.props.character.nature}
                            onCheck={() => this.props.updateCharacter({ nature: !this.props.character.nature })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.wisdom, this.props.character.perception)}  Perception (Wis)`}
                            checked={this.props.character.perception}
                            onCheck={() => this.props.updateCharacter({ perception: !this.props.character.perception })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.charisma, this.props.character.performance)}  Performance (Cha)`}
                            checked={this.props.character.performance}
                            onCheck={() => this.props.updateCharacter({ performance: !this.props.character.performance })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.charisma, this.props.character.persuasion)}  Persuasion (Cha)`}
                            checked={this.props.character.persuasion}
                            onCheck={() => this.props.updateCharacter({ persuasion: !this.props.character.persuasion })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.intelligence, this.props.character.religion)}  Religion (Int)`}
                            checked={this.props.character.religion}
                            onCheck={() => this.props.updateCharacter({ religion: !this.props.character.religion })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.dexterity, this.props.character.sleight_of_hand)}  Sleight of Hand (Dex)`}
                            checked={this.props.character.sleight_of_hand}
                            onCheck={() => this.props.updateCharacter({ sleight_of_hand: !this.props.character.sleight_of_hand })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.dexterity, this.props.character.stealth)}  Stealth (Dex)`}
                            checked={this.props.character.stealth}
                            onCheck={() => this.props.updateCharacter({ stealth: !this.props.character.stealth })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.wisdom, this.props.character.survival)}  Survival (Wis)`}
                            checked={this.props.character.survival}
                            onCheck={() => this.props.updateCharacter({ survival: !this.props.character.survival })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <h5>SKILLS</h5>
                    </div>
                    <div className='box proficiency'>
                        <h5>PROFICIENCY BONUS: {`+${this.props.character.proficiency_bonus}`}</h5>
                    </div>
                    <div className='box inspiration'>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.inspiration ? this.props.character.inspiration : ''}
                            onChange={(e) => this.props.updateCharacter({ inspiration: Number(e.target.value) })}
                            floatingLabelText='Inspiration'
                            type='number'
                            style={{ width: '60%' }}
                        />
                    </div>
                    <div className='box saving_throws'>
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.strength, this.props.character.strength_saving_throw)}  Strength`}
                            checked={this.props.character.strength_saving_throw}
                            onCheck={() => this.props.updateCharacter({ strength_saving_throw: !this.props.character.strength_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.dexterity, this.props.character.dexterity_saving_throw)}  Dexterity`}
                            checked={this.props.character.dexterity_saving_throw}
                            onCheck={() => this.props.updateCharacter({ dexterity_saving_throw: !this.props.character.dexterity_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.constitution, this.props.character.constitution_saving_throw)}  Constitution`}
                            checked={this.props.character.constitution_saving_throw}
                            onCheck={() => this.props.updateCharacter({ constitution_saving_throw: !this.props.character.constitution_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.wisdom, this.props.character.wisdom_saving_throw)}  Wisdom`}
                            checked={this.props.character.wisdom_saving_throw}
                            onCheck={() => this.props.updateCharacter({ wisdom_saving_throw: !this.props.character.wisdom_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.intelligence, this.props.character.intelligence_saving_throw)}  Intelligence`}
                            checked={this.props.character.intelligence_saving_throw}
                            onCheck={() => this.props.updateCharacter({ intelligence_saving_throw: !this.props.character.intelligence_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <Checkbox
                            label={` ${this.modifiers(this.props.character.charisma, this.props.character.charisma_saving_throw)}  Charisma`}
                            checked={this.props.character.charisma_saving_throw}
                            onCheck={() => this.props.updateCharacter({ charisma_saving_throw: !this.props.character.charisma_saving_throw })}
                            iconStyle={{ margin: '0 3%' }}
                            labelStyle={{ width: '150px' }}
                        />
                        <h5>SAVING THROWS</h5>
                    </div>
                    <div className='box passive_wisdom'>
                        <h5>PASSIVE WISDOM (PERCEPTION): {10 + Number(this.modifiers(this.props.character.wisdom, this.props.character.perception))}</h5>
                    </div>
                    <div className='box other_prof'>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.languages ? this.props.character.languages : ''}
                            onChange={(e) => this.props.updateCharacter({ languages: e.target.value })}
                            hintText='Languages'
                            floatingLabelText='Languages'
                            multiLine={true}
                            rows={2}
                        />
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.other_proficiencies ? this.props.character.other_proficiencies : ''}
                            onChange={(e) => this.props.updateCharacter({ other_proficiencies: e.target.value })}
                            hintText='Other Proficiencies'
                            floatingLabelText='Other Proficiencies'
                            multiLine={true}
                            rows={2}
                        />
                        <h5>OTHER PROFICIENCIES & LANGUAGES</h5>
                    </div>
                    <div className={`${this.state.acBox ? 'active' : 'box'} ac`} onClick={() => this.setState({ acBox: !this.state.acBox })}>
                        <h5>ARMOR CLASS</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.armor_class ? this.props.character.armor_class : ''}
                            onChange={(e) => this.props.updateCharacter({ armor_class: Number(e.target.value) })}
                            style={{ width: '50%' }}
                            inputStyle={{ textAlign: 'center' }}
                        />
                    </div>
                    <div className={`${this.state.initiativeBox ? 'active' : 'box'} initiative`} onClick={() => this.setState({ initiativeBox: !this.state.initiativeBox })}>
                        <h5>INITIATIVE</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.initiative ? this.props.character.initiative : ''}
                            onChange={(e) => this.props.updateCharacter({ initiative: Number(e.target.value) })}
                            style={{ width: '50%' }}
                            inputStyle={{ textAlign: 'center' }}
                        />
                    </div>
                    <div className={`${this.state.speedBox ? 'active' : 'box'} speed`} onClick={() => this.setState({ speedBox: !this.state.speedBox })}>
                        <h5>SPEED</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.speed ? this.props.character.speed : ''}
                            onChange={(e) => this.props.updateCharacter({ speed: Number(e.target.value) })}
                            style={{ width: '50%' }}
                            inputStyle={{ textAlign: 'center' }}
                        />
                    </div>
                    <div className={`${this.state.maxHpBox ? 'active' : 'box'} max_hp`} onClick={() => this.setState({ maxHpBox: !this.state.maxHpBox })}>
                        <h5>MAX HIT POINTS</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.max_hit_points ? this.props.character.max_hit_points : ''}
                            onChange={(e) => this.props.updateCharacter({ max_hit_points: Number(e.target.value) })}
                            style={{ width: '50%' }}
                            inputStyle={{ textAlign: 'center' }}
                        />
                    </div>
                    <div className={`${this.state.currentHpBox ? 'active' : 'box'} current_hp`} onClick={() => this.setState({ currentHpBox: !this.state.currentHpBox })}>
                        <h5>CURRENT HP</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.current_hit_points ? this.props.character.current_hit_points : ''}
                            onChange={(e) => this.props.updateCharacter({ current_hit_points: Number(e.target.value) })}
                            style={{ width: '50%' }}
                            inputStyle={{ textAlign: 'center' }}
                        />
                    </div>
                    <div className={`${this.state.tempHpBox ? 'active' : 'box'} temp_hp`} onClick={() => this.setState({ tempHpBox: !this.state.tempHpBox })}>
                        <h5>TEMP HP</h5>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.temp_hit_points ? this.props.character.temp_hit_points : ''}
                            onChange={(e) => this.props.updateCharacter({ temp_hit_points: Number(e.target.value) })}
                            style={{ width: '50%' }}
                            inputStyle={{ textAlign: 'center' }}
                        />
                    </div>
                    <div className='box hit_dice'>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.total_hit_dice}
                            onChange={(e) => this.props.updateCharacter({ total_hit_dice: e.target.value })}
                            floatingLabelText='Hit Dice'
                            style={{ width: '30%' }}
                        />
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.current_hit_dice ? this.props.character.current_hit_dice : ''}
                            onChange={(e) => this.props.updateCharacter({ current_hit_dice: Number(e.target.value) })}
                            floatingLabelText='Current HD'
                            type='number'
                            style={{ width: '40%' }}
                        />
                    </div>
                    <div className='box weapons'>
                        <Weapons />
                    </div>
                    <div className='box equipment'>
                        <Equipment />
                    </div>
                    <div className='box spells'>
                        <Spells />
                    </div>
                    <div className='box money'>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.copper ? this.props.character.copper : ''}
                            onChange={(e) => this.props.updateCharacter({ copper: Number(e.target.value) })}
                            floatingLabelText='Copper'
                            floatingLabelFixed={true}
                            type='number'
                            style={{ width: '70px' }}
                        />
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.silver ? this.props.character.silver : ''}
                            onChange={(e) => this.props.updateCharacter({ silver: Number(e.target.value) })}
                            floatingLabelText='Silver'
                            floatingLabelFixed={true}
                            type='number'
                            style={{ width: '70px' }}
                        />
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.electrum ? this.props.character.electrum : ''}
                            onChange={(e) => this.props.updateCharacter({ electrum: Number(e.target.value) })}
                            floatingLabelText='Electrum'
                            floatingLabelFixed={true}
                            type='number'
                            style={{ width: '70px' }}
                        />
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.gold ? this.props.character.gold : ''}
                            onChange={(e) => this.props.updateCharacter({ gold: Number(e.target.value) })}
                            floatingLabelText='Gold'
                            floatingLabelFixed={true}
                            type='number'
                            style={{ width: '70px' }}
                        />
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.platinum ? this.props.character.platinum : ''}
                            onChange={(e) => this.props.updateCharacter({ platinum: Number(e.target.value) })}
                            floatingLabelText='Platinum'
                            floatingLabelFixed={true}
                            type='number'
                            style={{ width: '70px' }}
                        />
                    </div>
                    <div className='box death_saves'>
                        <div className='saves'>
                            <div className='successes'>
                                <Checkbox
                                    className='saves'
                                    checked={this.props.character.death_save_successes >= 1 ? true : false}
                                    onCheck={(event, isInputChecked) => this.deathSaveSuccesses(isInputChecked)}
                                    style={{ float: 'left', width: '1%' }}
                                />
                                <Checkbox
                                    className='saves'
                                    checked={this.props.character.death_save_successes >= 2 ? true : false}
                                    onCheck={(event, isInputChecked) => this.deathSaveSuccesses(isInputChecked)}
                                    style={{ float: 'left', width: '1%' }}
                                />
                                <Checkbox
                                    className='saves'
                                    checked={this.props.character.death_save_successes === 3 ? true : false}
                                    onCheck={(event, isInputChecked) => this.deathSaveSuccesses(isInputChecked)}
                                    style={{ float: 'left', width: '1%' }}
                                    label='Successes'
                                />
                            </div>
                            <div className='failures'>
                                <Checkbox
                                    className='saves'
                                    checked={this.props.character.death_save_failures >= 1 ? true : false}
                                    onCheck={(event, isInputChecked) => this.deathSaveFailures(isInputChecked)}
                                    style={{ float: 'left', width: '1%' }}
                                />
                                <Checkbox
                                    className='saves'
                                    checked={this.props.character.death_save_failures >= 2 ? true : false}
                                    onCheck={(event, isInputChecked) => this.deathSaveFailures(isInputChecked)}
                                    style={{ float: 'left', width: '1%' }}
                                />
                                <Checkbox
                                    className='saves'
                                    checked={this.props.character.death_save_failures === 3 ? true : false}
                                    onCheck={(event, isInputChecked) => this.deathSaveFailures(isInputChecked)}
                                    style={{ float: 'left', width: '1%' }}
                                    label='Failures'
                                />
                            </div>
                        </div>
                        <h5>DEATH SAVES</h5>
                    </div>
                    <div className='box traits personality'>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.personality_traits}
                            onChange={(e) => this.props.updateCharacter({ personality_traits: e.target.value })}
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
                            value={this.props.character.ideals}
                            onChange={(e) => this.props.updateCharacter({ ideals: e.target.value })}
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
                            value={this.props.character.bonds}
                            onChange={(e) => this.props.updateCharacter({ bonds: e.target.value })}
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
                            value={this.props.character.flaws}
                            onChange={(e) => this.props.updateCharacter({ flaws: e.target.value })}
                            hintText='Flaws'
                            floatingLabelText='Flaws'
                            multiLine={true}
                            rows={2}
                        />
                        <h5>FLAWS</h5>
                    </div>
                    <div className='box feature_traits'>
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.features}
                            onChange={(e) => this.props.updateCharacter({ features: e.target.value })}
                            hintText='Features'
                            floatingLabelText='Features'
                            multiLine={true}
                            rows={2}
                        />
                        <TextField
                            id='text-field-controlled'
                            value={this.props.character.traits}
                            onChange={(e) => this.props.updateCharacter({ traits: e.target.value })}
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
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        character: state.character,
    };
}

export default connect(mapStateToProps, { getCharacter, updateCharacter, saveCharacter, createCharacter, resetCharacter, getWeapons, getArmor, getSpells, getAllWeapons, getAllArmor, getAllSpells, getAlignment })(Character);
