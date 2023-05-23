import { createSlice } from "@reduxjs/toolkit";
import { IFile } from "../../model/IGithub";

const initialState = {
  fileList: [] as IFile[],
};

export const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setRepo: (state, { payload }) => {
      state.fileList = payload.fileList;
    },
  },
});

export const { setRepo } = repoSlice.actions;

export default repoSlice.reducer;
