import React, {
  FC,
  HTMLProps,
  ChangeEvent,
  MouseEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Attrs, ChangeParams, Option } from '../../types';

export interface Options extends Array<Option> {}

export interface AutocompleteProps extends HTMLProps<HTMLInputElement> {
  name: string;
  className?: string;
  options: Options;
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  value?: string | number | undefined;
}

/**
 * Autocomplete Component
 * @param name - Is the input name
 * @param [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param options - Is the array of options, it takes an array of objects with label and value properties, this accepts attrs for each option
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param attrs - Are all attributes this input can have they are appended to the input not the wrapper
 * @param [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns a select element
 */
export const Autocomplete: FC<AutocompleteProps> = ({
  name,
  className,
  options,
  inputChange,
  attrs,
  value,
  ...props
}: AutocompleteProps & HTMLProps<HTMLInputElement>) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [labelValue, setLabelValue] = useState('');
  const [allOptions, setAllOptions] = useState(options);
  const autocompleteRef = useRef<HTMLDivElement>(null);
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
    if (value && value !== '') {
      const currentOptions = options.filter(({ value }) => value === val);

      if (currentOptions.length > 0) {
        const label = currentOptions[0].label;

        setLabelValue(label);
      }
    } else if (value && value === '') {
      setLabelValue('');
    }
  };
  const selectOption = (e: MouseEvent) => {
    const value = e.currentTarget.getAttribute('data-value') || '';

    setValue(value);
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
    setValue(value);
    setAllOptions(options);

    return () => {
      unRegisterMouseDown();
    };
  }, [value, options]);

  return (
    <div className={`autocomplete-wrapper ${className}`} ref={autocompleteRef}>
      <input
        {...props}
        name={name}
        id={name}
        className="input autocomplete-input"
        aria-label={name}
        onChange={handleChange}
        onClick={toggleOptions}
        onFocus={handleFocus}
        value={labelValue}
        {...attrs}
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
