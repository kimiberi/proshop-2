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
      if (!state.checked) { state.type = action.payload }
        else { state.type = "" }
    },
    checked: (state) => {
      state.checked = !state.checked;
    },
    list: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { type, checked, list } = filterSlice.actions;
export default filterSlice.reducer;