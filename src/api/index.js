import axios from 'axios';
import Swal from 'sweetalert2'

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
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { data } = await axios.get(`${ BASE }/users`);
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

export async function addProductToCart(orderId, product, quantity){
  try {
    const {data} = await axios.post(`${BASE}/orders/${orderId}/products`,{productId: product.id, price: product.price, quantity})
    console.log(data)
    return data
  } catch (error) {
    throw error
  }
}

export async function removeProductFromCart(orderId, productId, token){
  try {
    const orderProductId = await axios.get(`${BASE}/order_products/${orderId}/${productId}`)
    console.log(orderProductId)
    const {data} = await axios.delete(`${BASE}/order_products/${orderProductId.data.id}`,{headers: {'Authorization': 'Bearer '+token}})
    return data
  } catch (error) {
    console.error(error)
  }

}

export async function editAccountInfo(id,{...fields}){
  try {
    const {data} = await axios.patch(`${BASE}/users/${id}`,{...fields})
    console.log('UPDATEDUSER', data)
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function newCart(token){
  try {
    const {data} = await axios.post(`${BASE}/orders`,{}, {headers: {'Authorization': `Bearer ${token}`}})
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function completeOrder(token, orderId){
  try {
    const {data} = await axios.patch(`${BASE}/orders/${orderId}`, {status:'completed'}, {headers: {'Authorization': `Bearer ${token}`}})
    if(data){
      Swal.fire({
        position: 'absolute',
        icon: 'success',
        title: "Order Submitted. Thank you for shopping at Dope Soap!",
        showConfirmButton: false,
        timer: 1500
      });
    }
    return data
  } catch (error) {
    console.error(error)
  }
}