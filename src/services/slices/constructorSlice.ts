import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type ConstructorStore = {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: ConstructorStore = {
  items: {
    bun: null,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.items.bun = action.payload;
      } else {
        state.items.ingredients.push(action.payload);
      }
    }
  },
  selectors: {
    constructorItemsSelector: (state) => state.items
  }
});

export const constructorReducer = constructorSlice.reducer;
export const { addConstructorItem } = constructorSlice.actions;
export const { constructorItemsSelector } = constructorSlice.selectors;
