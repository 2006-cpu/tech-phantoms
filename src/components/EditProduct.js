import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import { BASE, getProduct } from '../api';
import './EditProduct.css';
import swal from 'sweetalert';

const EditProduct = () => {
    const {productId} = useParams();
    console.log('productID: ', productId);
    const [editProduct, setEditProduct] = useState({});
    console.log('editPRODUCT: ', editProduct);
    const {name, category, imageURL, description, price, inStock} = editProduct;

    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newImageURL, setNewImageURL] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newInStock, setNewInStock] = useState('');

    useEffect(() => {
        getProduct(productId)
            .then( responseEditProduct => {
                setEditProduct(responseEditProduct)
            console.log('responseEditProduct: ', responseEditProduct);
            })
    }, []);

    const handleEditProduct = async (event) => {
        try {
            event.preventDefault()

            const {data} = await axios.patch(`${BASE}/products/${productId}`, {newName, newDescription, newPrice, newImageURL, newInStock, newCategory});
            
            setEditProduct(data)
    
          return data;  
        } catch (error) {
          console.error(error)
          throw error
        }
    }

    const history = useHistory();
    function handleClick() {
        history.push(`/AllProducts/${productId}`);
    }

return <>
<div className="editForm">
    <form className="editProduct" onSubmit={handleEditProduct}>

        <input name="name" type="text" placeholder="name" value={name} onChange={(event) => {
            setNewName(event.target.value)}} />

        <input name="description" type="text" placeholder="description" value={description} onChange={(event) => {
            setNewDescription(event.target.value)}} /> 

        <input name="price" type="text" placeholder="price" value={price} onChange={(event) => {
            setNewPrice(event.target.value)}} /> 

        <input name="imageURL" type="text" placeholder="imageURL" value={imageURL} onChange={(event) => {
            setNewImageURL(event.target.value)}} />   

        <input name="inStock" type="text" placeholder="inStock" value={inStock} onChange={(event) => {
            setNewInStock(event.target.value)}} /> 

        <input name="category" type="text" placeholder="category" value={category} onChange={(event) => {
            setNewCategory(event.target.value)}} />

            <button className="editProductButton" type="submit" onClick={() => {
                handleClick();
            }}>
                Edit product
            </button>
    </form>
</div>
</>
}

export default EditProduct;