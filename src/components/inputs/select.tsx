import React, { ChangeEvent, HTMLProps, FC, useEffect, useState } from 'react';
import { useFormContext } from '../form/FormContext';
import {
  Attrs,
  ChangeParams,
  Option,
  Validation,
  InputValue,
} from '../../types';

export interface Options extends Array<Option> {}
export interface SelectProps extends HTMLProps<HTMLSelectElement> {
  name: string;
  className?: string;
  options?: Options;
  inputChange: (args: ChangeParams) => void;
  defaultLabel?: string;
  attrs?: Attrs;
  validate?: Validation[];
  value?: string | number;
}

/**
 * Select Component
 * @param name - Is the input name
 * @param className - Optional. Is the class needed, its appended to the component wrapper
 * @param options - Is the array of options, it takes an array of objects with label and value properties, this accepts attrs for each option
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param attrs - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {Array} [validate] - Optional. Is an array of entities to validate this input
 * @param value - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns a ```<select />``` element
 */
export const Select: FC<SelectProps> = ({
  name,
  className,
  options = [],
  defaultLabel,
  inputChange,
  attrs,
  children,
  validate,
  value,
  ...props
}: SelectProps & HTMLProps<HTMLSelectElement>) => {
  const { model, addToModel, updateModelInputValue } = useFormContext();
  const [inputValue, setInputValue] = useState<string | number | undefined>('');
  const classNames = `input ${name} ${className ? className : ''}`;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    setInputValue(value);
    updateModelInputValue(name, value);
    inputChange({ e, name, value });
  };

  const defoLabel = defaultLabel || 'Select an option...';

  const selectOptions: Options = [{ value: '', label: defoLabel }, ...options];

  if (children && options.length > 0) {
    console.warn(
      'react-nicer-inputs warning: There are manual options and options array prop... you need to work with either manual options or the options array.'
    );
  }

  const setDefaultValue = (val: InputValue) => {
    if (val) {
      setInputValue(val);
    }
  };

  const checkAndAddModel = () => {
    if (model) {
      addToModel(name, {
        type: 'select',
        valid: null,
        invalid: null,
        pristine: true,
        touched: false,
        dirty: false,
        value: value || null,
        validate,
      });
    }
  };

  useEffect(() => {
    checkAndAddModel();
    setDefaultValue(value);
  }, [value, validate]);

  return (
    <div className={`select-wrapper ${classNames}`}>
      <select
        {...props}
        name={name}
        id={name}
        className="select-element"
        aria-label={name}
        onChange={handleChange}
        value={inputValue}
        {...attrs}
      >
        {options.length <= 0 && children}
        {!children &&
          options.length > 0 &&
          selectOptions.map(({ value, label }) => (
            <option key={value} value={value} data-testid={`${name}-options`}>
              {label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
