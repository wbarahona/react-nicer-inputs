import { FC, HTMLProps } from 'react';
export interface WeekProps extends HTMLProps<HTMLTableRowElement> {
    week: Array<Date>;
    month: number;
}
export declare const Week: FC<WeekProps>;
export default Week;
