import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const searchSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addsearch: (state, action) => {
      state.value = action.payload;
    },
    resetsearch: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { addsearch, resetsearch } = searchSlice.actions;

export default searchSlice.reducer;
