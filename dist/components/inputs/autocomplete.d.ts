import { FC, HTMLProps } from 'react';
import { Attrs, ChangeParams, Option } from '../../types';
export interface Options extends Array<Option> {
}
export interface AutocompleteProps extends HTMLProps<HTMLInputElement> {
    name: string;
    className?: string;
    options: Options;
    inputChange: (args: ChangeParams) => void;
    attrs?: Attrs;
    value?: string | number;
}
export declare const Autocomplete: FC<AutocompleteProps>;
export default Autocomplete;
