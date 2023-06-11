import { adsReducer } from './adsReducer';
import { userReducer } from './userReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    ads: adsReducer,
    user: userReducer,
  },
});

export default store;
