import { FC } from 'react';
export interface CalendarProps {
    monthsToDisplay?: number;
    monthHeader?: Function;
}
export declare const Calendar: FC<CalendarProps>;
export default Calendar;
