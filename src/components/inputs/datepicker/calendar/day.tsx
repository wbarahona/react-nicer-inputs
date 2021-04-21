import React, { FC, HTMLProps, MouseEvent, useContext, useState } from 'react';
import { CalendarContext } from './CalendarContext';
import m from 'moment';
import { CalendarContextType } from '../../../../types';

export interface DayProps extends HTMLProps<HTMLTableCellElement> {
  date?: Date;
  dateString?: string;
  dayNumber: string;
  valid?: boolean;
  inRange?: boolean;
  selected?: boolean;
  minDate?: boolean;
  maxDate?: boolean;
}

export const Day: FC<DayProps> = ({
  date,
  dateString,
  dayNumber,
}: DayProps & HTMLProps<HTMLTableCellElement>) => {
  const { saveDate } = useContext(CalendarContext);
  const [className, setClassName] = useState<string>('');

  const handleClick = (e: MouseEvent<HTMLTableDataCellElement>) => {
    const rawDate = e.currentTarget.getAttribute('data-date');
    const date = m(rawDate, 'YYYY-MM-DD', true).toDate();

    saveDate(date);
  };

  const handleMouseEnter = () => {
    console.log('mouse entered');
  };

  const handleMouseLeave = () => {
    console.log('mouse leave');
  };

  return (
    <td
      data-date={dateString}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <time dateTime={dateString}>{dayNumber}</time>
    </td>
  );
};

export default Day;
