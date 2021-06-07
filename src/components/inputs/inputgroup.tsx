import React, { FC, HTMLProps, ChangeEvent, useState, useEffect } from 'react';
import { useFormContext } from '../form/FormContext';
import { ChangeParams, Option, InputValue, Validation } from '../../types';

export interface Options extends Array<Option> {}

/** @typedef {{ type: ("checkbox" | "radio")), name: string, className?: string, options: object[], inputChange: Function, value?: (string | number) }} InputGroupProps */
export interface InputGroupProps extends HTMLProps<HTMLInputElement> {
  type: 'checkbox' | 'radio';
  name: string;
  className?: string;
  options: Options;
  inputChange: (args: ChangeParams) => void;
  validate?: Validation[];
  value?: InputValue;
}

export interface OptionValue {
  label: string | number | null;
  value: string | number | null;
  checked: boolean;
}

export interface OptionValueArray extends Array<OptionValue> {}

/**
 * Input Group Component
 * @alias InputGroup
 * @param {InputGroupProps} props - all props
 * @param {string} type - Can be only "checkbox" || "radio"
 * @param {string} name - Is the input name
 * @param {string} className - Optional. Is the class needed, its appended to the component wrapper
 * @param {object[]} options - Is the array of options, it takes an array of objects with label and value properties, this accepts attrs for each option
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value, for checkboxes it will return a comma separated string of each value selected by the user
 * @param {Array} [validate] - Optional. Is an array of entities to validate this input
 * @param {(string | number)} value - Optional. Is the input value, if sent the input will take this value as default, for checkboxes it needs a comma separated value, for radios just the radio value
 * @returns {React.FunctionComponentElement} Returns a list of ```<checkbox />``` or ```<radio />``` button list
 */
export const InputGroup: FC<InputGroupProps> = ({
  type,
  name,
  className,
  inputChange,
  options,
  validate,
  value,
  ...props
}: InputGroupProps & HTMLProps<HTMLInputElement>) => {
  const { model, addToModel, updateModelInputValue } = useFormContext();
  const [optionValueArray, setOptionValueArray] = useState<OptionValueArray>(
    []
  );

  const classNames = `${name} ${className ? className : ''}`;

  const resetAllOptions = (): OptionValueArray => {
    const arr: OptionValueArray = [];

    options.map(({ value, label }) => {
      arr.push({ label, value, checked: false });
    });

    return arr;
  };

  const buildInputArray = (
    rawInputValue: InputValue,
    init: boolean = false
  ): string => {
    const inputValues: string[] = `${rawInputValue}`.split(',');
    let arr: OptionValueArray = [];
    let response: string = '';

    arr = resetAllOptions();

    if (!init) {
      optionValueArray.map(({ checked }, i) => {
        arr[i].checked = checked;
      });
    }

    inputValues.map(val => {
      const i = options.findIndex(({ value }) => value === val);

      if (i >= 0 && type === 'checkbox') {
        arr[i].checked = !arr[i].checked;

        arr.map(({ value, checked }) => {
          if (checked) {
            response += `${value},`;
          }
        });
        response = response.slice(0, -1);
      } else if (i >= 0 && type === 'radio') {
        arr = resetAllOptions();
        arr[i].checked = true;

        response = `${arr.find(({ checked }) => checked)?.value}`;
      }
    });

    setOptionValueArray(arr);

    return response;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: currentInputValue } = e.currentTarget;
    const value = buildInputArray(currentInputValue);

    updateModelInputValue(name, value);
    inputChange({ e, name, value });
  };

  const checkAndAddModel = () => {
    if (model) {
      addToModel(name, {
        type,
        valid: null,
        invalid: null,
        pristine: true,
        touched: false,
        dirty: false,
        value: value || '',
      });
    }
  };

  useEffect(() => {
    checkAndAddModel();
    buildInputArray(value, true);
  }, [value, validate]);

  return (
    <div className={`inputgroup-wrapper ${classNames}`}>
      {options.map(({ label: lbl, value, attrs }, i) => {
        const checked = optionValueArray[i]
          ? optionValueArray[i].checked
          : false;
        return (
          <div key={value} className={`inputgroup-row inputgroup-row-${value}`}>
            <input
              type={type}
              name={name}
              id={`${name}-${value}`}
              className={`input ${type}-${value}`}
              value={value}
              {...attrs}
              checked={checked}
              onChange={handleChange}
              data-testid={`${name}-inputgroup-options`}
            />
            <label htmlFor={`${name}-${value}`} className={`label-${value}`}>
              {lbl}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default InputGroup;
