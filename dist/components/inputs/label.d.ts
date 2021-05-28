import { FC, HTMLAttributes } from 'react';
export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
}
/**
 * Label Component
 * @param {string} [htmlFor] - Is the prop that assigns this label to an input
 * @param [className] - Optional. Is the class needed, its appended to the component element
 * @returns {React.FunctionComponentElement} Returns a ```<label />``` to use along in the form
 */
export declare const Label: FC<LabelProps>;
export default Label;
