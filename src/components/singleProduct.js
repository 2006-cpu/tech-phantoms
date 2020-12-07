import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { NavLink, useHistory } from 'react-router-dom';
import { getProduct, getAllProducts, BASE } from '../api';
import './SingleProduct.css';

const SingleProduct =  (props) => {
    const {isAdmin, token} = props;
    const {productId} = useParams()
    console.log('ID', productId)
    const [product,setProduct] = useState({})
    console.log('product: ', product)
    const[showError, setShowError] = useState('');
    
   useEffect(() => {
        getProduct(productId)
          .then( responseProduct => {
            setProduct(responseProduct)
          console.log('responseProduct: ', responseProduct);
          })
    }, [])
    const {id, name, category, imageURL, description, price, inStock} = product

    const history = useHistory();
    function editProductClick() {
        history.push("/EditProduct");
    }
    function returnHomeClick() {
        history.push("/Home");
    }

    const handleDeleteProduct = async (event) => {
        try {
            event.preventDefault();
                console.log('DELETEbuttonCLICK');
            const productId = event.target.productId;
            setShowError('');


            const response = await fetch(`${BASE}/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const deleteProduct = await response.json();


            if(deleteProduct) {
                getAllProducts();
            } else {
                setShowError(response.message);
            }


            const {data} = await axios.delete(`${BASE}/products/${productId}`)

        } catch (error) {
          console.error(error);
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
                    <NavLink to="/orders/cart" className="cart">
                        <button className="addToCart">
                            Add To Cart  
                        </button>
                    </NavLink>
                    </>
                    :
                    <h3 className="outOfStock">In Stock: {inStock}</h3>
                    }

                    {
                    isAdmin
                    ?
                    <>
                    <button className="editProductButton" onClick={editProductClick}>
                        Edit Product
                    </button>

                    <button productId={productId} className="deleteProductButton" onClick={handleDeleteProduct}>
                        Delete Product
                    </button>
                    </>
                    :
                    <></>
                    }

                  </div>
            </div>
        </div>
    </div>
</>
}
}
export default SingleProduct;


// handleDeleteProduct();
// returnHomeClick();


