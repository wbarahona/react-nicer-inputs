import React, { FC, ReactNode } from 'react';
import { CalendarContextType } from '../../../../types';
export declare const CalendarContext: React.Context<CalendarContextType>;
export interface DateRange {
    startDate: string | Date;
    endDate: string | Date;
}
export interface CalendarContextProps {
    children?: ReactNode;
    dateRange?: boolean;
    onDateSelect: (args: string | Date | DateRange) => void;
}
declare const CalendarProvider: FC<CalendarContextProps>;
export default CalendarProvider;
