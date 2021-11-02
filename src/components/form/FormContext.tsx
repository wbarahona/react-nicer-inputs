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
  FormValidityResponse,
} from '../../types';
import { useIsMount } from '../../hooks/isMount';
import { isEq, deepCopy } from '../../utils';

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
      formModel: {},
    };
  },
  setInputInvalid: () => {},
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
    const formModelCopy = deepCopy(formModel);
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
    const { fields } = formModel[model];
    const newFormModel: FormModel = {};
    newFormModel[model] = { fields: {}, isValid: null, isInvalid: null };

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const {
          dirty,
          invalid,
          pristine,
          summary,
          touched,
          type,
          valid,
          validate,
          value,
        } = fields[field];
        const newSummary = deepCopy(summary);

        newFormModel[model].fields[field] = {
          dirty,
          invalid,
          pristine,
          summary: newSummary,
          touched,
          type,
          valid,
          validate,
          value,
        };
      }
    }

    const currentProps = deepCopy(newFormModel[model].fields[name]);

    const { value: currentValue, validate: currentValidate } = currentProps;
    const { value: newValue, validate: newValidate } = newProps;

    if (
      newValue !== undefined &&
      newValue !== null &&
      currentValue !== newValue
    ) {
      setFormModel(prevFormModel => {
        const currFormModel = { ...prevFormModel };
        const inputModel = deepCopy(currFormModel[model].fields[name]);
        const { validate } = inputModel;

        inputModel.value = newValue;

        const { valid, summary } = validateInput(newValue, validate);

        inputModel.valid = valid;
        inputModel.invalid = !valid;
        inputModel.summary = summary;
        inputModel.pristine = false;
        inputModel.touched = true;

        currFormModel[model].fields[name] = inputModel;

        const formValid = validateForm(currFormModel, model);

        currFormModel[model].isValid = formValid;
        currFormModel[model].isInvalid = !formValid;

        return { ...currFormModel };
      });
    }
    if (!isEq(currentValidate, newValidate) && newValidate !== undefined) {
      setFormModel(prevFormModel => {
        const currFormModel = { ...prevFormModel };

        const inputModel = currFormModel[model].fields[name];
        const { value } = inputModel;

        inputModel.validate = newValidate;

        if (value !== null && value !== undefined) {
          const { valid, summary } = validateInput(value, newValidate);

          inputModel.valid = valid;
          inputModel.invalid = !valid;
          inputModel.summary = summary;
          inputModel.pristine = false;
          inputModel.touched = true;
        }

        const formValid = validateForm(currFormModel, model);

        currFormModel[model].isValid = formValid;
        currFormModel[model].isInvalid = !formValid;

        return { ...currFormModel };
      });
    }
    if (!isEq(currentValidate, newValidate) && newValidate === undefined) {
      setFormModel(prevFormModel => {
        const currFormModel = { ...prevFormModel };

        const inputModel = currFormModel[model].fields[name];
        const { value } = inputModel;

        inputModel.validate = newValidate;

        if (value !== null && value !== undefined) {
          // const { valid, summary } = validateInput(value, newValidate);

          inputModel.valid = null;
          inputModel.invalid = null;
          inputModel.summary = undefined;
          inputModel.pristine = true;
          inputModel.touched = false;
        }

        const formValid = validateForm(currFormModel, model);

        currFormModel[model].isValid = formValid;
        currFormModel[model].isInvalid = !formValid;

        return { ...currFormModel };
      });
    }
  };
  const updateModelInputValue = (
    name: string,
    value: InputValue | Date | DateRange | FileList | File[] | null
  ) => {
    const { fields } = formModel[model];
    const newFormModel: FormModel = {};
    newFormModel[model] = { fields: {}, isValid: null, isInvalid: null };

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const {
          dirty,
          invalid,
          pristine,
          summary,
          touched,
          type,
          valid,
          validate,
          value,
        } = fields[field];
        const newSummary = deepCopy(summary);

        newFormModel[model].fields[field] = {
          dirty,
          invalid,
          pristine,
          summary: newSummary,
          touched,
          type,
          valid,
          validate,
          value,
        };
      }
    }

    const { valid, summary } = validateModelInput(name, value);

    newFormModel[model].fields[name] = {
      ...newFormModel[model].fields[name],
      value,
      valid,
      invalid: !valid,
      pristine: false,
      touched: true,
      summary,
    };

    const formValid = validateForm(newFormModel, model);

    newFormModel[model].isValid = formValid;
    newFormModel[model].isInvalid = !formValid;

    setFormModel(newFormModel);
  };

  const updateModelInput = (name: string, newProps: FormModelElementProps) => {
    const { fields } = formModel[model];
    const newFormModel: FormModel = {};
    newFormModel[model] = { fields: {}, isValid: null, isInvalid: null };

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const {
          dirty,
          invalid,
          pristine,
          summary,
          touched,
          type,
          valid,
          validate,
          value,
        } = fields[field];
        const newSummary = deepCopy(summary);

        newFormModel[model].fields[field] = {
          dirty,
          invalid,
          pristine,
          summary: newSummary,
          touched,
          type,
          valid,
          validate,
          value,
        };
      }
    }

    newFormModel[model].fields[name] = {
      ...newFormModel[model].fields[name],
      ...newProps,
    };

    const formValid = validateForm(newFormModel, model);

    newFormModel[model].isValid = formValid;
    newFormModel[model].isInvalid = !formValid;

    setFormModel(newFormModel);
  };

  const validateModelInput = (
    name: string,
    value: InputValue | Date | DateRange | FileList | File[] | null
  ): ValidationResponse => {
    const { validate } = formModel[model].fields[name];
    const val = value || '';

    return validateInput(val, validate);
  };

  const validateFormModel = () => {
    const { fields } = formModel[model];
    const newFormModel: FormModel = {};

    newFormModel[model] = { fields: {}, isValid: null, isInvalid: null };

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const { value, dirty, pristine, touched, type, validate } =
          fields[field];

        const { valid, summary } = validateModelInput(field, value);

        newFormModel[model].fields[field] = {
          dirty,
          pristine,
          touched,
          type,
          validate,
          value,
          valid,
          invalid: !valid,
          summary,
        };
      }
    }

    const formValid = validateForm(newFormModel, model);

    newFormModel[model].isValid = formValid;
    newFormModel[model].isInvalid = !formValid;

    setFormModel(newFormModel);

    return {
      isValid: formValid,
      isInvalid: !formValid,
      formModel: newFormModel,
    };
  };

  function setInputInvalid(name: string, validity?: boolean) {
    if (validity !== undefined && validity !== null) {
      setFormModel(prevFormModel => {
        const currFormModel = { ...prevFormModel };

        const inputModel = currFormModel[model].fields[name];

        inputModel.valid = !validity;
        inputModel.invalid = validity;

        const formValid = validateForm(currFormModel, model);

        currFormModel[model].isValid = formValid;
        currFormModel[model].isInvalid = !formValid;

        return { ...currFormModel };
      });
    }
  }

  useEffect(() => {
    if (!isMount) {
      useModel(formModel);
    }
  }, [formModel]);

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
        setInputInvalid,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext<FormContextType>(FormContext);

export default FormProvider;
