import React, { useContext } from 'react';
import { CalendarContext } from './CalendarContext';
import { CalendarContextType } from '../../../../types';
import { Month } from './month';
import { Moment } from 'moment';

// TODO: add animation later to slide
export const CalendarSlider = () => {
  const {
    getPrevPaneMonths,
    getCurrentPaneMonths,
    getNextPaneMonths,
    whatCalendarHeader,
  } = useContext<CalendarContextType>(CalendarContext);
  // const prevPaneMonths: Moment[] = getPrevPaneMonths();
  const currPaneMonths: Moment[] = getCurrentPaneMonths();
  // const nextPaneMonths: Moment[] = getNextPaneMonths();

  return (
    <div className="row months-slider">
      {/* {prevPaneMonths.map((month: Moment, i: number) => (
        <Month
          key={`calendar-${i}`}
          month={month}
          monthHeader={whatCalendarHeader(month)}
        />
      ))} */}
      {currPaneMonths.map((month: Moment, i: number) => (
        <Month
          key={`calendar-${i}`}
          month={month}
          monthHeader={whatCalendarHeader(month)}
        />
      ))}
      {/* {nextPaneMonths.map((month: Moment, i: number) => (
        <Month
          key={`calendar-${i}`}
          month={month}
          monthHeader={whatCalendarHeader(month)}
        />
      ))} */}
    </div>
  );
};

export default CalendarSlider;
