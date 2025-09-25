import { combineReducers } from '@reduxjs/toolkit';
import { ingridientsReducer } from './slices/ingredientsSlice';
import { feedsReducer } from './slices/feedsSlice';
import { constructorReducer } from './slices/constructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingridientsReducer,
  feeds: feedsReducer,
  burgerConstructor: constructorReducer
});
