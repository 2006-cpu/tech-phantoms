import React, { useState, useEffect } from 'react';
import { getProduct } from '../api';
import { useParams } from "react-router";
import './SingleProduct.css';
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
                 
                    {/* <input list="quantities" name="quantities" className="quantitiesList" style={{width: "25px"}} />
                        <datalist className="quantitySelections">
                            <option value="1" />
                            <option value="2" />
                            <option value="3" />
                            <option value="4" />
                            <option value="5" />
                        </datalist>
                        <input className="quantitySubmit" type="submit" /> */}
               

                    {
                    inStock
                    ?
                        <button className="addToCartButton">Add To Cart</button>
                    :
                    <span>Out of stock</span>
                    }
                  </div>
            </div>
        </div>
    </div>
</>
}
export default SingleProduct;





