import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { getFeedsThunk, feedsSelector } from '../../services/slices/feedsSlice';
import { orderModalDataSelector } from '../../services/slices/ordersSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const orderModalData = useSelector(orderModalDataSelector);

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  useEffect(() => {
    if (orderModalData) {
      dispatch(getFeedsThunk);
    }
  }, [orderModalData]);

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };

  const orders: TOrder[] = useSelector(feedsSelector);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
