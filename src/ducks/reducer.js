import axios from 'axios';

const initialState = {
    user: {},
    characters: []
};

const GET_USER = 'GET_USER';
const GET_CHARACTERS = 'GET_CHARACTERS';

export function getUser() {
    let userData = axios.get('/auth/me').then(res => res.data);
    return {
        type: GET_USER,
        payload: userData
    };
}

export function getCharacters() {
    let characterData = axios.get('/api/characters').then(res => res.data);
    return {
        type: GET_CHARACTERS,
        payload: characterData
    };
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case GET_CHARACTERS + '_FULFILLED':
            return Object.assign({}, state, { characters: action.payload });
        default:
            return state;
    }
}