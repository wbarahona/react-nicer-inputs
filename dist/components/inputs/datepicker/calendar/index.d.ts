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
    onDateSelect: (args: string | Date | DateRange) => void;
}
export declare const Calendar: FC<CalendarProps>;
export default Calendar;
