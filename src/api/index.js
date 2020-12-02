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
    const { data: order } = await axios.get(`${ BASE }/orders/${id}`);
    return order;
  } catch (error) {
    throw error;
  }
}

export async function getOrdersCart() {
  try {
    const { data } = await axios.get(`${ BASE }/orders/cart`);
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