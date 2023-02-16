import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart
    let total = 0;

    for(let i = 0; i<cart.length; i++){
        const product = cart[i];
        total = total + product.price
    }

    let shipping = 0;

    if(total>35){
        shipping = 0;
    }else if(total>15){
        shipping = 4.99;
    }else if(total>0){
        shipping = 12.99;
    }

    const tax = (total/10)


    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const newFormatNumber = formatNumber(tax)
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: ${total.toFixed(2)}</p>
            <p><small>Shipping Cost: ${shipping}</small></p>
            <p><small>Tax+Vat: ${newFormatNumber}</small></p>
            <p>Total Price: ${(total+shipping+newFormatNumber).toFixed(2)}</p>
            <Link to='/review'><button className='main-button'>Review Order</button></Link>
        </div>
    );
};

export default Cart;