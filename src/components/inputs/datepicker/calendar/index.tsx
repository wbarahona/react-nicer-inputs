import React, { FC, HTMLProps, ReactNode } from 'react';
import m from 'moment';
import { Month } from './month';

const defaultMonth = m();

export interface CalendarProps {
  monthsToDisplay?: number;
  monthHeader?: Function;
}

export const Calendar: FC<CalendarProps> = ({
  monthsToDisplay,
  monthHeader,
}: CalendarProps & HTMLProps<CalendarProps>) => {
  return (
    <div className="calendar-wrapper">
      <div className="months-slider">
        {[...Array(monthsToDisplay)].map((j, i) => {
          let month = defaultMonth.clone().add(i, 'month');

          return (
            <Month
              key={`calendar-${i}`}
              month={month}
              monthHeader={monthHeader}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
