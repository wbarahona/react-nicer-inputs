import React, { FC, HTMLProps, MouseEvent, useContext } from 'react';
import { CalendarContext } from './CalendarContext';
import m from 'moment';
import { CalendarContextType } from '../../../../types';

export interface DayProps extends HTMLProps<HTMLTableCellElement> {
  date?: Date;
  dateString?: string;
  dayNumber: string;
}

export const Day: FC<DayProps> = ({
  date,
  dateString,
  dayNumber,
}: DayProps & HTMLProps<HTMLTableCellElement>) => {
  const { saveDate } = useContext(CalendarContext);

  const handleClick = (e: MouseEvent<HTMLTableDataCellElement>) => {
    const rawDate = e.currentTarget.getAttribute('data-date');
    const date = m(rawDate, 'YYYY-MM-DD', true).toDate();

    saveDate(date);
  };

  return (
    <td data-date={dateString} onClick={handleClick}>
      <time dateTime={dateString}>{dayNumber}</time>
    </td>
  );
};

export default Day;
