import React, { Fragment, useState, useEffect } from 'react';
import { getProduct } from '../api';
import { useParams } from "react-router";
const SingleProduct =  (props) => {
    const {productId}= useParams()
    console.log('ID', productId)
    const [product,setProduct] = useState({})
    console.log(product)
   useEffect(() => {
        getProduct(productId)
          .then( responseProduct => {
            setProduct(responseProduct)
          console.log('responseProduct: ', responseProduct);
          })
      }, [])
    const {name, category, imageURL, description, price, inStock} = product
return <>
    <div id={`singleProduct${productId}`} className="singleProductCard">
        <div className="productCardData">
            <h3 className="productName">{name}</h3>
            <div className="allProductsCategory">Product category: {category}</div>
            <img src={imageURL} alt="productImage" className="allProductsImage" />
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
export default SingleProduct;





