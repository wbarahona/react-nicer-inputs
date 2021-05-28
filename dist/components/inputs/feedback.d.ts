import { FC, HTMLAttributes } from 'react';
export interface FeedbackProps extends HTMLAttributes<HTMLSpanElement> {
}
/**
 * Feedback Component
 * @param [className] - Optional. Is the class needed, its appended to the component element
 * @returns {React.FunctionComponentElement} Returns a ```<span />``` element to use along in the form
 */
export declare const Feedback: FC<FeedbackProps>;
export default Feedback;
