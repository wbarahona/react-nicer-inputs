import React, { FC, HTMLProps, useEffect } from 'react';
import { GrecaptchaResponseParams } from '../../types';

declare var grecaptcha: any;
declare global {
  interface Window {
    onCallBack: Function;
  }
}

export interface GrecaptchaProps {
  name?: string;
  publicKey: string;
  v3?: boolean;
  theme?: 'dark' | 'light';
  invisible?: boolean;
  getResponse: (args: GrecaptchaResponseParams) => void;
}

export const Grecaptcha: FC<GrecaptchaProps> = ({
  name = 'gcaptcha',
  publicKey,
  v3,
  theme,
  invisible,
  getResponse,
}: GrecaptchaProps & HTMLProps<HTMLDivElement>) => {
  // TODO: create the use v3 and classnames and check if grecaptcha has already been rendered on element
  const appendGrParam = v3
    ? `?render=${publicKey}`
    : '?onload=onCallBack&render=explicit';
  const grecaptchaScript = document.createElement('script');
  grecaptchaScript.src = `https://www.google.com/recaptcha/api.js${appendGrParam}`;
  grecaptchaScript.async = true;
  grecaptchaScript.defer = true;

  const verifyCallback = (token: any) => {
    getResponse({ token });
  };

  const onCallBack = () => {
    grecaptcha.render(name, {
      sitekey: publicKey,
      callback: verifyCallback,
      theme,
      size: invisible ? 'invisible' : false,
    });
  };

  useEffect(() => {
    window.onCallBack = onCallBack;

    document.body.appendChild(grecaptchaScript);
    return () => {
      document.body.removeChild(grecaptchaScript);
    };
  }, []);
  return <div id={name} className="g-recaptcha"></div>;
};

export default Grecaptcha;
