import React, { FC, HTMLProps, ReactNode } from 'react';
import { Moment } from 'moment';

export interface CalendarHeaderProps
  extends HTMLProps<HTMLTableCaptionElement> {
  children?: ReactNode;
}

export const CalendarHeader: FC<CalendarHeaderProps> = ({
  children,
}: CalendarHeaderProps & HTMLProps<HTMLTableCaptionElement>) => {
  return <div className="table-caption">{children}</div>;
};

export default CalendarHeader;
