import axios from 'axios';
export const BASE = 'https://warm-savannah-72362.herokuapp.com/api'
//export const BASE = 'http://localhost:5000/api'

export default function storeCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser')
    const user = JSON.parse();
    return user;
}

export function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

export function storeCurrentToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function getCurrentToken() {
    const currentToken = localStorage.getItem('token')
    const token = JSON.parse(currentToken);
    return token;
}

export function clearCurrentToken() {
    localStorage.removeItem('token');
}