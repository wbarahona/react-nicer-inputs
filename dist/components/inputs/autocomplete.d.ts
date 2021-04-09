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
    value?: string | number | undefined;
}
/**
 * Autocomplete Component
 * @param name - Is the input name
 * @param [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param options - Is the array of options, it takes an array of objects with label and value properties, this accepts attrs for each option
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param attrs - Are all attributes this input can have they are appended to the input not the wrapper
 * @param [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns a select element
 */
export declare const Autocomplete: FC<AutocompleteProps>;
export default Autocomplete;