import React, { FC, HTMLProps } from 'react';
import { GrecaptchaResponseParams } from '../../../types';
import { GrecaptchaProvider } from './GrecaptchaContext';

export interface GrecaptchaProps extends HTMLProps<HTMLDivElement> {
  name?: string;
  publicKey: string;
  v3?: boolean;
  captchaSize?: 'compact' | 'normal' | 'invisible';
  className?: string;
  theme?: 'dark' | 'light';
  getResponse?: (args: GrecaptchaResponseParams) => void;
}

/**
 * Google Recaptcha Component
 * @param {InputProps} props - all props
 * @param {string} [name] - Optional Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {string} publicKey - This defines the key to be used for this captcha element, check google recaptcha docs.
 * @param {boolean} [v3] - Optional. Helps to define what API version is going to be used
 * @param {string} [theme] - Optional. Is the color scheme this captcha element will have
 * @param {string} [captchaSize] - Optional. Is the size of this captcha element
 * @param {Function} [getResponse] - Optional. Is the function that returns the token google returned after the challenge is completed
 * @returns {React.FunctionComponentElement} Returns an ```<Google Captcha />``` element
 */
export const Grecaptcha: FC<GrecaptchaProps> = ({
  name = 'gcaptcha',
  publicKey,
  v3,
  theme = 'light',
  captchaSize = 'normal',
  className,
  getResponse,
  children,
  ...props
}: GrecaptchaProps & HTMLProps<HTMLDivElement>) => {
  const classNames = `grecaptcha-wrapper ${className || ''}`;

  return (
    <GrecaptchaProvider
      publicKey={publicKey}
      name={name}
      v3={v3}
      theme={theme}
      captchaSize={captchaSize}
      getResponse={getResponse}
    >
      <>
        <div className={classNames} {...props}>
          <div id={name} className={`${name}-element`} />
        </div>
        {children}
      </>
    </GrecaptchaProvider>
  );
};

export default Grecaptcha;
