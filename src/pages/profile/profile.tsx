import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';

import { useSelector, useDispatch } from '../../services/store';
import { userDataSelector } from '../../services/slices/authSlice';
import { TRegisterData } from '@api';
import { updateUserThunk } from '../../services/slices/authSlice';
import { useForm } from '../../hooks/useForm';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const user = useSelector(userDataSelector);

  const { values, handleChange, setValues } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    }));
  }, [user]);

  const isFormChanged =
    values.name !== user?.name ||
    values.email !== user?.email ||
    !!values.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newUser: Partial<TRegisterData> = {};

    if (values.name !== user?.name) {
      newUser.name = values.name;
    }

    if (values.email !== user?.email) {
      newUser.email = values.email;
    }

    if (values.password) {
      newUser.password = values.password;
    }

    dispatch(updateUserThunk(newUser));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  return (
    <ProfileUI
      values={values}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};
