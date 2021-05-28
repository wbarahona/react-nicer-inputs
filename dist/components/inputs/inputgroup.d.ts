import { FC, HTMLProps } from 'react';
import { ChangeParams, Option, InputValue } from '../../types';
export interface Options extends Array<Option> {
}
/** @typedef {{ type: ("checkbox" | "radio")), name: string, className?: string, options: object[], inputChange: Function, value?: (string | number) }} InputGroupProps */
export interface InputGroupProps extends HTMLProps<HTMLInputElement> {
    type: 'checkbox' | 'radio';
    name: string;
    className?: string;
    options: Options;
    inputChange: (args: ChangeParams) => void;
    value?: InputValue;
}
export interface OptionValue {
    label: string | number | null;
    value: string | number | null;
    checked: boolean;
}
export interface OptionValueArray extends Array<OptionValue> {
}
/**
 * Input Group Component
 * @alias InputGroup
 * @param {InputGroupProps} props - all props
 * @param {string} type - Can be only "checkbox" || "radio"
 * @param {string} name - Is the input name
 * @param {string} className - Optional. Is the class needed, its appended to the component wrapper
 * @param {object[]} options - Is the array of options, it takes an array of objects with label and value properties, this accepts attrs for each option
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value, for checkboxes it will return a comma separated string of each value selected by the user
 * @param {(string | number)} value - Optional. Is the input value, if sent the input will take this value as default, for checkboxes it needs a comma separated value, for radios just the radio value
 * @returns {React.FunctionComponentElement} Returns a list of ```<checkbox />``` or ```<radio />``` button list
 */
export declare const InputGroup: FC<InputGroupProps>;
export default InputGroup;
