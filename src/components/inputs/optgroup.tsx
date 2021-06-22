import React, { FC, HTMLProps } from 'react';

export interface OptGroupProps extends HTMLProps<HTMLOptGroupElement> {
  label?: string;
}

/**
 * Option Component
 * @param props - All optgroup props
 * @param {string} [label] - Is the text label for this optgroup
 * @returns {React.FunctionComponentElement} Returns an ```<optgroup />``` to use along with selects
 */
export const OptGroup: FC<OptGroupProps> = ({
  children,
  ...props
}: OptGroupProps & HTMLProps<HTMLOptGroupElement>) => {
  return <optgroup {...props}>{children}</optgroup>;
};

export default OptGroup;
