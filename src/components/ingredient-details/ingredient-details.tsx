import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  getIngredientByIdSelector,
  ingredientsSelector
} from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredients = useSelector(ingredientsSelector);

  const { id } = useParams<{ id?: string }>();

  const ingredientData = id ? useSelector(getIngredientByIdSelector(id)) : null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
