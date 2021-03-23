import { FC, HTMLProps } from 'react';
import { Attrs, ChangeParams } from '../../types';
export interface InputProps extends HTMLProps<HTMLInputElement> {
    type: string;
    name: string;
    className?: string;
    inputChange: (args: ChangeParams) => void;
    attrs?: Attrs;
    value?: string | number | undefined;
}
/**
 * Input Component
 * @param type - Can be any type of input defined in HTML5 spec, "checkbox" or "radio" are not recommended
 * @param name - Is the input name
 * @param [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an input element
 */
export declare const Input: FC<InputProps>;
export default Input;
