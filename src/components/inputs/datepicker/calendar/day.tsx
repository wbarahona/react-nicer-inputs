import React, { FC, HTMLProps } from 'react';

export interface DayProps extends HTMLProps<HTMLTableCellElement> {
  date: string;
}

export const Day: FC<DayProps> = ({
  date,
}: DayProps & HTMLProps<HTMLTableCellElement>) => {
  return <td>{date}</td>;
};

export default Day;
