import { FC, HTMLProps, ReactNode } from 'react';
export interface CalendarHeaderProps extends HTMLProps<HTMLTableCaptionElement> {
    children?: ReactNode;
}
export declare const CalendarHeader: FC<CalendarHeaderProps>;
export default CalendarHeader;
