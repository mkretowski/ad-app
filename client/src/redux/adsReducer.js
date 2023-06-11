import { API_URL } from '../config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//selectors
export const getAllAds = (state) => {
  return state.ads.data ? state.ads.data : [];
};
export const getStatus = (state) => {
  return state.ads ? state.ads : state;
};
export const getAdById = ({ ads }, adId) => ads.data.find((ad) => ad._id === adId);

//actions
export const addAdRequest = createAsyncThunk('ads/addAdRequest', async (newAd) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAd),
  };

  const response = await fetch(API_URL + '/api/ads', options);
  if (!response.ok) {
    throw new Error('Failed to add ad');
  }
});

export const removeAdRequest = createAsyncThunk('ads/removeAdRequest', async (ad) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(API_URL + '/api/ads/' + ad, options);
  if (!response.ok) {
    throw new Error('Failed to remove ad');
  }
});

export const updateAdRequest = createAsyncThunk('ads/addAdRequest', async (newProperties) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProperties),
  };

  const response = await fetch(API_URL + '/api/ads/' + newProperties.id, options);
  if (!response.ok) {
    throw new Error('Failed to update ad');
  }
});

export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
  const response = await fetch(API_URL + '/api/ads');
  const ads = await response.json();
  return ads;
});

const adsSlice = createSlice({
  name: 'ads',
  initialState: {
    data: [],
    status: 'loading',
    user: null,
  },
  reducers: {
    removeAd(state, action) {
      const adId = action.payload;
      state.data = state.data.filter((ad) => ad.id !== adId);
    },
    addAd(state, action) {
      state.data = [...state.data, { ...action.payload }];
    },
    updateAd(state, action) {
      state.data = state.data.map((ad) => (ad.id === action.payload.id ? { ...ad, ...action.payload } : ad));
    },
    logIn(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAds.pending, (state) => {
        return { ...state, status: 'loading' };
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        return { ...state, data: action.payload.sort((a, b) => a._id.localeCompare(b._id)), status: 'idle' };
      })
      .addCase(fetchAds.rejected, (state) => {
        return { ...state, status: 'idle' };
      });
  },
});

export const { removeAd, addAd, updateAd, logIn } = adsSlice.actions;
export const adsReducer = adsSlice.reducer;
