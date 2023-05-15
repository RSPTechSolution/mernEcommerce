import React, {useEffect} from 'react';
import './App.css';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import webfont from 'webfontloader';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails'

function App() {
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid sams", "Chailanka"],
      }
    });
  },[]);
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>} ></Route>
        <Route exact path="/product/:id" element={<ProductDetails/>} ></Route>
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
