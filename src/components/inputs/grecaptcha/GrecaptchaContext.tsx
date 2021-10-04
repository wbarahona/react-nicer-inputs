import React, {
  FC,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useIsMount } from '../../../hooks/isMount';
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
  const [captchaToken, setCaptchaToken] = useState('');
  const isMount = useIsMount();
  const appendGrParam = v3
    ? `?render=${publicKey}`
    : '?onload=onCallBack&render=explicit';
  const grecaptchaScript = document.createElement('script');
  grecaptchaScript.src = `https://www.google.com/recaptcha/api.js${appendGrParam}`;
  grecaptchaScript.async = true;
  grecaptchaScript.defer = true;

  const verifyCallback = (token: any) => {
    getResponse({ token });
    setCaptchaToken(token);
  };

  const expiredCallback = () => {
    setCaptchaToken('');
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
        setCaptchaToken(captchaToken);
      } else {
        console.warn(
          'Captcha could not be validated. code: CAPTCHA_UNABLE_VALIDATION'
        );
        setCaptchaToken('');
      }
    } catch (error) {
      console.warn(error);
      setCaptchaToken('');
    }

    return response;
  };

  function addNewModel() {
    if (model) {
      addToModel(name, {
        type: 'grecaptcha',
        valid: null,
        invalid: null,
        pristine: true,
        touched: false,
        dirty: false,
        validate: validate || ['required'],
        value: captchaToken,
      });
    }
  }

  useEffect(() => {
    if (isMount) {
      addNewModel();

      if (!v3) {
        window.onCallBack = onCallBack;
      }

      document.body.appendChild(grecaptchaScript);
    }
    return () => {
      document.body.removeChild(grecaptchaScript);
    };
  }, []);

  useEffect(() => {
    if (!isMount) {
      updateModelInputValue(name, captchaToken);
    }
  }, [captchaToken]);

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
