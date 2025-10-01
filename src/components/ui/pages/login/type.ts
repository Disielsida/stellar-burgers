import { BaseFormUIProps } from '../form-types';

export type LoginUIProps = BaseFormUIProps<{
  email: string;
  password: string;
}>;
