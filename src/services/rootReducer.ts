import { combineReducers } from '@reduxjs/toolkit';
import { ingridientsReducer } from './slices/ingredientsSlice';
import { feedsReducer } from './slices/feedsSlice';
import { constructorReducer } from './slices/constructorSlice';
import { authReducer } from './slices/authSlice';

export const rootReducer = combineReducers({
  ingredients: ingridientsReducer,
  feeds: feedsReducer,
  burgerConstructor: constructorReducer,
  auth: authReducer
});
