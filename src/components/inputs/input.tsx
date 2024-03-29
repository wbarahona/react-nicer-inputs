import React, { FC, HTMLProps, ChangeEvent, useState, useEffect } from 'react';
import {
  Attrs,
  ChangeParams,
  Validation,
  FormModelElementProps,
} from '../../types';
import { useFormContext } from '../form/FormContext';
import { useIsMount } from '../../hooks/isMount';
export interface InputProps
  extends HTMLProps<HTMLInputElement & HTMLTextAreaElement> {
  type: string;
  name: string;
  className?: string;
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  mask?: string;
  maskChar?: string;
  inputReset?: boolean;
  validate?: Validation[];
  isInvalid?: boolean;
  value?: string | number | undefined;
}

/**
 * Input Component
 * @param {InputProps} props - all props
 * @param {string} type - Can be any type of input defined in HTML5 spec, "checkbox" or "radio" are not recommended
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param {Object} [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {number} [cols] - Optional. Is the number of columns in case of textarea
 * @param {number} [rows] - Optional. Is the number of rows in case of textarea
 * @param {RegExp} [mask] - Optional. Is the regex that will mask this input with discs. THIS DOES NOT AFFECT the returned value to inputChange
 * @param {string} [maskChar] - Optional. Is the special character that is used by the input to mask the text displayed
 * @param {Array} [validate] - Optional. Is an array of entities to validate this input
 * @param {boolean} [inputReset] - Optional. Allows to set the input as empty
 * @param {boolean} [isInvalid] = Optional. Allows to set the input as invalid
 * @param {string | number} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```<input />``` element
 */
export const Input: FC<InputProps> = ({
  type,
  name,
  className,
  inputChange,
  attrs,
  cols,
  rows,
  mask,
  maskChar = '●',
  validate,
  inputReset,
  value,
  onBlurCapture,
  onFocusCapture,
  isInvalid,
  ...props
}: InputProps & HTMLProps<HTMLInputElement & HTMLTextAreaElement>) => {
  const [inputValue, setInputValue] = useState<string | number | undefined>('');
  const [cleanValue, setCleanValue] = useState<string | number | undefined>('');
  const [maskedValue, setMaskedValue] = useState<string>('');
  const classNames = `input ${name} ${className || ''}`;
  const { model, addToModel, updateModelInputValue, setInputInvalid } =
    useFormContext();
  const isMount = useIsMount();

  const getMask = (val?: string | number) => {
    if (mask && val) {
      const reg = new RegExp(mask, 'i');
      const strVal = `${val}`;

      if (reg.test(strVal)) {
        const matchVal = strVal.match(reg) || [''];
        const output = strVal.replace(reg, () => {
          return matchVal[0].replace(/./g, maskChar);
        });

        setMaskedValue(output);

        return output;
      } else {
        setMaskedValue(`${val}`);

        return `${val}`;
      }
    } else {
      setMaskedValue(`${val}`);

      return `${val}`;
    }
  };

  const validateValue = (val?: string | number) => {
    setInputValue(val || '');
    setCleanValue(val || '');
    getMask(val || '');
  };

  const setDefoValue = (val?: string | number) => {
    if (val && val !== '') {
      setCleanValue(val || '');
      const masked = getMask(val || '');

      setInputValue(masked || '');
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value: rawValue } = e.currentTarget;
    const value: string | number =
      type === 'number' ? Number(rawValue) : rawValue;

    validateValue(value);
    updateModelInputValue(name, value);

    inputChange({ e, name, value });
  };

  const handleFocus = () => {
    setInputValue(cleanValue);
  };

  const handleBlur = () => {
    setInputValue(maskedValue);
  };

  function addNewModel() {
    if (model) {
      addToModel(name, {
        type,
        valid: null,
        invalid: null,
        pristine: true,
        touched: false,
        dirty: false,
        validate,
        value: value || null,
      });
    }
  }

  function updateModel(newProps: FormModelElementProps) {
    if (model) {
      addToModel(name, {
        ...newProps,
      });
    }
  }

  const resetInput = () => {
    setCleanValue('');
    setInputValue('');
    setMaskedValue('');

    updateModelInputValue(name, '');
  };

  useEffect(() => {
    if (inputReset) {
      resetInput();
    }
  }, [inputReset]);

  useEffect(() => {
    setDefoValue(value);

    if (isMount) {
      addNewModel();
    } else {
      updateModel({ value: value || null, validate });
    }
  }, [value, validate]);

  useEffect(() => {
    if (isInvalid !== undefined && isInvalid !== null) {
      setInputInvalid(name, isInvalid);
    }
  }, [isInvalid]);

  if (type === 'textarea') {
    return (
      <textarea
        {...props}
        name={name}
        id={name}
        className={classNames}
        aria-label={name}
        aria-describedby={`${name}-help`}
        cols={cols}
        rows={rows}
        onChange={handleChange}
        // defaultValue={value}
        value={inputValue}
        {...attrs}
      ></textarea>
    );
  }
  return (
    <input
      {...props}
      type={type}
      name={name}
      id={name}
      className={classNames}
      aria-label={name}
      aria-describedby={`${name}-help`}
      onChange={handleChange}
      onFocusCapture={mask ? handleFocus : onFocusCapture}
      onBlurCapture={mask ? handleBlur : onBlurCapture}
      value={inputValue}
      // defaultValue={value}
      {...attrs}
    />
  );
};

export default Input;
