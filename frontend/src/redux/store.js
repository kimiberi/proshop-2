import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    species: counterReducer,
  },
});