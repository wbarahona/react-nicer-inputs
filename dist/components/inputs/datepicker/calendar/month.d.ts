import { FC, HTMLProps, ReactNode } from 'react';
import { Moment } from 'moment';
export interface MonthProps extends HTMLProps<HTMLTableElement> {
    month: Moment;
    monthHeader?: ReactNode;
    locale?: string;
}
export declare const Month: FC<MonthProps>;
export default Month;
