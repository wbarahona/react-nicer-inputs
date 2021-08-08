import React, { FC, useContext } from 'react';
import Select from '../select';
import { DropDownDatesContext } from './DropdowndatesContext';
import { DropdowndateContextType } from '../../../types';
import { useEffect } from 'react';
import { useState } from 'react';

export const DD: FC = () => {
  const {
    ddClassName,
    ddDefaultLabel,
    ddLabel,
    name,
    ddOptions,
    handleDDChange,
    ddValue,
  } = useContext<DropdowndateContextType>(DropDownDatesContext);
  const [inputReset, setInputReset] = useState<boolean>(false);
  const groupName = `${name}-dd-select`;

  useEffect(() => {
    if (ddValue === 0) {
      setInputReset(true);
    }
  }, [ddValue]);

  useEffect(() => {
    if (inputReset) {
      setInputReset(false);
    }
  }, [inputReset]);

  return (
    <div className={`${ddClassName} ${name}-dd-select-wrapper`}>
      <label htmlFor={groupName}>{ddLabel}</label>
      <Select
        name={groupName}
        className={groupName}
        options={ddOptions}
        defaultLabel={ddDefaultLabel}
        inputChange={handleDDChange}
        value={ddValue}
        inputReset={inputReset}
      />
    </div>
  );
};

export default DD;
