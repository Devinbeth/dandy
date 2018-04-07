import axios from 'axios';

// STATE
const initialState = {
    user: {},
    characters: [{}],
    character: {
        id: 0,
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
    },
    characterWeapons: [{}],
    characterArmor: [{}],
    characterSpells: [{}],
    allWeapons: [{}],
    allArmor: [{}],
    allSpells: [{}],
    alignment: [{}]
};


//CONSTANTS
// USER CONSTANTS
const GET_USER = 'GET_USER';
const SAVE_USER = 'SAVE_USER';
// CHARACTER CONSTANTS
const GET_CHARACTERS = 'GET_CHARACTERS';
const SET_CHARACTER = 'SET_CHARACTER';
const GET_CHARACTER = 'GET_CHARACTER';
const UPDATE_CHARACTER = 'UPDATE_CHARACTER';
const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
const SAVE_CHARACTER = 'SAVE_CHARACTER';
const CREATE_CHARACTER = 'CREATE_CHARACTER';
const RESET_CHARACTER = 'RESET_CHARACTER';
// WEAPONS CONSTANTS
const GET_WEAPONS = 'GET_WEAPONS';
const SAVE_WEAPON = 'SAVE_WEAPON';
const REMOVE_WEAPON = 'REMOVE_WEAPON';
const EDIT_WEAPON = 'EDIT_WEAPON';
// ARMOR CONSTANTS
const GET_ARMOR = 'GET_ARMOR';
const SAVE_ARMOR = 'SAVE_ARMOR';
const REMOVE_ARMOR = 'REMOVE_ARMOR';
//const EDIT_ARMOR = 'EDIT_ARMOR';
// SPELLS CONSTANTS
const GET_SPELLS = 'GET_SPELLS';
const SAVE_SPELL = 'SAVE_SPELL';
const REMOVE_SPELL = 'REMOVE_SPELL';
//const EDIT_SPELL = 'EDIT_SPELL';
// INFO CONSTANTS
const GET_ALL_WEAPONS = 'GET_ALL_WEAPONS';
const GET_ALL_ARMOR = 'GET_ALL_ARMOR';
const GET_ALL_SPELLS = 'GET_ALL_SPELLS';
const GET_ALIGNMENT = 'GET_ALIGNMENT';


//ACTION BUILDERS
export function getUser() {
    let userData = axios.get('/auth/me').then(res => res.data);
    return {
        type: GET_USER,
        payload: userData
    };
}

export function saveUser(user) {
    let updatedUser = axios.put('/user', user).then(res => res.data);
    return {
        type: SAVE_USER,
        payload: updatedUser
    };
}

// CHARACTER ACTION BUILDERS
export function getCharacters() {
    let charactersData = axios.get('/api/characters').then(res => res.data);
    return {
        type: GET_CHARACTERS,
        payload: charactersData
    };
}

export function setCharacter(character) {
    return {
        type: SET_CHARACTER,
        payload: character
    };
}

export function getCharacter(id) {
    let characterData = axios.get(`/api/character/${id}`).then(res => res.data);
    return {
        type: GET_CHARACTER,
        payload: characterData
    };
}

export function removeCharacter(id) {
    let removedData = axios.delete(`/api/character/${id}`).then(res => res.data);
    return {
        type: REMOVE_CHARACTER,
        payload: removedData
    };
}

export function updateCharacter(update) {
    return {
        type: UPDATE_CHARACTER,
        payload: update
    };
}

export function saveCharacter(id, character) {
    let savedCharacter = axios.put(`/api/character/${id}`, character).then(res => res.data);
    return {
        type: SAVE_CHARACTER,
        payload: savedCharacter
    };
}

export function createCharacter(character) {
    let createdCharacter = axios.post(`/api/character`, character).then(res => res.data);
    return {
        type: CREATE_CHARACTER,
        payload: createdCharacter
    };
}

export function resetCharacter() {
    return {
        type: RESET_CHARACTER,
        payload: initialState.character
    };
}

// WEAPON ACTION BUILDERS
export function getWeapons(id) {
    let weapons = axios.get(`/api/weapons/${id}`).then(res => res.data);
    return {
        type: GET_WEAPONS,
        payload: weapons
    };
}

export function saveWeapon(weapon) {
    let weapons = axios.post(`/api/weapons`, weapon).then(res => res.data);
    return {
        type: SAVE_WEAPON,
        payload: weapons
    };
}

export function removeWeapon(id, obj) {
    let weapons = axios.delete(`/api/weapons/${id}`, obj).then(res => res.data);
    return {
        type: REMOVE_WEAPON,
        payload: weapons
    };
}

export function editWeapon(id, weapon) {
    let weapons = axios.put(`/api/weapons/${id}`, weapon).then(res => res.data);
    return {
        type: EDIT_WEAPON,
        payload: weapons
    };
}

