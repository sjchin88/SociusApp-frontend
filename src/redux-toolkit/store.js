import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@redux/reducers/user/user.reducer';
import suggestionsReducer from '@redux/reducers/suggestions/suggestions.reducer';

/**
 * Global store, define all the states available from the reducers
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    suggestions: suggestionsReducer
  }
});
