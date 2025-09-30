import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';
import {
  constructorItemsSelector,
  clearConstructorItems
} from '../../services/slices/constructorSlice';
import {
  orderBurgerThunk,
  orderRequestSelector,
  orderModalDataSelector,
  clearOrderData
} from '../../services/slices/ordersSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticatedSelector } from '../../services/slices/authSlice';
import { ROUTES } from '@utils-routes';
import { getFeedsThunk } from '../../services/slices/feedsSlice';
import { getOrdersThunk } from '../../services/slices/ordersSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(constructorItemsSelector);

  const orderRequest = useSelector(orderRequestSelector);

  const orderModalData = useSelector(orderModalDataSelector);

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const location = useLocation();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { state: { from: location } });
      return;
    }

    const ingredientsIds = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];

    dispatch(orderBurgerThunk(ingredientsIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructorItems());
        dispatch(getFeedsThunk());
        dispatch(getOrdersThunk());
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
