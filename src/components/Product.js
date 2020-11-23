import React from 'react';
import './Product.css';

const Product = (props) => {
    const {id, name, description, price, imageUrl, inStock, category} = props.product;

return <>
    <div id={`product${id}`} className="singleProductCard">
        <div className="productCardData">
            <h3 className="productName">{name}</h3>
            <div className="allProductsCategory">Product category: {category}</div>
            <img src={imageUrl} alt="productImage" className="allProductsImage" />
            <h4 className="allProductsText">Description: {description}</h4>
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





