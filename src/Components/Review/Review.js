import React, { useContext, useEffect, useState} from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import { useNavigate } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { userContext } from '../../App';


const Review = () => {

    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn, xxx, setXxx] = useContext(userContext);

    const proccedCheckout = () =>{
        
    navigate("/shipment");    
    setXxx('shipment');

    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        setCart(cartProducts);
    },[])

    const removeProduct = productKeys => {
        const newCart = cart.filter(pd => pd.key !== productKeys)
        setCart(newCart);
        removeFromDatabaseCart(productKeys);
    }

    let thankyou; 
    if(orderPlaced){
        thankyou = <img src={happyImage} alt="thankyou" />;
    }

    return (
        <div className='twins-container'>
            <div className='product-container'>
                {
                cart.map(pd=> <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
                }
                {
                    thankyou
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                <button className='main-button' onClick={proccedCheckout}>Procced Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;