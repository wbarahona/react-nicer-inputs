import React, { FC, HTMLProps, useState, ReactNode } from 'react';
import m, { Moment } from 'moment';
import { Month } from './month';
import CalendarSlider from './calendarSlider';
import CalendarNavigation from './calendarNavigation';
import CalendarProvider from './CalendarContext';

export interface DateRange {
  startDate: string | Date;
  endDate: string | Date;
}
export interface CalendarProps {
  monthsToDisplay?: number;
  monthHeader?: Function;
  dateRange?: boolean;
  minDate?: string;
  maxDate?: string;
  format?: string;
  minNights?: number;
  maxNights?: number;
  date?: string | Date | DateRange;
  disabledDates?: string[];
  prevButton?: ReactNode;
  nextButton?: ReactNode;
  disableNavigationOnDateBoundary?: boolean;
  onDateSelect: (args: string | Date | DateRange) => void;
}

export const Calendar: FC<CalendarProps> = ({
  monthsToDisplay,
  monthHeader,
  dateRange,
  minDate,
  maxDate,
  format,
  minNights,
  maxNights,
  onDateSelect,
  date,
  prevButton,
  nextButton,
  disableNavigationOnDateBoundary,
  disabledDates,
}: CalendarProps & HTMLProps<CalendarProps>) => {
  return (
    <CalendarProvider
      onDateSelect={onDateSelect}
      dateRange={dateRange}
      monthsToDisplay={monthsToDisplay}
      minNights={minNights}
      maxNights={maxNights}
      minDate={minDate}
      maxDate={maxDate}
      format={format}
      date={date}
      disabledDates={disabledDates || []}
      monthHeader={monthHeader}
      disableNavigationOnDateBoundary={disableNavigationOnDateBoundary}
    >
      <div className="calendar-wrapper">
        <CalendarNavigation prev={prevButton} next={nextButton} />
        <CalendarSlider />
      </div>
    </CalendarProvider>
  );
};

export default Calendar;
