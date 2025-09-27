import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  loginUserThunk,
  isAuthenticatedSelector
} from '../../services/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@utils-routes';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.PROFILE, { replace: true });
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      loginUserThunk({
        email,
        password
      })
    );
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
