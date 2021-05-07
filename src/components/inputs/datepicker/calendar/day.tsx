import React, {
  FC,
  HTMLProps,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CalendarContext } from './CalendarContext';
import m from 'moment';
import { CalendarContextType } from '../../../../types';

export interface DayProps extends HTMLProps<HTMLTableCellElement> {
  date?: Date;
  dateString?: string;
  dayNumber: string;
  isSelectable?: boolean;
}

export const Day: FC<DayProps> = ({
  date,
  dateString,
  dayNumber,
  isSelectable = true,
}: DayProps & HTMLProps<HTMLTableCellElement>) => {
  const {
    saveDate,
    startDate,
    endDate,
    saveHoverDate,
    isDateSelectable,
    isDateSelected,
    isDateWithinRange,
    isSelectedDateStartDate,
    isSelectedDateEndDate,
    minNights,
    maxNights,
    minDate,
    maxDate,
    date: ctxDate,
    currPaneMonths,
    isWeekend,
    getWeekdayName,
  } = useContext<CalendarContextType>(CalendarContext);
  const [className, setClassName] = useState<string>('calendar-date');

  const handleClick = (e: MouseEvent<HTMLTableDataCellElement>) => {
    if (
      isSelectable &&
      dayNumber !== '' &&
      isDateSelectable(date || new Date())
    ) {
      const rawDate = e.currentTarget.getAttribute('data-date');
      const date = m(rawDate, 'YYYY-MM-DD', true).toDate();

      saveDate(date);
    }
  };

  const handleMouseEnter = () => {
    if (dayNumber !== '') {
      const mThisDate = m(date);
      saveHoverDate(mThisDate.toDate());
    }
  };

  const handleMouseLeave = () => {};

  const buildClassName = () => {
    const classArray: string[] = ['calendar-date'];
    const theDate = date || new Date();

    if (!isDateSelectable(theDate)) {
      classArray.push('calendar-date--unselectable');
    }

    if (dayNumber === '') {
      classArray.push('calendar-date--empty calendar-date--unselectable');
    } else {
      if (isDateSelected(theDate)) {
        classArray.push('calendar-date--selected');
      }

      if (isDateWithinRange(theDate)) {
        classArray.push('calendar-date--between-date');
      }

      if (isSelectedDateStartDate(theDate)) {
        classArray.push('calendar-date--start-date');
      }

      if (isSelectedDateEndDate(theDate)) {
        classArray.push('calendar-date--end-date');
      }
      if (isWeekend(theDate)) {
        classArray.push('calendar-date--weekend');
      } else {
        classArray.push('calendar-date--weekday');
      }
    }

    classArray.push(`calendar-date--weekday-${getWeekdayName(theDate)}`);

    setClassName(classArray.join(' '));
  };

  useEffect(() => {
    buildClassName();
  }, [
    ctxDate,
    startDate,
    endDate,
    minNights,
    maxNights,
    minDate,
    maxDate,
    currPaneMonths,
  ]);

  return (
    <td
      data-date={dateString}
      onClick={handleClick}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      className={className}
    >
      <time dateTime={dateString}>{dayNumber}</time>
    </td>
  );
};

export default Day;
