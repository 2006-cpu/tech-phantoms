import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import allProducts from './AllProducts';

const Product = ({product}) => {
    const {productId} = useParams();
    const [filteredProduct] = allProducts.filter(product => Number(productId) === product.id)

return <>
    {product && product.name && <h3><b>Name:</b> <Link to={`/allProducts/${product.id}`}>{product.name}</Link></h3>}

    <div>Taxon Name: {product.name}</div>

    <div><b>Photos:</b> {product.imageUrl && product.imageUrl.length && product.imageUrl.map(imageUrl => <img key={imageUrl.id} src={imageUrl}/>)}</div>



     <h1>Single Product</h1>
        {filteredProduct && <Product Product={filteredProduct} />}
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