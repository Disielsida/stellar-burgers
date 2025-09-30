import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { getFeedsThunk, feedsSelector } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };

  const orders: TOrder[] = useSelector(feedsSelector);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
