import { FC, HTMLProps } from 'react';
import { Attrs, ChangeParams, DateRangeProps } from '../../../types';
/**
 * DatePickerProps
 * @typedef DatePickerProps
 */
export interface DatePickerProps extends HTMLProps<HTMLInputElement> {
    type: 'date' | 'datetime';
    name: string;
    className?: string;
    inputChange: (args: ChangeParams) => void;
    native?: boolean;
    dateRange?: DateRangeProps;
    format?: string;
    maxDate?: string;
    minDate?: string;
    attrs?: Attrs;
    value?: string | number | undefined;
}
/**
 * Date Picker Component
 * @alias DatePicker
 * @param {DatePickerProps} props - all props
 * @param {string} type - Can be only "date" || "datetime"
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value, for checkboxes it will return a comma separated string of each value selected by the user
 * @param {string} [native] - Optional. Defines the visual aspect of the component, if it will render native dates or text based input
 * @param {DateRangeProps} [dateRange] - Optional. Defines the behavior of this component, date ranges allows to select 2 dates, therefore there will be two inputs rendered
 * @param {string} [format] - Optional. Is the date format that this input will handle and return to inputChange function, this will format the presentation date on inputs that are not native
 * @param {string} [maxDate] - Optional. Is the maximum date allowable to select by this datepicker
 * @param {string} [minDate] - Optional. Is the minimum date allowable to select by this datepicker
 * @param {(string | number)} value - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an input that allows dates selection or two if its a date range
 */
export declare const DatePicker: FC<DatePickerProps>;
export default DatePicker;
