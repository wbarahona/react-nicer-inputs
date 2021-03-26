import { ChangeEvent } from 'react';
import { DateRangeProps } from '../../../types';
export interface ExtendedDateRangeProps extends DateRangeProps {
    type: 'date' | 'datetime' | 'text';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export declare const DateRange: ({ type, onChange, startDate, endDate, }: ExtendedDateRangeProps) => JSX.Element;
export default DateRange;
