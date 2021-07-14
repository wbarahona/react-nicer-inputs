import React, { FC, createContext, useEffect, ReactNode } from 'react';
import {
  GrecaptchaContextType,
  GrecaptchaResponseParams,
  Validation,
} from '../../../types';
import { useFormContext } from '../../form/FormContext';

declare var grecaptcha: any;
declare global {
  interface Window {
    onCallBack: Function;
  }
}

export interface GrecaptchaContext {
  children?: ReactNode;
  name: string;
  publicKey: string;
  v3?: boolean;
  captchaSize?: 'compact' | 'normal' | 'invisible';
  theme?: 'dark' | 'light';
  validate?: Validation[];
  getResponse?: (args: GrecaptchaResponseParams) => void;
}

const GrecaptchaContextDefoValues: GrecaptchaContextType = {
  publicKey: '',
  validateCaptcha: async () => new Promise(() => {}),
  v3: false,
};

export const GrecaptchaContext = createContext<GrecaptchaContextType>(
  GrecaptchaContextDefoValues
);

export const GrecaptchaProvider: FC<GrecaptchaContext> = ({
  children,
  name,
  publicKey,
  v3,
  captchaSize,
  theme,
  validate,
  getResponse = () => {},
}: GrecaptchaContext) => {
  const { model, addToModel, updateModelInputValue } = useFormContext();
  const appendGrParam = v3
    ? `?render=${publicKey}`
    : '?onload=onCallBack&render=explicit';
  const grecaptchaScript = document.createElement('script');
  grecaptchaScript.src = `https://www.google.com/recaptcha/api.js${appendGrParam}`;
  grecaptchaScript.async = true;
  grecaptchaScript.defer = true;

  const verifyCallback = (token: any) => {
    getResponse({ token });
    updateModelInputValue(name, token);
  };

  const expiredCallback = () => {
    updateModelInputValue(name, '');
  };

  const onCallBack = () => {
    grecaptcha.render(name, {
      sitekey: publicKey,
      callback: verifyCallback,
      'expired-callback': expiredCallback,
      theme,
      size: captchaSize,
    });
  };

  const validateCaptcha = async () => {
    let response = '';

    try {
      const captchaToken = await grecaptcha.execute(publicKey, {
        action: 'submit',
      });
      if (captchaToken) {
        response = captchaToken;
        updateModelInputValue(name, captchaToken);
      } else {
        console.warn(
          'Captcha could not be validated. code: CAPTCHA_UNABLE_VALIDATION'
        );
        updateModelInputValue(name, '');
      }
    } catch (error) {
      console.warn(
        `There was an error validating the captcha: ${error.message}. code: CAPTCHA_TRY_ERROR`
      );
      updateModelInputValue(name, '');
    }

    return response;
  };

  const checkAndAddModel = () => {
    if (model) {
      addToModel(name, {
        type: 'grecaptcha',
        valid: null,
        invalid: null,
        pristine: true,
        touched: false,
        dirty: false,
        validate: validate || ['required'],
        value: '',
      });
    }
  };

  useEffect(() => {
    checkAndAddModel();
    if (!v3) {
      window.onCallBack = onCallBack;
    }

    document.body.appendChild(grecaptchaScript);
    return () => {
      document.body.removeChild(grecaptchaScript);
    };
  }, []);

  return (
    <GrecaptchaContext.Provider
      value={{
        publicKey,
        validateCaptcha,
        v3,
      }}
    >
      {children}
    </GrecaptchaContext.Provider>
  );
};

export default GrecaptchaProvider;
