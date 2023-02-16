import React, { useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [cart,setCart] =useState([])
    const first10 = fakeData.slice(0,10)
    const [product,setProduct] = useState(first10);
    const addEventHandle = (product) =>{
        const newCart = [...cart,product]
        setCart(newCart)
        const sameProduct = newCart.filter(item => item.key === product.key)
        const count = sameProduct.length
        addToDatabaseCart(product.key,count)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                 {
                    product.map(pd => <Product key={pd.key}  showAddToCart={true} product={pd} addEventHandle={addEventHandle}></Product>)
                 }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;