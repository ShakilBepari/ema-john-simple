import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    console.log(typeof productKey)
    const product = fakeData.find(product => product.key === productKey);

    console.log(product);
    return (
        <div>
            <h1>The Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;