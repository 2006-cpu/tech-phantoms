import axios from 'axios';
// export const BASE = 'https://warm-savannah-72362.herokuapp.com/api'
export const BASE = 'http://localhost:5000/api'

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

export async function getAllOrders() {
  try {
    const { data } = await axios.get(`${ BASE }/orders`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSingleOrder(id) {
  try {
    const { data: order } = await axios.get (`${ BASE }/orders/${id}`);
    return order;
  } catch (error) {
    throw error;
  }
}

export async function getOrdersCart(cart) {
  try {
    const { data } = await axios.get (`${ BASE }/orders/${cart}`);
    return data;
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