const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET } = process.env || "string";
const SALT_COUNT = 10;
const { createUser, getUser, getAllUsers, getUserById, getUserByUserName} = require('../db/users');

function requireUser(req, res, next) {
    if(!req.user) {
        next({
            name: 'MissingUserError',
            message: 'You must be logged in to perform this action'
        });
} 
        next();
};

// -H "Content-Type: application/json" -X POST -d

usersRouter.post('/register', async (req, res, next) => {
    const { firstName, lastName, email, username, password } = req.body;
    try{
        const _user = await getUserByUsername(username);
        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        } else if (password.length < 8) {
            next({
                name: 'PasswordLengthError',
                message: 'Password Too Short!'
            });
        } else {
            const user = await createUser({
                username,
                password
            
            });
            const token = jwt.sign({
                id: user.id,
                username: user.username
            }, process.env.JWT_SECRET, {
                expiresIn: '3w'
            });
            res.send({
                user,
                message: "Thank you for signing up",
                token
            });
        }
    } catch (error) {
        next(error);
    }    
});

module.exports = usersRouter