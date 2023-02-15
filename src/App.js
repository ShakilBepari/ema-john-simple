import React from 'react';
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
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/review" element={<Review />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
