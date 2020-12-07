// import React,{useState} from 'react'
// import axios from 'axios'
// import API_URL from '../api'
// const EditProduct = (props)=>{
//     const{name, description, price, imageURL, inStock, category} = props

//     const [name, setName] = useState(origName);
//     const [category, setCategory] = useState(origCategory);
//     // const [imageURL, setImageURL] = useState(origImageURL);
//     // const [description, setDescription] = useState(origDescription);
//     // const [price, setPrice] = useState(origPrice);
//     // const [inStock, setInStock] = useState(true);

//     const editProduct = async (event)=>{
//         try{
//             event.preventDefault()
//             const {data} = await axios.patch(`${API_URL}/products/${id}`,{name, description, price, imageURL, inStock, category},{ 
//                 headers: {'Authorization': `Bearer ${token}`}
//             })
//             $('#productEditModal'+id).modal('hide')
//             setReload('Updating Activity')
//             setReload('Refresh Page')
//             return data
//             }catch(error){
//                 console.error(error)
//             }
//         }
//     return <>
//     <div className="modal fade" id={'productEditModal'+id} tabIndex="-1" aria-hidden="true">
// <div className="modal-dialog">
// <div className="modal-content">
//   <div className="modal-header">
//     <h5 className="modal-title" >Edit Product</h5>
//     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//       <span aria-hidden="true">&times;</span>
//     </button>
//   </div>
//   <div className="modal-body">
//   <form onSubmit={editProduct}>     

// <input type='text' id="productNameInput" value={name} aria-label="Product Name" onChange={(event)=>{setName(event.target.value)}}></input>

// <input type='text' id="productCategoryInput" value={category}  aria-label="Category" onChange={(event)=>{setCategory(event.target.value)}}></input>


// {/* 
//     <div>Check if Public</div>
//     <input type='checkbox' id="routineIsPublic" value={isPublic} aria-label="isPublic" onChange={()=>{isPublic ? setIsPublic(false):setIsPublic(true)}}></input> */}
//     <button type='submit'className='btn btn-success' >Submit Changes</button>
// </form>
//   </div>
//   <div className="modal-footer">
//     <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//   </div>
// </div>
// </div>
// </div>
//     </>
// }
// export default EditProduct



























// import React, { useState, useEffect } from 'react';
// import { useParams } from "react-router";
// import { NavLink, useHistory } from 'react-router-dom';
// import axios from 'axios';
// import { BASE, getProduct } from '../api';
// import './EditProduct.css';
// import swal from 'sweetalert';

// const EditProduct = () => {
//     const {productId} = useParams();
//     console.log('productID: ', productId);
//     const [editProduct, setEditProduct] = useState({});
//     console.log('editPRODUCT: ', editProduct);

//     const [name, setName] = useState('');
//     const [category, setCategory] = useState('');
//     const [imageURL, setImageURL] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [inStock, setInStock] = useState('');

//     useEffect(() => {
//         getProduct(productId)
//             .then( responseEditProduct => {
//                 setEditProduct(responseEditProduct)
//             console.log('responseEditProduct: ', responseEditProduct);
//             })
//     }, []);

//     const handleEditProduct = async (event) => {
//         try {
//             event.preventDefault()

//             setEditProduct('');

//             const {data} = await axios.patch(`${BASE}/products/${productId}`, {name, description, price, imageURL, inStock, category});
            
//             setEditProduct(data)
    
//           return data;  
//         } catch (error) {
//           console.error(error)
//           throw error
//         }
//     }

//     const history = useHistory();
//     function handleClick() {
//         history.push("/SingleProduct");
//     }

// return <>
//     <form className="editProduct" onSubmit={handleEditProduct}>

//         <input name="name" type="text" placeholder="name" required value={name} onChange={(event) => {
//             {setName(event.target.value)}}} />

//         <input name="description" type="text" placeholder="description" required value={description} onChange={(event) => {
//             {setDescription(event.target.value)}}} /> 

//         <input name="price" type="text" placeholder="price" required value={price} onChange={(event) => {
//             {setPrice(event.target.value)}}} /> 

//         <input name="imageURL" type="text" placeholder="imageURL" required value={imageURL} onChange={(event) => {
//             {setImageURL(event.target.value)}}} />   

//         <input name="inStock" type="text" placeholder="inStock" required value={inStock} onChange={(event) => {
//             {setInStock(event.target.value)}}} /> 

//         <input name="category" type="text" placeholder="category" required value={category} onChange={(event) => {
//             {setCategory(event.target.value)}}} />

//         <NavLink to={`/products/${productId}`} className="editProduct">
//             <button className="editProductButton" type="submit" onClick={() => {
//                 handleClick();
//             }}>
//                 Edit product
//             </button>
//         </NavLink>

//     </form>
// </>
// }

// export default EditProduct;