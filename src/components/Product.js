import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import allProducts from './AllProducts';

const Product = (props) => {
    const {id, name, description, price, imageUrl, inStock, category} = props.product;

return <>
    <div id={`product${id}`} className="singleProductCard">
        <h3 className="productName">{name}</h3>
        <img src={imageUrl} className="allProductsImage" />
        <div className="allProductsCategory">Product category: {category}</div>
        <h4 className="allProductsText">Product description: {description}</h4>
        <h5 className="allProductsPrice">Price: {price}</h5>

        {
        inStock
        ?
        <button className="addToCart">Add to cart</button>
        :
        <span>Out of stock</span>
        }
     
    </div>
</>
}
export default Product;





