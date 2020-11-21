const client = require('./client');
const bcrypt = require('bcrypt');

async function createUser({ 
    username, 
    password
  }) {
    const SALT_COUNT =10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
      const { rows: [ user ] } = await client.query(`
        INSERT INTO users(username, password) 
        VALUES($1, $2) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `, [username, hashedPassword]);
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
      const {rows: [user]} = await client.query(`
    SELECT * FROM users;
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