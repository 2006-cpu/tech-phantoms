import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { getProduct, getOrdersCart, addProductToCart } from '../api';
import './SingleProduct.css';
import Swal from 'sweetalert2';

const SingleProduct =  (props) => {
    const {productId}= useParams()
    const {token} = props
    const [product,setProduct] = useState({})
    const [cart,setCart] = useState([])
    const [quantity, setQuantity] = useState(1)
   useEffect(() => {
        getProduct(productId)
          .then( responseProduct => {
            setProduct(responseProduct)
          console.log('responseProduct: ', responseProduct);
          })
        getOrdersCart(token).then(response=>{
            setCart(response)
            console.log('CART', response)})
    }, [])

    const {id, name, category, imageURL, description, price, inStock} = product

    const addToCart = async (event)=>{
        try {
            event.preventDefault()
            const addedProduct = await addProductToCart(cart.id,product,quantity)
            console.log('ADDED PRODUCT TO CART', addedProduct)
            if(addedProduct){
                Swal.fire({
                    position: 'absolute',
                    icon: 'success',
                    title: name+" added to cart!",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        } catch (error) {
            console.error(error)
        }
    }
if(product===''){
    return <div>
        <h3 className="productName">This soap doesn't exist! Look for a different soap!</h3>
    </div>
} else {
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
                    <form onSubmit={addToCart}>
                    <input name="quantity" type="number" min="1" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
                    <button type='submit' className="addToCart">
                        Add To Cart  
                    </button>
                    </form>
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
}
export default SingleProduct;





