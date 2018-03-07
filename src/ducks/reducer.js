import axios from 'axios';

const initialState = {
    user: {},
    characters: [],
    character: []
};

const GET_USER = 'GET_USER';
const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTER = 'GET_CHARACTER';

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

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case GET_CHARACTERS + '_FULFILLED':
            return Object.assign({}, state, { characters: action.payload });
        case GET_CHARACTER + '_FULFILLED':
            return Object.assign({}, state, { character: action.payload });
        default:
            return state;
    }
}