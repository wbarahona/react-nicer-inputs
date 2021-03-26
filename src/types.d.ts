export type Attrs = {
  [key: number]: string | number
}

/**
 * ChangeParams
 * @typedef {{e: Event, name: string, value: (string | number | null)}} ChangeParams
 */
export type ChangeParams = {
  /**
   * @param {Event} e - Is the event element for the input
   */
  e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  name: string,
  value: string | number | null
}
/**
 * @param {string} label This is the label to be displayed by the input
 * @param {string | number} value This is the value of the option
 */
export type Option = {
  label: string,
  value: string | number,
  attrs?: Attrs
}

export type InputValue = string | number | undefined;

export type NicerInputProps = {
  type: string;
  name: string;
  className?: string;
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  value?: string | number | undefined;
}

export type DateRangeProps = {
  startDate: NicerInputProps;
  endDate: NicerInputProps;
}