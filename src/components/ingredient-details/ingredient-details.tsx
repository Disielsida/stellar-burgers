import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import {
  getIngredientByIdSelector,
  getIngredientsThunk,
  ingredientsSelector
} from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const ingredients = useSelector(ingredientsSelector);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredientsThunk());
    }
  }, []);

  const { id } = useParams<{ id?: string }>();

  const ingredientData = id ? useSelector(getIngredientByIdSelector(id)) : null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
