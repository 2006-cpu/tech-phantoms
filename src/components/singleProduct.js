import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { getProduct } from '../api';
import './SingleProduct.css';
const SingleProduct =  (props) => {
    const {productId}= useParams()
    console.log('ID', productId)
    const [product,setProduct] = useState({})
    const {token} = props;
    console.log(product)
   useEffect(() => {
        getProduct(productId)
          .then( responseProduct => {
            setProduct(responseProduct)
          console.log('responseProduct: ', responseProduct);
          })
      }, [])
    const {id, name, category, imageURL, description, price, inStock} = product
return <>
    <div id={`singleProduct${id}`} className="singleProductCard">
        <div className="productCardData">
            <h3 className="productName">{name}</h3>
            <div className="allProductsCategory">Product category: {category}</div>
            <div className="innerProductCardInfo">
                <img src={imageURL} alt="productImage" className="allProductsImage" />
                <div className="descrPriceQuantityDiv">
                    <h4 className="allProductsDescription">Description: {description}</h4>
                    <h5 className="allProductsPrice">Price: {price}</h5>

                    {
                    inStock
                    ?
                    <>
                    <NavLink to="/orders/cart" className="cart">
                    <button className="addToCart">
                        Add To Cart  </button>
                    </NavLink>
                    </>
                    :
                    <h3 className="outOfStock">In Stock: {inStock}</h3>
                    }
                  </div>
            </div>
        </div>
    </div>
</>
}
export default SingleProduct;





