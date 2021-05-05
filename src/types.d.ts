import { Moment } from 'moment';

export type Attrs = {
  [key: number]: string | number | boolean;
};

/**
 * ChangeParams
 * @typedef {{e: Event, name: string, value: (string | number | null)}} ChangeParams
 */
export type ChangeParams = {
  /**
   * @param {Event} e - Is the event element for the input
   */
  e: ChangeEvent<HTMLSelectElement | HTMLInputElement>;
  name: string;
  value: string | number | null;
};
/**
 * @param {string} label This is the label to be displayed by the input
 * @param {string | number} value This is the value of the option
 */
export type Option = {
  label: string;
  value: string | number;
  attrs?: Attrs;
};

export type InputValue = string | number | undefined;

export type NicerInputProps = {
  type: string;
  name: string;
  className?: string;
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  value?: string | number | undefined;
};

export type DateRangeProps = {
  startDate: NicerInputProps;
  endDate: NicerInputProps;
};

export interface DateRange {
  startDate: string | Date;
  endDate: string | Date;
}

export interface DateArrayProps {
  selected: boolean;
  empty: boolean;
  startDate: boolean;
  endDate: boolean;
  inRange: boolean;
  selectable: boolean;
}

export type CalendarContextType = {
  date: string | Date;
  saveDate: (date: Date) => void;
  saveHoverDate: (date: Date) => void;
  getDate: () => string | Date;
  getDateRange: () => DateRange;
  isDateRange: boolean;
  isDateSelectable: (date: Date) => boolean;
  isDateWithinRange: (date: Date) => boolean;
  isDateSelected: (date: Date) => boolean;
  isSelectedDateStartDate: (date: Date) => boolean;
  isSelectedDateEndDate: (date: Date) => boolean;
  startDate: string | Date;
  endDate: string | Date;
  minNights: number | undefined;
  maxNights: number | undefined;
  minDate: string | undefined;
  maxDate: string | undefined;
  date: string | Date | DateRange | undefined;
  disabledDates: string[];
  hoverDate: string | Date;
  buildMonthsPanes: (currentPaneMonth: Date) => void;
  getPrevPaneMonths: () => Moment[];
  getCurrentPaneMonths: () => Moment[];
  getNextPaneMonths: () => Moment[];
  movePrev: () => void;
  moveNext: () => void;
  canNavigatePrev: () => boolean | undefined;
  canNavigateNext: () => boolean | undefined;
  whatCalendarHeader: (mm: Moment) => ReactNode | Function;
  currPaneMonths: Moment[];
  disableNavigationOnDateBoundary: boolean | undefined;
};
