import React, { FC, ReactNode } from 'react';
import { CalendarContextType, DateRange } from '../../../../types';
export interface CalendarContextProps {
    children?: ReactNode;
    format?: string;
    dateRange?: boolean;
    monthsToDisplay?: number;
    minNights?: number;
    maxNights?: number;
    minDate?: string;
    maxDate?: string;
    date?: string | Date | DateRange;
    disabledDates: string[];
    onDateSelect: (args: string | Date | DateRange) => void;
    monthHeader?: Function;
    disableNavigationOnDateBoundary?: boolean;
}
export interface DateArrayProps {
    selected: boolean;
    empty: boolean;
    startDate: boolean;
    endDate: boolean;
    inRange: boolean;
    selectable: boolean;
}
export interface DateArrayElement {
    date: Date;
    props: DateArrayProps;
}
export declare const CalendarContext: React.Context<CalendarContextType>;
declare const CalendarProvider: FC<CalendarContextProps>;
export default CalendarProvider;
