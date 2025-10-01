import { BaseFormUIProps } from '../form-types';

export type RegisterUIProps = BaseFormUIProps<{
  name: string;
  email: string;
  password: string;
}>;
