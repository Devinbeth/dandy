import axios from 'axios';


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
    character_weapons: [{}]
};


//CONSTANTS
const GET_USER = 'GET_USER';
const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTER = 'GET_CHARACTER';
const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
const SAVE_CHARACTER = 'SAVE_CHARACTER';
const CREATE_CHARACTER = 'CREATE_CHARACTER';
const RESET_CHARACTER = 'RESET_CHARACTER';
const GET_WEAPONS = 'GET_WEAPONS';
const SAVE_WEAPON = 'SAVE_WEAPON';
const REMOVE_WEAPON = 'REMOVE_WEAPON';
const EDIT_WEAPON = 'EDIT_WEAPON';


//ACTION BUILDERS
export function getUser() {
    let userData = axios.get('/auth/me').then(res => res.data);
    return {
        type: GET_USER,
        payload: userData
    };
}

export function getCharacters() {
    let charactersData = axios.get('/api/characters').then(res => res.data);
    return {
        type: GET_CHARACTERS,
        payload: charactersData
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

export function removeWeapon(id) {
    let weapons = axios.delete(`/api/weapons/${id}`).then(res => res.data);
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


//REDUCER
export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });

        case GET_CHARACTERS + '_FULFILLED':
            return Object.assign({}, state, { characters: action.payload });

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

        case GET_WEAPONS + '_FULFILLED':
            return Object.assign({}, state, { character_weapons: action.payload });

        case SAVE_WEAPON + '_FULFILLED':
            return Object.assign({}, state, { character_weapons: action.payload });

        case REMOVE_WEAPON + '_FULFILLED':
            return Object.assign({}, state, { character_weapons: action.payload });

        case EDIT_WEAPON + '_FULFILLED':
            return Object.assign({}, state, { character_weapons: action.payload });

        default:
            return state;
    }
}