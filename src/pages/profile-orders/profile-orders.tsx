import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  ordersSelector,
  getOrdersThunk,
  ordersLoadedSelector,
  orderLoadingSelector
} from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const ordersLoaded = useSelector(ordersLoadedSelector);
  const loading = useSelector(orderLoadingSelector);

  useEffect(() => {
    if (!ordersLoaded) {
      dispatch(getOrdersThunk());
    }
  }, [ordersLoaded]);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersSelector);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
