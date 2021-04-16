import React, { FC, HTMLProps, ReactNode } from 'react';
import { Moment } from 'moment';

export interface CalendarHeaderProps
  extends HTMLProps<HTMLTableCaptionElement> {
  children?: ReactNode;
}

export const CalendarHeader: FC<CalendarHeaderProps> = ({
  children,
}: CalendarHeaderProps & HTMLProps<HTMLTableCaptionElement>) => {
  return <caption>{children}</caption>;
};

export default CalendarHeader;
