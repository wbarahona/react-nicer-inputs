import {ChangeEvent} from 'react';

export type Attrs = {
  [key: number]: string | number
}

export type ChangeParams = {
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
