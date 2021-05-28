import { FC, HTMLProps } from 'react';
import { ChangeParams, Attrs } from '../../../types';
export interface DropDownDatesProps extends HTMLProps<HTMLInputElement> {
    name: string;
    className?: string;
    inputChange: (args: ChangeParams) => void;
    format?: string;
    maxDate?: string;
    minDate?: string;
    attrs?: Attrs;
    value?: string | undefined;
    ddClassName?: string;
    mmClassName?: string;
    yyClassName?: string;
    ddLabel?: string;
    mmLabel?: string;
    yyLabel?: string;
    ddDefaultLabel?: string;
    mmDefaultLabel?: string;
    yyDefaultLabel?: string;
    displayOrder?: string;
    mmmm?: boolean;
}
/**
 * DropDownDates Component
 * @param {DropDownDatesProps} props - All Props
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value, for checkboxes it will return a comma separated string of each value selected by the user
 * @param {string} [format] - Optional. Is the format this input will handle, defines the format the date will be returned.
 * @param {string} [maxDate] - Optional. Is the maximum date allowable to select by this datepicker
 * @param {string} [minDate] - Optional. Is the minimum date allowable to select by this datepicker
 * @param {string} [ddClassName] - Optional. Is the class used to wrap the Day Group
 * @param {string} [mmClassName] - Optional. Is the class used to wrap the Month Group
 * @param {string} [yyClassName] - Optional. Is the class used to wrap the Year Group
 * @param {string} [ddLabel] - Optional. Is the label text in the Day Group selector
 * @param {string} [mmLabel] - Optional. Is the label text in the Month Group selector
 * @param {string} [yyLabel] - Optional. Is the label text in the Year Group selector
 * @param {string} [ddDefaultLabel] - Optional. Is the default text for the Day Group selector
 * @param {string} [mmDefaultLabel] - Optional. Is the default text for the Day Group selector
 * @param {string} [yyDefaultLabel] - Optional. Is the default text for the Day Group selector
 * @param {string} [displayOrder] - Optional. Is the display order on the selectors elements
 * @param {string} [mmmm] - Optional. Defines if the month is on words or not
 * @param {(string | number)} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns a collection of ```<select />``` that allows dates selection
 */
export declare const DropDownDates: FC<DropDownDatesProps>;
export default DropDownDates;
