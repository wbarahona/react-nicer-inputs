import React, {
  FC,
  HTMLProps,
  ChangeEvent,
  MouseEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Attrs,
  ChangeParams,
  Option,
  Validation,
  FormModelElementProps,
} from '../../types';
import { useFormContext } from '../form/FormContext';
import { useIsMount } from '../../hooks/isMount';

export interface Options extends Array<Option> {}

export interface AutocompleteProps extends HTMLProps<HTMLInputElement> {
  name: string;
  className?: string;
  options: Options;
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  validate?: Validation[];
  inputReset?: boolean;
  isInvalid?: boolean;
  value?: string | number | undefined;
}

/**
 * Autocomplete Component
 * @param name - Is the input name
 * @param [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param options - Is the array of options, it takes an array of objects with label and value properties, this accepts attrs for each option
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param attrs - Are all attributes this input can have they are appended to the input not the wrapper
 * @param {Array} [validate] - Optional. Is an array of entities to validate this input
 * @param [value] - Optional. Is the input value, if sent the input will take this value as default
 * @param {boolean} [inputReset] - Optional. Allows to set the input as empty
 * @param {boolean} [isInvalid] = Optional. Allows to set the input as invalid
 * @returns {React.FunctionComponentElement} Returns an ```autocomplete selector``` element
 */
export const Autocomplete: FC<AutocompleteProps> = ({
  name,
  className,
  options,
  inputChange,
  attrs,
  validate,
  inputReset,
  value,
  isInvalid,
  ...props
}: AutocompleteProps & HTMLProps<HTMLInputElement>) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [labelValue, setLabelValue] = useState('');
  const [allOptions, setAllOptions] = useState(options);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const { model, addToModel, updateModelInputValue, setInputInvalid } =
    useFormContext();
  const isMount = useIsMount();
  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };
  const closeOptions = () => {
    setOptionsVisible(false);
  };
  function handleClick(e: Event) {
    if (
      autocompleteRef.current &&
      !autocompleteRef.current.contains(e.target as Node)
    ) {
      closeOptions();
    }
  }
  const registerMouseDown = () => {
    document.addEventListener('mousedown', handleClick);
  };

  const unRegisterMouseDown = () => {
    document.removeEventListener('mousedown', handleClick);
  };
  const setValue = (val: String | number | undefined) => {
    if (val && val !== '') {
      const currentOptions = options.filter(({ value }) => value === val);

      if (currentOptions.length > 0) {
        const label = currentOptions[0].label;

        setLabelValue(label);
      }
    }
    if (val === '') {
      setLabelValue('');
    }
  };
  const selectOption = (e: MouseEvent) => {
    const value = e.currentTarget.getAttribute('data-value') || '';

    setValue(value);
    updateModelInputValue(name, value);
    inputChange({ e: autocompleteRef, name, value });
    closeOptions();
  };
  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    if (labelValue.length > 0) {
      e.currentTarget.select();
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const currentOptions = options.filter(({ label }) =>
      label.toLowerCase().includes(value.toLowerCase())
    );

    setLabelValue(value);
    setAllOptions(currentOptions);
  };
  useEffect(() => {
    registerMouseDown();
    return () => {
      unRegisterMouseDown();
    };
  }, []);

  function addNewModel() {
    if (model) {
      addToModel(name, {
        type: 'autocomplete',
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

  function resetInput() {
    setValue('');

    updateModelInputValue(name, '');
  }

  useEffect(() => {
    if (inputReset) {
      resetInput();
    }
  }, [inputReset]);

  useEffect(() => {
    setValue(value);

    if (isMount) {
      addNewModel();
    } else {
      const res = allOptions.filter(({ value: optVal }) => optVal === value);

      if (res.length > 0) {
        const { value: optVal } = res[0];

        updateModel({ value: optVal || null });
      }
    }
  }, [value]);

  useEffect(() => {
    if (!isMount) {
      updateModel({ validate });
    }
  }, [validate]);

  useEffect(() => {
    setAllOptions(options);
  }, [options]);

  useEffect(() => {
    if (isInvalid !== undefined && isInvalid !== null) {
      setInputInvalid(name, isInvalid);
    }
  }, [isInvalid]);

  return (
    <div className={`autocomplete-wrapper ${className}`} ref={autocompleteRef}>
      <input
        {...props}
        type="text"
        name={name}
        id={name}
        className="input autocomplete-input"
        aria-label={name}
        onChange={handleChange}
        onClick={toggleOptions}
        onFocus={handleFocus}
        value={labelValue}
        {...attrs}
        autoComplete="off"
      />
      {optionsVisible && (
        <ul className="autocomplete-options">
          {allOptions.map(({ label, value, attrs: optAttrs }) => (
            <li
              key={value}
              data-value={value}
              data-label={label}
              data-testid={`${name}-autocomplete-options`}
              onClick={selectOption}
              {...optAttrs}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
