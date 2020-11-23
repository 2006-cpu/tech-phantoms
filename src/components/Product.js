import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import allProducts from './AllProducts';

const Product = (props) => {
    const {id, name, description, price, imageUrl, inStock, category} = props.product;

return <>
    <div id={`product${id}`} className="singleProductCard">
        <h3 className="productName">{name}</h3>
        <img src={imageUrl} className="allProductsImage" />
        <div className="allProductsCategory">Product category: {category}</div>
        <h4 className="allProductsText">Product description: {description}</h4>
        <h5 className="allProductsPrice">Price: {price}</h5>

        {
        inStock
        ?
        <button className="addToCart">Add to cart</button>
        :
        <span>Out of stock</span>
        }
     
    </div>
</>
}
export default Product;






// const Product = (props) => {
//     const {product, setProduct, allProducts, setAllProducts} = props;
//     const [name, setName] = useState([]);
//     const [description, setDescription] = useState([]);
//     const [price, setPrice] = useState([]);
//     const [imageUrl, setImageUrl] = useState([]);
//     const [inStock, setInStock] = useState([]);
//     const [category, setCategory] = useState([]);

//     useEffect (() => {
//         getAllProducts()
//             .then( respAllProd => {
//                 console.log('AllProducts: ', respAllProd);
//                 setAllProducts(respAllProd)
//             })

//         getProduct()
//             .then( respSingleProd => {
//                 console.log('singleProduct: ', respSingleProd);
//                 setProduct(respSingleProd)
//             })    
//     }, []);

    

// return <>
//     <div className="productsDiv">
//     <h1 className="productCardTitle">PRODUCT</h1>

//     {allProducts.length > 0 && allProducts.map(({id, name, description, price, imageUrl, inStock, category
//     }) => (
//         <div key={id} className="allProductsId">
//         <h3 className="allProductsName">Product name: {name}</h3>
//         <h4 className="allProductsText">Product description: {description}</h4>
//         <h5 className="allProductsPrice">Price: {price}</h5>
//         <img src={imageUrl} className="allProductsImage" />
//         <div className="allProductsInStock">
//             <input type="allProductsCheckbox">In stock: {inStock}</input>
//         </div>
//         <div className="allProductsCategory">Product category: {category}</div>

//     </div>
//     ))}

   
//     </div>
// </>
// }

// export default Product;