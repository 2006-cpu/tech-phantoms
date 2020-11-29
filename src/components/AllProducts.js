import React, { Fragment, useState, useEffect } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import Product from './Product.js';
import './AllProducts.css'

const AllProducts = (props) => {
    const {allProducts} = props;

return <>
        <div className="productsGrid">
        {
        allProducts.map((product) => <Product key={product.id} product={product} />)
        }
        </div>
</>
}

export default AllProducts;