import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../config';
//selectors
export const getUser = (state) => {
  return state.user.user;
};

export const getUserId = (state) => {
  return state.user.userId;
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
    const userId = data.userId;
    return { user, userId };
  } else {
    return null;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    userId: null,
    status: null,
  },
  reducers: {
    logIn(state, action) {
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.status = 'login';
    },
    logOut(state) {
      state.user = null;
      state.userId = null;
      state.status = 'logout';
    },
    setUserStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserRequest.pending, (state) => {
        return { ...state, user: null };
      })
      .addCase(getUserRequest.fulfilled, (state, action) => {
        return { ...state, user: action.payload?.user || null, userId: action.payload?.userId || null };
      })
      .addCase(getUserRequest.rejected, (state) => {
        return { ...state, user: null };
      });
  },
});

export const { logIn, logOut, setUserStatus } = userSlice.actions;
export const userReducer = userSlice.reducer;
