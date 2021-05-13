import { FC, HTMLProps } from 'react';
import { ChangeParams, Attrs } from '../../../types';
export interface DropDownDatesProps extends HTMLProps<HTMLInputElement> {
    name: string;
    className?: string;
    inputChange: (args: ChangeParams) => void;
    format?: string;
    maxDate?: string;
    minDate?: string;
    attrs?: Attrs;
    value?: string | undefined;
    ddClassName?: string;
    mmClassName?: string;
    yyClassName?: string;
    ddLabel?: string;
    mmLabel?: string;
    yyLabel?: string;
    ddDefaultLabel?: string;
    mmDefaultLabel?: string;
    yyDefaultLabel?: string;
    displayOrder?: string;
    mmmm?: boolean;
}
export declare const DropDownDates: FC<DropDownDatesProps>;
export default DropDownDates;
