import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { useSelector, useDispatch } from '../../services/store';
import { userDataSelector } from '../../services/slices/authSlice';
import { TRegisterData } from '@api';
import { updateUserThunk } from '../../services/slices/authSlice';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const user = useSelector(userDataSelector);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newUser: Partial<TRegisterData> = {};

    if (formValue.name !== user?.name) {
      newUser.name = formValue.name;
    }

    if (formValue.email !== user?.email) {
      newUser.email = formValue.email;
    }

    if (formValue.password) {
      newUser.password = formValue.password;
    }

    dispatch(updateUserThunk(newUser));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
