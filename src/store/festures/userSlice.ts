import { IUser } from "@/model/IGithub";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
  login: "user",
  id: 0,
  node_id: "",
  avatar_url: "",
  gravatar_id: "",
  url: "",
  html_url: "",
  followers_url: "",
  following_url: "",
  gists_url: "",
  starred_url: "",
  subscriptions_url: "",
  organizations_url: "",
  repos_url: "",
  events_url: "",
  received_events_url: "",
  type: "",
  site_admin: false,
  name: "",
  company: "",
  blog: "",
  location: "",
  email: "",
  hireable: "",
  bio: "",
  twitter_username: "",
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: "",
  updated_at: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      console.log("payload", payload.res);
      Object.assign(state, payload.res);
      console.log("state", state.avatar_url);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
