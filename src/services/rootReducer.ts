import { combineReducers } from '@reduxjs/toolkit';
import { ingridientsReducer } from './slices/ingredientsSlice';

export const rootReducer = combineReducers({
  ingredients: ingridientsReducer
});
