import { FC, HTMLProps } from 'react';
export interface DayProps extends HTMLProps<HTMLTableCellElement> {
    date: string;
}
export declare const Day: FC<DayProps>;
export default Day;
