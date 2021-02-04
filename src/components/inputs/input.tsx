import React, {FC, HTMLProps, ChangeEvent} from 'react';

interface Attrs {
  [key: number]: string
}

interface ChangeParams {
  e: ChangeEvent<HTMLInputElement>,
  name: string,
  value: string | number
}

interface InputProps extends HTMLProps<HTMLInputElement> {
  type: string,
  name: string,
  className?: string,
  inputChange: (args: ChangeParams) => void,
  attrs?: Attrs,
  value?: string | number
}

const Input: FC<InputProps> = ({ type, name, className, inputChange, attrs, ...props }: InputProps & HTMLProps<HTMLInputElement>) => {
  const classNames = `input ${name} ${className}`;
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value: rawValue} = e.currentTarget;
    const value: string | number = (type === 'number') ? Number(rawValue) : rawValue;
    
    inputChange({e, name, value});
  }

  return(
    <input {... props} type={type} name={name} id={name} className={classNames} data-testid={name} aria-label={name} onChange={handleChange} {...attrs} />
  )
}

export default Input;