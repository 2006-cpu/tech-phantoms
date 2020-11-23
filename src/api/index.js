import axios from 'axios';
// export const BASE = 'https://warm-savannah-72362.herokuapp.com/api'
export const BASE = 'http://localhost:5000/api'

export async function getSomething() {
  try {
    const { data } = await axios.get('/');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`${ BASE }/products`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(id) {
  try {
    const { data: product } = await axios.get (`${ BASE }/products/${id}`);
    return product;
  } catch (error) {
    throw error;
  }
}

// export async function postUser() {
//   try {
//     const { data: user } = await axios.post(`${ BASE }/users/login`, {username, password});
//     return user;
//   } catch (error) {
//     throw error;
//   }
// }