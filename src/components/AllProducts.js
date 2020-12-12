import React from 'react';
import Product from './Product.js';
import bubble02 from './images/bubble02.png';
import './AllProducts.css'

const AllProducts = (props) => {
    const {allProducts} = props;

return <div>
        <div className="welcomeDiv">

            <div className="bubbleSetOneOne">
                <img src={bubble02} className="bubbleOneOne" alt="bubbleOne" width="100px" height="100px" />
                <img src={bubble02} className="bubbleTwoTwo" alt="bubbleTwo" width="150px" height="150px" />
            </div> 

            <div className="welcomeText">Welcome to Dope Soap!<br />
        Enjoy a clean view of our products!</div>

            <div className="bubbleSetTwoTwo">
                <img src={bubble02} className="bubbleThreeThree" alt="bubbleThree" width="300px" height="300px" />
            </div> 

        </div>


        <div className="productsGrid">
        {
        allProducts.map((product) => <Product key={product.id} product={product} />)
        }
        </div>
</div>
}

export default AllProducts;