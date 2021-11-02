import React, { FC, HTMLProps, ChangeEvent, useState, useEffect } from 'react';
import {
  ChangeParams,
  Attrs,
  Validation,
  FormModelElementProps,
} from '../../types';
import { useFormContext } from '../form/FormContext';
import { useInputGroupContext } from './inputgroup/InputgroupContext';
import Label from './label';
import { useIsMount } from '../../hooks/isMount';

export interface RadioProps extends HTMLProps<HTMLInputElement> {
  name: string;
  className?: string;
  labelClassName?: string;
  inputChange: (args: ChangeParams) => void;
  inputReset?: boolean;
  attrs?: Attrs;
  validate?: Validation[];
  isInvalid?: boolean;
  value: string | number | undefined;
}

/**
 * Radio Component
 * @param props - All checkbox props
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {string} [labelClassName] - Optional. Is the class appended to the label element
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param {boolean} [inputReset] - Optional. Allows to set the input as empty
 * @param {Object} [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {Array} [validate] - Optional. Is an array of entities to validate this input
 * @param {boolean} [isInvalid] = Optional. Allows to set the input as invalid
 * @param {string | number} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```<input type="radio" />``` element
 */
export const Radio: FC<RadioProps> = ({
  children,
  name,
  className,
  inputChange,
  inputReset,
  labelClassName,
  attrs,
  validate,
  value,
  checked = false,
  isInvalid,
  ...props
}: RadioProps & HTMLProps<HTMLInputElement>) => {
  const [inputValue, setInputValue] = useState<string | number | undefined>('');
  const [inputChecked, setInputChecked] = useState<boolean>(false);
  const {
    model: formModel,
    addToModel,
    updateModelInputValue,
    setInputInvalid,
  } = useFormContext();
  const {
    handleChange: inputGroupContextChange,
    setAnOption,
    optionModel,
    useCheckedOption,
  } = useInputGroupContext();
  const isMount = useIsMount();
  const classNames = `input ${name} ${className || ''}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, checked } = e.currentTarget;

    value = checked ? value : '';

    if (optionModel.length <= 0 && formModel) {
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
        type: 'radio',
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
        type="radio"
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

export default Radio;
