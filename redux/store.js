import { configureStore } from '@reduxjs/toolkit';
import cayxanhReducer from './Slide/CayXanhSlide';
import chaucayReducer from './Slide/ChauCaySlide';
import dungcuReducer from './Slide/DungCuSlide';
import cartReducer from './Slide/CartSlide';
import accountReducer from './slices/accountSlice';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    cayxanh: cayxanhReducer,
    chaucay: chaucayReducer,
    dungcu: dungcuReducer,
    account: accountReducer,
  },
});