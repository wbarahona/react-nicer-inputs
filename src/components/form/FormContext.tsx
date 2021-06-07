import React, {
  FC,
  createContext,
  ReactNode,
  ReactElement,
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  FormContextType,
  FormModel,
  DateRange,
  FormModelElementProps,
  InputValue,
  ValidationResponse,
} from '../../types';
import { useIsMount } from './isMount';

import { InputProps, Input } from '../inputs/input';
import { InputGroupProps, InputGroup } from '../inputs/inputgroup';
import { SelectProps, Select } from '../inputs/select';
import { AutocompleteProps, Autocomplete } from '../inputs/autocomplete';
import { DatePickerProps, DatePicker } from '../inputs/datepicker';
import { DropDownDatesProps, DropDownDates } from '../inputs/dropdowndates';
import { PasswordProps, Password } from '../inputs/password';
import { GrecaptchaProps, Grecaptcha } from '../inputs/grecaptcha';
import { FormGroupProps, FormGroup } from '../inputs/formgroup';
import { validateInput, validateForm } from './validationFactory';

export interface AllReactNicerInputsProps
  extends PropsWithChildren<
    InputProps &
      InputGroupProps &
      SelectProps &
      AutocompleteProps &
      DatePickerProps &
      DropDownDatesProps &
      PasswordProps &
      GrecaptchaProps &
      FormGroupProps
  > {}

export interface FormContextProps {
  children?: ReactNode;
  model?: string;
  useModel?: (args: FormModel) => void;
}

const FormContextDefoValues: FormContextType = {
  model: null,
  formModel: {},
  addToModel: () => {},
  updateModelInputValue: () => {},
  validateModelInput: () => {
    return { valid: false, summary: {} };
  },
};

export const FormContext = createContext<FormContextType>(
  FormContextDefoValues
);

export const FormProvider: FC<FormContextProps> = ({
  children,
  useModel = () => {},
  model = 'defaultModel',
}) => {
  const isMount = useIsMount();
  const modelToBuild: FormModel = {};

  modelToBuild[model] = { fields: {}, isValid: null, isInvalid: null };

  const [formModel, setFormModel] = useState<FormModel>(modelToBuild);

  const isElementRNIComponent = (
    el: ReactElement<AllReactNicerInputsProps>
  ) => {
    const { type } = el;

    return (
      type === Input ||
      type === InputGroup ||
      type === Select ||
      type === Autocomplete ||
      type === DatePicker ||
      type === DropDownDates ||
      type === Password ||
      type === Grecaptcha ||
      type === FormGroup
    );
  };

  const addToModel = (
    name: string,
    modelElementProps: FormModelElementProps
  ) => {
    const formModelCopy = Object.assign({}, formModel);
    formModelCopy[model].fields[name] = modelElementProps;

    setFormModel(formModelCopy);
  };

  const updateModelInputValue = (
    name: string,
    value: InputValue | Date | DateRange
  ) => {
    const { valid, summary } = validateModelInput(name, value);
    const formModelCopy = Object.assign({}, formModel);

    formModelCopy[model].fields[name] = {
      ...formModelCopy[model].fields[name],
      value,
      valid,
      invalid: !valid,
      pristine: false,
      touched: true,
      summary,
    };

    const formValid = validateForm(formModelCopy, model);

    formModelCopy[model].isValid = formValid;
    formModelCopy[model].isInvalid = !formValid;

    setFormModel(formModelCopy);
  };

  const validateModelInput = (
    name: string,
    value: InputValue | Date | DateRange
  ): ValidationResponse => {
    const { validate } = formModel[model].fields[name];

    return validateInput(value, validate);
  };

  useEffect(() => {
    if (isMount) {
    } else {
      const formModelCopy = Object.assign({}, formModel);

      useModel(formModelCopy);
    }
  });

  return (
    <FormContext.Provider
      value={{
        model,
        formModel,
        addToModel,
        updateModelInputValue,
        validateModelInput,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext<FormContextType>(FormContext);

export default FormProvider;
