import React, { ChangeEvent, HTMLProps, FC } from 'react';
import { Attrs, ChangeParams, Option } from '../../types';

export interface Options extends Array<Option> { };
export interface SelectProps extends HTMLProps<HTMLSelectElement> {
  name: string,
  className?: string,
  options: Options,
  inputChange: (args: ChangeParams) => void,
  defaultLabel?: string,
  attrs?: Attrs,
  value?: string | number | undefined
}

/**
 * Select Component
 * @param name - Is the input name
 * @param className - Optional. Is the class needed, its appended to the component wrapper
 * @param options - Is the array of options, it takes an array of objects with label and value properties, this accepts attrs for each option
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param attrs - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param value - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns a select element
 */
export const Select: FC<SelectProps> = ({ name, className, options, defaultLabel, inputChange, attrs, ...props }: SelectProps & HTMLProps<HTMLSelectElement>) => {
  const classNames = `input ${name} ${className}`;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    inputChange({ e, name, value });
  }

  const defoLabel = defaultLabel || 'Select an option...';

  const selectOptions: Options = [
    { value: '', label: defoLabel },
    ...options
  ]

  return (
    <div className={`select-wrapper ${classNames}`}>
      <select {...props} name={name} id={name} className="select-element" aria-label={name} onChange={handleChange} {...attrs}>
        {selectOptions.map(({ value, label }) => <option key={value} value={value} data-testid={`${name}-options`}>{label}</option>)}
      </select>
    </div>
  )
}

export default Select;