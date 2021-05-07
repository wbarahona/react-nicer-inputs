/// <reference types="react" />
import { DateRangeProps } from '../../../types';
export interface ExtendedDateRangeProps extends DateRangeProps {
    type: 'date' | 'datetime' | 'text';
    startDateVal: string;
    endDateVal: string;
    displayCalendar: () => void;
}
export declare const DateRange: ({ type, startDate, endDate, startDateVal, endDateVal, displayCalendar, }: ExtendedDateRangeProps) => JSX.Element;
export default DateRange;
