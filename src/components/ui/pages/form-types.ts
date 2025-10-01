import type { SyntheticEvent, ChangeEvent } from 'react';

export type BaseFormUIProps<TValues extends Record<string, any>> = {
  errorText: string | undefined;
  values: TValues;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
};
