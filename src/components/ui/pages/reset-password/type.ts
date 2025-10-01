import { BaseFormUIProps } from '../form-types';

export type ResetPasswordUIProps = BaseFormUIProps<{
  password: string;
  token: string;
}>;
