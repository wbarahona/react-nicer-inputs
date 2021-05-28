import { FC, HTMLProps } from 'react';
import { Attrs, ChangeParams } from '../../types';
export interface InputProps extends HTMLProps<HTMLInputElement & HTMLTextAreaElement> {
    type: string;
    name: string;
    className?: string;
    inputChange: (args: ChangeParams) => void;
    attrs?: Attrs;
    mask?: string;
    maskChar?: string;
    value?: string | number | undefined;
}
/**
 * Input Component
 * @param {InputProps} props - all props
 * @param {string} type - Can be any type of input defined in HTML5 spec, "checkbox" or "radio" are not recommended
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param {Object} [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {number} [cols] - Optional. Is the number of columns in case of textarea
 * @param {number} [rows] - Optional. Is the number of rows in case of textarea
 * @param {RegExp} [mask] - Optional. Is the regex that will mask this input with discs. THIS DOES NOT AFFECT the returned value to inputChange
 * @param {string} [maskChar] - Optional. Is the special character that is used by the input to mask the text displayed
 * @param {string | number} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```<input />``` element
 */
export declare const Input: FC<InputProps>;
export default Input;
