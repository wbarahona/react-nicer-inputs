import { FC, HTMLProps } from 'react';
import { Attrs, ChangeParams } from '../../types';
export interface InputProps extends HTMLProps<HTMLInputElement> {
    type: string;
    name: string;
    className?: string;
    inputChange: (args: ChangeParams) => void;
    attrs?: Attrs;
    value?: string | number;
}
export declare const Input: FC<InputProps>;
export default Input;
