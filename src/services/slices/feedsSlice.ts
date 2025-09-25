import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export const getFeedsThunk = createAsyncThunk('feeds/getFeeds', async () => {
  const res = await getFeedsApi();
  return res;
});

export const getFeedByNumber = createAsyncThunk(
  'feeds/getFeedByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res;
  }
);

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
      })
      .addCase(getFeedByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedByNumber.fulfilled, (state, action) => {
        state.currentFeed = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(getFeedByNumber.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки заказа';
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
