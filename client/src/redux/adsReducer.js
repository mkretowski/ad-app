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
export const getAdsByUser = ({ ads }, userId) => ads.data.filter((ad) => ad.userId === userId);

export const getAdActionStatus = (state) => {
  return state.ads.actionStatus;
};
//actions
export const addAdRequest = createAsyncThunk('ads/addAdRequest', async (newAd) => {
  const fd = new FormData();
  fd.append('title', newAd.title);
  fd.append('price', newAd.price);
  fd.append('localisation', newAd.localisation);
  fd.append('image', newAd.image);
  fd.append('content', newAd.content);

  const options = {
    method: 'POST',
    credentials: 'include',
    body: fd,
  };

  const response = await fetch(API_URL + '/api/ads', options);
  if (!response.ok) {
    throw new Error('Failed to add ad');
  }
  return response.status;
});

export const removeAdRequest = createAsyncThunk('ads/removeAdRequest', async (ad) => {
  const options = {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(API_URL + '/api/ads/' + ad, options);
  if (!response.ok) {
    throw new Error('Failed to remove ad');
  }
  return response.status;
});

export const updateAdRequest = createAsyncThunk('ads/addAdRequest', async (newProperties) => {
  const fd = new FormData();
  if (newProperties.title) {
    fd.append('title', newProperties.title);
  }

  if (newProperties.price) {
    fd.append('price', newProperties.price);
  }

  if (newProperties.localisation) {
    fd.append('localisation', newProperties.localisation);
  }

  if (newProperties.image) {
    fd.append('image', newProperties.image);
  }

  if (newProperties.content) {
    fd.append('content', newProperties.content);
  }

  const options = {
    method: 'PUT',
    credentials: 'include',
    body: fd,
  };

  const response = await fetch(API_URL + '/api/ads/' + newProperties.id, options);
  if (!response.ok) {
    throw new Error('Failed to update ad');
  }
  return response.status;
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
    actionStatus: null,
  },
  reducers: {
    removeAd(state, action) {
      const adId = action.payload;
      state.data = state.data.filter((ad) => ad._id !== adId);
    },
    setActionStatus(state, action) {
      state.actionStatus = action.payload;
    },
    resetActionStatus(state) {
      state.actionStatus = null;
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

export const { removeAd, setActionStatus, resetActionStatus } = adsSlice.actions;
export const adsReducer = adsSlice.reducer;
