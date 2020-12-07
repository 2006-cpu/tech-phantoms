import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { BASE, getProduct } from '../api';
import './CreateProduct.css';
import swal from 'sweetalert';

const CreateProduct = (props) => {
    const {token, isAdmin, productId} = props;
    const [createProduct, setCreateProduct] = useState(false)
    const [createName, setCreateName] = useState('');
    const [createCategory, setCreateCategory] = useState('');
    const [createImageURL, setCreateImageURL] = useState('');
    const [createDescription, setCreateDescription] = useState('');
    const [createPrice, setCreatePrice] = useState('');
    const [createInStock, setCreateInStock] = useState('');
    const [createForm, setCreateForm] = useState('');

    const {name, category, imageURL, description, price, inStock} = createProduct;

    const handleCreateProduct = async (event) => {
        try {
            event.preventDefault();

            const {data} = await axios.post(`${BASE}/products`, {createName, createDescription, createPrice, createImageURL, createInStock, createCategory});

            setCreateProduct(data)

          return data;
        } catch (error) {
          console.error(error)
          throw error
        }
    }

    // const history = useHistory();
    // function handleClick() {
    //     history.push(`/AllProducts/${productId}`);
    // }

    function createProductClick() {
        setCreateForm(true)
    }

return <>

    {/* <div id={`singleProduct${productId}`} className="singleProductCard">
        <div className="productCardData">
            <h3 className="productName">{name}</h3>
            <div className="allProductsCategory">Product category: {category}</div>
            <div className="innerProductCardInfo">
                <img src={imageURL} alt="productImage" className="allProductsImage" />
                <div className="descrPriceQuantityDiv">
                    <h4 className="allProductsDescription">Description: {description}</h4>
                    <h5 className="allProductsPrice">Price: {price}</h5> */}

                    {/* {
                    inStock
                    ?
                    <>
                    <form onSubmit={addToCart}>
                    <input name="quantity" type="number" min="1" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
                    <button type='submit' className="addToCart">
                        Add To Cart  
                    </button>
                    </form>
                    </>
                    :
                    <h3 className="outOfStock">Temporarily out of stock</h3>
                    } */}
            {/* </div>
            </div>
        </div>
    </div> */}

{
createForm
?
<div className="createProductForm">
    <form className="createProduct" onSubmit={handleCreateProduct}>

        <input name="name" type="text" placeholder="name" value={name} onChange={(event) => {
            setCreateName(event.target.value)}} />

        <input name="description" type="text" placeholder="description" value={description} onChange={(event) => {
            setCreateDescription(event.target.value)}} /> 

        <input name="price" type="text" placeholder="price" value={price} onChange={(event) => {
            setCreatePrice(event.target.value)}} /> 

        <input name="imageURL" type="text" placeholder="imageURL" value={imageURL} onChange={(event) => {
            setCreateImageURL(event.target.value)}} />   

        <input name="inStock" type="text" placeholder="inStock" value={inStock} onChange={(event) => {
            setCreateInStock(event.target.value)}} /> 

        <input name="category" type="text" placeholder="category" value={category} onChange={(event) => {
            setCreateCategory(event.target.value)}} />

            <button className="createProductButton" onClick={createProductClick}>
                Create product
            </button>
    </form>
</div>
:
<></>
}
</>
}


export default CreateProduct;