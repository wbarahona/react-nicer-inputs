import React, { FC, HTMLProps, ReactNode } from 'react';
import { Moment } from 'moment';

export interface CalendarHeaderProps
  extends HTMLProps<HTMLTableCaptionElement> {
  month: Moment;
  monthHeader?: Function;
}

export interface DefoHeaderProps {
  children: ReactNode;
}

const test = () => {
  console.log('test');
};

const test1 = () => {
  console.log('test1');
};

export const CalendarHeader: FC<CalendarHeaderProps> = ({
  month,
  monthHeader,
}: CalendarHeaderProps & HTMLProps<HTMLTableCaptionElement>) => {
  let CustomHeader: ReactNode = <></>;
  if (monthHeader) {
    CustomHeader = monthHeader(test, test1)();
  }

  const DefoHeader = ({ children }: DefoHeaderProps) => (
    <>
      {children}
      {month.format('MMMM')} {month.format('YYYY')}
    </>
  );

  return (
    <caption>
      <DefoHeader>{CustomHeader}</DefoHeader>
    </caption>
  );
};

export default CalendarHeader;
