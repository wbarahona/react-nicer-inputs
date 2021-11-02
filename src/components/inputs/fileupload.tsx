import React, { FC, HTMLProps, ChangeEvent, useEffect, useState } from 'react';
import { useIsMount } from '../../hooks/isMount';
import { useFormContext } from '../form/FormContext';
import {
  Attrs,
  ChangeParams,
  Validation,
  FormModelElementProps,
} from '../../types';

export interface FileUploadProps extends HTMLProps<HTMLInputElement> {
  name: string;
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  isInvalid?: boolean;
  validate?: Validation[];
}

/**
 * FileUpload Component
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param {Object} [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {Array} [validate] - Optional. Is an array of entities to validate this input
 * @param {boolean} [isInvalid] = Optional. Allows to set the input as invalid
 * @param {string} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```<input type="file" />``` element
 */
export const FileUpload: FC<FileUploadProps> = ({
  name,
  className,
  inputChange,
  attrs,
  validate,
  isInvalid,
  multiple,
  ...props
}: FileUploadProps & HTMLProps<HTMLInputElement>) => {
  const [fileArr, setFileArr] = useState<FileList | null>(null);
  const isMount = useIsMount();
  const { model, addToModel, updateModelInputValue, setInputInvalid } =
    useFormContext();
  const classNames = `input ${name} ${className || ''}`;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    inputChange({ e, name, value: e.target.files });
    setFileArr(e.target.files || null);
  }

  function addNewModel() {
    if (model) {
      addToModel(name, {
        type: 'file',
        valid: null,
        invalid: null,
        pristine: true,
        touched: false,
        dirty: false,
        validate,
        value: null,
      });
    }
  }

  function updateModel(newProps: FormModelElementProps) {
    if (model) {
      addToModel(name, {
        ...newProps,
      });
    }
  }

  useEffect(() => {
    if (isMount) {
      addNewModel();
    } else {
      updateModel({ validate });
    }
  }, [validate]);

  useEffect(() => {
    if (!isMount) {
      updateModelInputValue(name, fileArr);
    }
  }, [fileArr]);

  useEffect(() => {
    if (isInvalid !== undefined && isInvalid !== null) {
      setInputInvalid(name, isInvalid);
    }
  }, [isInvalid]);

  return (
    <input
      {...props}
      type="file"
      name={name}
      id={name}
      className={classNames}
      onChange={handleChange}
      aria-label={name}
      aria-describedby={`${name}-help`}
      multiple={multiple}
      {...attrs}
    />
  );
};

export default FileUpload;
