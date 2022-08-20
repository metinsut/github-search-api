import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk, RootState } from '../store';

export interface AppState {
  searchParams: string;
  items: Repo[];
  total_count: string;
  loading: boolean;
  page: number;
}

export interface Response {
  items: Repo[];
  total_count: '';
}

const initialState: AppState = {
  searchParams: '',
  items: [],
  total_count: '',
  loading: false,
  page: 1
};

export interface Repo {
  id: string;
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    githubRepoFetched: (state, action: PayloadAction<Response>) => {
      const { items, total_count } = action.payload;
      if (state.page === 1) {
        state.items = [...items];
      } else {
        state.items = [...state.items, ...items];
      }
      state.total_count = total_count;
    },
    searchParamUpdated: (state, action: PayloadAction<string>) => {
      state.page = initialState.page;
      state.searchParams = action.payload;
    },
    loadingUpdated: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    itemsCleared: (state) => {
      state.items = initialState.items;
      state.total_count = initialState.total_count;
      state.page = initialState.page;
    },
    pageUpdated: (state) => {
      state.page += 1;
    }
  }
});

export const { githubRepoFetched, searchParamUpdated, loadingUpdated, itemsCleared, pageUpdated } =
  appSlice.actions;

export const getGithubRepoBySearchParam =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const { searchParams, page } = getState().app;
    dispatch(loadingUpdated(true));

    try {
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=${searchParams}&per_page=5&page=${page}`
      );
      dispatch(githubRepoFetched(data));
      dispatch(loadingUpdated(false));
    } catch (error) {
      dispatch(loadingUpdated(false));
      dispatch(itemsCleared());
    }
  };

export const selectSearchParams = (state: RootState) => state.app.searchParams;
export const selectRepos = (state: RootState) => state.app.items;
export const selectTotalCount = (state: RootState) => state.app.total_count;
export const selectIsLoading = (state: RootState) => state.app.loading;
export const selectPage = (state: RootState) => state.app.page;

export default appSlice.reducer;
