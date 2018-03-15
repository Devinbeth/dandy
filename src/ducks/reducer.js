import axios from 'axios';


const initialState = {
    user: {},
    characters: [{}],
    character: [{}],
    character_weapons: [{}]
};


//CONSTANTS
const GET_USER = 'GET_USER';
const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTER = 'GET_CHARACTER';
const SAVE_CHARACTER = 'SAVE_CHARACTER';
const GET_WEAPONS = 'GET_WEAPONS';


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

export function saveCharacter(id, character) {
    console.log(character);
    let savedCharacter = axios.put(`/api/character/${id}`, character).then(res => res.data);
    return {
        type: SAVE_CHARACTER,
        payload: savedCharacter
    };
}

export function getWeapons(id) {
    let weapons = axios.get(`/api/weapons/${id}`).then(res => res.data);
    return {
        type: GET_WEAPONS,
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

        case SAVE_CHARACTER + '_FULFILLED':
            return Object.assign({}, state, { character: action.payload });

        case GET_WEAPONS + '_FULFILLED':
            return Object.assign({}, state, { character_weapons: action.payload });

        default:
            return state;
    }
}