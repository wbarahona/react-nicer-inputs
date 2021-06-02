import React, { FC, HTMLProps } from 'react';

export interface OptionProps extends HTMLProps<HTMLOptionElement> {}

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
