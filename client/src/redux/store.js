import { adsReducer } from './adsReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    ads: adsReducer,
  },
});

export default store;
