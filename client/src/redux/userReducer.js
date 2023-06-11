import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../config';
//selectors
export const getUser = (state) => {
  return state.user;
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
  initialState: null,
  reducers: {
    logIn(state, action) {
      return action.payload;
    },
    logOut() {
      return null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserRequest.pending, (state) => {
        return null;
      })
      .addCase(getUserRequest.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getUserRequest.rejected, (state) => {
        return null;
      });
  },
});

export const { logIn, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
