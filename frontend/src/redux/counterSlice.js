import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: "",
  value: false,
};

const counterSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {
    type: (state, action) => {
      state.type = action.payload;
    },
    value: (state) => {
      state.value = !state.value;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { type, value } = counterSlice.actions;
export default counterSlice.reducer;