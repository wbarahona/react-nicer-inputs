import { ChangeEvent, createContext, Dispatch, SetStateAction, useState } from 'react';

export interface DatePickerContext {
  inputValue: string | number,
  startDate: string,
  endDate: string,
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  setInputValue: Dispatch<SetStateAction<string | number>>
  setStartDate: Dispatch<SetStateAction<string>>
  setEndDate: Dispatch<SetStateAction<string>>
}

const [inputValue, setInputValue] = useState<string | number>('');
const [startDate, setStartDate] = useState<string>('');
const [endDate, setEndDate] = useState<string>('');

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { currentTarget } = e;
  const { value } = currentTarget;

  console.log(value);
};

export const DatePickerContext = createContext<DatePickerContext>({ inputValue, setInputValue, startDate, setStartDate, endDate, setEndDate, handleChange });

export default DatePickerContext;