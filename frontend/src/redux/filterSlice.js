import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: "",
  checked: false,
  list: [],
};

const filterSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {
    type: (state, action) => {
      state.type = action.payload;
    },
    checked: (state, action) => {
      // state.checked = !state.checked;
      state.checked = action.payload;
    },
    list: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { type, checked, list } = filterSlice.actions;
export default filterSlice.reducer;