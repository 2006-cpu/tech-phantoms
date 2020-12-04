const { client } = require('./index');
const bcrypt = require('bcrypt');
const SALT_COUNT =10;

async function createUser({ 
  firstName,
  lastName,
  email,
  imageURL="https://i.imgur.com/6CsuY8X.png",  
  username, 
  password, isAdmin=false
  }) {
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

      const { rows: [ user ] } = await client.query(`
        INSERT INTO users("firstName", "lastName", email, "imageURL", username, password, "isAdmin") 
        VALUES($1, $2, $3, $4, $5, $6, $7) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `, [firstName, lastName, email, imageURL, username, hashedPassword, isAdmin]);
      delete user.password
      return user;
    } catch (error) {
      throw error;
    }
  };

// ******************************************************************************

  async function getUser({ 
    username, 
    password
  }) {
    try {
      
      const { rows: [ user ] } = await client.query(`
        SELECT * 
        FROM users
        WHERE username=$1;
      `, [username]);
      if(!user){
        return
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
        return
      }
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  };

// ******************************************************************************

async function getAllUsers() {
    try {
      const {rows: allUsers} = await client.query(`
    SELECT * FROM users;
    `);
    if (!allUsers) {
      return null; 
    }

    allUsers.forEach((user) => {
      delete user.password
    })
    return allUsers;
    } catch (error) {
      throw error;
    }
  }

// ******************************************************************************

  async function getUserById (id) {
    try {
      const {rows: [user]} = await client.query(`
    SELECT * FROM users
    WHERE id = ${id};
    `);
    if (!user) {
      return null; 
    }
    delete user.password;
    return user;
    } catch (error) {
      throw error;
    }
  }
  
// ******************************************************************************

  async function getUserByUserName(username) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1
      `,[username]);
      return user;
    } catch (error) {
      throw error;
    }
  }

module.exports = { createUser, getUser, getAllUsers, getUserById, getUserByUserName} 