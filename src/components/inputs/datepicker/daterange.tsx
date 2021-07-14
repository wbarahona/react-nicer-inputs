import React, { ChangeEvent } from 'react';
import { DateRangeProps } from '../../../types';
export interface ExtendedDateRangeProps extends DateRangeProps {
  type: 'date' | 'datetime' | 'text';
  startDateVal: string;
  endDateVal: string;
  displayCalendar: (args: ChangeEvent<HTMLInputElement>) => void;
}

export const DateRange = ({
  type,
  startDate,
  endDate,
  startDateVal,
  endDateVal,
  displayCalendar,
}: ExtendedDateRangeProps) => {
  const {
    name: startDateName,
    className: startDateClassName,
    attrs: startDateAttrs,
  } = startDate;
  const {
    name: endDateName,
    className: endDateClassName,
    attrs: endDateAttrs,
  } = endDate;

  return (
    <>
      <input
        type={type}
        name={startDateName}
        id={startDateName}
        aria-label={startDateName}
        className={`input datepicker-input ${startDateName} ${startDateClassName}`}
        onChange={() => {}}
        onFocusCapture={displayCalendar}
        value={startDateVal}
        {...startDateAttrs}
      />
      <input
        type={type}
        name={endDateName}
        id={endDateName}
        aria-label={endDateName}
        className={`input datepicker-input ${endDateName} ${endDateClassName}`}
        onChange={() => {}}
        onFocusCapture={displayCalendar}
        value={endDateVal}
        {...endDateAttrs}
      />
    </>
  );
};

export default DateRange;
