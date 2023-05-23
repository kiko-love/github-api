import { repoListSlice } from "./festures/repoListSlice";
import { repoSlice } from "./festures/repoSlice";
import { userSlice } from "./festures/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    repoList: repoListSlice.reducer,
    repo: repoSlice.reducer,
  },
});

export default store;
