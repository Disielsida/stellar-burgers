import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import { useDispatch } from '../../services/store';
import { loginUserThunk } from '../../services/slices/authSlice';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const { values, handleChange } = useForm({ email: '', password: '' });

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      loginUserThunk({
        email: values.email,
        password: values.password
      })
    );
  };

  return (
    <LoginUI
      errorText=''
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
