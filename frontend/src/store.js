import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productReducer } from './reducers/productReducer';

const reducer = {
  products: productReducer,
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
