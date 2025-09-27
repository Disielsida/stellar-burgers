import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { orderBurgerApi } from '@api';

export const orderBurgerThunk = createAsyncThunk(
  'orders/orderBurger',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);

type OrdersStore = {
  orders: TOrder[];
  ordersTotal: number;
  ordersTotalToday: number;
  currentOrder: TOrder | null;

  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: OrdersStore = {
  orders: [],
  ordersTotal: 0,
  ordersTotalToday: 0,
  currentOrder: null,

  orderModalData: null,
  orderRequest: false,
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
    ordersTotalSelector: (state) => state.ordersTotal,
    ordersTotalTodaySelector: (state) => state.ordersTotalToday,
    currentOrderSelector: (state) => state.currentOrder,
    orderModalDataSelector: (state) => state.orderModalData,
    orderRequestSelector: (state) => state.orderRequest,
    ordersErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка оформления заказа';
        state.orderRequest = false;
        console.error(action.error.message);
      });
  }
});

export const {
  ordersSelector,
  ordersTotalSelector,
  ordersTotalTodaySelector,
  currentOrderSelector,
  orderModalDataSelector,
  orderRequestSelector,
  ordersErrorSelector
} = ordersSlice.selectors;

export const { clearOrderData } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
