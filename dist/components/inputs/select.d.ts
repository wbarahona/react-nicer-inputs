import { HTMLProps, FC } from 'react';
import { Attrs, ChangeParams, Option } from '../../types';
export interface Options extends Array<Option> {
}
export interface SelectProps extends HTMLProps<HTMLSelectElement> {
    name: string;
    className?: string;
    options: Options;
    inputChange: (args: ChangeParams) => void;
    defaultLabel?: string;
    attrs?: Attrs;
    value?: string | number;
}
export declare const Select: FC<SelectProps>;
export default Select;
