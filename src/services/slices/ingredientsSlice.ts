import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);

type IngredientsStore = {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsStore = {
  items: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientSelector: (state) => state.items,
    loadingSelector: (state) => state.loading,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        console.log('запрашиваю ингредиенты');
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        console.log(state.items, 'ингридиенты загрузились');
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки ингридиентов';
        state.loading = false;
        console.error(action.error.message, 'ошибка загрузкии ингредиентов');
      });
  }
});

export const ingridientsReducer = ingredientsSlice.reducer;
export const { ingredientSelector, loadingSelector, errorSelector } =
  ingredientsSlice.selectors;
