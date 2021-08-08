import React, { FC, useContext, useEffect, useState } from 'react';
import Select from '../select';
import { DropDownDatesContext } from './DropdowndatesContext';
import { DropdowndateContextType } from '../../../types';

export const MM: FC = () => {
  const {
    mmClassName,
    mmDefaultLabel,
    mmLabel,
    name,
    mmOptions,
    handleMMChange,
    mmValue,
  } = useContext<DropdowndateContextType>(DropDownDatesContext);
  const [inputReset, setInputReset] = useState<boolean>(false);
  const groupName = `${name}-mm-select`;

  useEffect(() => {
    if (mmValue === 0) {
      setInputReset(true);
    }
  }, [mmValue]);

  useEffect(() => {
    if (inputReset) {
      setInputReset(false);
    }
  }, [inputReset]);

  return (
    <div className={`${mmClassName} ${name}-mm-select-wrapper`}>
      <label htmlFor={groupName}>{mmLabel}</label>
      <Select
        name={groupName}
        className={groupName}
        options={mmOptions}
        defaultLabel={mmDefaultLabel}
        inputChange={handleMMChange}
        value={mmValue}
        inputReset={inputReset}
      />
    </div>
  );
};

export default MM;
