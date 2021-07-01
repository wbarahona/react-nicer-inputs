import React, { FC, HTMLProps, ChangeEvent, useState, useEffect } from 'react';
import { ChangeParams, Attrs, Validation } from '../../types';
import { useFormContext } from '../form/FormContext';
import { useInputGroupContext } from './inputgroup/InputgroupContext';
import Label from './label';

export interface RadioProps extends HTMLProps<HTMLInputElement> {
  name: string;
  className?: string;
  labelClassName?: string;
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  validate?: Validation[];
  value: string | number | undefined;
}

/**
 * Radio Component
 * @param props - All checkbox props
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {string} [labelClassName] - Optional. Is the class appended to the label element
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param {Object} [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {Array} [validate] - Optional. Is an array of entities to validate this input
 * @param {string | number} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```<input type="radio" />``` element
 */
export const Radio: FC<RadioProps> = ({
  children,
  name,
  className,
  inputChange,
  labelClassName,
  attrs,
  validate,
  value,
  checked,
  ...props
}: RadioProps & HTMLProps<HTMLInputElement>) => {
  const [inputValue, setInputValue] = useState<string | number | undefined>('');
  const {
    model: formModel,
    addToModel,
    updateModelInputValue,
  } = useFormContext();
  const {
    handleChange: inputGroupContextChange,
    setAnOption,
    optionModel,
  } = useInputGroupContext();
  const classNames = `input ${name} ${className || ''}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, checked } = e.currentTarget;

    value = checked ? value : '';

    if (optionModel.length <= 0 && formModel) {
      updateModelInputValue(name, value);
    } else if (optionModel.length > 0) {
      inputGroupContextChange(e);
    }

    inputChange({ e, name, value });
  };

  const checkAndAddModel = () => {
    if (formModel) {
      addToModel(name, {
        type: 'radio',
        valid: null,
        invalid: null,
        pristine: true,
        touched: false,
        dirty: false,
        validate,
        value: value || '',
      });
    }
  };

  const setDefoValue = (val?: string | number) => {
    if (value && value !== '') {
      setInputValue(val || '');
    }
  };

  useEffect(() => {
    checkAndAddModel();
    setDefoValue(value);

    const valueStr = value as string;

    setAnOption({ value: valueStr, attrs, checked, label: '' });
  }, [value, validate]);

  return (
    <>
      <input
        {...props}
        type="radio"
        name={name}
        id={`${name}-${value || ''}`}
        className={classNames}
        aria-label={name}
        aria-describedby={`${name}-help`}
        onChange={handleChange}
        value={inputValue}
        {...attrs}
      />
      <Label
        htmlFor={`${name}-${value || ''}`}
        className={`${labelClassName || ''} label-${value || ''}`}
      >
        {children}
      </Label>
    </>
  );
};

export default Radio;
