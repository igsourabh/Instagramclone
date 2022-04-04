import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    datalike: (state, action) => {
      state.value =action.payload;
    },
    like: (state, action) => {
      state.value.push(action.payload);
    },
    unlike: (state, action) => {
      const next = state.value.filter(
        (items) => items !== action.payload
      );
      state.value = next;
    },
  },
});

// Action creators are generated for each case reducer function
export const { like, unlike, datalike } = counterSlice.actions;

export default counterSlice.reducer;
