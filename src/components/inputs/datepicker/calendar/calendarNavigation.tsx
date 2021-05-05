import React, { FC, ReactNode, HTMLProps, useContext } from 'react';
import { CalendarContext } from './CalendarContext';
import { CalendarContextType } from '../../../../types';

export interface CalendarNavigationProps {
  prev: ReactNode;
  next: ReactNode;
}

export const CalendarNavigation: FC<CalendarNavigationProps> = ({
  prev,
  next,
}: CalendarNavigationProps & HTMLProps<CalendarNavigationProps>) => {
  const {
    movePrev,
    moveNext,
    canNavigatePrev,
    canNavigateNext,
  } = useContext<CalendarContextType>(CalendarContext);
  return (
    <div className="calendar-navigation">
      <div
        className={`calendar-prev-button-wrapper ${
          !canNavigatePrev()
            ? 'calendar-nav-button-wrapper--disabled calendar-navigation-prev--disabled'
            : ''
        }`}
        onClick={movePrev}
      >
        {prev ? prev : <button>&lt;</button>}
      </div>
      <div
        className={`calendar-next-button-wrapper ${
          !canNavigateNext()
            ? 'calendar-nav-button-wrapper--disabled calendar-navigation-next--disabled'
            : ''
        }`}
        onClick={moveNext}
      >
        {next ? next : <button>&gt;</button>}
      </div>
    </div>
  );
};

export default CalendarNavigation;
