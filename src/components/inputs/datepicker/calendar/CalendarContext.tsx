import React, { FC, createContext, useState, ReactNode } from 'react';
import m from 'moment';
import { CalendarContextType } from '../../../../types';

const CalendarContextDefoValues: CalendarContextType = {
  date: '',
  saveDate: () => {},
  getDate: () => new Date(),
};

export const CalendarContext = createContext<CalendarContextType>(
  CalendarContextDefoValues
);

export interface DateRange {
  startDate: string | Date;
  endDate: string | Date;
}

export interface CalendarContextProps {
  children?: ReactNode;
  dateRange?: boolean;
  onDateSelect: (args: string | Date | DateRange) => void;
}

const CalendarProvider: FC<CalendarContextProps> = ({
  children,
  dateRange,
  onDateSelect,
}) => {
  const [date, setDate] = useState<string | Date>('');
  const [startDate, setStartDate] = useState<string | Date>('');
  const [endDate, setEndDate] = useState<string | Date>('');
  const [hasSelectedRange, setHasSelectedRange] = useState<boolean>(false);

  const saveDate = (newDate: string | Date) => {
    if (dateRange) {
      const mNewDate = m(newDate);
      const mStartDate = m(startDate);
      const mEndDate = m(endDate);
      const startDateValid = mStartDate.isValid();
      const endDateValid = mEndDate.isValid();

      if (!startDateValid) {
        setStartDate(newDate);
      }

      if (startDateValid && !endDateValid) {
        setEndDate(newDate);
      }

      if (startDateValid && mNewDate.isBefore(mEndDate)) {
        setStartDate(newDate);
      }

      if (startDateValid && endDateValid && !hasSelectedRange) {
        setHasSelectedRange(true);
      }

      console.log(mNewDate, mStartDate.isValid(), mEndDate.isValid());
    } else {
      setDate(newDate);
      onDateSelect(newDate);
    }
  };

  const getDate = () => date;

  return (
    <CalendarContext.Provider
      value={{
        date,
        saveDate,
        getDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
