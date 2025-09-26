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
    },
    removeConstructorItem: (state, action: PayloadAction<string>) => {
      state.items.ingredients = state.items.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveUpConstructorItem: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredient = state.items.ingredients[index];

      state.items.ingredients.splice(index, 1);
      state.items.ingredients.splice(index - 1, 0, ingredient);
    },
    moveDownConstructorItem: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredient = state.items.ingredients[index];

      state.items.ingredients.splice(index, 1);
      state.items.ingredients.splice(index + 1, 0, ingredient);
    }
  },
  selectors: {
    constructorItemsSelector: (state) => state.items
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  addConstructorItem,
  removeConstructorItem,
  moveUpConstructorItem,
  moveDownConstructorItem
} = constructorSlice.actions;
export const { constructorItemsSelector } = constructorSlice.selectors;
