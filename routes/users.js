const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'prestons-secret-isnt-secret' } = process.env ; 
const SALT_COUNT = 10;
const { createUser, getUser, getUserByUserName } = require('../db/users');
const { getOrdersByUser } = require('../db/orders');
const usersRouter = express.Router();


 function requireUser(req, res, next) {
     if(!req.user) {
         next({
             name: 'MissingUserError',
             message: 'You must be logged in to perform this action'
         });
     } 
         next();
 };


usersRouter.post('/register', async (req, res, next) => {
    const { firstName, lastName, email, imageURL, username, password } = req.body;
    try{
        const _user = await getUserByUserName(username);
        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
            return
        } else if (password.length < 8) {
            next({
                name: 'PasswordLengthError',
                message: 'Password Too Short!'
            });
            return
        } else {
            const user = await createUser({ firstName, lastName, email, imageURL, username, password });
            const token = jwt.sign({ 
                id: user.id, 
                username
              }, JWT_SECRET, {
                expiresIn: '1w'
              })
            console.log(user)
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

usersRouter.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            next({
                name: "MissingCredentialsError",
                message: "Please supply both a username and password"
            });
        } else {

        const user = await getUser({username, password});
        req.user = user;
        if (user) { //we have a valid user, successful login
            const token = jwt.sign({
                id: user.id,
                username: user.username
                }, process.env.JWT_SECRET, {
                    expiresIn: '3w'
                });
            res.send({ 
                user, 
                message: "You're logged in!",
                token
            });
        } else {
          next({
            name: 'IncorrectCredentialsError',
            message: 'Username or password is incorrect',
            });    
        }
    }
        } catch(error) {
          console.log(error);
          next(error);
        }
    });

 usersRouter.get('/me', requireUser, async (req, res, next) => {
     try { 
     res.send(req.user);
     } catch (error) {
      next(error);
     }
 });

module.exports = usersRouter;