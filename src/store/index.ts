import { repoListSlice } from "./festures/repoListSlice";
import { repoSlice } from "./festures/repoSlice";
import { userSlice } from "./festures/userSlice";
import { pageSlice } from "./festures/pageSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    repoList: repoListSlice.reducer,
    repo: repoSlice.reducer,
    page: pageSlice.reducer,
  },
});

export default store;
