import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  profile: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // set state and function
    addUser: (state, action) => {
      // Set payload
      const { token, profile } = action.payload;
      state.token = token;
      state.profile = profile;
    },

    clearUser: (state) => {
      state.token = '';
      state.profile = null;
    },

    updateUserProfile: (state, action) => {
      state.profile = action.payload;
    }
  }
});

// when we want to call the reducer to dispatch an action
export const { addUser, clearUser, updateUserProfile } = userSlice.actions;

// To use the actual reducer at store
export default userSlice.reducer;
