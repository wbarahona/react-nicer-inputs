import { FC, ReactNode } from 'react';
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
    format?: string;
    minNights?: number;
    maxNights?: number;
    date?: string | Date | DateRange;
    disabledDates?: string[];
    prevButton?: ReactNode;
    nextButton?: ReactNode;
    disableNavigationOnDateBoundary?: boolean;
    className?: string;
    calendarClassName?: string;
    onDateSelect: (args: any) => void;
}
/**
 * Calendar Component
 * @alias Calendar
 * @param {CalendarProps} props - all props
 * @param {number} [monthsToDisplay] - Optional. Is the ammount of months to render
 * @param {Function} [monthHeader] - Optional. Is header of each month, must return JSX
 * @param {boolean} [dateRange] - Optional. Defines the behavior of this calendar, select two dates or single date
 * @param {Function} onDateSelect - Non native change handler performed by the library, will return an object with startDate and endDate properties IF dateRange prop is present, else will return the date selected.
 * @param {string} [minDate] - Optional. Defines the minimum date this calendar will handle
 * @param {string} [maxDate] - Optional. Defines the maximum date this calendar will handle
 * @param {string} [format] - Optional. Is the date format that this calendar will handle
 * @param {number} [minNights] - Optional. Is the minimum nights allowable to select by this calendar
 * @param {number} [maxNights] - Optional. Is the maximum nights allowable to select by this calendar
 * @param {(string | Date | DateRange)} [date] - Optional. Is the calendar value or date, if sent the calendar will take this date as default and mark it as selected
 * @param {ReactNode} [prevButton] - Optional. Allows to customize the navigation button for previous calendar dates
 * @param {ReactNode} [nextButton] - Optional. Allows to customize the navigation button for next calendar dates
 * @param {boolean} [disableNavigationOnDateBoundary] - Optional. Defines navigation behavior, if sent the calendar wont navigate to previous dates before minDate or upcoming dates after maxDate
 * @param {string[]} [disabledDates] - Optional. Is the array of dates that this calendar will mark as unallowable to be selected
 * @param {string} [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param {string} [calendarClassName] - Optional. Is the class needed in each of the calendar wrappers
 * @returns {React.FunctionComponentElement} Returns a calendar that allows dates selection or two if its a date range
 */
export declare const Calendar: FC<CalendarProps>;
export default Calendar;
