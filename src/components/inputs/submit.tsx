import React, { FC, HTMLProps, useContext } from 'react';
import { GrecaptchaContext } from './grecaptcha/GrecaptchaContext';
import { GrecaptchaContextType } from '../../types';
import { useFormContext } from '../form/FormContext';

export interface SubmitProps extends HTMLProps<HTMLButtonElement> {
  captchaProtected?: boolean;
  formSubmit?: Function;
}

/**
 * Submit Component
 * @param {InputProps} props - all props
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {Function} [formSubmit] - Optional. This function is triggered when you click the submit button, using v3 captcha it will return the captchaToken.
 * @param {Function} [getResponse] - Optional. Is the function that returns the token google returned after the challenge is completed
 * @returns {React.FunctionComponentElement} Returns an ```<button type="submit" />``` element
 */
export const Submit: FC<SubmitProps> = ({
  type = 'submit',
  children,
  className,
  formSubmit = () => {},
  ...props
}: SubmitProps & HTMLProps<HTMLButtonElement>) => {
  const { validateCaptcha = () => null, v3 } =
    useContext<GrecaptchaContextType>(GrecaptchaContext);
  const {
    model,
    formSubmit: contextSubmit,
    validateFormModel,
  } = useFormContext();
  const classNames = `submit-button ${className || ''}`;

  const handleClick = async () => {
    const captchaToken = v3 ? await validateCaptcha() : null;

    if (v3 && captchaToken !== null) {
      if (!model) {
        formSubmit({ captchaToken });
      } else {
        const { isValid, isInvalid, formModel } = validateFormModel();

        contextSubmit({ isValid, isInvalid, formModel });
      }
    }
    if (!v3 && !captchaToken) {
      if (!model) {
        formSubmit();
      } else {
        const { isValid, isInvalid, formModel } = validateFormModel();

        contextSubmit({ isValid, isInvalid, formModel });
      }
    }
  };
  return (
    <button
      type="submit"
      className={classNames}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Submit;
