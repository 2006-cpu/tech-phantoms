import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api';
import './AllProducts.css'

const AllProducts = (props) => {
    const {allProducts, setAllProducts} = props;

    useEffect (() => {
        getAllProducts()
            .then( response => {
            console.log('AllProducts: ', response);
            setAllProducts(response)
            })
    }, []);

return <>
    <div className="allProductsCards">
      <div className="allProductsSingleCard">
        <h1 className="allProductsTitle">ALL PRODUCTS</h1>

        {allProducts.map(({id, name, description, price, imageUrl, inStock, category}) => (
            <div key={ id } className="productId">
            <h3 className="productName">Product Name: {name}</h3>
            <h4 className="productText">Product Description: {description}</h4>
            <h5 className="productPrice">Price: {price}</h5>
            <img src={imageUrl} className="productImage" alt="" width="50px" height="50px" />
            <div className="inStock">
                <input type="checkbox">In Stock: {inStock}</input>
            </div>
            <div className="productCategory">Category: {category}</div>
            </div>
        ))}
      </div>
    </div>
</>
}

export default AllProducts;