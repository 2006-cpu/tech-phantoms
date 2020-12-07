import React from 'react';
import Product from './Product.js';
import './AllProducts.css'

const AllProducts = (props) => {
    const {allProducts} = props;

return <>
        <div className="welcomeDiv">Welcome to Dope Soap!<br />
        Enjoy a clean view of our products!
        </div>
        <div className="productsGrid">
        {
        allProducts.map((product) => <Product key={product.id} product={product} />)
        }
        </div>
</>
}

export default AllProducts;