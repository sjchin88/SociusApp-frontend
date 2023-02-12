import { getUserSuggestions } from '@redux/api/suggestion';
import { createSlice } from '@reduxjs/toolkit';

/**
 * Define initialState
 * isLoading will be true only when fetching the data
 */
const initialState = {
  users: [],
  isLoading: false
};

/**
 * Define actions available
 */
const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    addToSuggestions: (state, action) => {
      const { isLoading, users } = action.payload;
      state.users = [...users];
      state.isLoading = isLoading;
    }
  },

  /**
   * Cater for three cases:
   * Case1: request in progress of fulfilling
   * Case2: request completed
   * Case3: request is rejected
   * @param {*} builder
   */
  extraReducers: (builder) => {
    builder.addCase(getUserSuggestions.pending, (state) => {
      state.isLoading = true;
    });

    /**
     * When request is fulfilled
     * Update state.users to data from action.payload
     * Reset isLoading to false
     */
    builder.addCase(getUserSuggestions.fulfilled, (state, action) => {
      state.isLoading = false;
      const { users } = action.payload;
      state.users = [...users];
    });

    builder.addCase(getUserSuggestions.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

// when we want to call the reducer to dispatch an action
export const { addToSuggestions } = suggestionsSlice.actions;

// To use the actual reducer at store
// To add corresponding reducer in our global store
export default suggestionsSlice.reducer;
