import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api';
import Product from './Product.js';
import './AllProducts.css'

const AllProducts = (props) => {
    const {allProducts, setAllProducts} = props;


    useEffect (() => {
        getAllProducts()
            .then( response => {
            console.log('AllProducts: ', response);
            setAllProducts(response)
            })
    }, []);

return <>
    <div className="allProductsCards">
        <h1 className="allProductsTitle">ALL PRODUCTS</h1>
            <div className="products">
            {
            allProducts.map((product) => <Product key={product.id} product={product} />)
            }
            </div>
    </div>
</>
}

export default AllProducts;