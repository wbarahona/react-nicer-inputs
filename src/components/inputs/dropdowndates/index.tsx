import React, { FC, HTMLProps, useRef } from 'react';
import m from 'moment';
import DropDownDatesProvider from './DropdowndatesContext';
import { ChangeParams, Attrs } from '../../../types';
import DropDownSelectRow from './DropDownSelectRow';

export interface DropDownDatesProps extends HTMLProps<HTMLInputElement> {
  name: string;
  className?: string;
  inputChange: (args: ChangeParams) => void;
  format?: string;
  maxDate?: string;
  minDate?: string;
  attrs?: Attrs;
  value?: string | undefined;
  ddClassName?: string;
  mmClassName?: string;
  yyClassName?: string;
  ddLabel?: string;
  mmLabel?: string;
  yyLabel?: string;
  ddDefaultLabel?: string;
  mmDefaultLabel?: string;
  yyDefaultLabel?: string;
  displayOrder?: string;
  mmmm?: boolean;
}

export const DropDownDates: FC<DropDownDatesProps> = ({
  name,
  className,
  inputChange,
  format = 'MM-DD-YYYY',
  maxDate = m().endOf('year').format('MM-DD-YYYY'),
  minDate = '01-01-1900',
  attrs,
  value,
  ddClassName = '',
  mmClassName = '',
  yyClassName = '',
  ddLabel = 'DD:',
  mmLabel = 'MM:',
  yyLabel = 'YYYY:',
  ddDefaultLabel = 'Pick a day...',
  mmDefaultLabel = 'Pick a month...',
  yyDefaultLabel = 'Pick a year...',
  displayOrder = 'MM-DD-YY',
  mmmm = false,
  ...props
}: DropDownDatesProps & HTMLProps<HTMLDivElement>) => {
  const dropDownDatesRef = useRef<HTMLDivElement>(null);

  return (
    <DropDownDatesProvider
      name={name}
      inputChange={inputChange}
      format={format}
      maxDate={maxDate}
      minDate={minDate}
      attrs={attrs}
      value={value}
      ddClassName={ddClassName}
      mmClassName={mmClassName}
      yyClassName={yyClassName}
      ddLabel={ddLabel}
      mmLabel={mmLabel}
      yyLabel={yyLabel}
      ddDefaultLabel={ddDefaultLabel}
      mmDefaultLabel={mmDefaultLabel}
      yyDefaultLabel={yyDefaultLabel}
      displayOrder={displayOrder}
      mmmm={mmmm}
      dropDownDatesRef={dropDownDatesRef || props.ref}
    >
      <div
        className={`${className || ''} dropdowndates-wrapper`}
        ref={dropDownDatesRef}
        {...attrs}
        {...props}
      >
        <input type="hidden" name={name} id={name} value={value} />
        <DropDownSelectRow />
      </div>
    </DropDownDatesProvider>
  );
};

export default DropDownDates;
