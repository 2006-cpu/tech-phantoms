import axios from 'axios';
export const BASE = '/api'


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
    const { data: product } = await axios.get(`${ BASE }/products/${id}`);

    return product;
  } catch (error) {
    throw error;
  }
}

export default async function getAllOrders(token) {
  try {
    const { data } = await axios.get(`${ BASE }/orders`,{ headers: {'Authorization':'Bearer '+token} });
      console.log('GETORDERS: ', data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrder(id) {
  try {
    const { data: order } = await axios.get(`${ BASE }/orders/${id}`);
    return order;
  } catch (error) {
    throw error;
  }
}

export async function getOrdersCart(token) {
  try {
    const { data } = await axios.get(`${ BASE }/orders/cart`,{ headers: {'Authorization':'Bearer '+token} });
    console.log('API CART', data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { data } = await axios.get(`${ BASE }/users`);
    console.log('USERS-DATA: ', data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUser(id) {
  try {
    const { data: user } = await axios.get(`${ BASE }/users/me/${id}`);
    return user;
  } catch (error) {
    throw error;
  }
}