import { FC, HTMLProps, ReactNode } from 'react';
import { Attrs, ChangeParamsDatePicker, DateRangeProps } from '../../../types';
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
export declare const DatePicker: FC<DatePickerProps>;
export default DatePicker;
