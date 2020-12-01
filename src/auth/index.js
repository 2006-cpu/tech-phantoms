import axios from 'axios';

export default function storeCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getCurrentUser() {
    const currentUser = localStorage.getItem('user')
    const user = JSON.parse();
    return user;
}

export function clearCurrentUser() {
    localStorage.removeItem('user');
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