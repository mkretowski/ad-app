import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../config';
//selectors
export const getUser = (state) => {
  return state.user.user;
};

export const getUserStatus = (state) => {
  return state.user.status;
};

//actions
export const getUserRequest = createAsyncThunk('user/getUser', async () => {
  const options = {
    method: 'GET',
    credentials: 'include',
  };
  const response = await fetch(API_URL + '/auth/user', options);

  if (response.status === 200) {
    const data = await response.json();
    const user = data.user;
    return user;
  } else {
    return null;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: null,
  },
  reducers: {
    logIn(state, action) {
      state.user = action.payload;
      state.status = 'login';
    },
    logOut(state) {
      state.user = null;
      state.status = 'logout';
    },
    resetStatus(state) {
      state.status = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserRequest.pending, (state) => {
        return { ...state, user: null };
      })
      .addCase(getUserRequest.fulfilled, (state, action) => {
        return { ...state, user: action.payload };
      })
      .addCase(getUserRequest.rejected, (state) => {
        return { ...state, user: null };
      });
  },
});

export const { logIn, logOut, resetStatus } = userSlice.actions;
export const userReducer = userSlice.reducer;
