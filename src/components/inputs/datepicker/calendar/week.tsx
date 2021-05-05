import React, { FC, HTMLProps } from 'react';
import m from 'moment';
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
        <Day
          key={`day-${i}`}
          date={date}
          dateString={m(date).format('YYYY-MM-DD')}
          dayNumber={getDate(date)}
          // isSelectable={false}
        />
      ))}
    </tr>
  );
};

export default Week;
