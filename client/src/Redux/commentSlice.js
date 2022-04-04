import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const commentSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    deletevalue: (state, action) => {
      const next = state.value.filter(
        (items) => items.commentid !== action.payload.commentid
      );
      state.value = next;
    },
    addcommentfromapi: (state, action) => {
      state.value.push(action.payload);
    },
    addcomment: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deletevalue, addcommentfromapi, addcomment } =
  commentSlice.actions;

export default commentSlice.reducer;
