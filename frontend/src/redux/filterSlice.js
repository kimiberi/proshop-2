import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: { category: "", name: "" },
  checked: false,
  list: [],
  typeList: [],
};

const filterSlice = createSlice({
  name: "species",
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
    typeList: (state, action) => {
      state.typeList = action.payload;
    },
  },
});

export const { type, checked, list, typeList } = filterSlice.actions;
export default filterSlice.reducer;
