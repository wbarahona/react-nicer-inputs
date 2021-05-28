import React, { FC, HTMLAttributes } from 'react';

export interface FeedbackProps extends HTMLAttributes<HTMLSpanElement> {}

/**
 * Feedback Component
 * @param [className] - Optional. Is the class needed, its appended to the component element
 * @returns {React.FunctionComponentElement} Returns a ```<span />``` element to use along in the form
 */
export const Feedback: FC<FeedbackProps> = ({
  children,
  className,
  ...props
}: FeedbackProps & HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={className}>
      {children}
    </span>
  );
};

export default Feedback;
