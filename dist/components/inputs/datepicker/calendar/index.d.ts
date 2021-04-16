import { FC } from 'react';
export interface CalendarProps {
    monthsToDisplay?: number;
    monthHeader?: Function;
    minDate?: string;
    maxDate?: string;
}
export declare const Calendar: FC<CalendarProps>;
export default Calendar;
