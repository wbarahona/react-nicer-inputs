import React, { HTMLProps, ReactNode } from 'react';
import { ChangeParams, Attrs } from '../../types';
import Input, { InputProps } from './input';
import InputGroup, { InputGroupProps } from './inputgroup';
import Label, { LabelProps } from './label';
import Password, { PasswordProps } from './password';
import Select, { SelectProps } from './select';
import Feedback, { FeedbackProps } from './feedback';
import Autocomplete, { AutocompleteProps } from './autocomplete';
import DropDownDates, { DropDownDatesProps } from './dropdowndates';
import DatePicker, { DatePickerProps } from './datepicker';

export interface FormGroupProps
  extends HTMLProps<
    HTMLInputElement & HTMLLabelElement & HTMLSpanElement & HTMLSelectElement
  > {
  type: string;
  name: string;
  className?: string;
  inputChange: (args: ChangeParams) => void;
  labelText?: ReactNode;
  feedbackText?: ReactNode;
  labelClassName?: string;
  inputClassName?: string;
  feedbackClassName?: string;
  attrs?: Attrs;
  value?: string | number | undefined;
}

export const FormGroup = ({
  type,
  name,
  className,
  inputChange,
  labelText,
  feedbackText,
  labelClassName,
  inputClassName,
  feedbackClassName,
  cols,
  rows,
  mask,
  maskChar,
  defaultLabel,
  showIcon,
  hideIcon,
  minDate,
  maxDate,
  format,
  displayOrder,
  ddClassName,
  mmClassName,
  yyClassName,
  ddLabel,
  mmLabel,
  yyLabel,
  ddDefaultLabel,
  mmDefaultLabel,
  yyDefaultLabel,
  mmmm,
  dateRange,
  minNights,
  maxNights,
  bottomPanel,
  monthHeader,
  monthsToDisplay,
  disabledDates,
  prevButton,
  nextButton,
  disableNavigationOnDateBoundary,
  calendarComponentClassName,
  calendarClassName,
  attrs,
  options,
  value,
}: FormGroupProps &
  HTMLProps<HTMLInputElement & HTMLLabelElement & HTMLSpanElement> &
  InputProps &
  InputGroupProps &
  LabelProps &
  PasswordProps &
  SelectProps &
  FeedbackProps &
  AutocompleteProps &
  DropDownDatesProps &
  DatePickerProps) => {
  const classNames = `form-group ${className}`;

  const renderInput = (inputType: string) => {
    switch (inputType) {
      case 'textarea':
        return (
          <Input
            type="textarea"
            name={name}
            className={inputClassName}
            inputChange={inputChange}
            cols={cols}
            rows={rows}
            attrs={attrs}
            value={value}
          />
        );
      case 'checkbox' || 'radio':
        return (
          <InputGroup
            type={type}
            name={name}
            className={inputClassName}
            inputChange={inputChange}
            options={options}
            value={value}
          />
        );
      case 'select':
        return (
          <Select
            name={name}
            className={inputClassName}
            inputChange={inputChange}
            defaultLabel={defaultLabel}
            options={options}
            attrs={attrs}
            value={value}
          />
        );
      case 'autocomplete':
        return (
          <Autocomplete
            name={name}
            className={inputClassName}
            inputChange={inputChange}
            options={options}
            attrs={attrs}
            value={value}
          />
        );
      case 'password':
        return (
          <Password
            name={name}
            className={inputClassName}
            inputChange={inputChange}
            showIcon={showIcon}
            hideIcon={hideIcon}
            attrs={attrs}
            value={value}
          />
        );
      case 'dropdowndates':
        return (
          <DropDownDates
            name={name}
            minDate={minDate}
            maxDate={maxDate}
            className={inputClassName}
            format={format}
            displayOrder={displayOrder}
            ddClassName={ddClassName}
            mmClassName={mmClassName}
            yyClassName={yyClassName}
            ddLabel={ddLabel}
            mmLabel={mmLabel}
            yyLabel={yyLabel}
            ddDefaultLabel={ddDefaultLabel}
            mmDefaultLabel={mmDefaultLabel}
            yyDefaultLabel={yyDefaultLabel}
            mmmm={mmmm}
            inputChange={inputChange}
            value={value}
          />
        );
      case 'datepicker':
        return (
          <DatePicker
            name={name}
            className={inputClassName}
            inputChange={inputChange}
            format={format}
            dateRange={dateRange}
            bottomPanel={bottomPanel}
            minDate={minDate}
            maxDate={maxDate}
            monthsToDisplay={monthsToDisplay}
            minNights={minNights}
            maxNights={maxNights}
            disabledDates={disabledDates}
            monthHeader={monthHeader}
            prevButton={prevButton}
            nextButton={nextButton}
            disableNavigationOnDateBoundary={disableNavigationOnDateBoundary}
            calendarComponentClassName={calendarComponentClassName}
            calendarClassName={calendarClassName}
          />
        );
      default:
        return (
          <Input
            type={type}
            name={name}
            className={inputClassName}
            inputChange={inputChange}
            mask={mask}
            maskChar={maskChar}
            attrs={attrs}
            value={value}
          />
        );
    }
  };

  return (
    <>
      <div className={classNames}>
        <Label htmlFor={name} className={labelClassName}>
          {labelText}
        </Label>
        {renderInput(type)}
        <Feedback id={`${name}-help`} className={feedbackClassName}>
          {feedbackText}
        </Feedback>
      </div>
    </>
  );
};

export default FormGroup;
