import React, { FC, HTMLProps, useState } from 'react';
import m, { Moment } from 'moment';
import { Month } from './month';
import CalendarProvider from './CalendarContext';

export interface DateRange {
  startDate: string | Date;
  endDate: string | Date;
}
export interface CalendarProps {
  monthsToDisplay?: number;
  monthHeader?: Function;
  dateRange?: boolean;
  minDate?: string;
  maxDate?: string;
  minNights?: number;
  maxNights?: number;
  onDateSelect: (args: string | Date | DateRange) => void;
}

export const Calendar: FC<CalendarProps> = ({
  monthsToDisplay,
  monthHeader,
  dateRange,
  minDate,
  maxDate,
  onDateSelect,
}: CalendarProps & HTMLProps<CalendarProps>) => {
  const rawNow: Date = m().toDate();
  const initialDate: Date = minDate
    ? m(minDate, 'MM-DD-YYYY', true).toDate()
    : rawNow;

  const [defaultMonth, setDefaultMonth] = useState<Moment>(
    m(initialDate, 'MM-DD-YYYY', true)
  );
  const [defoMM, setDefoMM] = useState<string | number>(
    initialDate.getMonth() + 1
  );
  const [defoYYYY, setDefoYYYY] = useState<string | number>(
    initialDate.getFullYear()
  );
  const setMonth = (month: string) => {
    const initDate = initialDate.getDate();
    const daDate = initDate < 10 ? `0${initDate}` : initDate;
    const convertedMonth: number = parseInt(month, 10);
    const daMonth = convertedMonth < 10 ? `0${convertedMonth}` : convertedMonth;
    const daRawDate = `${daMonth}-${daDate}-${defoYYYY}`;
    const mNewDate = m(daRawDate, 'MM-DD-YYYY', true);

    //TODO: validate incoming selection vs date ranges between minDate and maxDate, decide either allow select the date throwing some warn or do not allow the selection

    setDefaultMonth(mNewDate);
    setDefoMM(month);
  };
  const setYear = (year: string) => {
    const initMonth = defoMM;
    const initDate = initialDate.getDate();
    const daMonth = initMonth < 10 ? `0${initMonth}` : initMonth;
    const daDate = initDate < 10 ? `0${initDate}` : initDate;
    const daRawDate = `${daMonth}-${daDate}-${year}`;
    const mNewDate = m(daRawDate, 'MM-DD-YYYY', true);

    //TODO: validate incoming selection vs date ranges between minDate and maxDate, decide either allow select the date throwing some warn or do not allow the selection

    setDefaultMonth(mNewDate);
    setDefoYYYY(year);
  };
  const whatCalendarHeader = (mm: Moment) =>
    monthHeader ? (
      monthHeader({ setMonth, setYear, month: mm })
    ) : (
      <>
        {mm.format('MMMM')} {mm.format('YYYY')}
      </>
    );

  return (
    <CalendarProvider onDateSelect={onDateSelect} dateRange={dateRange}>
      <div className="calendar-wrapper">
        <div className="months-slider">
          {[...Array(monthsToDisplay)].map((j, i) => {
            let month = defaultMonth.clone().add(i, 'month');

            return (
              <Month
                key={`calendar-${i}`}
                month={month}
                monthHeader={whatCalendarHeader(month)}
              />
            );
          })}
        </div>
      </div>
    </CalendarProvider>
  );
};

export default Calendar;
