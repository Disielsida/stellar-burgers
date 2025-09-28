import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

import { useDispatch } from '../../services/store';
import { logoutThunk } from '../../services/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@utils-routes';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate(ROUTES.HOME);
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
