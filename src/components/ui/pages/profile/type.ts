import type { SyntheticEvent, ChangeEvent } from 'react';

export type ProfileFormValues = {
  name: string;
  email: string;
  password: string;
};

export type ProfileUIProps = {
  values: ProfileFormValues;
  isFormChanged: boolean;
  updateUserError?: string;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
