import React, { useEffect } from 'react';
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
        <div className="productsGrid">
        {
        allProducts.map((product) => <Product key={product.id} product={product} />)
        }
        </div>
</>
}

export default AllProducts;