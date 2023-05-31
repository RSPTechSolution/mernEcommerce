import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';

const reducer = {
  products: productReducer,
  productDetails: productDetailsReducer,
  user : userReducer
};

const middleware = [thunk];

const initialState = {
    products: [], // Initialize with an empty array
    loading: false,
    error: null,
  };

const store = configureStore({
  reducer,
  initialState,
  middleware,
  devTools: true,
});

export default store;
