import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi, getOrdersApi } from '@api';

export const orderBurgerThunk = createAsyncThunk(
  'orders/orderBurger',
  orderBurgerApi
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  getOrdersApi
);

type OrdersStore = {
  orders: TOrder[];
  currentOrder: TOrder | null;
  ordersLoaded: boolean;

  orderModalData: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: OrdersStore = {
  orders: [],
  currentOrder: null,
  ordersLoaded: false,

  orderModalData: null,
  orderRequest: false,
  loading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    ordersSelector: (state) => state.orders,
    currentOrderSelector: (state) => state.currentOrder,
    ordersLoadedSelector: (state) => state.ordersLoaded,
    orderModalDataSelector: (state) => state.orderModalData,
    orderRequestSelector: (state) => state.orderRequest,
    orderLoadingSelector: (state) => state.loading,
    ordersErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка оформления заказа';
        state.orderRequest = false;
        console.error(action.error.message);
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки заказа';
        state.loading = false;
        console.error(action.error.message);
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.ordersLoaded = true;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки ленты';
        state.loading = false;
        console.error(action.error.message);
      });
  }
});

export const {
  ordersSelector,
  currentOrderSelector,
  ordersLoadedSelector,
  orderModalDataSelector,
  orderRequestSelector,
  orderLoadingSelector,
  ordersErrorSelector
} = ordersSlice.selectors;

export const { clearOrderData } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
