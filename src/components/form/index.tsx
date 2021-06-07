import React, { FC, FormEvent, HTMLProps } from 'react';
import FormProvider from './FormContext';
import { FormModel } from '../../types';

export interface FormProps extends HTMLProps<HTMLFormElement> {
  model?: string;
  formSubmit?: Function;
  useModel?: (args: FormModel) => void;
}

export const Form: FC<FormProps> = ({
  children,
  model,
  useModel,
  formSubmit = () => {},
  ...props
}: FormProps & HTMLProps<HTMLFormElement>) => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await formSubmit();
  };
  return (
    <form {...props} onSubmit={handleSubmit}>
      <FormProvider model={model} useModel={useModel}>
        {children}
      </FormProvider>
    </form>
  );
};

export default Form;
