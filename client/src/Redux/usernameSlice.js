import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const usernameSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setusername: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setusername } = usernameSlice.actions;

export default usernameSlice.reducer;
