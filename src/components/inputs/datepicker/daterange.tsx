import React, { ChangeEvent } from 'react';
import { DateRangeProps } from '../../../types';

export interface ExtendedDateRangeProps extends DateRangeProps {
  type: 'date' | 'datetime' | 'text';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DateRange = ({
  type,
  onChange,
  startDate,
  endDate,
}: ExtendedDateRangeProps) => {
  const { name: startDateName, className: startDateClassName, attrs: startDateAttrs } = startDate;
  const { name: endDateName, className: endDateClassName, attrs: endDateAttrs } = endDate;

  return (
    <>
      <input
        type={type}
        name={startDateName}
        id={startDateName}
        className={`input datepicker-input ${startDateName} ${startDateClassName}`}
        onChange={onChange}
        {...startDateAttrs}
      />
      <input
        type={type}
        name={endDateName}
        id={endDateName}
        className={`input datepicker-input ${endDateName} ${endDateClassName}`}
        onChange={onChange}
        {...endDateAttrs}
      />
    </>
  );
};

export default DateRange;
