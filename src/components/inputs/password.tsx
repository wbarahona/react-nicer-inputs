import React, {
  FC,
  useState,
  HTMLProps,
  ChangeEvent,
  ReactNode,
  useEffect,
} from 'react';
import { useFormContext } from '../form/FormContext';
import {
  Attrs,
  ChangeParams,
  Validation,
  FormModelElementProps,
} from '../../types';
import { useIsMount } from '../../hooks/isMount';

export interface PasswordProps extends HTMLProps<HTMLInputElement> {
  name: string;
  className?: string;
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  showIcon?: ReactNode;
  hideIcon?: ReactNode;
  noToggle?: boolean;
  validate?: Validation[];
  inputReset?: boolean;
  isInvalid?: boolean;
  value?: string | number | undefined;
}

/**
 * Password Component
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param {Object} [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {ReactNode} [showIcon] - Optional. Is the icon to be displayed when the password text is hidden
 * @param {ReactNode} [hideIcon] - Optional. Is the icon to be displayed when the password text is shown
 * @param {Array} [validate] - Optional. Is an array of entities to validate this input
 * @param {boolean} [inputReset] - Optional. Allows to set the input as empty
 * @param {boolean} [isInvalid] = Optional. Allows to set the input as invalid
 * @param {string} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```<input type="password" />``` element
 */
export const Password: FC<PasswordProps> = ({
  name,
  className,
  inputChange,
  attrs,
  value,
  inputReset,
  showIcon = 'show',
  hideIcon = 'hide',
  noToggle = false,
  validate,
  isInvalid,
  ...props
}: PasswordProps & HTMLProps<HTMLInputElement>) => {
  const classNames = `input ${name} ${className || ''}`;
  const [inputValue, setInputValue] = useState<string | number | undefined>('');
  const [pwdVisible, setPwdVisible] = useState<boolean>(false);
  const [finalAttrs, setFinalAttrs] = useState<Attrs>({ ...attrs });
  const { model, addToModel, updateModelInputValue, setInputInvalid } =
    useFormContext();
  const isMount = useIsMount();

  const toggleVisible = () => {
    if (!pwdVisible) {
      setFinalAttrs({ ...attrs, autoComplete: 'off' });
    } else {
      setFinalAttrs({ ...attrs });
    }
    setPwdVisible(!pwdVisible);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.currentTarget;

    updateModelInputValue(name, value);
    inputChange({ e, name, value });
    setInputValue(value);
  };

  const setDefoValue = (val?: string | number) => {
    if (val && val !== '') {
      setInputValue(val || '');
    }
  };

  function resetInput() {
    setInputValue('');

    updateModelInputValue(name, '');
  }

  function addNewModel() {
    if (model) {
      addToModel(name, {
        type: 'password',
        valid: null,
        invalid: null,
        pristine: true,
        touched: false,
        dirty: false,
        validate,
        value: value || null,
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
    if (inputReset) {
      resetInput();
    }
  }, [inputReset]);

  useEffect(() => {
    setDefoValue(value);

    if (isMount) {
      addNewModel();
    } else {
      updateModel({ value: value || null, validate });
    }
  }, [value, validate]);

  useEffect(() => {
    if (isInvalid !== undefined && isInvalid !== null) {
      setInputInvalid(name, isInvalid);
    }
  }, [isInvalid]);

  return (
    <>
      <input
        {...props}
        type={pwdVisible ? 'text' : 'password'}
        name={name}
        id={name}
        className={classNames}
        aria-label={name}
        onChange={handleChange}
        value={inputValue}
        {...finalAttrs}
      />
      {!noToggle && (
        <button onClick={toggleVisible}>
          {pwdVisible ? hideIcon : showIcon}
        </button>
      )}
    </>
  );
};

export default Password;
