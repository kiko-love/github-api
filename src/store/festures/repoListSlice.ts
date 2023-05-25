import { createSlice } from "@reduxjs/toolkit";
import { IRepo } from '../../model/IGithub';

const initialState = {
    items: [] as IRepo[]
}

export const repoListSlice = createSlice({
    name: 'repoList',
    initialState,
    reducers: {
        setRepoList: (state, { payload }) => {
            state.items = payload.repoList;
        }
    }
})

export const { setRepoList } = repoListSlice.actions;

export default repoListSlice.reducer;