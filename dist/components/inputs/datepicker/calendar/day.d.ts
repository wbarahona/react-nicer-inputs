import { FC, HTMLProps } from 'react';
export interface DayProps extends HTMLProps<HTMLTableCellElement> {
    date?: Date;
    dateString?: string;
    dayNumber: string;
}
export declare const Day: FC<DayProps>;
export default Day;
