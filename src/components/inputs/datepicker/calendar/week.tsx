import React, { FC, HTMLProps } from 'react';
import Day from './day';

export interface WeekProps extends HTMLProps<HTMLTableRowElement> {
  week: Array<Date>;
  month: number;
}

export const Week: FC<WeekProps> = ({
  week = [],
  month,
}: WeekProps & HTMLProps<HTMLTableRowElement>) => {
  const getDate = (date: Date): string => {
    let ret: string = '';
    const weekMonth = date.getMonth() + 1;

    ret = weekMonth === month ? `${date.getDate()}` : '';

    return ret;
  };

  return (
    <tr>
      {week.map((date, i) => (
        <Day key={`day-${i}`} date={getDate(date)} />
      ))}
    </tr>
  );
};

export default Week;
