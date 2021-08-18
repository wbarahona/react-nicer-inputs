import React, { FC, HTMLProps, ChangeEvent, useEffect, useState } from 'react';
import { useIsMount } from '../../hooks/isMount';
import { useFormContext } from '../form/FormContext';
import {
  Attrs,
  ChangeParams,
  Validation,
  FormModelElementProps,
} from '../../types';

export interface FileProps extends HTMLProps<HTMLInputElement> {
  name: string;
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  validate?: Validation[];
}

export const File: FC<FileProps> = ({
  name,
  className,
  inputChange,
  attrs,
  validate,
  multiple,
  ...props
}: FileProps & HTMLProps<HTMLInputElement>) => {
  const [fileArr, setFileArr] = useState<File[]>([]);
  const isMount = useIsMount();
  const { model, addToModel, updateModelInputValue } = useFormContext();
  const classNames = `input ${name} ${className || ''}`;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    inputChange({ e, name, value: e.target.files });
    handleFiles(e.target.files);
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

  function handleFiles(files: FileList | null) {
    if (files) {
      const fromFiles = Array.from(files);

      setFileArr(fromFiles);
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
    updateModelInputValue(name, fileArr);
  }, [fileArr]);

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

export default File;
