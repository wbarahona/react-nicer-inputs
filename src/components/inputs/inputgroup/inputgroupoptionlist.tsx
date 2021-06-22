import React, { ChangeEvent, FC, HTMLProps, ReactNode } from 'react';
import { Attrs, ChangeParams } from '../../../types';

export interface InputGroupOptionListProps extends HTMLProps<HTMLDivElement> {
  value: string | number;
  type: 'checkbox' | 'radio';
  name: string;
  attrs?: Attrs;
  checked?: boolean;
  handleChange: (args: ChangeEvent<HTMLInputElement>) => void;
  labelEl: ReactNode;
}

export const InputGroupOptionList: FC<InputGroupOptionListProps> = ({
  value,
  type,
  name,
  attrs,
  checked,
  handleChange,
  labelEl,
}: InputGroupOptionListProps & HTMLProps<HTMLDivElement>) => {
  return (
    <div className={`inputgroup-row inputgroup-row-${value}`}>
      <input
        type={type}
        name={name}
        id={`${name}-${value}`}
        className={`input ${type}-${value}`}
        value={value as string}
        {...attrs}
        checked={checked}
        onChange={handleChange}
        data-testid={`${name}-inputgroup-options`}
      />
      <label htmlFor={`${name}-${value}`} className={`label-${value}`}>
        {labelEl}
      </label>
    </div>
  );
};

export default InputGroupOptionList;
