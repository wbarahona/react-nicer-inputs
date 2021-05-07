import React, {
  FC,
  HTMLProps,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import m from 'moment';
import { Attrs, ChangeParamsDatePicker, DateRangeProps } from '../../../types';
import Calendar from './calendar';
import DateRange from './daterange';

export interface DateRanger {
  startDate: string | Date;
  endDate: string | Date;
}

export interface StringDateRange {
  startDate: string;
  endDate: string;
}

/**
 * DatePickerProps
 * @typedef DatePickerProps
 */
export interface DatePickerProps extends HTMLProps<HTMLInputElement> {
  name: string;
  className?: string;
  inputChange: (args: ChangeParamsDatePicker) => void;
  dateRange?: DateRangeProps;
  format?: string;
  maxDate?: string;
  minDate?: string;
  attrs?: Attrs;
  bottomPanel?: Function;
  value?: string | number | undefined | StringDateRange | any;
  minNights?: number;
  maxNights?: number;
  monthsToDisplay?: number;
  disabledDates?: string[];
  monthHeader?: Function;
  prevButton?: ReactNode;
  nextButton?: ReactNode;
  disableNavigationOnDateBoundary?: boolean;
  calendarComponentClassName?: string;
  calendarClassName?: string;
}

/**
 * Date Picker Component
 * @alias DatePicker
 * @param {DatePickerProps} props - all props
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value, for checkboxes it will return a comma separated string of each value selected by the user
 * @param {DateRangeProps} [dateRange] - Optional. Defines the behavior of this component, date ranges allows to select 2 dates, therefore there will be two inputs rendered
 * @param {string} [format] - Optional. Is the date format that this input will handle and return to inputChange function, this will format the presentation date on inputs that are not native
 * @param {string} [maxDate] - Optional. Is the maximum date allowable to select by this datepicker
 * @param {string} [minDate] - Optional. Is the minimum date allowable to select by this datepicker
 * @param {(string | number)} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @param {Function} [bottomPanel] - Optional. Is the panel below the calendar, it prompts the user to clear selection and confirm to close calendar, must return JSX
 * @param {string | StringDateRange} [value] - Optional. Is the value for this datepicker
 * @param {number} [minNights] - Optional. Is the minimum nights allowable to select by this calendar
 * @param {number} [maxNights] - Optional. Is the maximum nights allowable to select by this calendar
 * @param {number} [monthsToDisplay] - Optional. Is the ammount of months to render
 * @param {string[]} [disabledDates] - Optional. Is the array of dates that this calendar will mark as unallowable to be selected
 * @param {Function} [monthHeader] - Optional. Is header of each month, must return JSX
 * @param {ReactNode} [prevButton] - Optional. Allows to customize the navigation button for previous calendar dates
 * @param {ReactNode} [nextButton] - Optional. Allows to customize the navigation button for next calendar dates
 * @param {boolean} [disableNavigationOnDateBoundary] - Optional. Defines navigation behavior, if sent the calendar wont navigate to previous dates before minDate or upcoming dates after maxDate
 * @param {string} [calendarComponentClassName] - Optional. Is the class that the calendar below the input will contain
 * @param {string} [calendarClassName] - Optional. Is the class needed in each of the calendar wrappers
 * @returns {React.FunctionComponentElement} Returns an input that allows dates selection or two if its a date range
 */

// TODO: type and native are closely together, find a way to work with native and type date and datetime
// @param {string} type - Can be only "date" || "datetime"
// @param {string} [native] - Optional. Defines the visual aspect of the component, if it will render native dates or text based input
export const DatePicker: FC<DatePickerProps> = ({
  name,
  className,
  inputChange,
  dateRange,
  format = 'MM-DD-YYYY',
  maxDate,
  minDate,
  attrs,
  value,
  bottomPanel,
  minNights,
  maxNights,
  monthsToDisplay,
  disabledDates,
  monthHeader,
  prevButton,
  nextButton,
  disableNavigationOnDateBoundary,
  calendarComponentClassName,
  calendarClassName,
  ...props
}: DatePickerProps & HTMLProps<HTMLInputElement>) => {
  const isDateRange: boolean =
    Object.keys(dateRange || {}).length > 0 ? true : false;
  // const inputType = native ? type : 'text';
  const inputType = 'text';
  const defDate = isDateRange
    ? {
        startDate: '',
        endDate: '',
      }
    : '';

  const [startDateVal, setStartDateVal] = useState<string>('');
  const [endDateVal, setEndDateVal] = useState<string>('');
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [date, setDate] = useState<any>(defDate);
  const ref = useRef<HTMLDivElement>(null);

  const handleDateChange = (calendarResp: any) => {
    if (dateRange) {
      const { startDate, endDate } = calendarResp as DateRanger;
      const mStartDate = m(startDate);
      const mEndDate = m(endDate);
      const stDate = mStartDate.isValid() ? mStartDate.format(format) : '';
      const edDate = mEndDate.isValid() ? mEndDate.format(format) : '';
      setStartDateVal(stDate);
      setEndDateVal(edDate);
      const value: string | Date | DateRanger = dateRange
        ? { startDate: stDate, endDate: edDate }
        : '';
      setDate(value);
      inputChange({ e: ref, name, value });
    } else {
      const mDate = m(calendarResp);
      const value = mDate.isValid() ? mDate.format(format) : '';
      setDate(value);
      inputChange({ e: ref, name, value });
    }
  };

  const handleDisplayCalendar = () => {
    setCalendarVisible(true);
  };

  const handleHideCalendar = () => {
    setCalendarVisible(false);
  };

  const hideAutomatically = () => {
    if (
      (!bottomPanel && startDateVal !== '' && endDateVal !== '') ||
      (!bottomPanel && date !== '')
    ) {
      handleHideCalendar();
    }
  };

  function handleClick(e: Event) {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      handleHideCalendar();
    }
  }

  const registerMouseDown = () => {
    document.addEventListener('mousedown', handleClick);
  };

  const unRegisterMouseDown = () => {
    document.removeEventListener('mousedown', handleClick);
  };

  const clearSelections = () => {
    setStartDateVal('');
    setEndDateVal('');
    setDate(defDate);
  };

  const confirmSelections = () => {
    handleHideCalendar();
  };

  const whatBottomPanel = () => {
    return bottomPanel ? (
      bottomPanel({ clearSelections, confirmSelections })
    ) : (
      <></>
    );
  };

  const setDefaultValue = () => {
    if (value && dateRange) {
      const { startDate, endDate } = value;
      setStartDateVal(startDate);
      setEndDateVal(endDate);
      setDate(value);
    } else if (value && !dateRange) {
      setDate(value);
    }
  };

  useEffect(() => {
    setDefaultValue();
  }, []);

  useEffect(() => {
    registerMouseDown();

    if (dateRange && date.startDate !== '' && date.endDate !== '') {
      hideAutomatically();
    } else if (!dateRange && date !== '') {
      hideAutomatically();
    }

    return () => {
      unRegisterMouseDown();
    };
  }, [date, startDateVal, endDateVal]);

  return (
    <div className={`datepicker-wrapper ${className}`} ref={ref}>
      <div className="row">
        {!dateRange && (
          <input
            {...props}
            type={inputType}
            name={name}
            id={name}
            aria-label={name}
            className={`input datepicker-input ${name}`}
            onChange={() => {}}
            onFocusCapture={handleDisplayCalendar}
            value={date}
          />
        )}
        {dateRange && (
          <DateRange
            type={inputType}
            displayCalendar={handleDisplayCalendar}
            startDateVal={startDateVal}
            endDateVal={endDateVal}
            {...dateRange}
          />
        )}
      </div>
      {calendarVisible && (
        <div className="row" data-testid={`${name}-calendar`}>
          <Calendar
            dateRange={isDateRange}
            onDateSelect={handleDateChange}
            date={date}
            format={format}
            minDate={minDate}
            maxDate={maxDate}
            minNights={minNights}
            maxNights={maxNights}
            monthsToDisplay={monthsToDisplay}
            disabledDates={disabledDates}
            monthHeader={monthHeader}
            prevButton={prevButton}
            nextButton={nextButton}
            disableNavigationOnDateBoundary={disableNavigationOnDateBoundary}
            className={calendarComponentClassName}
            calendarClassName={calendarClassName}
          />
          {whatBottomPanel()}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
