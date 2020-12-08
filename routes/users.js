const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'prestons-secret-isnt-secret' } = process.env ; 
const SALT_COUNT = 10;
const { createUser, getUser, getUserByUserName, getUserById, getAllUsers } = require('../db/users');
const { getOrdersByUser } = require('../db/orders');
const usersRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');

usersRouter.post('/register', async (req, res, next) => {
    const { imageURL, firstName, lastName, email, username, password } = req.body;
    try{
        const _user = await getUserByUserName(username);
        if (_user) {
            res.send({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
            return
        } else if (password.length < 8) {
            res.send({
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
    

usersRouter.get('/', async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        res.send(allUsers)
    } catch (error) {
      res.send(error);
    }
});


 usersRouter.get('/me', requireUser, async (req, res, next) => {
     try { 
     res.send(req.user);
     } catch (error) {
      next(error);
     }
 });

 usersRouter.patch('/:userId', requireUser, requireAdmin, async (req, res, next) => {
    try {
    const { userId } = req.params;
    const { firstName, lastName, email, imageURL, username, password, isAdmin } = req.body;
    const user = await getUserById(id);
    if(!user) {
        next({
            name: 'notfound',
            message: "This user was not found"
        });
        return;
    } else {
        const updatedUser = await updateUser({id, ...fields});
        res.send(updatedUser);
    }
} catch (error) {
    console.log(error);
    next(error);
}
 });

module.exports = usersRouter;