import React, {
  FC,
  createContext,
  ReactNode,
  ReactElement,
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
  HTMLProps,
} from 'react';
import {
  FormContextType,
  FormModel,
  DateRange,
  FormModelElementProps,
  InputValue,
  ValidationResponse,
  FormValidityResponse,
} from '../../types';
import { useIsMount } from '../../hooks/isMount';
import { isEq } from '../../utils';

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
  formSubmit?: (args?: FormValidityResponse) => void;
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
  updateModelInput: () => {},
  formSubmit: () => {},
  validateFormModel: () => {
    return {
      isValid: false,
      isInvalid: false,
      formModel: {}
    };
  },
};

export const FormContext = createContext<FormContextType>(
  FormContextDefoValues
);

export const FormProvider: FC<FormContextProps> = ({
  children,
  useModel = () => {},
  formSubmit = () => {},
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
    const exists = formModelCopy[model].fields[name];

    if (!exists) {
      addNewModelElement(name, modelElementProps);
    } else {
      updateModelProps(name, modelElementProps);
    }
  };

  const addNewModelElement = (
    name: string,
    modelElementProps: FormModelElementProps
  ) => {
    const formModelCopy = Object.assign({}, formModel);

    formModelCopy[model].fields[name] = modelElementProps;

    setFormModel(formModelCopy);
  };

  const updateModelProps = (name: string, newProps: FormModelElementProps) => {
    const formModelCopy = Object.assign({}, formModel);
    const currentProps = Object.assign({}, formModelCopy[model].fields[name]);

    const { value: currentValue, validate: currentValidate } = currentProps;
    const { value: newValue, validate: newValidate } = newProps;

    if (newValue !== null && currentValue !== newValue) {
      formModelCopy[model].fields[name].value = newValue;

      // setFormModel(formModelCopy);
      updateModelInputValue(name, newValue);
    }
    if (!isEq(currentValidate, newValidate)) {
      formModelCopy[model].fields[name].validate = newValidate;

      // setFormModel(formModelCopy);
      updateModelInputValue(name, newValue);
    }
  };

  const updateModelInputValue = (
    name: string,
    value: InputValue | Date | DateRange | null
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

  const updateModelInput = (name: string, newProps: FormModelElementProps) => {
    const formModelCopy = Object.assign({}, formModel);

    formModelCopy[model].fields[name] = {
      ...formModelCopy[model].fields[name],
      ...newProps,
    };

    const formValid = validateForm(formModelCopy, model);

    formModelCopy[model].isValid = formValid;
    formModelCopy[model].isInvalid = !formValid;

    setFormModel(formModelCopy);
  };

  const validateModelInput = (
    name: string,
    value: InputValue | Date | DateRange | null
  ): ValidationResponse => {
    const { validate } = formModel[model].fields[name];
    const val = value || '';

    return validateInput(val, validate);
  };

  const validateFormModel = () => {
    const formModelCopy = Object.assign({}, formModel);
    const { fields } = formModelCopy[model];

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const { value } = fields[field];
        
        const { valid, summary } = validateModelInput(field, value);

        formModelCopy[model].fields[field] = {
          ...formModelCopy[model].fields[field],
          value,
          valid,
          invalid: !valid,
          summary,
        };
      }
    }

    const formValid = validateForm(formModelCopy, model);

    formModelCopy[model].isValid = formValid;
    formModelCopy[model].isInvalid = !formValid;

    setFormModel(formModelCopy);

    return {
      isValid: formValid,
      isInvalid: !formValid,
      formModel: formModelCopy,
    };
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
        validateFormModel,
        formSubmit,
        updateModelInput,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext<FormContextType>(FormContext);

export default FormProvider;
