import React, { useContext} from 'react';
import {  Navigate} from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = ({children,...rest}) => {
    const [loggedIn, setLoggedIn] = useContext(userContext);

    
    
    return (
        <>
            {
                loggedIn.email ? (children) : <Navigate to='/login'/>
            }
        </>
    );
};

export default PrivateRoute;