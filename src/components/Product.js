import React from 'react';
import { NavLink } from 'react-router-dom';
import './Product.css';
import { centsToDollars } from './helpers';

const Product = (props) => {
    const {id, name, description, price, imageURL, inStock, category} = props.product;
return <>
    <div id={`product${id}`} className="indivProductCard">
        <div className="indivProductCardData">
            <h3 className="indivProductName">{name}</h3>
            <div className="indivProductsCategory">Product category: {category}</div>
           
                <NavLink to={`/allProducts/${id}`}>
                    <img src={imageURL} alt="productImage" className="indivProductsImage" /> 
                </NavLink>

                <h4 className="indivProductsDescription">Description: {description}</h4>
                <h5 className="indivProductsPrice">Price: ${centsToDollars(price)}</h5>

            {
            inStock
            ?
            <NavLink to={`/allProducts/${id}`}>
                <button className="productDetailsButton">Details</button>
            </NavLink>
            :
            <span className="outOfStockText">Out of stock.</span>
            }
        </div>
    </div>
</>
}
export default Product;





