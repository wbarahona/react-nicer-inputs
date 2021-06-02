import React, { FC, HTMLProps } from 'react';

export interface OptionProps extends HTMLProps<HTMLOptionElement> {}

/**
 * Option Component
 * @param props - All option props
 * @param {string} [value] - Is the value for this option
 * @returns {React.FunctionComponentElement} Returns an ```<option />``` to use along with selects
 */
export const Option: FC<OptionProps> = ({
  value,
  children,
  ...props
}: OptionProps & HTMLProps<HTMLOptionElement>) => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
};

export default Option;
