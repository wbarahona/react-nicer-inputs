export type Attrs = {
  [key: number]: string | number
}

export type ChangeParams = {
  e: ChangeEvent<HTMLSelectElement, HTMLInputElement>,
  name: string,
  value: string | number | null
}

export type Option = {
  label: string,
  value: string | number
}
