import { Routes, Route, useNavigate } from 'react-router-dom';
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

const App = () => {
  const navigate = useNavigate();

  const handleBackFromModal = () => {
    navigate(-1);
  };

  return (
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

      {/* <Routes>
        <Route
          path={ROUTES.FEED_ORDER}
          element={
            <Modal title='' onClose={handleBackFromModal}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path={ROUTES.PROFILE_ORDER}
          element={
            <Modal title='' onClose={handleBackFromModal}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path={ROUTES.INGRIDIENT}
          element={
            <Modal title='Детали ингредиента' onClose={handleBackFromModal}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes> */}
    </div>
  );
};

export default App;
