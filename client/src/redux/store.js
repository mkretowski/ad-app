import { adsReducer, searchAdsStatusReducer } from './adsReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    ads: adsReducer,
    searchAdsStatus: searchAdsStatusReducer,
  },
});

export default store;
