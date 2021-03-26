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
  const { name: startDateName, className: startDateClassName } = startDate;
  const { name: endDateName, className: endDateClassName } = endDate;

  return (
    <>
      <input
        type={type}
        name={startDateName}
        id={startDateName}
        className={`input datepicker-input ${startDateName} ${startDateClassName}`}
        onChange={onChange}
      />
      <input
        type={type}
        name={endDateName}
        id={endDateName}
        className={`input datepicker-input ${endDateName} ${endDateClassName}`}
        onChange={onChange}
      />
    </>
  );
};

export default DateRange;
