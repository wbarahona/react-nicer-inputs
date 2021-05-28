import { HTMLProps, ReactNode } from 'react';
import { ChangeParams, Attrs } from '../../types';
import { InputProps } from './input';
import { InputGroupProps } from './inputgroup';
import { LabelProps } from './label';
import { PasswordProps } from './password';
import { SelectProps } from './select';
import { FeedbackProps } from './feedback';
import { AutocompleteProps } from './autocomplete';
import { DropDownDatesProps } from './dropdowndates';
import { DatePickerProps } from './datepicker';
export interface FormGroupProps extends HTMLProps<HTMLInputElement & HTMLLabelElement & HTMLSpanElement & HTMLSelectElement> {
    type: string;
    name: string;
    className?: string;
    inputChange: (args: ChangeParams) => void;
    labelText?: ReactNode;
    feedbackText?: ReactNode;
    labelClassName?: string;
    inputClassName?: string;
    feedbackClassName?: string;
    attrs?: Attrs;
    value?: string | number | undefined;
}
export declare const FormGroup: ({ type, name, className, inputChange, labelText, feedbackText, labelClassName, inputClassName, feedbackClassName, cols, rows, mask, maskChar, defaultLabel, showIcon, hideIcon, minDate, maxDate, format, displayOrder, ddClassName, mmClassName, yyClassName, ddLabel, mmLabel, yyLabel, ddDefaultLabel, mmDefaultLabel, yyDefaultLabel, mmmm, dateRange, minNights, maxNights, bottomPanel, monthHeader, monthsToDisplay, disabledDates, prevButton, nextButton, disableNavigationOnDateBoundary, calendarComponentClassName, calendarClassName, attrs, options, value, }: FormGroupProps & HTMLProps<HTMLInputElement & HTMLLabelElement & HTMLSpanElement> & InputProps & InputGroupProps & LabelProps & PasswordProps & SelectProps & FeedbackProps & AutocompleteProps & DropDownDatesProps & DatePickerProps) => JSX.Element;
export default FormGroup;
