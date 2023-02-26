import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Manage from './Components/Manage/Manage';
import Review from './Components/Review/Review';
import Shop from './Components/Shop/Shop';
import NotFound from './Components/NotFound/NotFound';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import ProductDetails from './Components/ProductDetails/ProductDetails';
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const userContext = createContext();


function App() {
  const [logedInUser, setLogedInUser] = useState({});
  const [xxx, setXxx] = useState('');

  console.log(logedInUser);

  return (
    <userContext.Provider value={[logedInUser,setLogedInUser,xxx,setXxx]}>
    <Router>
      <h1> Email:{logedInUser.email}</h1>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/review" element={<Review />} />
        <Route path="/shipment" element={ <PrivateRoute>
         <Shipment/>
        </PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage" element={<PrivateRoute>
          <Manage />
        </PrivateRoute>} />
        <Route path="/product/:productKey" element={<ProductDetails/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </userContext.Provider>

  );
}

export default App;
