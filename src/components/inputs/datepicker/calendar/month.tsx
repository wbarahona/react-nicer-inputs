import React, { FC, HTMLProps, ReactNode } from 'react';
import m, { Moment } from 'moment';
import Week from './week';
import CalendarHeader from './calendarHeader';

export interface MonthProps extends HTMLProps<HTMLTableElement> {
  month: Moment;
  monthHeader?: Function;
  locale?: string;
}

export const Month: FC<MonthProps> = ({
  month,
  monthHeader,
  locale,
}: MonthProps & HTMLProps<HTMLTableElement>) => {
  m.locale(locale);
  const weekDays: Array<string> = m.weekdays();
  const thisMonth: number = month.month() + 1;
  const thisYear: number = month.year();
  const startDateOfMonth: Moment = m(month).startOf('month');
  const endDateOfMonth: Moment = m(month).endOf('month');

  const calcWeeksInMonth = (date: Moment): number => {
    const dateFirst = m(date).date(1);
    const dateLast = m(date).date(date.daysInMonth());
    const startWeek = dateFirst.isoWeek();
    const endWeek = dateLast.isoWeek();

    if (endWeek < startWeek) {
      // Yearly overlaps, month is either DEC or JAN
      if (dateFirst.month() === 0) {
        // January
        return endWeek + 1;
      } else {
        // December
        if (dateLast.isoWeekday() === 7) {
          // Sunday is last day of year
          return endWeek - startWeek + 1;
        } else {
          // Sunday is NOT last day of year
          return dateFirst.isoWeeksInYear() - startWeek + 1;
        }
      }
    } else {
      return endWeek - startWeek + 1;
    }
  };

  const buildMonthWeeks = (): Array<Array<Date>> => {
    let ret: Array<Array<Date>> = [];
    let weekArray: Array<Date> = [];
    const firstDateOfRenderingMonth = m(startDateOfMonth).startOf('week');
    const lastDateOfRenderingMonth = m(endDateOfMonth).endOf('week');
    let cursorDate = firstDateOfRenderingMonth.clone();

    while (cursorDate.isBefore(lastDateOfRenderingMonth)) {
      const lastDateOfCursorWeek = m(cursorDate).endOf('week');
      const isLastDateOfCursorWeek =
        cursorDate.format('MM-DD-YYYY') ===
        lastDateOfCursorWeek.format('MM-DD-YYYY');

      weekArray.push(cursorDate.toDate());

      if (isLastDateOfCursorWeek) {
        ret.push(weekArray);
        weekArray = [];
      }
      cursorDate.add(1, 'day');
    }

    return ret;
  };

  const weeksInMonth: number = calcWeeksInMonth(month);
  const week = buildMonthWeeks();

  return (
    <table>
      <CalendarHeader month={month} monthHeader={monthHeader} />
      <thead>
        <tr>
          {weekDays.map((weekDay, i) => (
            <td key={`th-${i}`}>{weekDay}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(weeksInMonth)].map((e, i) => (
          <Week key={`week-${i}`} week={week[i]} month={thisMonth} />
        ))}
      </tbody>
    </table>
  );
};

export default Month;
