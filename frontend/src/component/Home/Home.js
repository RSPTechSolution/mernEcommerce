import React, {useEffect} from 'react';
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import Product from './Product';
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import {toast} from "react-toastify";


const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  console.log(`ProductCount: ${productCount}`);

  useEffect(() => {
    if(error){
       toast.error(error);
    }else{
      dispatch(getProduct());
    }
  }, [dispatch, error]);

  return (
    <>
   {loading ? <Loader/> :  <>
   <MetaData title="OUR SHOP"/>
     <div className="banner">
       <p>Welcome to Our shop </p>
       <h2>FIND AMAZING PRODUCTS BELOW</h2>
       <a href="#container">
           <button>
               Scroll <CgMouse/>
           </button>
       </a>
     </div>
     <h2 className='homeHeading'>Featured Products</h2>
     <div className="container" id="container">
         {products && products.map(product => (
           <Product key={product._id} product={product}/>
         ))}
     </div>
   </>}
   </>
  )
}

export default Home
