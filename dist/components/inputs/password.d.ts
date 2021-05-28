import { FC, HTMLProps, ReactNode } from 'react';
import { Attrs, ChangeParams } from '../../types';
export interface PasswordProps extends HTMLProps<HTMLInputElement> {
    name: string;
    className?: string;
    inputChange: (args: ChangeParams) => void;
    attrs?: Attrs;
    showIcon?: ReactNode;
    hideIcon?: ReactNode;
    value?: string | number | undefined;
}
/**
 * Password Component
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param {Object} [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {ReactNode} [showIcon] - Optional. Is the icon to be displayed when the password text is hidden
 * @param {ReactNode} [hideIcon] - Optional. Is the icon to be displayed when the password text is shown
 * @param {string} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```<input type="password" />``` element
 */
export declare const Password: FC<PasswordProps>;
export default Password;
