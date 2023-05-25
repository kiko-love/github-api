import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  pageSize: 10,
  total: 0,
};

export const pageSlice: any = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload.page ? payload.page : state.page;
      state.pageSize = payload.pageSize ? payload.pageSize : state.pageSize;
      state.total = payload.total ? payload.total : state.total;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
