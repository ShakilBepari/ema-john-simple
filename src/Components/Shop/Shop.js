import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [cart,setCart] =useState([])
    const first10 = fakeData.slice(0,10)
    const [product,setProduct] = useState(first10);

    useEffect(() =>{
        const saveData = getDatabaseCart();
        const productKeys = Object.keys(saveData);
        const previesCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = saveData[existingKey];
            return product;
        })
        setCart(previesCart);

    },[])

    const addEventHandle = (product) =>{
        const toBeaddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeaddedKey);
        let count = 1;
        let newCart;

        if(sameProduct){
            count = sameProduct.quantity + 1
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !==toBeaddedKey);
            newCart = [...others,sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        
        setCart(newCart);
        addToDatabaseCart(product.key,count);

    }

    return (
        <div className='twins-container'>
            <div className="product-container">
                 {
                    product.map(pd => <Product key={pd.key}  showAddToCart={true} product={pd} addEventHandle={addEventHandle}></Product>)
                 }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'><button className='main-button'>Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;