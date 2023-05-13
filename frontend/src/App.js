import React, {useEffect} from 'react';
import './App.css';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import webfont from 'webfontloader';
import Home from './component/Home/Home';

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
      <Home/>
      <Footer />
    </Router>
    
  );
}

export default App;
