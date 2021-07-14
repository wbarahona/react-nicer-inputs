import React, {
  FC,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import m, { Moment } from 'moment';
import { CalendarContextType, DateRange } from '../../../../types';

export interface CalendarContextProps {
  children?: ReactNode;
  format?: string;
  dateRange?: boolean;
  monthsToDisplay?: number;
  minNights?: number;
  maxNights?: number;
  minDate?: string;
  maxDate?: string;
  date?: string | Date | DateRange;
  disabledDates: string[];
  onDateSelect: (args: string | Date | DateRange) => void;
  monthHeader?: Function;
  disableNavigationOnDateBoundary?: boolean;
}

export interface DateArrayProps {
  selected: boolean;
  empty: boolean;
  startDate: boolean;
  endDate: boolean;
  inRange: boolean;
  selectable: boolean;
}
export interface DateArrayElement {
  date: Date;
  props: DateArrayProps;
}

const defoDateRange = {
  startDate: '',
  endDate: '',
};

const CalendarContextDefoValues: CalendarContextType = {
  date: '',
  saveDate: () => {},
  saveHoverDate: () => {},
  getDate: () => new Date(),
  getDateRange: () => defoDateRange,
  isDateRange: false,
  isDateSelected: () => false,
  isDateWithinRange: () => false,
  isDateSelectable: () => true,
  isSelectedDateStartDate: () => false,
  isSelectedDateEndDate: () => false,
  startDate: '',
  endDate: '',
  minNights: undefined,
  maxNights: undefined,
  minDate: undefined,
  maxDate: undefined,
  hoverDate: '',
  disabledDates: [],
  buildMonthsPanes: () => {},
  getPrevPaneMonths: () => [],
  getCurrentPaneMonths: () => [],
  getNextPaneMonths: () => [],
  movePrev: () => {},
  moveNext: () => {},
  canNavigatePrev: () => true,
  canNavigateNext: () => true,
  whatCalendarHeader: () => <></>,
  currPaneMonths: [],
  disableNavigationOnDateBoundary: false,
  getWeekdayName: () => '',
  isWeekend: () => false,
};

export const CalendarContext = createContext<CalendarContextType>(
  CalendarContextDefoValues
);

const CalendarProvider: FC<CalendarContextProps> = ({
  children,
  format = 'MM-DD-YYYY',
  dateRange,
  onDateSelect,
  minNights,
  maxNights,
  minDate,
  maxDate,
  monthsToDisplay,
  date: dateProp,
  disabledDates = [],
  monthHeader,
  disableNavigationOnDateBoundary,
}) => {
  const rawNow: Date = m().startOf('month').toDate();
  const initDate: Date = minDate ? m(minDate, format, true).toDate() : rawNow;

  const monthGap = monthsToDisplay || 1;
  const [date, setDate] = useState<string | Date>('');
  const [startDate, setStartDate] = useState<string | Date>('');
  const [endDate, setEndDate] = useState<string | Date>('');
  const [hasSelectedFirstRange, setHasSelectedFirstRange] =
    useState<boolean>(false);
  const [hoverDate, setHoverDate] = useState<string | Date>('');
  const [prevPaneMonths, setPrevPaneMonths] = useState<Moment[]>([]);
  const [currPaneMonths, setCurrPaneMonths] = useState<Moment[]>([]);
  const [nextPaneMonths, setNextPaneMonths] = useState<Moment[]>([]);
  const [initialDate, setInitialDate] = useState<Date>(initDate);

  const [defaultMonth, setDefaultMonth] = useState<Moment>(
    m(initDate, format, true)
  );
  const [defoMM, setDefoMM] = useState<string | number>(
    initDate.getMonth() + 1
  );
  const [defoYYYY, setDefoYYYY] = useState<string | number>(
    initDate.getFullYear()
  );
  const setMonth = (month: string) => {
    const initDate = initialDate.getDate();
    const daDate = initDate < 10 ? `0${initDate}` : initDate;
    const convertedMonth: number = parseInt(month, 10);
    const daMonth = convertedMonth < 10 ? `0${convertedMonth}` : convertedMonth;
    const daRawDate = `${daMonth}-${daDate}-${defoYYYY}`;
    const mNewDate = m(daRawDate, format, true);

    //TODO: validate incoming selection vs date ranges between minDate and maxDate, decide either allow select the date throwing some warn or do not allow the selection

    setDefaultMonth(mNewDate);
    setDefoMM(month);
    setInitialDate(mNewDate.clone().startOf('month').toDate());
    buildMonthsPanes(mNewDate.clone().startOf('month').toDate());
  };
  const setYear = (year: string) => {
    const initMonth = defoMM;
    const initDate = initialDate.getDate();
    const daMonth = initMonth < 10 ? `0${initMonth}` : initMonth;
    const daDate = initDate < 10 ? `0${initDate}` : initDate;
    const daRawDate = `${daMonth}-${daDate}-${year}`;
    const mNewDate = m(daRawDate, format, true);

    //TODO: validate incoming selection vs date ranges between minDate and maxDate, decide either allow select the date throwing some warn or do not allow the selection

    setDefaultMonth(mNewDate);
    setDefoYYYY(year);
    setInitialDate(mNewDate.clone().startOf('month').toDate());
    buildMonthsPanes(mNewDate.clone().startOf('month').toDate());
  };
  const whatCalendarHeader = (mm: Moment) =>
    monthHeader ? (
      monthHeader({ setMonth, setYear, month: mm })
    ) : (
      <>
        {mm.format('MMMM')} {mm.format('YYYY')}
      </>
    );

  const saveDate = (newDate: string | Date) => {
    if (dateRange) {
      const mNewDate = m(newDate);
      const mStartDate = m(startDate);
      const mEndDate = m(endDate);
      const returnDate = {
        startDate: '',
        endDate: '',
      };

      if (
        (mStartDate.isValid() && mNewDate.isSame(mStartDate)) ||
        (mEndDate.isValid() && mNewDate.isSame(mEndDate))
      ) {
        // console.warn('Selecting same date');
      } else {
        if (!hasSelectedFirstRange) {
          // set startDate
          if (
            mStartDate.isValid() &&
            mEndDate.isValid() &&
            mNewDate.isAfter(mEndDate)
          ) {
            returnDate.startDate = mEndDate.isValid()
              ? mEndDate.toDate().toString()
              : '';
            returnDate.endDate = mNewDate.toDate().toString();

            setStartDate(endDate);
            setEndDate(newDate);
          } else {
            returnDate.startDate = mNewDate.toDate().toString();
            returnDate.endDate = mEndDate.isValid()
              ? mEndDate.toDate().toString()
              : '';

            setStartDate(newDate);
          }
          setHasSelectedFirstRange(true);
        } else {
          // set EndDate
          if (
            mStartDate.isValid() &&
            mEndDate.isValid() &&
            mNewDate.isBefore(mStartDate)
          ) {
            returnDate.startDate = mNewDate.toDate().toString();
            returnDate.endDate = mStartDate.isValid()
              ? mStartDate.toDate().toString()
              : '';

            setStartDate(newDate);
            setEndDate(startDate);
          } else {
            returnDate.startDate = mStartDate.isValid()
              ? mStartDate.toDate().toString()
              : '';
            returnDate.endDate = mNewDate.toDate().toString();

            setEndDate(newDate);
          }
          setHasSelectedFirstRange(false);
        }
      }

      onDateSelect(returnDate);
    } else {
      setDate(newDate);
      onDateSelect(newDate);
    }
  };

  const saveHoverDate = (newDate: string | Date) => {
    setHoverDate(newDate);
  };

  const getDate = () => date;

  const getDateRange = () => {
    return {
      startDate,
      endDate,
    };
  };

  const isDateRange = dateRange ? true : false;

  const isDateInDisabled = (theDate: Date) => {
    const mTheDate = m(theDate);
    let ret = false;

    if (disabledDates.length > 0) {
      ret =
        disabledDates.filter(date => m(date, format, true).isSame(mTheDate))
          .length > 0;
    }

    return ret;
  };

  const hasDateRangeDisabled = (
    start: string | Date,
    end: string | Date
  ): boolean => {
    const mStartDate = m(start);
    const mEndDate = m(end);
    let selectable = false;

    if (mStartDate.isValid() && mEndDate.isValid()) {
      while (!selectable && mStartDate.isBefore(mEndDate)) {
        mStartDate.add(1, 'day');

        selectable = isDateInDisabled(mStartDate.toDate());
      }
    }

    return selectable;
  };

  const getMinSelectableDate = (): Moment => {
    const mMinDate = m(minDate, format, true);
    let ret = m();
    let selectable = true;

    while (selectable) {
      mMinDate.add(1, 'days');

      ret = mMinDate;

      selectable = isDateInDisabled(mMinDate.toDate());
    }

    return ret;
  };

  const getMaxSelectableDate = (): Moment => {
    const mMaxDate = m(maxDate, format, true);
    let ret = m();
    let selectable = true;

    while (selectable) {
      mMaxDate.subtract(1, 'days');

      ret = mMaxDate;

      selectable = isDateInDisabled(mMaxDate.toDate());
    }

    return ret;
  };

  const isDateSelectable = (theDate: Date) => {
    const mTheDate = m(theDate);
    const mMinDate = m(minDate, format, true);
    const mMaxDate = m(maxDate, format, true);
    const mStartDate = m(startDate);
    const minNites = minNights || -99999;
    const maxNites = maxNights || 99999;

    let dateIsAfterMinDate = true;
    let dateIsBeforeMaxDate = true;
    let foundInDisabledDates = true;
    let dateIsBetweenNightRange = true;

    // if this date belongs in disableDates
    foundInDisabledDates = !isDateInDisabled(theDate);

    // if only mindate is sent
    if (mMinDate.isValid()) {
      dateIsAfterMinDate = mTheDate.isSameOrAfter(mMinDate);
    }
    // if only maxdate is sent
    if (mMaxDate.isValid()) {
      dateIsBeforeMaxDate = mTheDate.isSameOrBefore(mMaxDate);
    }

    // validations when calendar is dateRange
    if (isDateRange && mStartDate.isValid()) {
      // const mMinSelectableDate = getMinSelectableDate();
      let mMaxSelectableDate = getMaxSelectableDate();
      const lastDaySelected = mMaxSelectableDate.isSame(mStartDate);
      const mMinSelectableDate = lastDaySelected
        ? mStartDate.clone().subtract(maxNites, 'days')
        : mStartDate.clone().add(minNites, 'days');

      mMaxSelectableDate = lastDaySelected
        ? mStartDate.clone().subtract(minNites, 'days')
        : mStartDate.clone().add(maxNites, 'days');

      dateIsBetweenNightRange = mTheDate.isBetween(
        mMinSelectableDate,
        mMaxSelectableDate,
        'days',
        '[]'
      );
    }

    return (
      foundInDisabledDates &&
      dateIsAfterMinDate &&
      dateIsBeforeMaxDate &&
      dateIsBetweenNightRange
    );
  };

  const isDateSelected = (theDate: Date) => {
    // is dateRange
    if (dateRange) {
      const mStartDate = m(startDate);
      const mEndDate = m(endDate);
      const mTheDate = m(theDate);

      return mStartDate.isSame(mTheDate) || mEndDate.isSame(mTheDate);
    } else {
      // is regular selector compare vs state: date value
      const mTheDate = m(theDate);
      const mDate = m(date);

      return mTheDate.isSame(mDate);
    }
  };

  const isDateWithinRange = (theDate: Date) => {
    // is dateRange
    if (dateRange) {
      const mStartDate = m(startDate);
      const mEndDate = m(endDate);
      const mTheDate = m(theDate);

      return mTheDate.isBetween(mStartDate, mEndDate);
    }
    return false;
  };

  const isSelectedDateStartDate = (theDate: Date) => {
    // is dateRange
    if (dateRange) {
      const mStartDate = m(startDate);
      const mTheDate = m(theDate);

      return mStartDate.isSame(mTheDate);
    }
    return false;
  };

  const isSelectedDateEndDate = (theDate: Date) => {
    // is dateRange
    if (dateRange) {
      const mEndDate = m(endDate);
      const mTheDate = m(theDate);

      return mEndDate.isSame(mTheDate);
    }
    return false;
  };

  const setDefaultDate = () => {
    if (dateRange && dateProp) {
      const { startDate, endDate } = dateProp as DateRange;

      setStartDate(m(startDate, format, true).toDate());
      setEndDate(m(endDate, format, true).toDate());
    } else {
      const theDate = dateProp as string;

      setDate(m(theDate, format, true).toDate());
    }
  };

  const getPrevPaneMonths = () => prevPaneMonths;

  const getCurrentPaneMonths = () => currPaneMonths;

  const getNextPaneMonths = () => nextPaneMonths;

  const canNavigateNext = () => {
    const mInitialDate = m(initialDate).add(monthGap, 'months');
    const mMaxDate = m(maxDate, format, true);

    if (disableNavigationOnDateBoundary) {
      return (
        mInitialDate.isSameOrBefore(mMaxDate) && disableNavigationOnDateBoundary
      );
    } else {
      return true;
    }
  };

  const moveNext = () => {
    const mInitialDate = m(initialDate).add(monthGap, 'months');
    const canNavigate = canNavigateNext();

    if (canNavigate) {
      const newInitialDate = mInitialDate.toDate();

      setInitialDate(newInitialDate);
      buildMonthsPanes(newInitialDate);
    }
  };

  const canNavigatePrev = () => {
    const mInitialDate = m(initialDate).subtract(monthGap, 'months');
    const mMinDate = m(minDate, format, true);

    if (disableNavigationOnDateBoundary) {
      return (
        mInitialDate.isSameOrAfter(mMinDate) && disableNavigationOnDateBoundary
      );
    } else {
      return true;
    }
  };

  const movePrev = () => {
    const mInitialDate = m(initialDate).subtract(monthGap, 'months');
    const canNavigate = canNavigatePrev();

    if (canNavigate) {
      const newInitialDate = mInitialDate.toDate();

      setInitialDate(newInitialDate);
      buildMonthsPanes(newInitialDate);
    }
  };

  const buildMonthsPanes = (currentPaneMonth?: Date) => {
    const cursorMonth = currentPaneMonth || initialDate;

    const mInitialCurrMonth = m(cursorMonth);
    const mInitialPrevMonth = m(cursorMonth).subtract(monthGap, 'months');
    const mInitialNextMonth = m(cursorMonth).add(monthGap, 'months');

    const currPaneMonthsArr: Moment[] = [];
    const prevPaneMonthsArr: Moment[] = [];
    const nextPaneMonthArr: Moment[] = [];

    currPaneMonthsArr.push(mInitialCurrMonth);
    prevPaneMonthsArr.push(mInitialPrevMonth);
    nextPaneMonthArr.push(mInitialNextMonth);

    if (monthGap > 1) {
      for (let i = 1; i < monthGap; ++i) {
        currPaneMonthsArr.push(mInitialCurrMonth.clone().add(i, 'months'));
        prevPaneMonthsArr.push(mInitialPrevMonth.clone().add(i, 'months'));
        nextPaneMonthArr.push(mInitialNextMonth.clone().add(i, 'months'));
      }
    }

    setCurrPaneMonths(currPaneMonthsArr);
    setPrevPaneMonths(prevPaneMonthsArr);
    setNextPaneMonths(nextPaneMonthArr);
  };

  const isWeekend = (date: Date) => {
    const weekday = m(date).format('dddd').toLowerCase();

    return weekday === 'saturday' || weekday === 'sunday';
  };

  const getWeekdayName = (date: Date) => m(date).format('dddd').toLowerCase();

  useEffect(() => {
    setDefaultDate();
    buildMonthsPanes();
  }, [dateProp, disabledDates]);

  return (
    <CalendarContext.Provider
      value={{
        date,
        saveDate,
        saveHoverDate,
        getDate,
        isDateRange,
        isDateSelectable,
        isDateSelected,
        isDateWithinRange,
        isSelectedDateStartDate,
        isSelectedDateEndDate,
        getDateRange,
        startDate,
        endDate,
        minNights,
        maxNights,
        minDate,
        maxDate,
        hoverDate,
        disabledDates,
        buildMonthsPanes,
        getPrevPaneMonths,
        getCurrentPaneMonths,
        getNextPaneMonths,
        movePrev,
        moveNext,
        canNavigatePrev,
        canNavigateNext,
        whatCalendarHeader,
        currPaneMonths,
        disableNavigationOnDateBoundary,
        getWeekdayName,
        isWeekend,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
