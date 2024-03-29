import React, { FC, HTMLProps, ChangeEvent, useState, useEffect } from 'react';
import {
  ChangeParams,
  Attrs,
  Validation,
  FormModelElementProps,
} from '../../types';
import { useFormContext } from '../form/FormContext';
import { useInputGroupContext } from './inputgroup/InputgroupContext';
import { useIsMount } from '../../hooks/isMount';
import Label from './label';

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  name: string;
  className?: string;
  labelClassName?: string;
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  validate?: Validation[];
  inputReset?: boolean;
  checked?: boolean;
  isInvalid?: boolean;
  value?: string | number | undefined;
}

/**
 * Checkbox Component
 * @param props - All checkbox props
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {string} [labelClassName] - Optional. Is the class appended to the label element
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param {Object} [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {Array} [validate] - Optional. Is an array of entities to validate this input
 * @param {boolean} [inputReset] - Optional. Allows to set the input as empty
 * @param {boolean} [isInvalid] = Optional. Allows to set the input as invalid
 * @param {string | number} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```<input type="checkbox" />``` element
 */
export const Checkbox: FC<CheckboxProps> = ({
  children,
  name,
  className,
  inputChange,
  labelClassName,
  attrs,
  validate,
  checked = false,
  inputReset,
  value,
  isInvalid,
  ...props
}: CheckboxProps & HTMLProps<HTMLInputElement>) => {
  const [inputValue, setInputValue] = useState<string | number | undefined>('');
  const [inputChecked, setInputChecked] = useState<boolean>(false);
  const {
    model: formModel,
    addToModel,
    updateModelInputValue,
    setInputInvalid,
  } = useFormContext();
  const isMount = useIsMount();
  const {
    handleChange: inputGroupContextChange,
    setAnOption,
    optionModel,
    useCheckedOption,
  } = useInputGroupContext();
  const classNames = `input ${name} ${className || ''}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, checked } = e.currentTarget;

    value = checked ? name : '';

    if (optionModel.length === 1 && optionModel[0] === null && formModel) {
      updateModelInputValue(name, value);
    } else if (optionModel.length > 0) {
      inputGroupContextChange(e);
    }

    setInputChecked(checked);
    inputChange({ e, name, value });
  };

  const checkAndAddModel = () => {
    if (formModel) {
      addToModel(name, {
        type: 'checkbox',
        valid: null,
        invalid: null,
        pristine: true,
        touched: false,
        dirty: false,
        validate,
        value: value || null,
      });
    }
  };

  const setDefoValue = (val?: string | number) => {
    if (value && value !== '') {
      setInputValue(val || '');
    }
  };

  function addNewModel() {
    if (formModel) {
      addToModel(name, {
        type: 'checkbox',
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
    if (formModel) {
      addToModel(name, {
        ...newProps,
      });
    }
  }

  useEffect(() => {
    if (isMount) {
      if (optionModel[0] !== null) {
        const valueStr = value as string;
        setAnOption({
          value: valueStr,
          attrs,
          checked: checked || false,
          label: '',
        });
      } else if (formModel) {
        addNewModel();
      }
      setDefoValue(value);
    } else {
      updateModel({ value: value || null, validate });
    }
  }, [value, validate]);

  useEffect(() => {
    if (!isMount) {
      const val = checked ? name : '';

      setInputChecked(checked);
      updateModel({ value: val });
    }
  }, [checked]);

  useEffect(() => {
    const chk = useCheckedOption(inputValue || null);

    if (chk !== null) {
      setInputChecked(chk);
    }
  }, [optionModel]);

  useEffect(() => {
    if (isInvalid !== undefined && isInvalid !== null) {
      setInputInvalid(name, isInvalid);
    }
  }, [isInvalid]);

  return (
    <>
      <input
        {...props}
        type="checkbox"
        name={name}
        id={`${name}-${value || ''}`}
        className={classNames}
        aria-label={name}
        aria-describedby={`${name}-help`}
        onChange={handleChange}
        value={inputValue}
        {...attrs}
        checked={inputChecked}
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

export default Checkbox;
