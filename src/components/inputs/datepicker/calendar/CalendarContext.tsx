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
  whatCalendarHeader: () => {},
  currPaneMonths: [],
  disableNavigationOnDateBoundary: false,
};

export const CalendarContext = createContext<CalendarContextType>(
  CalendarContextDefoValues
);

const nope = false;

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
  disabledDates,
  monthHeader,
  disableNavigationOnDateBoundary,
}) => {
  const rawNow: Date = m().startOf('month').toDate();
  const initDate: Date = minDate
    ? m(minDate, 'MM-DD-YYYY', true).toDate()
    : rawNow;
  const monthGap = monthsToDisplay || 1;
  const [date, setDate] = useState<string | Date>('');
  const [startDate, setStartDate] = useState<string | Date>('');
  const [endDate, setEndDate] = useState<string | Date>('');
  const [hasSelectedFirstRange, setHasSelectedFirstRange] = useState<boolean>(
    false
  );
  const [hoverDate, setHoverDate] = useState<string | Date>('');
  const [prevPaneMonths, setPrevPaneMonths] = useState<Moment[]>([]);
  const [currPaneMonths, setCurrPaneMonths] = useState<Moment[]>([]);
  const [nextPaneMonths, setNextPaneMonths] = useState<Moment[]>([]);
  const [initialDate, setInitialDate] = useState<Date>(initDate);

  const [defaultMonth, setDefaultMonth] = useState<Moment>(
    m(initDate, 'MM-DD-YYYY', true)
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
    const mNewDate = m(daRawDate, 'MM-DD-YYYY', true);

    console.log(mNewDate.format('MM-DD-YYYY'));

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
    const mNewDate = m(daRawDate, 'MM-DD-YYYY', true);

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
      const returnRange = {
        startDate,
        endDate,
      };

      if (!hasSelectedFirstRange && !mNewDate.isSame(mEndDate)) {
        if (mNewDate.isAfter(mEndDate)) {
          setEndDate('');
          returnRange.endDate = '';
        }
        setStartDate(newDate);
        setHasSelectedFirstRange(true);

        returnRange.startDate = newDate;

        if (minNights || maxNights) {
          setEndDate('');
          returnRange.endDate = '';
        }
      } else if (!mNewDate.isSame(mStartDate)) {
        if (mNewDate.isBefore(mStartDate)) {
          setEndDate(startDate);
          setStartDate(newDate);

          returnRange.endDate = startDate;
          returnRange.startDate = newDate;
        } else {
          setEndDate(newDate);

          returnRange.endDate = newDate;
        }
        setHasSelectedFirstRange(false);
      }
      onDateSelect(returnRange);
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

  const isDateSelectable = (theDate: Date) => {
    // is dateRange?
    if (isDateRange) {
      const addMonths = monthsToDisplay || 0;
      const mMinSelectableDate = minDate
        ? m(minDate, format, true)
        : m(initialDate);
      const maxSelectableDate = maxDate
        ? m(maxDate, format, true)
        : m(initialDate)
            .add(addMonths - 1, 'months')
            .endOf('month')
            .format('MM-DD-YYYY');
      const mMaxSelectableDate = m(maxSelectableDate, 'MM-DD-YYYY', true);
      const mDate = m(theDate);

      if (
        !mDate.isBetween(mMinSelectableDate, mMaxSelectableDate, 'days', '[]')
      ) {
        return false;
      } else if (startDate !== '' && endDate === '') {
        const mStartDate = m(startDate);
        // this below is to check if user has selected as starting date the last day of month, if this is the case then allow previous dates to be selected
        const lastDaySelected = mStartDate.isSame(mMaxSelectableDate);
        const diffDays = lastDaySelected
          ? mStartDate.diff(mDate, 'days')
          : mDate.diff(mStartDate, 'days');
        const minNites = minNights || -99999;
        const maxNites = maxNights || 99999;

        if (diffDays >= minNites && diffDays <= maxNites) {
          // console.log(
          //   mDate.format('MM-DD-YYYY'),
          //   mStartDate.format('MM-DD-YYYY'),
          //   diffDays,
          //   ' this date is selectable'
          // );
          return true;
        } else {
          return false;
        }
      }
    }

    if (disabledDates.length > 0) {
      const thing: string[] = disabledDates.filter(date =>
        m(date, format, true).isSame(m(theDate))
      );

      return thing.length <= 0;
    }

    // then all dates are selectable because is not a range
    return true;
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
    } else if (dateProp) {
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
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
