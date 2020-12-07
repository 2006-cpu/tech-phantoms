import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import { getProduct, getOrdersCart, addProductToCart, getAllProducts, BASE } from '../api';
import EditProduct from './EditProduct';
import './SingleProduct.css';
import Swal from 'sweetalert2';

const SingleProduct =  (props) => {
    const {productId}= useParams()
    const {token, isAdmin} = props;
    const [product,setProduct] = useState({})
    const [cart,setCart] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [editForm, setEditForm] = useState(false)

    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newImageURL, setNewImageURL] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newInStock, setNewInStock] = useState('');

    console.log('isADMIN: ', isAdmin);

   useEffect(() => {
        getProduct(productId)
          .then( responseProduct => {
            setProduct(responseProduct)
            setNewName(responseProduct.name)
            setNewCategory(responseProduct.category)
            setNewImageURL(responseProduct.imageURL)
            setNewDescription(responseProduct.description)
            setNewPrice(responseProduct.price)
            setNewInStock(responseProduct.inStock)
            
          console.log('responseProduct: ', responseProduct);
          })
        getOrdersCart(token).then(response=>{
            setCart(response)
            console.log('CART', response)})
    }, [])

    const {id, name, category, imageURL, description, price, inStock} = product

    

    const handleEditProduct = async (event) => {
        try {
            event.preventDefault()

            const {data} = await axios.patch(`${BASE}/products/${productId}`, {name: newName, description: newDescription, price: newPrice, imageURL: newImageURL, inStock: newInStock, category: newCategory},{headers: {'Authorization': 'Bearer '+token}});
            console.log('EDITDATA', data)
            setProduct(data)

    
          return data;  
        } catch (error) {
          console.error(error)
          throw error
        }
    }

    const history = useHistory();

    function handleClick() {
        history.push(`/AllProducts/${productId}`);
    }

    function editProductClick() {
        setEditForm(true)
    }

    function returnHomeClick() {
        history.push("/Home");
    }

    const handleDeleteProduct = async (event) => {
        try {
            event.preventDefault();
                console.log('DELETEbuttonCLICK');
      
            const {data} = await axios.delete(`${BASE}/products/${productId}`,{headers: {'Authorization': `Bearer ${token}`}})

          return data;
        } catch (error) {
          console.error(error);
        }
    }

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
                    <h3 className="outOfStock">Temporarily out of stock</h3>
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
    {
    editForm
    ?
    <div className="editForm">
    <form className="editProduct" onSubmit={handleEditProduct}>

        <input name="name" type="text" placeholder="name" value={newName} onChange={(event) => {
            setNewName(event.target.value)}} />

        <input name="description" type="text" placeholder="description" value={newDescription} onChange={(event) => {
            setNewDescription(event.target.value)}} /> 

        <input name="price" type="text" placeholder="price" value={newPrice} onChange={(event) => {
            setNewPrice(event.target.value)}} /> 

        <input name="imageURL" type="text" placeholder="imageURL" value={newImageURL} onChange={(event) => {
            setNewImageURL(event.target.value)}} />   

        <input name="inStock" type="text" placeholder="inStock" value={newInStock} onChange={(event) => {
            setNewInStock(event.target.value)}} /> 

        <input name="category" type="text" placeholder="category" value={newCategory} onChange={(event) => {
            setNewCategory(event.target.value)}} />

            <button className="editProductButton" type="submit">
                Submit Changes
            </button>
    </form>
</div>
    :
    <></>
    }
</>
}
}

export default SingleProduct;