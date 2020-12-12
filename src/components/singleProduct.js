import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router";
import { getProduct, getOrdersCart, addProductToCart, BASE, newCart } from '../api';
import bubble02 from './images/bubble02.png';
import './SingleProduct.css';
import Swal from 'sweetalert2';
import { centsToDollars } from './helpers'

const SingleProduct =  (props) => {
    const {productId}= useParams()
    const {token, isAdmin, setUpdateProducts} = props;
    const [product,setProduct] = useState({})
    const [cart,setCart] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [editForm, setEditForm] = useState(false)

    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newImageURL, setNewImageURL] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newInStock, setNewInStock] = useState('');

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
          })
          
        getOrdersCart(token).then(response=>{
            setCart(response)}
            )
    }, [])

    const {id, name, category, imageURL, description, price, inStock} = product

    const checkForCart = async (cart)=>{
        try {
            if(!cart.id){
             const createdCart = await newCart(token)
                setCart(createdCart)
                return createdCart
            }else{
                return cart
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleEditProduct = async (event) => {
        try {
            event.preventDefault()

            const {data} = await axios.patch(`${BASE}/products/${productId}`, {name: newName, description: newDescription, price: newPrice, imageURL: newImageURL, inStock: newInStock, category: newCategory},{headers: {'Authorization': 'Bearer '+token}});
            setProduct(data)
            setUpdateProducts(data)
            Swal.fire({
                position: 'absolute',
                icon: 'Success',
                title: name+" updated.",
                showConfirmButton: false,
                timer: 1500
              });
              setEditForm(false)
          return data;  
        } catch (error) {
          console.error(error)
          throw error
        }
    }

    const history = useHistory();
    function editProductClick() {
        setEditForm(true)
    }

    const handleDeleteProduct = async (event) => {
        try {
            event.preventDefault();
            const {data} = await axios.delete(`${BASE}/products/${productId}`,{headers: {'Authorization': `Bearer ${token}`}})
            if(data){
                Swal.fire({
                    position: 'absolute',
                    icon: 'warning',
                    title: name+" deleted.",
                    showConfirmButton: false,
                    timer: 1500
                  });
                history.push("/Home");
            }
          return data;
        } catch (error) {
          console.error(error);
        }
    }

    const addToCart = async (event)=>{
        try {
            event.preventDefault()
            const cartCheck = await checkForCart(cart)
            const addedProduct = await addProductToCart(cartCheck.id,product,quantity)
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

    <div className="bubbleSetFive">
        <img src={bubble02} className="bubbleTen" alt="bubbleTen" width="350px" height="350px" />
    </div> 

        <div className={`productCardData ${category}`}>
            <h3 className="productName">{name}</h3>
            <div className="allProductsCategory">Category: {category}</div>
            <div className="innerProductCardInfo">
                <img src={imageURL} alt="productImage" className="allProductsImage"/>
                <div className="descrPriceQuantityDiv">
                    <h4 className="allProductsDescription">{description}</h4>
                    <h5 className="allProductsPrice">Price: ${centsToDollars(price)}</h5>
                    {
                    inStock
                    ?
                    <>
                    <form onSubmit={addToCart}>
                    <div className="quantityDiv">
                    <h4>Quantity</h4>
                    <input name="quantity" type="number" min="1" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
                    </div>
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
                    <div className="productEditDeleteButtonDiv">
                        <button className="editProductButton" onClick={editProductClick}>
                            Edit Product
                        </button>

                        <button productId={productId} className="deleteProductButton" onClick={handleDeleteProduct}>
                            Delete Product
                        </button>
                    </div>
                    </>
                    :
                    <></>
                    }

                  </div>
            </div>
        </div>

    <div className="bubbleSetSix">
        <img src={bubble02} className="bubbleTwelve" alt="bubbleTwelve" width="100px" height="100px" />

        <img src={bubble02} className="bubbleThirteen" alt="bubbleThirteen" width="250px" height="250px" />
    </div> 

    </div>
    {
    editForm
    ?
    <div className="editProductDiv">
    <form className="editProductFormData" onSubmit={handleEditProduct}>

        <h2 className="editProductTitle">Edit Product</h2>
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