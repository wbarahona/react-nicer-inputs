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
  const [hasSelectedFirstRange, setHasSelectedFirstRange] = useState<boolean>(
    false
  );

  const saveDate = (newDate: string | Date) => {
    if (dateRange) {
      const mNewDate = m(newDate);
      const mStartDate = m(startDate);
      const mEndDate = m(endDate);
      const returnRange = {
        startDate,
        endDate,
      };

      if (!hasSelectedFirstRange && !mNewDate.isSame(mEndDate)) {
        if (mNewDate.isAfter(mEndDate)) {
          setEndDate('');
          returnRange.endDate = '';
        }
        setStartDate(newDate);
        setHasSelectedFirstRange(true);

        returnRange.startDate = newDate;
      } else if (!mNewDate.isSame(mStartDate)) {
        if (mNewDate.isBefore(mStartDate)) {
          setEndDate(startDate);
          setStartDate(newDate);

          returnRange.endDate = startDate;
          returnRange.startDate = newDate;
        } else {
          setEndDate(newDate);

          returnRange.endDate = newDate;
        }
        setHasSelectedFirstRange(false);
      }
      onDateSelect(returnRange);
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
