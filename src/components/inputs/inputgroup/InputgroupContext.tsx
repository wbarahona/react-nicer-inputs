import React, {
  FC,
  ReactNode,
  useState,
  useEffect,
  useContext,
  createContext,
  HTMLProps,
  ChangeEvent,
} from 'react';
import InputGroupOptionList from './inputgroupoptionlist';
import { useFormContext } from '../../form/FormContext';
import {
  InputGroupContextType,
  Option,
  ChangeParams,
  Validation,
  InputValue,
} from '../../../types';

export interface Options extends Array<Option> {}

export interface InputGroupContextProps extends HTMLProps<HTMLInputElement> {
  children?: ReactNode;
  type: 'checkbox' | 'radio';
  name: string;
  options: Options;
  inputChange: (args: ChangeParams) => void;
  validate?: Validation[];
  value?: InputValue;
}

export interface OptionValue extends Option {
  checked?: boolean;
}

export interface OptionValueArray extends Array<OptionValue> {}

const InputGroupDefoValues: InputGroupContextType = {
  handleChange: () => {},
  setAnOption: () => {},
  optionModel: [null],
  useCheckedOption: () => false,
};

export const InputGroupContext =
  createContext<InputGroupContextType>(InputGroupDefoValues);

export const InputGroupProvider: FC<InputGroupContextProps> = ({
  children,
  type,
  name,
  options = [],
  inputChange,
  value = '',
}) => {
  const [optionModel, setOptionModel] = useState<OptionValue[]>([]);
  const { updateModelInputValue } = useFormContext();

  function modifyOption(theOptions: OptionValue[], value: string | number) {
    const valueStr = value as string;
    const valueArr = valueStr.split(',');

    const arr: OptionValue[] = theOptions.map(({ label, value, attrs }) => {
      const val = value as string;
      const checked = valueArr.includes(val);
      return { label, value, checked, attrs };
    });

    return arr;
  }

  function createNewOptionArray(theOptions: OptionValue[]) {
    const arr: OptionValue[] = theOptions.map(({ label, value, attrs }) => {
      return { label, value, checked: false, attrs };
    });

    return arr;
  }

  function selectOption(v: string | number) {
    let result: OptionValue[] = [];
    let resultValue: string = '';
    const availableOptions = options.length > 0 ? options : optionModel;
    const i = availableOptions.findIndex(({ value: val }) => val === v);

    if (type === 'radio') {
      const arr: OptionValue[] = createNewOptionArray(availableOptions);

      arr[i].checked = true;

      result = [...arr];
      resultValue = v as string;
    } else {
      const opts = optionModel.map(({ label, value, checked, attrs }, j) => {
        const same = i === j;

        return { label, value, checked: same ? !checked : checked, attrs };
      });

      const resultValueArr = opts.map(({ checked, value }) => {
        return checked ? value : null;
      });

      resultValue = resultValueArr
        .filter(Boolean)
        .join(',')
        .replace(/(^[,\s]+)|([,\s]+$)/g, '');

      result = [...opts];
    }

    setOptionModel(result);

    return resultValue;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value: currentInputValue } = e.currentTarget;
    const value = selectOption(currentInputValue);

    updateModelInputValue(name, value);
    inputChange({ e, name, value });
  }

  function setAnOption({ value, attrs, checked }: OptionValue) {
    const arr = [{ value, attrs, label: '', checked }];
    const newArr = [...optionModel, ...arr];

    setOptionModel(prevState => [...prevState, ...newArr]);
  }

  function buildQuickOptions() {
    const arr = createNewOptionArray(options);
    const defoArr = modifyOption(arr, value);

    if (defoArr.length > 0) {
      setOptionModel(defoArr);
    }
  }

  function setDefoValues() {
    if (value && value !== '' && value !== null) {
      const arr = createNewOptionArray(optionModel);
      const defoArr = modifyOption(arr, value);
      if (defoArr.length > 0) {
        setOptionModel(defoArr);
      }
    }
  }

  function useCheckedOption(val: string | number | null) {
    if (val) {
      const found = optionModel.find(({ value }) => value === val);

      if (found) {
        const { checked } = found;

        return checked || false;
      }
    }

    return null;
  }

  useEffect(() => {
    buildQuickOptions();
  }, [options]);

  useEffect(() => {
    setDefoValues();
  }, [value]);

  return (
    <InputGroupContext.Provider
      value={{
        setAnOption,
        optionModel,
        handleChange,
        useCheckedOption,
      }}
    >
      {options.length > 0
        ? optionModel.map(({ label, value, checked, attrs }) => {
            return (
              <InputGroupOptionList
                key={`option-${value}`}
                labelEl={label}
                value={value}
                type={type}
                name={name}
                attrs={attrs}
                checked={checked}
                handleChange={handleChange}
              />
            );
          })
        : children}
    </InputGroupContext.Provider>
  );
};

export const useInputGroupContext = () =>
  useContext<InputGroupContextType>(InputGroupContext);

export default InputGroupProvider;
