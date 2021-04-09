import { FC, HTMLProps, ReactNode } from 'react';
import { Moment } from 'moment';
export interface CalendarHeaderProps extends HTMLProps<HTMLTableCaptionElement> {
    month: Moment;
    monthHeader?: Function;
}
export interface DefoHeaderProps {
    children: ReactNode;
}
export declare const CalendarHeader: FC<CalendarHeaderProps>;
export default CalendarHeader;
