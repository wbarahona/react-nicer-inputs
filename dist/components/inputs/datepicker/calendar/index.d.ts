import { FC } from 'react';
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
    minNights?: number;
    maxNights?: number;
    onDateSelect: (args: string | Date | DateRange) => void;
}
export declare const Calendar: FC<CalendarProps>;
export default Calendar;
