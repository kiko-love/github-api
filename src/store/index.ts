import { repoListSlice } from "./festures/repoListSlice";
import { userSlice } from "./festures/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    repoList: repoListSlice.reducer,
  },
});

export default store;
