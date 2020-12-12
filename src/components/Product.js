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
            {inStock
                ?
                <p>&nbsp;</p>:<span className="outOfStockText">Temporarily out of stock.</span>
                }
                <NavLink to={`/allProducts/${id}`}>
                    <img src={imageURL} alt="productImage" className="indivProductsImage" /> 
                </NavLink>
                <h5 className="indivProductsPrice">Price: ${centsToDollars(price)}</h5>
                <NavLink to={`/allProducts/${id}`}>
                <button className="productDetailsButton">Details</button>
             </NavLink>

        </div>
    </div>
</>
}
export default Product;





