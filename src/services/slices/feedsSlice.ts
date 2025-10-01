import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export const getFeedsThunk = createAsyncThunk('feeds/getFeeds', getFeedsApi);

type FeedsStore = {
  feeds: TOrder[];
  currentFeed: TOrder | null;
  feedsTotal: number;
  feedsTotalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: FeedsStore = {
  feeds: [],
  currentFeed: null,
  feedsTotal: 0,
  feedsTotalToday: 0,
  loading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    feedsSelector: (state) => state.feeds,
    currentFeedSelector: (state) => state.currentFeed,
    feedsTotalSelector: (state) => state.feedsTotal,
    feedsTotalTodaySelector: (state) => state.feedsTotalToday,
    feedsLoadingSelector: (state) => state.loading,
    feedsErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.feeds = action.payload.orders;
        state.feedsTotal = action.payload.total;
        state.feedsTotalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки ленты';
        state.loading = false;
        console.error(action.error.message);
      });
  }
});

export const {
  feedsSelector,
  feedsTotalSelector,
  feedsTotalTodaySelector,
  feedsLoadingSelector,
  feedsErrorSelector,
  currentFeedSelector
} = feedSlice.selectors;

export const feedsReducer = feedSlice.reducer;
