import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./likeSlice";
import follow from "./followSlice";
import commentslice from "./commentSlice";
import usernameSlice from "./usernameSlice";
import searchSlice from "./searchslice";

export const store = configureStore({
  reducer: {
    likeunlike: counterSlice,
    followcount: follow,
    commentdata: commentslice,
    username: usernameSlice,
    search: searchSlice,
  },
});
