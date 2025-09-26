import { FC, SyntheticEvent, useState, useLayoutEffect } from 'react';
import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  registerUserThunk,
  isAuthenticatedSelector
} from '../../services/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@utils-routes';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.PROFILE, { replace: true });
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      registerUserThunk({
        name: userName,
        email,
        password
      })
    );
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
