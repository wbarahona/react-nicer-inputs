import { FC, HTMLProps } from 'react';
export interface DayProps extends HTMLProps<HTMLTableCellElement> {
    date?: Date;
    dateString?: string;
    dayNumber: string;
    valid?: boolean;
    inRange?: boolean;
    selected?: boolean;
    minDate?: boolean;
    maxDate?: boolean;
}
export declare const Day: FC<DayProps>;
export default Day;
