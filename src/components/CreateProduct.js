import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { BASE, getProduct } from '../api';
import './CreateProduct.css';
import Swal from 'sweetalert2';

const CreateProduct = (props) => {
    const {token, isAdmin} = props;
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState('');

    const handleCreateProduct = async (event) => {
        try {
            event.preventDefault();
            if(imageURL===''){
                setImageURL("https://i.imgur.com/6CsuY8X.png")
            }
            const {data} = await axios.post(`${BASE}/products`, {name, description, price, imageURL, inStock, category}, {headers: {'Authorization': `Bearer ${token}`}});

            if(data){
                Swal.fire({
                    position: 'absolute',
                    icon: 'success',
                    title: name+" Created!",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            return data;
        } catch (error) {
          console.error(error)
          throw error
        }
    }

return <>
{isAdmin?

<div className="createProductForm">
    <form className="createProduct" onSubmit={handleCreateProduct}>

        <input name="name" type="text" placeholder="name" value={name} onChange={(event) => {
            setName(event.target.value)}} />

        <input name="description" type="text" placeholder="description" value={description} onChange={(event) => {
            setDescription(event.target.value)}} /> 

        <input name="price" type="text" placeholder="price" value={price} onChange={(event) => {
            setPrice(event.target.value)}} /> 

        <input name="imageURL" type="text" placeholder="imageURL" value={imageURL} onChange={(event) => {
            setImageURL(event.target.value)}} />   

        <input name="inStock" type="text" placeholder="inStock" value={inStock} onChange={(event) => {
            setInStock(event.target.value)}} /> 

        <input name="category" type="text" placeholder="category" value={category} onChange={(event) => {
            setCategory(event.target.value)}} />

            <button className="createProductButton" type="submit">
                Create product
            </button>
    </form>
</div>
:
<div>How did you get here? You must be an admin to create products!</div>
        }
</>
}


export default CreateProduct;