// ARMOR ACTION BUILDERS
export function getArmor(id) {
    let armor = axios.get(`/api/armor/${id}`).then(res => res.data);
    return {
        type: GET_ARMOR,
        payload: armor
    };
}

export function saveArmor(armor) {
    let savedArmor = axios.post(`/api/armor`, armor).then(res => res.data);
    return {
        type: SAVE_ARMOR,
        payload: savedArmor
    };
}

export function removeArmor(id) {
    let removedArmor = axios.delete(`/api/armor/${id}`).then(res => res.data);
    return {
        type: REMOVE_ARMOR,
        payload: removedArmor
    };
}

// SPELL ACTION BUILDERS
export function getSpells(id) {
    let spells = axios.get(`/api/spells/${id}`).then(res => res.data);
    return {
        type: GET_SPELLS,
        payload: spells
    };
}

export function saveSpell(spell) {
    let savedSpell = axios.post(`/api/spells`, spell).then(res => res.data);
    return {
        type: SAVE_SPELL,
        payload: savedSpell
    };
}

export function removeSpell(id) {
    let removedSpell = axios.delete(`/api/spells/${id}`).then(res => res.data);
    return {
        type: REMOVE_SPELL,
        payload: removedSpell
    };
}

// INFO ACTION BUILDERS
export function getAllWeapons() {
    let allWeapons = axios.get(`/api/info/weapons`).then(res => res.data);
    return {
        type: GET_ALL_WEAPONS,
        payload: allWeapons
    };
}

export function getAllArmor() {
    let allArmor = axios.get(`/api/info/armor`).then(res => res.data);
    return {
        type: GET_ALL_ARMOR,
        payload: allArmor
    };
}

export function getAllSpells() {
    let allSpells = axios.get(`/api/info/spells`).then(res => res.data);
    return {
        type: GET_ALL_SPELLS,
        payload: allSpells
    };
}

export function getAlignment() {
    let alignment = axios.get(`/api/info/alignment`).then(res => res.data);
    return {
        type: GET_ALIGNMENT,
        payload: alignment
    };
}


//REDUCER
export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });

        case SAVE_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });

        // CHARACTER REDUCER
        case GET_CHARACTERS + '_FULFILLED':
            return Object.assign({}, state, { characters: action.payload });

        case SET_CHARACTER:
            return Object.assign({}, state, { character: action.payload });

        case UPDATE_CHARACTER:
            let updatedCharacter = Object.assign({}, state.character, action.payload);
            return Object.assign({}, state, { character: updatedCharacter });

        case GET_CHARACTER + '_FULFILLED':
            return Object.assign({}, state, { character: action.payload });

        case REMOVE_CHARACTER + '_FULFILLED':
            return Object.assign({}, state, { characters: action.payload });

        case SAVE_CHARACTER + '_FULFILLED':
            return Object.assign({}, state, { character: action.payload });

        case CREATE_CHARACTER + '_FULFILLED':
            return Object.assign({}, state, { character: action.payload });

        case RESET_CHARACTER:
            return Object.assign({}, state, { character: action.payload });

        // WEAPONS REDUCER
        case GET_WEAPONS + '_FULFILLED':
            return Object.assign({}, state, { characterWeapons: action.payload });

        case SAVE_WEAPON + '_FULFILLED':
            return Object.assign({}, state, { characterWeapons: action.payload });

        case REMOVE_WEAPON + '_FULFILLED':
            return Object.assign({}, state, { characterWeapons: action.payload });

        case EDIT_WEAPON + '_FULFILLED':
            return Object.assign({}, state, { characterWeapons: action.payload });

        // ARMOR REDUCER
        case GET_ARMOR + '_FULFILLED':
            return Object.assign({}, state, { characterArmor: action.payload });

        case SAVE_ARMOR + '_FULFILLED':
            return Object.assign({}, state, { characterArmor: action.payload });

        case REMOVE_ARMOR + '_FULFILLED':
            return Object.assign({}, state, { characterArmor: action.payload });

        // SPELL REDUCER
        case GET_SPELLS + '_FULFILLED':
            return Object.assign({}, state, { characterSpells: action.payload });

        case SAVE_SPELL + '_FULFILLED':
            return Object.assign({}, state, { characterSpells: action.payload });

        case REMOVE_SPELL + '_FULFILLED':
            return Object.assign({}, state, { characterSpells: action.payload });

        // INFO REDUCER
        case GET_ALL_WEAPONS + '_FULFILLED':
            return Object.assign({}, state, { allWeapons: action.payload });

        case GET_ALL_ARMOR + '_FULFILLED':
            return Object.assign({}, state, { allArmor: action.payload });

        case GET_ALL_SPELLS + '_FULFILLED':
            return Object.assign({}, state, { allSpells: action.payload });

        case GET_ALIGNMENT + '_FULFILLED':
            return Object.assign({}, state, { alignment: action.payload });

        default:
            return state;
    }
}