import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

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
    ingredientsSelector: (state) => state.items,
    ingredientsLoadingSelector: (state) => state.loading,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки ингридиентов';
        state.loading = false;
        console.error(action.error.message);
      });
  }
});

export const getIngredientByIdSelector = (_id: string) => (state: RootState) =>
  state.ingredients.items.find((item) => item._id === _id) || null;

export const ingridientsReducer = ingredientsSlice.reducer;
export const {
  ingredientsSelector,
  ingredientsLoadingSelector,
  errorSelector
} = ingredientsSlice.selectors;
