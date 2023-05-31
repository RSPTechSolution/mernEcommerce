import React, {useEffect} from 'react';
import './App.css';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import webfont from 'webfontloader';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails'
import LoginSignUp from './component/User/LoginSignUp';
import Profile  from './component/User/Profile'
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';

function App() {
  const {isAuthenticated, user} = useSelector((state) => state.user)
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid sams", "Chailanka"],
      }
    });
    store.dispatch(loadUser());
  },[]);
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
        <Route exact path="/" element={<Home/>} ></Route>
        <Route exact path="/product/:id" element={<ProductDetails/>} ></Route>
        <Route exact path="/login" element={<LoginSignUp/>} ></Route>
        <Route exact path="/account" element={<Profile/>} ></Route>
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
