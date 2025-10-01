import { FC, SyntheticEvent } from 'react';
import { RegisterUI } from '@ui-pages';

import { useDispatch } from '../../services/store';
import { registerUserThunk } from '../../services/slices/authSlice';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      registerUserThunk({
        name: values.name,
        email: values.email,
        password: values.password
      })
    );
  };

  return (
    <RegisterUI
      errorText=''
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
