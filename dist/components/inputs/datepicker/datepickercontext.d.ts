import { ChangeEvent, Dispatch, SetStateAction } from 'react';
export interface DatePickerContext {
    inputValue: string | number;
    startDate: string;
    endDate: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setInputValue: Dispatch<SetStateAction<string | number>>;
    setStartDate: Dispatch<SetStateAction<string>>;
    setEndDate: Dispatch<SetStateAction<string>>;
}
export declare const DatePickerContext: import("react").Context<DatePickerContext>;
export default DatePickerContext;
