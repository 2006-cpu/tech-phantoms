import React, { Fragment, useState, useEffect } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    const {id, name, description, price, imageURL, inStock, category} = props.product;
    const {setProductId} = props
return <>
    <div id={`product${id}`} className="singleProductCard">
        <div className="productCardData">
            <h3 className="productName">{name}</h3>
            <div className="allProductsCategory">Product category: {category}</div>
           
             <NavLink to={`/allProducts/${id}`}>
                <img src={imageURL} alt="productImage" className="allProductsImage" /> 
            </NavLink>
           
            <h4 className="allProxductsText">Description: {description}</h4>
            <h5 className="allProductsPrice">Price: {price}</h5>

            {
            inStock
            ?
            <button className="addToCart">Add to cart</button>
            :
            <span>Out of stock</span>
            }
        </div>
    </div>
</>
}
export default Product;





