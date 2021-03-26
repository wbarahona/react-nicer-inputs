import React, { FC, HTMLProps, ChangeEvent } from 'react';
import { Attrs, ChangeParams, DateRangeProps } from '../../../types';
import DateRange from './daterange';

export interface DatePickerProps extends HTMLProps<HTMLInputElement> {
  type: 'date' | 'datetime';
  name: string;
  className?: string;
  inputChange: (args: ChangeParams) => void;
  native?: boolean;
  dateRange?: DateRangeProps;
  attrs?: Attrs;
  value?: string | number | undefined;
}

/**
 * Date Picker Component
 * @alias DatePicker
 * @param {DatePickerProps} props - all props
 * @param {string} type - Can be only "date" || "datetime"
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value, for checkboxes it will return a comma separated string of each value selected by the user
 * @param {string} [native] - Optional. Defines the visual aspect of the component, if it will render native dates or text based input
 * @param {DateRangeProps} [dateRange] - Optional. Defines the behavior of this component, date ranges allows to select 2 dates, therefore there will be two inputs rendered
 * @param {(string | number)} value - Optional. Is the input value, if sent the input will take this value as default, for checkboxes it needs a comma separated value, for radios just the radio value
 * @returns {React.FunctionComponentElement} Returns an input that allows dates selection or two if its a date range
 */
export const DatePicker: FC<DatePickerProps> = ({
  type,
  name,
  className,
  inputChange,
  native,
  dateRange,
  attrs,
  value,
  ...props
}: DatePickerProps & HTMLProps<HTMLInputElement>) => {
  const inputType = native ? type : 'text';
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    const { value } = currentTarget;

    inputChange({ e, name, value });
  };

  // TODO: make a context of all this to avoid prop drilling

  return (
    <>
      {!dateRange && (
        <div className={`datepicker-wrapper ${className}`}>
          <input
            {...props}
            type={inputType}
            name={name}
            id={name}
            className={`input datepicker-input ${name}`}
            onChange={handleChange}
          />
        </div>
      )}
      {dateRange && (
        <div className={`datepicker-wrapper ${className}`}>
          <DateRange type={inputType} onChange={handleChange} {...dateRange} />
        </div>
      )}
    </>
  );
};

export default DatePicker;
