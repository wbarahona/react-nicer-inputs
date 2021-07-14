import React, { FC, FormEvent, HTMLProps } from 'react';
import Catch from './functional-error-boundary';
import FormProvider from './FormContext';
import { FormModel, FormValidityResponse } from '../../types';

export interface FormProps extends HTMLProps<HTMLFormElement> {
  model?: string;
  formSubmit: (args?: FormValidityResponse) => void;
  useModel?: (args: FormModel) => void;
}

// export const Form: FC<FormProps> = ({
//   children,
//   model,
//   useModel,
//   formSubmit = () => {},
//   ...props
// }: FormProps & HTMLProps<HTMLFormElement>) => {
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//   };

//   return (
//     <form {...props} onSubmit={handleSubmit}>
//       <FormProvider model={model} useModel={useModel} formSubmit={formSubmit}>
//         {children}
//       </FormProvider>
//     </form>
//   );
// };
/**
 * Form Component
 * @alias Form
 * @param {FormProps} props - all props
 * @param {string} [model] - Optional - Name for the form model, defaults to "defaultModel"
 * @param {Function} [formSubmit] - This function will run when <Submit> button component is added to the form
 * @param {Function} [useModel] - Optional - A pseudoHook that allows the consuming of the form model and its state
 * @returns {React.FunctionComponentElement} Returns an ```<form />``` element
 */
export const Form = Catch(function Form(
  { model, useModel, formSubmit = () => {}, children, ...props }: FormProps,
  error?: Error
) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  if (error) {
    return <div>Error happened on Form Component: {error.message}</div>;
  } else {
    return (
      <form {...props} onSubmit={handleSubmit}>
        <FormProvider model={model} useModel={useModel} formSubmit={formSubmit}>
          {children}
        </FormProvider>
      </form>
    );
  }
});

export default Form;
