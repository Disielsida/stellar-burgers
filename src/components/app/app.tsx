import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@utils-routes';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />

    <Routes>
      <Route path={ROUTES.HOME} element={<ConstructorPage />} />
      <Route path={ROUTES.FEED} element={<Feed />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.PROFILE_ORDERS} element={<ProfileOrders />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound404 />} />
    </Routes>

    <Routes>
      <Route path={ROUTES.FEED_ORDER} />
      <Route path={ROUTES.PROFILE_ORDER} />
      <Route path={ROUTES.INGRIDIENT} />
    </Routes>
  </div>
);

export default App;
