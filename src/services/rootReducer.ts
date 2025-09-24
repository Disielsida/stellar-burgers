import { combineReducers } from '@reduxjs/toolkit';
import { ingridientsReducer } from './slices/ingredientsSlice';
import { feedsReducer } from './slices/feedsSlice';

export const rootReducer = combineReducers({
  ingredients: ingridientsReducer,
  feeds: feedsReducer
});
