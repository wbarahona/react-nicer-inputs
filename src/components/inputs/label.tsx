import React, { FC, HTMLAttributes } from 'react';

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

/**
 * Label Component
 * @param {string} [htmlFor] - Is the prop that assigns this label to an input
 * @param [className] - Optional. Is the class needed, its appended to the component element
 * @returns {React.FunctionComponentElement} Returns a ```<label />``` to use along in the form
 */
export const Label: FC<LabelProps> = ({
  children,
  htmlFor,
  className,
  ...props
}: LabelProps & HTMLAttributes<HTMLLabelElement>) => {
  return (
    <label {...props} htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};

export default Label;
