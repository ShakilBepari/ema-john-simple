import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css'
const Header = () => {
    const [loggedIn, setLoggedIn, xxx, setXxx] = useContext(userContext);
   const  pornHub =()=>{
    setXxx('manage');
   }
    return (
        <div className='header'>
            <img src={logo} alt=''/>
            <nav>
                {/* <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory</a>
                 */}
                <Link to='/shop'>Shop</Link>
                <Link to='/review'>Order Review</Link>
                <Link to='/manage' onClick={pornHub}>Manage Inventory</Link>

            </nav>
        </div>
    );
};

export default Header;