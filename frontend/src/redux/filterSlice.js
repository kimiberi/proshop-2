import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  typeName: "",
  checked: false,
  list: [],
};

const filterSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    type: (state, action) => {
      state.type = action.payload;
    },
    typeName: (state, action) => {
      state.typeName = action.payload;
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

export const { type, typeName, checked, list } = filterSlice.actions;
export default filterSlice.reducer;
