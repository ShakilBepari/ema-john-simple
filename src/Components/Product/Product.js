import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping } from '@fortawesome/free-solid-svg-icons'
const Product = (props) => {
    const {name,price,img,seller,stock} = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <br/>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order Soon</small></p>
                <button onClick={()=> props.addEventHandle(props.product)} className='main-button'>
                      <FontAwesomeIcon icon={faCartShopping} /> add to cart</button>
            </div>
            
        </div>
    );
};
export default Product;